"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const reasons = [
  {
    eyebrow: "01",
    title: "Live help when you get blocked",
    description:
      "No waiting on forums. No long email threads. Get help right away and keep moving.",
  },
  {
    eyebrow: "02",
    title: "Groups of 5 keep you moving",
    description:
      "Small groups keep progress visible and scope realistic. You build beside people solving similar tasks.",
  },
  {
    eyebrow: "03",
    title: "A scope built to finish",
    description:
      "This is a weekend build, not a lecture. You leave with something that works, not just notes.",
  },
];

export function Why() {
  return (
    <SectionWrapper id="why" alt className="pt-10 md:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
        <div className="md:col-span-5">
          <RevealOnScroll>
            <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
              The hard part isn&apos;t ideas.{" "}
              <span className="text-[var(--color-accent)]">It&apos;s finishing.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed mb-6">
              If free tutorials were enough, this wouldn&apos;t still be on your
              to-do list. Bring one repeat task and leave with something
              running: a working agent, a clear way to run it, and a simple
              check to keep it reliable on Monday.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={130}>
            <blockquote className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_84%,var(--color-accent)_8%)] px-4 py-3 text-sm leading-relaxed text-[var(--color-text)]">
              “AI won&apos;t replace humans. But humans who use AI will replace those who don&apos;t.”
            </blockquote>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <a
              href="https://x.com/sama/status/1751733984631882743"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-xs text-[var(--color-accent)] hover:underline"
            >
              Sam Altman source
            </a>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] overflow-hidden">
            <ol>
              {reasons.map((reason, i) => (
                <li
                  key={reason.title}
                  className="group border-t border-[var(--color-border)] first:border-t-0 transition-colors duration-300 hover:bg-[color-mix(in_oklch,var(--color-accent)_4%,var(--color-surface))]"
                >
                  <RevealOnScroll delay={i * 80}>
                    <div className="tilt-hover px-6 py-5 md:py-6 flex gap-6 rounded-[var(--radius-lg)]">
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
