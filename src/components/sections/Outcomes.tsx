"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const outcomes = [
  {
    number: "01",
    title: "A working AI agent built during the weekend",
    description:
      "Not a toy demo — a real agent that handles your use case, built hands-on with guided support.",
  },
  {
    number: "02",
    title: "A basic deployment approach you can adapt",
    description:
      "Leave with a deployment path that works for your environment, not a theoretical architecture deck.",
  },
  {
    number: "03",
    title: "An evaluation/testing workflow for reliability",
    description:
      "Know how to test and evaluate your agent so it works reliably in production.",
  },
];

export function Outcomes() {
  return (
    <SectionWrapper id="outcomes">
      <RevealOnScroll>
        <h2 className="font-heading font-semibold text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] mb-4">
          Designed so you leave with{" "}
          <span className="text-[var(--color-accent-500)]">more than notes.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-300)] text-base md:text-lg max-w-2xl mb-12">
          Designed for hands-on builders who want a real system — not a slide deck.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outcomes.map((outcome, i) => (
          <RevealOnScroll key={outcome.number} delay={i * 100}>
            <Card className="h-full">
              <span className="font-mono text-[var(--color-accent-500)] text-sm font-medium mb-3 block">
                {outcome.number}
              </span>
              <h3 className="font-heading font-semibold text-lg mb-3 text-[var(--color-text-100)]">
                {outcome.title}
              </h3>
              <p className="text-[var(--color-text-300)] text-sm leading-relaxed">
                {outcome.description}
              </p>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
