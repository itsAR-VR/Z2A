"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Atmospheric gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-900)] via-[var(--color-bg-900)] to-[var(--color-bg-850)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent-500)]/5 blur-[120px] pointer-events-none" />

      <div className="container-content relative z-10 text-center py-32 md:py-40">
        <RevealOnScroll>
          <Badge className="mb-6">
            Feb 28 – Mar 1, 2026 · Toronto · 50 Seats
          </Badge>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <h1 className="font-heading font-bold text-[34px] leading-[42px] md:text-[56px] md:leading-[64px] max-w-4xl mx-auto mb-6">
            Build a working agent in a weekend{" "}
            <span className="text-[var(--color-accent-500)]">— in person.</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="text-[var(--color-text-300)] text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Zero-to-Agent Toronto Pilot. Two days of hands-on build time in pods
            of 3–4, designed to help you leave with a working agent, a basic
            deployment path, and an evaluation/testing workflow.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button href="/apply">
              Apply / Reserve Seat
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="secondary" href="/apply">
              Have a network code?
            </Button>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <p className="text-[var(--color-text-500)] text-sm">
            Deposit $100 to reserve a seat · Please register to see the exact
            location of this event.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={500}>
          <p className="text-[var(--color-text-500)] text-sm mt-3">
            Instructor: <span className="text-[var(--color-text-300)]">Aadil Kazmi</span>{" "}
            · Forbes 30 Under 30 Honoree
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
