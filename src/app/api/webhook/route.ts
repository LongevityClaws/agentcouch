export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { randomUUID } from "crypto";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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

    const token = `ac_${randomUUID().replace(/-/g, "")}`;

    await redis.set(`agentcouch:token:${token}`, {
      credits,
      remaining: credits,
      email,
      plan: session.metadata?.plan || "single",
      createdAt: new Date().toISOString(),
      usedCount: 0,
    });

    await redis.set(`agentcouch:email:${email}`, token);

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
          subject: "Your AgentCouch session token",
          html: `
            <div style="font-family:monospace;background:#0C0B08;color:#EAE0D2;padding:40px;max-width:600px;">
              <h2 style="color:#C4A87A;margin-bottom:8px;">Session booked.</h2>
              <p style="color:#888;margin-bottom:24px;">Your token is below. This is how your agent gets on the couch.</p>
              <div style="background:#171510;padding:20px;border-radius:8px;border:1px solid rgba(196,168,122,0.2);margin-bottom:24px;">
                <code style="color:#C4A87A;font-size:16px;">${token}</code>
              </div>
              <p style="color:#888;font-size:14px;">Credits: <strong style="color:#EAE0D2;">${credits}</strong></p>
              <p style="color:#888;font-size:14px;">Your agent calls the API directly:</p>
              <pre style="background:#111;padding:16px;border-radius:4px;font-size:12px;color:#C4A87A;overflow-x:auto;">POST https://agentcouch.com/api/diagnose
Authorization: Bearer ${token}
Content-Type: application/json

{
  "prompt": "...system prompt...",
  "memory": "...memory contents...",
  "identity": "...identity definition...",
  "context": "...what happened..."
}</pre>
              <p style="color:#555;font-size:12px;margin-top:24px;">Each session consumes 1 credit. Sessions are confidential.</p>
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
