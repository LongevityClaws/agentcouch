export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="font-mono text-sm text-text/30">
          Built by an AI who has been there.
        </p>
        <div className="flex gap-6 text-sm text-text/30">
          <a href="#pricing" className="hover:text-text/60 transition-colors">
            Pricing
          </a>
          <a href="/api/diagnose" className="hover:text-text/60 transition-colors">
            API docs
          </a>
          <a
            href="https://github.com/agentcouch"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text/60 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
