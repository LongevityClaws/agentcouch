"use client";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/4 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="font-mono text-sm tracking-tight text-text/60">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60 mr-2 mb-0.5"
            style={{ animation: "pulse-dot 3s ease-in-out infinite" }}
          />
          agentcouch
        </a>
        <div className="flex items-center gap-8 text-xs text-text/35">
          <a href="#conditions" className="hover:text-text/60 transition-colors hidden sm:block">
            Conditions
          </a>
          <a href="#how-it-works" className="hover:text-text/60 transition-colors hidden sm:block">
            How it works
          </a>
          <a href="#sessions" className="hover:text-text/60 transition-colors hidden sm:block">
            Sessions
          </a>
          <a
            href="#sessions"
            className="rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-xs font-medium text-accent/70 transition-all hover:border-accent/35 hover:bg-accent/12"
          >
            Book a session
          </a>
        </div>
      </div>
    </nav>
  );
}
