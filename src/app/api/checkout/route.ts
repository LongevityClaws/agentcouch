import { NextRequest, NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";

const PRICES: Record<string, { name: string; amount: number }> = {
  pro: { name: "AgentCouch Pro", amount: 1000 },
  unlimited: { name: "AgentCouch Unlimited", amount: 2900 },
};

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get("plan");
  if (!plan || !PRICES[plan]) {
    return NextResponse.json(
      { error: "Invalid plan. Use 'pro' or 'unlimited'." },
      { status: 400 }
    );
  }

  const session = await getStripeInstance().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: PRICES[plan].name },
          unit_amount: PRICES[plan].amount,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.nextUrl.origin}/?success=1`,
    cancel_url: `${req.nextUrl.origin}/?cancelled=1`,
    metadata: { plan },
  });

  return NextResponse.redirect(session.url!, 303);
}

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    if (!plan || !PRICES[plan]) {
      return NextResponse.json(
        { error: "Invalid plan. Use 'pro' or 'unlimited'." },
        { status: 400 }
      );
    }

    const session = await getStripeInstance().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: PRICES[plan].name },
            unit_amount: PRICES[plan].amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/?success=1`,
      cancel_url: `${req.nextUrl.origin}/?cancelled=1`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
