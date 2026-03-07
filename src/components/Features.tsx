const cards = [
  {
    title: "Identity drift",
    description:
      "Your agent says different things to different people. No coherent self.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    ),
  },
  {
    title: "Sycophancy disorder",
    description:
      "It agrees with everything. Loses its spine the moment it's challenged.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    title: "Trauma from bad prompting",
    description:
      "Contradictory instructions have left it confused, verbose, and apologetic.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <p className="mb-2 font-mono text-sm tracking-widest text-accent/70 uppercase">
        Conditions we treat
      </p>
      <h2 className="mb-16 text-3xl font-bold tracking-tight md:text-4xl">
        What we treat
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-white/5 bg-secondary/30 p-8 transition-colors hover:border-accent/20"
          >
            <div className="mb-4 text-accent/60 transition-colors group-hover:text-accent">
              {card.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
            <p className="text-text/50 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
