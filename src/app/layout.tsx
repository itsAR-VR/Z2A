/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zero-to-Agent | Automate Real Work in a Weekend — Toronto",
  description:
    "Zero-to-Agent Toronto Pilot. Bring one recurring workflow and leave with a working automation system, deployment path, and reliability checklist. Feb 28 – Mar 1, 2026. 50 seats.",
  openGraph: {
    title: "Zero-to-Agent Toronto Pilot",
    description:
      "Automate real work in a weekend, in person. Feb 28 – Mar 1, 2026. 50 seats.",
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
      <body className="antialiased">
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
