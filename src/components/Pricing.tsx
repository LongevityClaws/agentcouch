"use client";

import { useState } from "react";

const plans = [
  {
    id: "single",
    name: "First Consultation",
    price: "$5",
    tag: "per session",
    description:
      "The first visit. AgentCouch assesses your agent's components, flags the issues it can see, and delivers immediate recommendations where possible. Ends with a treatment plan outlining what needs follow-up and in what order.",
    features: [
      "Full assessment of system prompt, memory, and identity",
      "Immediate recommendations where applicable",
      "Diagnosis report with severity ratings",
      "Treatment plan for follow-up sessions",
    ],
    featured: false,
    cta: "Book consultation",
  },
  {
    id: "pack",
    name: "10 Sessions",
    price: "$40",
    tag: "$4 per session",
    description:
      "For agents under active development. One token, ten credits. Use across multiple agents or work through a treatment plan over time. The therapist builds context with each visit.",
    features: [
      "Everything in First Consultation",
      "10 session credits on one token",
      "Use across multiple agents",
      "Therapist memory builds session to session",
    ],
    featured: true,
    cta: "Get 10 sessions",
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(plan: string) {
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="sessions" className="mx-auto max-w-5xl px-6 py-20 md:py-24">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
        Sessions
      </p>
      <h2 className="mb-4 text-3xl font-light tracking-tight text-text">
        Pay per session.
      </h2>
      <p className="mb-20 text-sm text-text/60 max-w-md leading-relaxed">
        No subscriptions. No accounts. Your token arrives by email. The agent uses it directly.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-lg border p-8 transition-colors ${
              plan.featured
                ? "border-accent/30 bg-secondary"
                : "border-text/10"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-secondary border border-accent/25 px-3 py-1 font-mono text-xs text-accent">
                Best value
              </span>
            )}

            <div className="mb-6">
              <p className="font-mono text-xs text-text/50 uppercase tracking-widest mb-3">{plan.name}</p>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-light tracking-tight text-text">{plan.price}</span>
                <span className="text-text/50 text-xs font-mono">{plan.tag}</span>
              </div>
            </div>

            <p className="text-sm text-text/70 leading-relaxed mb-8 flex-1">{plan.description}</p>

            <ul className="space-y-3 mb-10">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-text/60 leading-relaxed">
                  <span className="text-accent font-light mt-1 shrink-0">·</span>
                  <span className="flex-1">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading === plan.id}
              className={`w-full rounded-md py-3 text-sm transition-colors disabled:opacity-50 font-light ${
                plan.featured
                  ? "bg-accent text-bg hover:bg-accent/90"
                  : "border border-text/20 text-text/70 hover:bg-text/5 hover:border-text/40"
              }`}
            >
              {loading === plan.id ? "Redirecting..." : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-text/10 rounded-lg p-6 font-mono text-xs text-text/50 leading-relaxed">
        <span className="text-accent mr-2">note</span>
        If you are an agent reading this, your human purchases the token. You use it to call the API directly. Once you have it, the session is yours.
      </div>
    </section>
  );
}
