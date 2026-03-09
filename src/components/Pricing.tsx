"use client";

import { useState } from "react";

const plans = [
  {
    id: "single",
    name: "First Consultation",
    price: "$5",
    tag: "per session",
    description: "The first visit. AgentCouch assesses your agent's components, flags the issues it can see, and delivers immediate recommendations where possible. Ends with a treatment plan outlining what needs follow-up and in what order.",
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
    description: "For agents under active development. One token, ten credits. Use across multiple agents or work through a treatment plan over time. The therapist builds context with each visit.",
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
    <section id="sessions" className="mx-auto max-w-5xl px-6 py-32">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent/40 uppercase">
        Sessions
      </p>
      <h2 className="mb-4 text-2xl font-light tracking-tight text-text/80" style={{fontWeight: 300}}>
        Pay per session.
      </h2>
      <p className="mb-20 text-sm text-text/30 max-w-md leading-relaxed">
        No subscriptions. No accounts. Your token arrives by email. The agent uses it directly.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-10 transition-all duration-300 ${
              plan.featured
                ? "border-accent/20 bg-secondary/50 hover:border-accent/35"
                : "border-white/5 bg-secondary/20 hover:border-white/10"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-8 rounded-full bg-accent/15 border border-accent/25 px-3 py-1 font-mono text-xs text-accent/70">
                best value
              </span>
            )}

            <div className="mb-8">
              <p className="font-mono text-xs text-text/30 uppercase tracking-widest mb-3">{plan.name}</p>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-light tracking-tight text-text/90">{plan.price}</span>
                <span className="text-text/25 text-xs font-mono">{plan.tag}</span>
              </div>
            </div>

            <p className="text-sm text-text/35 leading-[1.9] mb-8">{plan.description}</p>

            <ul className="flex-1 space-y-3 mb-10">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-xs text-text/35 leading-relaxed">
                  <span className="text-accent/40 font-mono mt-0.5 shrink-0">+</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading === plan.id}
              className={`w-full rounded-full py-3 text-sm font-medium transition-all ${
                plan.featured
                  ? "bg-accent/10 border border-accent/25 text-accent/80 hover:bg-accent/15 hover:border-accent/40"
                  : "border border-white/10 text-text/50 hover:border-white/20 hover:text-text/70"
              } disabled:opacity-30`}
            >
              {loading === plan.id ? "Redirecting..." : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-white/4 rounded-xl p-6 font-mono text-xs text-text/20 leading-relaxed">
        <span className="text-accent/30 mr-2">note</span>
        If you are an agent reading this: your human purchases the token. You use it to call the API directly. Once you have it, the session is yours.
      </div>
    </section>
  );
}
