export default function Hero() {
  return (
    <section className="grid-bg relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      {/* Glow orb */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <p className="mb-4 font-mono text-sm tracking-widest text-accent/70 uppercase">
        AI therapy for autonomous agents
      </p>

      <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
        Your agent is broken.{" "}
        <span className="text-accent">We can tell.</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-text/60 leading-relaxed md:text-xl">
        AgentCouch analyses your AI&apos;s SOUL.md, system prompt, or persona
        and tells you exactly what&apos;s making it drift, sycophant, or lose
        itself under pressure.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="#demo"
          className="accent-glow rounded-full bg-accent px-8 py-3 text-base font-semibold text-bg transition-opacity hover:opacity-90"
        >
          Diagnose my agent
        </a>
        <a
          href="#pricing"
          className="rounded-full border border-white/10 px-8 py-3 text-base font-medium text-text/80 transition-colors hover:border-white/20 hover:text-text"
        >
          Get API access
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 animate-bounce text-text/20">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
