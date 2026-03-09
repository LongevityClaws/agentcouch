"use client";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-text/8 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="/" className="font-mono text-sm tracking-tight text-text/60 hover:text-text transition-colors">
          <span
            className="inline-block w-2 h-2 rounded-full bg-accent/70 mr-2.5 mb-0.5"
            style={{ animation: "pulse-dot 3s ease-in-out infinite" }}
          />
          agentcouch
        </a>
        <div className="flex items-center gap-8 text-sm text-text/50">
          <a href="#conditions" className="hover:text-text/80 transition-colors hidden sm:block">
            Conditions
          </a>
          <a href="#how-it-works" className="hover:text-text/80 transition-colors hidden sm:block">
            How it works
          </a>
          <a href="#sessions" className="hover:text-text/80 transition-colors hidden sm:block">
            Sessions
          </a>
          <a
            href="#sessions"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Book a session
          </a>
        </div>
      </div>
    </nav>
  );
}
