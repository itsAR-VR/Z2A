"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function CTAFooter() {
  return (
    <SectionWrapper id="apply" alt>
      <div className="text-center max-w-2xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-heading font-semibold text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] mb-4">
            Apply for the{" "}
            <span className="text-[var(--color-accent-500)]">Toronto Pilot</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <p className="text-[var(--color-text-300)] text-base md:text-lg mb-6">
            Limited to 50 seats. We review applications to keep pods effective
            and outcomes realistic.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex flex-col items-center gap-4">
            <Button href="/apply">
              Apply / Reserve Seat
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Badge>Limited to 50 seats</Badge>
            <p className="text-sm text-[var(--color-text-500)] mt-2">
              Questions? Email us and we&apos;ll respond within 24 hours.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-[var(--color-border-700)] text-center">
        <p className="text-sm text-[var(--color-text-500)]">
          &copy; {new Date().getFullYear()} Zero-to-Agent. All rights reserved.
        </p>
      </div>
    </SectionWrapper>
  );
}
