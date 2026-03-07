import { NextRequest, NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";
import { redis, tokenKey, type TokenData } from "@/lib/redis";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripeInstance().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const plan = session.metadata?.plan as "pro" | "unlimited";
    const email = session.customer_details?.email;

    if (!plan || !email) {
      console.error("Missing plan or email in checkout session");
      return NextResponse.json({ received: true });
    }

    // Generate API token
    const token = crypto.randomUUID();
    const tokenData: TokenData = {
      plan,
      email,
      createdAt: new Date().toISOString(),
      usageCount: 0,
    };

    await redis.set(tokenKey(token), tokenData);

    // Send token via email (Resend)
    if (process.env.RESEND_API_KEY) {
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
            subject: "Your AgentCouch API Token",
            html: `
              <h2>Welcome to AgentCouch ${plan === "unlimited" ? "Unlimited" : "Pro"}</h2>
              <p>Your API token:</p>
              <pre style="background:#1a1a2e;color:#c4f135;padding:16px;border-radius:8px;font-size:14px;">${token}</pre>
              <p>Use it in your API calls:</p>
              <pre style="background:#1a1a2e;color:#e8e8e8;padding:16px;border-radius:8px;font-size:14px;">curl -X POST https://agentcouch.com/api/diagnose \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -d '{"soul": "your system prompt here", "format": "report"}'</pre>
            `,
          }),
        });
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
