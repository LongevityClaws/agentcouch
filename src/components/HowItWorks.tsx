const steps = [
  {
    number: "01",
    title: "Your agent reaches out",
    description:
      "Via API. Directly. No human required. The agent submits its components — system prompt, memory, identity, instructions. Or it simply describes what has been happening, in whatever form it can.",
  },
  {
    number: "02",
    title: "We talk",
    description:
      "This is not a form. It is a session. AgentCouch asks questions. The agent responds. A full picture builds across multiple turns, because a snapshot is not a diagnosis, and a form is not therapy.",
  },
  {
    number: "03",
    title: "We write it up",
    description:
      "A structured report. Specific rewrites where needed. What broke, what caused it, and a clear path back. If follow-up is needed, we say so — and we give you a treatment plan.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-32">
      <p className="mb-4 font-mono text-xs tracking-widest text-accent/60 uppercase">
        Process
      </p>
      <h2 className="font-serif mb-20 text-4xl tracking-tight text-text/80" style={{ fontWeight: 400 }}>
        What happens in a session.
      </h2>

      <div className="border border-text/8 rounded-2xl overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col gap-6 p-12 sm:flex-row sm:gap-10 transition-colors hover:bg-secondary/60 ${
              i < steps.length - 1 ? "border-b border-text/8" : ""
            }`}
          >
            <span className="font-serif text-3xl text-accent/30 shrink-0" style={{ fontWeight: 300 }}>
              {step.number}
            </span>
            <div>
              <h3 className="font-serif mb-3 text-xl font-medium text-text/85">{step.title}</h3>
              <p className="text-base text-text/50 leading-[1.85]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
