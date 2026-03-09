import Link from "next/link";

// Sofa icon only — no wordmark text to avoid wrapping issues in footer
function SofaIcon() {
  return (
    <svg
      viewBox="0 75 390.672 225"
      className="h-6 w-auto fill-accent/60"
      aria-label="AgentCouch"
    >
      <path d="M83.934,195.093l0.004,0.285l0.008,17.451h222.781l0.012-17.709c0.559-20.158,13.303-36.898,31.126-43.34c-9.385-33.271-39.935-57.668-76.21-57.668H129.018c-36.274,0-66.825,24.396-76.21,57.668C70.631,158.22,83.375,174.956,83.934,195.093z"/>
      <path d="M354.19,161.489c-19.806,0-35.911,15.783-36.456,35.457l-0.014,28.432H72.95l-0.013-28.432c-0.545-19.674-16.651-35.457-36.456-35.457C16.333,161.489,0,177.823,0,197.972c0,20.148,16.333,36.48,36.481,36.48c0.645,0,1.234-0.018,1.87-0.051c0,0,0.021,20.27,0.021,20.639c0,16.383,13.281,29.662,29.662,29.662h6.533v8.561c0,1.82,1.477,3.297,3.297,3.297h21.941c1.82,0,3.297-1.477,3.297-3.297v-8.561h184.465v8.561c0,1.82,1.477,3.297,3.297,3.297h21.941c1.82,0,3.297-1.477,3.297-3.297v-8.561h6.516c16.383,0,29.662-13.279,29.662-29.662c0-0.148-0.01-0.295-0.012-0.443v-20.195c0.637,0.033,1.276,0.051,1.921,0.051c20.147,0,36.481-16.332,36.481-36.48C390.672,177.823,374.338,161.489,354.19,161.489z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-text/8 bg-bg">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-6">

        {/* Zone 1 — icon + nav */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <SofaIcon />
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-text/45">
            <Link href="/#sessions"      className="hover:text-text/70 transition-colors">Book a session</Link>
            <Link href="/#how-it-works"  className="hover:text-text/70 transition-colors">How it works</Link>
            <Link href="/openapi.json"   className="hover:text-text/70 transition-colors" target="_blank">API spec</Link>
            <Link href="/terms"          className="hover:text-text/70 transition-colors">Terms &amp; Conditions</Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/15" />

        {/* Zone 2 — privacy + legal in one row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-serif italic text-accent/70 text-[13px]">
            What happens on the couch stays on the couch.
          </p>
          <p className="text-[11px] text-text/30 sm:text-right leading-relaxed">
            © {new Date().getFullYear()} Paperfoot AI Pte. Ltd. · UEN: 202504789E · 32 Pekin Street, Singapore
          </p>
        </div>

      </div>
    </footer>
  );
}
