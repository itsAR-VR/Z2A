"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
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
    <SectionWrapper id="outcomes" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Designed so you leave with{" "}
          <span className="text-[var(--color-accent)]">more than notes.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          This is for hands-on builders. You’ll leave with artifacts you can keep
          iterating on Monday, not a slide deck.
        </p>
      </RevealOnScroll>

      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] overflow-hidden">
        <ol className="grid grid-cols-1 md:grid-cols-3">
          {outcomes.map((outcome, i) => (
            <li
              key={outcome.number}
              className="border-t border-[var(--color-border)] md:border-t-0 md:border-l first:border-l-0"
            >
              <RevealOnScroll delay={i * 80}>
                <div className="p-6 md:p-7">
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)] block">
                    {outcome.number}
                  </span>
                  <h3 className="mt-3 font-heading font-semibold text-[15px] md:text-lg text-[var(--color-text)]">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                    {outcome.description}
                  </p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
}
