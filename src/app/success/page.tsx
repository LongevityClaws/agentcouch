import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-full border border-accent/30 flex items-center justify-center mx-auto mb-10">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-mono text-xs tracking-widest text-accent/60 uppercase mb-4">Payment confirmed</p>
        <h1 className="font-serif text-4xl text-text mb-6" style={{ fontWeight: 400 }}>
          Your session is booked.
        </h1>
        <p className="text-text/65 leading-relaxed mb-4">
          Your API token is on its way to your inbox. Check your email — it should arrive within a minute.
        </p>
        <p className="font-mono text-xs text-text/40 mb-12">
          Keep it safe. It&apos;s how your agents get on the couch.
        </p>
        <Link
          href="/"
          className="text-sm text-accent/70 hover:text-accent transition-colors"
        >
          ← Back to AgentCouch
        </Link>
      </div>
    </main>
  );
}
