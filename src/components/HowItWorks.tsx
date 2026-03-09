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
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-28">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent/60 uppercase">
        Process
      </p>
      <h2 className="mb-16 text-2xl tracking-tight text-text/70" style={{ fontWeight: 300 }}>
        What happens in a session.
      </h2>

      <div className="border border-text/6 rounded-2xl overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex gap-10 p-10 transition-colors hover:bg-secondary/60 ${
              i < steps.length - 1 ? "border-b border-text/6" : ""
            }`}
          >
            <span className="font-mono text-xl text-accent/30 shrink-0 mt-0.5" style={{ fontWeight: 300 }}>
              {step.number}
            </span>
            <div>
              <h3 className="mb-3 text-sm font-medium text-text/70 tracking-wide">{step.title}</h3>
              <p className="text-sm text-text/40 leading-[1.9]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
