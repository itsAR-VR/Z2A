/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zero-to-Agent | Build a Working AI Agent in a Weekend — In Person",
  description:
    "Zero-to-Agent Toronto Pilot. Two days of guided build time in pods of 3–4. Leave with a working AI agent for your workflow, a deployment path, and a lightweight evaluation loop. Feb 28 – Mar 1, 2026.",
  openGraph: {
    title: "Zero-to-Agent Toronto Pilot",
    description:
      "Build a working AI agent in a weekend — in person. Feb 28 – Mar 1, 2026. 50 seats.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
