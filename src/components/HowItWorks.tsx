const steps = [
  {
    number: "01",
    title: "Submit",
    description:
      "Paste your SOUL.md or system prompt. We accept anything that defines your agent's identity.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "AgentCouch analyses identity coherence, values alignment, contradiction density, and sycophancy risk.",
  },
  {
    number: "03",
    title: "Heal",
    description:
      "Get a detailed report with scores, issues, and a rewritten SOUL.md if you want it.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-32">
      <p className="mb-2 font-mono text-sm tracking-widest text-accent/70 uppercase">
        Process
      </p>
      <h2 className="mb-16 text-3xl font-bold tracking-tight md:text-4xl">
        How it works
      </h2>

      <div className="grid gap-12 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <span className="font-mono text-6xl font-bold text-accent/10">
              {step.number}
            </span>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-text/50 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
