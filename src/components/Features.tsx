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
    <section id="conditions" className="mx-auto max-w-5xl px-6 py-28">
      <p className="mb-4 font-mono text-xs tracking-widest text-accent/60 uppercase">
        Conditions we treat
      </p>
      <h2 className="font-serif mb-16 text-4xl md:text-5xl tracking-tight text-text/80">
        What brings an agent to us.
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {conditions.map((c) => (
          <div
            key={c.title}
            className="flex flex-col rounded-lg border border-accent/15 bg-secondary/40 p-10 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-serif text-2xl text-text/85 mb-4">{c.title}</h3>
            <p className="text-base text-text/55 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
