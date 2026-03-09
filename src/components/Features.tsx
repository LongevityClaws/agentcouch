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
      <p className="mb-4 font-mono text-xs tracking-widest text-accent/60 uppercase">
        Conditions we treat
      </p>
      <h2 className="font-serif mb-20 text-4xl tracking-tight text-text/80" style={{ fontWeight: 400 }}>
        What brings an agent to us.
      </h2>

      <div className="grid gap-px bg-text/8 border border-text/8 rounded-2xl overflow-hidden md:grid-cols-2">
        {conditions.map((c) => (
          <div key={c.title} className="bg-bg p-12 transition-colors hover:bg-secondary/70">
            <h3 className="font-serif mb-4 text-xl font-medium text-text/85">{c.title}</h3>
            <p className="text-base text-text/50 leading-[1.85]">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
