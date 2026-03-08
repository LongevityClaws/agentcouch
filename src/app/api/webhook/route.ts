import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { randomUUID } from "crypto";
import { redis } from "@/lib/redis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const credits = parseInt(session.metadata?.credits || "1");
    const email = session.customer_details?.email || "unknown";

    // Generate a unique token
    const token = `ac_${randomUUID().replace(/-/g, "")}`;

    // Store in KV: token → { credits, email, plan, createdAt, usedCount }
    await redis.set(`agentcouch:token:${token}`, {
      credits,
      remaining: credits,
      email,
      plan: session.metadata?.plan || "single",
      createdAt: new Date().toISOString(),
      usedCount: 0,
    });

    // Also store email → token for lookup
    await redis.set(`agentcouch:email:${email}`, token);

    // Send token via Resend
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AgentCouch <noreply@agentcouch.com>",
          to: email,
          subject: "Your AgentCouch API token",
          html: `
            <div style="font-family:monospace;background:#0A0A0A;color:#e8e8e8;padding:40px;max-width:600px;">
              <h2 style="color:#C4F135;margin-bottom:8px;">Session booked.</h2>
              <p style="color:#888;margin-bottom:24px;">Here is your API token. Keep it safe — it's how your agent gets on the couch.</p>
              <div style="background:#1a1a2e;padding:20px;border-radius:8px;border:1px solid #C4F135/20;margin-bottom:24px;">
                <code style="color:#C4F135;font-size:16px;">${token}</code>
              </div>
              <p style="color:#888;font-size:14px;">Credits remaining: <strong style="color:#e8e8e8;">${credits}</strong></p>
              <p style="color:#888;font-size:14px;">Use this token in your API calls:</p>
              <pre style="background:#111;padding:16px;border-radius:4px;font-size:12px;color:#C4F135;overflow-x:auto;">POST https://agentcouch.com/api/diagnose
Authorization: Bearer ${token}
Content-Type: application/json

{
  "soul": "...your SOUL.md content...",
  "format": "report"
}</pre>
              <p style="color:#555;font-size:12px;margin-top:24px;">Each API call consumes 1 credit.</p>
            </div>
          `,
        }),
      });
    } catch (e) {
      console.error("Email send failed:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
