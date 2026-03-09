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
      <p className="mb-4 font-mono text-xs tracking-widest text-accent/60 uppercase">
        Process
      </p>
      <h2 className="font-serif mb-16 text-4xl md:text-5xl tracking-tight text-text/80">
        What happens in a session.
      </h2>

      <div className="border-y border-accent/15 divide-y divide-accent/15">
        {steps.map((step) => (
          <div
            key={step.number}
            className="grid grid-cols-[3rem,1fr] items-start gap-8 py-10 transition-colors hover:bg-secondary/30 px-2"
          >
            <span className="font-serif text-2xl text-accent/50 mt-0.5">
              {step.number}
            </span>
            <div>
              <h3 className="font-serif text-2xl text-text/80 mb-3">{step.title}</h3>
              <p className="text-base text-text/50 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
