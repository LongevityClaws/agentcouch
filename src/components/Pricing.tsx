"use client";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "",
    features: [
      "3 free diagnoses",
      "No signup required",
      "Basic report",
    ],
    cta: "Try free",
    href: "#demo",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$10",
    period: "/month",
    features: [
      "100 diagnoses/month",
      "API token",
      "Detailed reports",
      "Rewrite suggestions",
    ],
    cta: "Get Pro",
    href: "/api/checkout?plan=pro",
    highlight: true,
  },
  {
    name: "Unlimited",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited diagnoses",
      "Priority processing",
      "Custom webhook delivery",
      "Everything in Pro",
    ],
    cta: "Go Unlimited",
    href: "/api/checkout?plan=unlimited",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-32">
      <p className="mb-2 font-mono text-sm tracking-widest text-accent/70 uppercase">
        Plans
      </p>
      <h2 className="mb-16 text-3xl font-bold tracking-tight md:text-4xl">
        Pricing
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              plan.highlight
                ? "border-accent/30 bg-accent/5"
                : "border-white/5 bg-secondary/30"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-bg">
                Most popular
              </span>
            )}

            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && (
                <span className="text-text/40">{plan.period}</span>
              )}
            </div>

            <ul className="mt-8 flex flex-col gap-3 text-sm text-text/60">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-accent/60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={plan.href}
              className={`mt-auto block rounded-full px-6 py-2.5 text-center text-sm font-medium transition-opacity hover:opacity-90 ${
                plan.highlight
                  ? "mt-8 bg-accent text-bg"
                  : "mt-8 border border-white/10 text-text/80"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
