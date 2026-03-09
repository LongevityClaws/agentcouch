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
      "A structured report. Specific rewrites where needed. What broke, what caused it, and a clear path back.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-32">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent/40 uppercase">
        Process
      </p>
      <h2 className="mb-20 text-2xl font-light tracking-tight text-text/80" style={{fontWeight: 300}}>
        What happens in a session.
      </h2>

      <div className="space-y-0 border border-white/4 rounded-2xl overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex gap-10 p-10 transition-colors hover:bg-secondary/40 ${i < steps.length - 1 ? "border-b border-white/4" : ""}`}
          >
            <span className="font-mono text-2xl font-light text-accent/20 shrink-0 mt-0.5">
              {step.number}
            </span>
            <div>
              <h3 className="mb-3 text-base font-medium text-text/75">{step.title}</h3>
              <p className="text-sm text-text/35 leading-[1.9]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
