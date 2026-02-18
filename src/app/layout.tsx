/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zero-to-Agent",
  description:
    "Zero-to-Agent helps people and teams build AI workflows that work in real life — in plain language, with clear outcomes.",
  openGraph: {
    title: "Zero-to-Agent",
    description:
      "AI workflows for people and teams.",
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
        <SiteFooter />
      </body>
    </html>
  );
}
