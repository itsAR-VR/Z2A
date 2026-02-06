"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const reasons = [
  {
    icon: "⚡",
    title: "Live support to unblock quickly",
    description:
      "When you get stuck, an instructor is right there — no waiting for forum replies or scheduling calls.",
  },
  {
    icon: "👥",
    title: "Pods of 3–4 for momentum",
    description:
      "Small groups keep you accountable and moving. You'll build alongside people solving similar problems.",
  },
  {
    icon: "🎯",
    title: "Clear scope for a working demo",
    description:
      "Designed for a working demo in ~12 hours. You won't leave with just notes — you'll leave with a system.",
  },
];

export function Why() {
  return (
    <SectionWrapper id="why">
      <RevealOnScroll>
        <h2 className="font-heading font-semibold text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] mb-4">
          The hard part isn&apos;t knowing{" "}
          <span className="text-[var(--color-accent-500)]">— it&apos;s finishing.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-300)] text-base md:text-lg max-w-2xl mb-12">
          Attendees leave knowing how to build a production-ready enterprise-grade
          workflow that leverages AI agents to repeatably automate work.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason, i) => (
          <RevealOnScroll key={reason.title} delay={i * 100}>
            <Card className="h-full">
              <div className="text-3xl mb-4">{reason.icon}</div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-[var(--color-text-100)]">
                {reason.title}
              </h3>
              <p className="text-[var(--color-text-300)] text-sm leading-relaxed">
                {reason.description}
              </p>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
