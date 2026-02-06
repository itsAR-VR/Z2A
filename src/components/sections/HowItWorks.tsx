"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const steps = [
  {
    number: "1",
    title: "Apply and reserve your seat",
    description: "Submit a short application and pay a $100 deposit to lock in your spot.",
  },
  {
    number: "2",
    title: "Complete short prework",
    description: "Pick your use case and set up your dev environment before the weekend.",
  },
  {
    number: "3",
    title: "Build in pods with guided support",
    description: "Work in groups of 3–4 with live instructor guidance to build your agent.",
  },
  {
    number: "4",
    title: "Check in on Day 1",
    description: "Authorize the remainder payment at check-in. Build all day.",
  },
  {
    number: "5",
    title: "Ship and demo",
    description: "Remainder is captured after the event for Day 1 attendees. Full refund if unsatisfied by end of Day 2.",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper id="how" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] mb-12">
          How the weekend{" "}
          <span className="text-[var(--color-accent-500)]">works</span>
        </h2>
      </RevealOnScroll>

      <div className="relative max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border-700)]" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 80} direction="left">
              <div className="relative flex gap-6 pl-2">
                {/* Step circle */}
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-900)] border-2 border-[var(--color-accent-500)] shrink-0">
                  <span className="font-mono text-xs text-[var(--color-accent-500)] font-bold">
                    {step.number}
                  </span>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--color-text-100)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-text-300)] text-sm leading-relaxed">
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
