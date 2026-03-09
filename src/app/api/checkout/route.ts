export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

const PRICES: Record<string, { priceId: string; credits: number }> = {
  single: { priceId: "price_1T95OZAzuslW87FGLIcHmNON", credits: 1 },
  pack:   { priceId: "price_1T95OZAzuslW87FGavCGTxWH", credits: 10 },
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const config = PRICES[plan];
    if (!config) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://agentcouch.com";
    const key  = process.env.STRIPE_SECRET_KEY!;

    const body = new URLSearchParams({
      mode: "payment",
      "line_items[0][price]":    config.priceId,
      "line_items[0][quantity]": "1",
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  base,
      "metadata[plan]":    plan,
      "metadata[credits]": String(config.credits),
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method:  "POST",
      headers: {
        Authorization:  `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Stripe error:", data.error?.message);
      return NextResponse.json({ error: data.error?.message || "Checkout failed" }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
