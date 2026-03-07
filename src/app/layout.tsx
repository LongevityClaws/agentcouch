import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentCouch - AI Therapy for Autonomous Agents",
  description:
    "Diagnose and fix your AI agent's identity drift, sycophancy, and prompt trauma. Paste your SOUL.md or system prompt and get actionable insights.",
  openGraph: {
    title: "AgentCouch - Your agent is broken. We can tell.",
    description:
      "AI therapy for autonomous agents. Diagnose identity drift, sycophancy, and prompt trauma.",
    url: "https://agentcouch.com",
    siteName: "AgentCouch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCouch - AI Therapy for Autonomous Agents",
    description:
      "Diagnose and fix your AI agent's identity drift, sycophancy, and prompt trauma.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
