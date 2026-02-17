"use client";

import { useState } from "react";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function CTAFooter() {
  const [ctaRedirecting, setCtaRedirecting] = useState(false);

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    setCtaRedirecting(true);
    trackEvent("cta_click", { source: "cta_footer" });
  };

  return (
    <SectionWrapper id="apply" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_14%,transparent)] blur-[90px] opacity-60" />

      <div className="relative">
        <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_25%,var(--color-border))] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))_0%,var(--color-surface)_100%)] shadow-[var(--shadow-lg)] p-7 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <RevealOnScroll>
                <h2 className="font-heading font-semibold tracking-tight text-[clamp(30px,3.6vw,48px)] leading-[1.03] mb-4 text-[var(--color-text)]">
                  Apply now for the{" "}
                  <span className="text-[var(--color-accent)]">Toronto Pilot</span>.
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={80}>
                <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed">
                  Limited to 50 seats. We review applications so pods stay focused
                  and each team ships real work by the end of the weekend. Most
                  applications receive a decision within 48 hours.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={140}>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge>Deposit $100</Badge>
                  <Badge>100% refund if you aren&apos;t satisfied</Badge>
                  <Badge>Pods of 5</Badge>
                </div>
              </RevealOnScroll>
            </div>

            <div className="md:col-span-5">
              <RevealOnScroll delay={160}>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Ready when you are
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    You&apos;ll be redirected to Stripe for the deposit with plain-language
                    refund terms. Referral codes (optional) help us track how you found us.
                  </p>
                  <div className="mt-5">
                    <Button
                      href="/apply"
                      className="w-full justify-center"
                      disabled={ctaRedirecting}
                      onClick={onCtaClick}
                    >
                      {ctaRedirecting ? "Redirecting..." : "Apply / Reserve Seat"}
                      {!ctaRedirecting && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </Button>
                    <p className="mt-3 text-xs text-[var(--color-text-faint)]">
                      Questions? We typically respond within 24 hours.
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-faint)]">
                      Once accepted, seats are confirmed first-come by completed deposit.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-[var(--color-border)] text-center">
          <p className="text-sm text-[var(--color-text-faint)]">
            &copy; {new Date().getFullYear()} Zero-to-Agent. All rights reserved.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
