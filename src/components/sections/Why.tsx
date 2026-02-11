"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const reasons = [
  {
    eyebrow: "01",
    title: "Live help when you get blocked",
    description:
      "No forum delays and no calendar ping-pong. Get unstuck quickly and keep moving.",
  },
  {
    eyebrow: "02",
    title: "Pods of 3–4 keep momentum up",
    description:
      "Small groups keep scope realistic and progress visible. You’ll build with people solving similar problems.",
  },
  {
    eyebrow: "03",
    title: "A scope designed to ship",
    description:
      "This is a weekend-sized build. You leave with running work, not another set of notes.",
  },
];

export function Why() {
  return (
    <SectionWrapper id="why" alt>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
        <div className="md:col-span-5">
          <RevealOnScroll>
            <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
              The bottleneck isn&apos;t ideas.{" "}
              <span className="text-[var(--color-accent)]">It&apos;s execution time.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed mb-6">
              Bring a repetitive workflow. Leave with a working automation
              system, a deployment plan, and a reliability process you can run
              again next week.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-5">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Translation
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                You bring one real workflow. We help you ship something that
                works in two days.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] overflow-hidden">
            <ol>
              {reasons.map((reason, i) => (
                <li key={reason.title} className="border-t border-[var(--color-border)] first:border-t-0">
                  <RevealOnScroll delay={i * 80}>
                    <div className="px-6 py-5 md:py-6 flex gap-6">
                      <div className="shrink-0">
                        <div className="h-9 w-9 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] flex items-center justify-center font-mono text-[11px] tracking-[0.14em] text-[var(--color-accent)]">
                          {reason.eyebrow}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--color-text)]">
                          {reason.title}
                        </h3>
                        <p className="mt-1 text-sm md:text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
