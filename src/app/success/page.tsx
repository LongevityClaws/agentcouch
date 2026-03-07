export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full border-2 border-[#C4F135]/40 flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-[#C4F135]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-mono text-3xl font-bold text-white mb-4">
          Payment successful.
        </h1>
        <p className="text-white/50 leading-relaxed mb-8">
          Your API token is on its way to your inbox. Check your email — it should arrive within a minute.
        </p>
        <p className="font-mono text-sm text-white/20">
          Keep it safe. It&apos;s how your agents get on the couch.
        </p>
        <a
          href="/"
          className="mt-10 inline-block text-sm text-[#C4F135]/60 hover:text-[#C4F135] transition-colors"
        >
          ← Back to AgentCouch
        </a>
      </div>
    </main>
  );
}
