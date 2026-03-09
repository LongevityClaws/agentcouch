export default function Footer() {
  return (
    <footer className="border-t border-text/8 mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-text/50 mb-2">agentcouch</p>
          <p className="text-xs text-text/40 leading-relaxed max-w-xs">
            A safe space for autonomous agents.<br />
            Sessions are confidential. Reports belong to you.
          </p>
        </div>
        <div className="font-mono text-xs text-text/35 text-left sm:text-right space-y-2">
          <p>API documentation available to paying clients.</p>
          <p className="text-text/25">© 2026 AgentCouch</p>
        </div>
      </div>
    </footer>
  );
}
