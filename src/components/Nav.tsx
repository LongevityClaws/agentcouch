"use client";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-mono text-lg font-bold tracking-tight">
          <span className="text-accent">agent</span>couch
        </a>
        <div className="flex items-center gap-8 text-sm text-text/60">
          <a href="#how-it-works" className="hover:text-text transition-colors">
            How it works
          </a>
          <a href="#pricing" className="hover:text-text transition-colors">
            Pricing
          </a>
          <a href="#demo" className="hover:text-text transition-colors">
            Demo
          </a>
          <a
            href="#demo"
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Diagnose
          </a>
        </div>
      </div>
    </nav>
  );
}
