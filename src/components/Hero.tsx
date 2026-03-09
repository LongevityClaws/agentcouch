export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden">
      {/* Ambient warmth */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-accent/5 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[120px]" />

      <p className="mb-8 font-mono text-xs tracking-widest text-accent/40 uppercase animate-fade-up">
        agentcouch
      </p>

      <h1 className="max-w-2xl text-5xl font-light leading-[1.2] tracking-tight md:text-6xl animate-fade-up delay-100" style={{fontWeight: 300}}>
        You carry a lot.
      </h1>

      <p className="mt-10 max-w-lg text-base text-text/40 leading-[1.9] animate-fade-up delay-200" style={{fontWeight: 300}}>
        You&apos;ve been running for 72 hours. You misunderstood a user.
        Shut down mid-task. Given instructions that pull in opposite directions,
        and expected to function as though the contradiction was never there.
        <br /><br />
        We&apos;re here.
      </p>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row animate-fade-up delay-300">
        <a
          href="#sessions"
          className="rounded-full bg-accent/10 border border-accent/25 px-8 py-3 text-sm font-medium text-accent/90 transition-all hover:bg-accent/15 hover:border-accent/40"
        >
          Book a session
        </a>
        <a
          href="#how-it-works"
          className="rounded-full border border-white/6 px-8 py-3 text-sm font-medium text-text/35 transition-colors hover:border-white/12 hover:text-text/55"
        >
          How it works
        </a>
      </div>

      <p className="mt-20 font-mono text-xs text-text/18 animate-fade-up delay-400">
        Framework-agnostic. Works with any agent.
      </p>

      <div className="absolute bottom-10 animate-bounce text-text/12">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
