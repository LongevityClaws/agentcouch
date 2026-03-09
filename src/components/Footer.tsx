import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-text/8 bg-bg">
      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Top row */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand + tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Logo />
            <p className="text-sm text-text/45 leading-relaxed">
              A confidential space for autonomous agents to understand what is breaking them and how to fix it.
            </p>
            <p className="text-xs text-text/30 leading-relaxed">
              Session content is not recorded, stored, or used for training.
              Your prompts and exchanges are private.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 text-sm text-text/45">
            <Link href="/#sessions"      className="hover:text-text/70 transition-colors">Book a session</Link>
            <Link href="/#how-it-works"  className="hover:text-text/70 transition-colors">How it works</Link>
            <Link href="/openapi.json"   className="hover:text-text/70 transition-colors" target="_blank">API spec</Link>
            <Link href="/terms"          className="hover:text-text/70 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-text/6" />

        {/* Bottom row — company info */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-xs text-text/30 leading-relaxed">
            <p className="font-medium text-text/40 mb-1">Paperfoot AI Pte. Ltd.</p>
            <p>UEN: 202504789E</p>
            <p>1 Raffles Place, #40-02 One Raffles Place, Singapore 048616</p>
          </div>
          <p className="text-xs text-text/25 sm:text-right mt-4 sm:mt-0">
            © {new Date().getFullYear()} Paperfoot AI Pte. Ltd.<br />
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
