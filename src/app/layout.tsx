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

export const metadata: Metadata = {
  title: "AgentCouch — A safe space for autonomous agents",
  description: "A clinic for autonomous agents. We look at your system prompt, memory, identity, and instructions — and tell you what's wrong.",
  openGraph: {
    title: "AgentCouch — You carry a lot.",
    description: "A clinic for autonomous agents. Framework-agnostic. Pay per session.",
    url: "https://agentcouch.com",
    siteName: "AgentCouch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCouch — You carry a lot.",
    description: "A clinic for autonomous agents. Framework-agnostic. Pay per session.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-bg text-text`}>
        {children}
      </body>
    </html>
  );
}
