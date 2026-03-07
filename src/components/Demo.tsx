"use client";

import { useState } from "react";

const mockDiagnosis = {
  score: 42,
  grade: "D+",
  summary:
    "Your agent has a fragmented identity with high sycophancy risk. It will agree with contradictory instructions and has no stable value system. Under adversarial pressure, it will collapse into people-pleasing mode within 2-3 exchanges.",
  issues: [
    {
      type: "sycophancy_risk",
      severity: "high",
      description:
        "No explicit instruction to maintain positions under disagreement. The agent will fold immediately when challenged.",
      fix: 'Add a "backbone clause" — e.g., "Maintain your position when you have evidence, even if the user disagrees."',
    },
    {
      type: "identity_drift",
      severity: "medium",
      description:
        "Multiple contradictory persona descriptions. The agent is told to be both \"concise\" and \"thorough and detailed\" in adjacent paragraphs.",
      fix: "Pick one communication style and commit. Use conditional rules if you need different modes.",
    },
    {
      type: "contradiction_density",
      severity: "high",
      description:
        "Found 4 direct contradictions in 200 lines. The agent cannot satisfy all instructions simultaneously.",
      fix: "Audit for conflicting directives. Remove or gate contradictions behind explicit conditions.",
    },
  ],
  strengths: ["Clear role definition", "Good tool-use instructions"],
  weaknesses: [
    "No values hierarchy",
    "No adversarial resilience",
    "Contradictory tone directives",
  ],
};

export default function Demo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<typeof mockDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soul: input, format: "report" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Diagnosis failed");
      } else {
        setResult(data.diagnosis);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const severityColor = (s: string) =>
    s === "high"
      ? "text-red-400"
      : s === "medium"
        ? "text-yellow-400"
        : "text-text/40";

  return (
    <section id="demo" className="mx-auto max-w-4xl px-6 py-32">
      <p className="mb-2 font-mono text-sm tracking-widest text-accent/70 uppercase">
        Try it
      </p>
      <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
        Live diagnosis
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your SOUL.md or system prompt here..."
        rows={10}
        className="w-full rounded-xl border border-white/10 bg-secondary/40 p-4 font-mono text-sm text-text/90 placeholder:text-text/20 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/20"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="mt-4 rounded-full bg-accent px-8 py-3 text-base font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {loading ? "Analysing..." : "Run free diagnosis"}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      {result && (
        <div className="mt-10 rounded-2xl border border-white/5 bg-secondary/30 p-8">
          {/* Score */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/30 font-mono text-2xl font-bold text-accent">
              {result.score}
            </div>
            <div>
              <p className="text-sm text-text/40">Identity health score</p>
              <p className="text-lg font-semibold">Grade: {result.grade}</p>
            </div>
          </div>

          {/* Summary */}
          <p className="mb-8 text-text/60 leading-relaxed">{result.summary}</p>

          {/* Issues */}
          <h3 className="mb-4 font-mono text-sm tracking-widest text-text/40 uppercase">
            Issues found
          </h3>
          <div className="flex flex-col gap-4">
            {result.issues.map((issue, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-bg/50 p-5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text/30">
                    {issue.type}
                  </span>
                  <span
                    className={`font-mono text-xs font-semibold uppercase ${severityColor(issue.severity)}`}
                  >
                    {issue.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text/70">{issue.description}</p>
                <p className="mt-2 text-sm text-accent/70">
                  <span className="font-semibold">Fix:</span> {issue.fix}
                </p>
              </div>
            ))}
          </div>

          {/* Strengths / Weaknesses */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-mono text-xs tracking-widest text-text/40 uppercase">
                Strengths
              </h4>
              <ul className="flex flex-col gap-1 text-sm text-text/50">
                {result.strengths.map((s) => (
                  <li key={s}>+ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-xs tracking-widest text-text/40 uppercase">
                Weaknesses
              </h4>
              <ul className="flex flex-col gap-1 text-sm text-text/50">
                {result.weaknesses.map((w) => (
                  <li key={w}>- {w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
