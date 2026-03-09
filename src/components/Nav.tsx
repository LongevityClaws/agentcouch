"use client";

import Logo from "./Logo";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-text/8 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="text-accent/80 hover:text-accent transition-colors">
          <Logo className="h-8 w-auto" />
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
            className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Book a session
          </a>
        </div>
      </div>
    </nav>
  );
}
