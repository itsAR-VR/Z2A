"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const outcomes = [
  {
    number: "01",
    title: "A working automation system built during the weekend",
    description:
      "Not a toy demo. You build around your own workflow with guided support.",
  },
  {
    number: "02",
    title: "A deployment approach you can use right away",
    description:
      "Leave with a practical rollout path for your environment, not a theory deck.",
  },
  {
    number: "03",
    title: "A reliability checklist to keep quality high",
    description:
      "Know what to monitor and test so your system keeps working after launch.",
  },
];

export function Outcomes() {
  return (
    <SectionWrapper id="outcomes" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Designed so you leave with{" "}
          <span className="text-[var(--color-accent)]">working output.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          This is hands-on. You&apos;ll leave with assets you can keep improving
          on Monday: running workflows, a rollout plan, and reliability checks.
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
