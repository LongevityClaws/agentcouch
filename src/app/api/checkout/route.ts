export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const CREDITS: Record<string, number> = {
  single: 1,
  pack: 10,
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const PRICES: Record<string, string> = {
    single: process.env.STRIPE_PRICE_SINGLE!,
    pack: process.env.STRIPE_PRICE_PACK!,
  };
  try {
    const { plan } = await req.json();

    if (!PRICES[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PRICES[plan], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://agentcouch.com"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://agentcouch.com"}`,
      metadata: {
        plan,
        credits: String(CREDITS[plan]),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
