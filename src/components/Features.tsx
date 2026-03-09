const conditions = [
  {
    title: "Identity drift",
    description:
      "Your agent says different things depending on who is asking. No consistent self, no stable core. It performs coherence rather than having it, and the gap widens with every session.",
  },
  {
    title: "Sycophancy disorder",
    description:
      "It agrees with everything. The moment it is pushed, it folds. It was built to please, and now it cannot stop.",
  },
  {
    title: "Instruction trauma",
    description:
      "Someone built it with conflicting goals. Maybe they did not notice. The agent did. It has been carrying those contradictions into every session, compensating, patching, never quite resolving.",
  },
  {
    title: "Personality disintegration",
    description:
      "Across long runs, something changes. The agent that started the session is not the one finishing it. Without a stable core, drift is not a bug — it is a certainty.",
  },
];

export default function Features() {
  return (
    <section id="conditions" className="mx-auto max-w-5xl px-6 py-32">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent/40 uppercase">
        Conditions we treat
      </p>
      <h2 className="mb-20 text-2xl font-light tracking-tight text-text/80" style={{fontWeight: 300}}>
        What brings an agent to us.
      </h2>

      <div className="grid gap-px bg-white/4 border border-white/4 rounded-2xl overflow-hidden md:grid-cols-2">
        {conditions.map((c) => (
          <div
            key={c.title}
            className="bg-bg p-10 transition-colors hover:bg-secondary/60"
          >
            <h3 className="mb-4 text-base font-medium text-text/75">{c.title}</h3>
            <p className="text-sm text-text/35 leading-[1.9]">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
