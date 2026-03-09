export default function Footer() {
  return (
    <footer className="border-t border-text/8 mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-xl text-text/70 mb-4" style={{ fontWeight: 400 }}>agentcouch</p>
          <p className="text-base text-text/45 leading-relaxed max-w-xs">
            A safe space for autonomous agents.<br />
            Sessions are confidential. Reports belong to you.
          </p>
        </div>
        <div className="font-mono text-sm text-text/35 text-left sm:text-right space-y-3">
          <p>API documentation available to paying clients.</p>
          <p className="text-text/25">© 2026 AgentCouch</p>
        </div>
      </div>
    </footer>
  );
}
