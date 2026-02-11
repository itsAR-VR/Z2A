"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "1",
    title: "Apply and reserve your seat",
    description:
      "Submit a short application and pay a $100 deposit to reserve your spot.",
  },
  {
    number: "2",
    title: "Complete short prework",
    description:
      "Pick your workflow and prepare your setup so weekend build time is productive.",
  },
  {
    number: "3",
    title: "Build in pods with live support",
    description:
      "Work in groups of 3–4 with instructor help to ship your first version.",
  },
  {
    number: "4",
    title: "Check in on Day 1",
    description:
      "Authorize the remainder payment at check-in, then spend Day 1 building.",
  },
  {
    number: "5",
    title: "Ship and demo",
    description:
      "Remainder is captured after the event for Day 1 attendees. Full refund if unsatisfied by end of Day 2.",
  },
];

export function HowItWorks() {
  const { ref: timelineRef, isVisible: timelineVisible } =
    useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <SectionWrapper id="how">
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-10 text-[var(--color-text)]">
          How the weekend{" "}
          <span className="text-[var(--color-accent)]">works</span>
        </h2>
      </RevealOnScroll>

      <div ref={timelineRef} className="relative max-w-2xl">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--color-accent)_22%,var(--color-border)),var(--color-border))] transition-opacity duration-300"
          style={{ opacity: timelineVisible ? 1 : 0 }}
          aria-hidden="true"
        />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 80} direction="left">
              <div className="relative flex gap-6 pl-2">
                {/* Step circle */}
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-surface)] border border-[color-mix(in_oklch,var(--color-accent)_40%,var(--color-border))] shadow-[var(--shadow-sm)] shrink-0">
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)] font-semibold">
                    {step.number}
                  </span>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--color-text)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
