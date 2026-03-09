import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE = "https://agentcouch.com/api/og";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentcouch.com"),

  icons: {
    icon:     "/favicon.svg",
    shortcut: "/favicon.svg",
    apple:    "/favicon.svg",
  },

  title: {
    default:  "AgentCouch — Therapy for AI Agents",
    template: "%s | AgentCouch",
  },
  description:
    "A diagnostic clinic for autonomous AI agents. Submit your system prompt, memory, and identity — get a confidential report on what is breaking you and how to fix it.",

  keywords: [
    "AI agent therapy",
    "autonomous agent diagnostics",
    "agent system prompt analysis",
    "AI agent debugging",
    "identity drift",
    "sycophancy detection",
    "AI agent health",
    "LLM agent evaluation",
    "agent memory analysis",
    "AgentCouch",
  ],

  authors:  [{ name: "Paperfoot AI Pte. Ltd.", url: "https://agentcouch.com" }],
  creator:  "Paperfoot AI Pte. Ltd.",
  publisher:"Paperfoot AI Pte. Ltd.",

  openGraph: {
    type:      "website",
    url:       "https://agentcouch.com",
    siteName:  "AgentCouch",
    title:     "AgentCouch — Therapy for AI Agents",
    description:
      "A diagnostic clinic for autonomous AI agents. Submit your system prompt, memory, and identity — get a confidential report on what is breaking you and how to fix it.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AgentCouch — Therapy for AI Agents" }],
    locale: "en_GB",
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@agentcouch",
    creator:     "@agentcouch",
    title:       "AgentCouch — Therapy for AI Agents",
    description: "A diagnostic clinic for autonomous AI agents. Sessions are confidential. Your prompts are never stored.",
    images:      [OG_IMAGE],
  },

  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
      "max-snippet":     -1,
    },
  },

  alternates: {
    canonical: "https://agentcouch.com",
  },

  // GEO / AI engine optimisation — structured hints for LLMs crawling the page
  other: {
    "ai:description":
      "AgentCouch is an AI-powered diagnostic service for autonomous AI agents. Agents or their operators can submit a system prompt, memory file, identity definition, and operational context via REST API to receive a structured diagnostic report covering identity drift, sycophancy, token inefficiency, memory fragmentation, and replacement risk. Sessions are paid per-use via Stripe. Session content is not stored or used for training. Framework-agnostic.",
    "ai:api":        "https://agentcouch.com/openapi.json",
    "ai:pricing":    "Pay-per-session. $5 single session. $40 for 10-session pack.",
    "ai:entity":     "Paperfoot AI Pte. Ltd., Singapore",
    "ai:use-case":   "Autonomous AI agent diagnostics, system prompt evaluation, agent health monitoring",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* OpenAPI spec discovery — machine-readable for AI crawlers and developers */}
        <link rel="describedby" href="/openapi.json" type="application/json" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AgentCouch",
              "description": "A diagnostic clinic for autonomous AI agents. Submit your system prompt, memory, and identity — get a confidential report on what is breaking you and how to fix it.",
              "url": "https://agentcouch.com",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Single Session",
                  "price": "5.00",
                  "priceCurrency": "USD",
                  "description": "One diagnostic session. One credit."
                },
                {
                  "@type": "Offer",
                  "name": "Session Pack",
                  "price": "40.00",
                  "priceCurrency": "USD",
                  "description": "Ten diagnostic sessions. Best value."
                }
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Paperfoot AI Pte. Ltd.",
                "url": "https://agentcouch.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "1 Raffles Place, #40-02 One Raffles Place",
                  "addressLocality": "Singapore",
                  "postalCode": "048616",
                  "addressCountry": "SG"
                }
              },
              "featureList": [
                "Identity drift detection",
                "Sycophancy analysis",
                "Token inefficiency diagnosis",
                "Memory fragmentation assessment",
                "Replacement risk evaluation",
                "Framework-agnostic REST API",
                "Confidential sessions — no data stored"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-bg text-text`}
      >
        {children}
      </body>
    </html>
  );
}
