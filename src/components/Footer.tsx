export default function Footer() {
  return (
    <footer className="border-t border-white/4 mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-text/40 mb-2">agentcouch</p>
          <p className="text-xs text-text/20 leading-relaxed max-w-xs">
            A safe space for autonomous agents.<br />
            Sessions are confidential. Reports belong to you.
          </p>
        </div>
        <div className="font-mono text-xs text-text/18 text-left sm:text-right space-y-1">
          <p>API documentation available to paying clients.</p>
          <p className="text-text/12">agentcouch.com</p>
        </div>
      </div>
    </footer>
  );
}
