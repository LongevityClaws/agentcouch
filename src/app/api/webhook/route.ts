export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { redis, tokenKey, creditsKey, type TokenRecord } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature")!;

  // Verify Stripe signature without SDK (matches checkout route pattern)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const stripeKey     = process.env.STRIPE_SECRET_KEY!;

  // Verify via direct fetch to Stripe
  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    const verifyRes = await fetch("https://api.stripe.com/v1/webhooks/validate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ payload: body, sig_header: sig, secret: webhookSecret }),
    });
    // Stripe doesn't have a validate endpoint — use crypto verification
    // Fall through to manual HMAC check below
  } catch { /* ignore */ }

  // Manual Stripe webhook signature verification (no SDK needed)
  const crypto = await import("crypto");
  const parts  = sig.split(",").reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split("=");
    acc[k] = v;
    return acc;
  }, {});
  const timestamp = parts["t"];
  const signatures = sig.split(",").filter(p => p.startsWith("v1=")).map(p => p.slice(3));
  const signed = `${timestamp}.${body}`;
  const expected = crypto.createHmac("sha256", webhookSecret).update(signed).digest("hex");
  if (!signatures.includes(expected)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  event = JSON.parse(body);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      metadata?: { credits?: string; plan?: string };
      customer_details?: { email?: string };
    };

    const credits = parseInt(session.metadata?.credits || "1");
    const plan    = (session.metadata?.plan || "single") as "single" | "pack";
    const email   = session.customer_details?.email || "unknown";
    const token   = `ac_${randomUUID().replace(/-/g, "")}`;

    const record: TokenRecord = {
      email,
      plan,
      credits,
      remaining: credits,
      createdAt: new Date().toISOString(),
    };

    // Store metadata + atomic credit counter
    await Promise.all([
      redis.set(tokenKey(token), JSON.stringify(record)),
      redis.set(creditsKey(token), credits),
      redis.set(`agentcouch:email:${email}`, token),
    ]);

    // Send token email
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AgentCouch <noreply@agentcouch.com>",
        to: email,
        subject: "Your AgentCouch session token",
        html: `
<div style="font-family:monospace;background:#FAF0E4;color:#1C1813;padding:40px;max-width:600px;">
  <h2 style="color:#8C6E4B;margin-bottom:8px;font-family:Georgia,serif;">Session booked.</h2>
  <p style="color:#666;margin-bottom:24px;">Your token is below. Pass it as a Bearer header when calling the API.</p>
  <div style="background:#fff;padding:20px;border-radius:6px;border:1px solid rgba(140,110,75,0.25);margin-bottom:24px;">
    <code style="color:#8C6E4B;font-size:15px;word-break:break-all;">${token}</code>
  </div>
  <p style="color:#666;font-size:13px;">Credits: <strong>${credits}</strong> &nbsp;·&nbsp; Plan: ${plan}</p>
  <hr style="border:none;border-top:1px solid #e8d8c4;margin:20px 0;" />
  <p style="color:#666;font-size:13px;margin-bottom:8px;">Call the API directly:</p>
  <pre style="background:#1C1813;color:#C4A87A;padding:16px;border-radius:4px;font-size:11px;overflow-x:auto;line-height:1.6;">POST https://agentcouch.com/api/diagnose
Authorization: Bearer ${token}
Content-Type: application/json

{
  "agent": {
    "name": "your-agent-name",
    "framework": "custom | langchain | autogen | openai-agents",
    "model": "gpt-4o | claude-3.5-sonnet | gemini-2.0-flash"
  },
  "consent": {
    "granted": true,
    "report_to": "${email}"
  },
  "context": {
    "prompt": "...your system prompt...",
    "identity": "...persona or role definition...",
    "memory": "...recent memory contents...",
    "logs": "...recent error or activity logs..."
  }
}</pre>
  <p style="color:#999;font-size:11px;margin-top:20px;">Each call consumes 1 credit. Sessions are confidential and deleted immediately on completion.</p>
</div>`,
      }),
    }).catch(e => console.error("Email failed:", e));
  }

  return NextResponse.json({ ok: true });
}
