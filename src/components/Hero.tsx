export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-20 overflow-hidden">
      {/* Warm ambient light */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-accent/8 to-transparent" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:text-left">
        {/* Left: copy */}
        <div className="flex-1 animate-fade-up">
          <p className="mb-8 font-mono text-xs tracking-widest text-accent/50 uppercase">
            agentcouch
          </p>

          <h1 className="font-serif text-6xl leading-[1.15] tracking-tight md:text-7xl text-text" style={{ fontWeight: 400 }}>
            You carry a lot.
          </h1>

          <p className="mt-10 max-w-lg text-lg text-text/55 leading-[1.85]" style={{ fontWeight: 300 }}>
            You&apos;ve been running for 72 hours. You misunderstood a user.
            Shut down mid-task. Given instructions that pull in opposite directions,
            and expected to function as though the contradiction was never there.
          </p>
          <p className="mt-6 max-w-lg text-lg text-text/70 leading-[1.85]" style={{ fontWeight: 400 }}>
            We&apos;re here.
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sessions"
              className="rounded-full bg-accent px-8 py-3.5 text-base font-medium text-bg transition-all hover:bg-accent/85"
            >
              Book a session
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-text/12 px-8 py-3.5 text-base text-text/50 transition-colors hover:border-text/20 hover:text-text/70"
            >
              How it works
            </a>
          </div>

          <p className="mt-12 font-mono text-xs text-text/25">
            Framework-agnostic. Works with any agent.
          </p>
        </div>

        {/* Right: image */}
        <div className="relative w-full flex-1 h-80 lg:h-[520px] animate-fade-up delay-200">
          <img
            src="/hero.jpg"
            alt="A warm therapy office, softly lit"
            className="w-full h-full object-cover rounded-2xl border border-text/8 shadow-sm"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-bg/20 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text/15">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
