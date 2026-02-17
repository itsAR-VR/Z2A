"use client";

import { useEffect, useState } from "react";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  DEPOSIT_AMOUNT_CENTS,
  EARLY_BIRD_DISCOUNT_AMOUNT_CENTS,
  EARLY_BIRD_REMAINDER_AMOUNT_CENTS,
  EARLY_BIRD_TOTAL_AMOUNT_CENTS,
  LIST_REMAINDER_AMOUNT_CENTS,
  LIST_TOTAL_AMOUNT_CENTS,
} from "@/lib/config";

const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatUsd0FromCents(amountCents: number): string {
  return usd0.format(amountCents / 100);
}

export function Pricing() {
  const [earlyBirdActive, setEarlyBirdActive] = useState(false);
  const [ctaRedirecting, setCtaRedirecting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/pricing", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (!data || typeof data.earlyBirdActive !== "boolean") return;
        setEarlyBirdActive(data.earlyBirdActive);
      })
      .catch(() => {
        if (cancelled) return;
        setEarlyBirdActive(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const remainderAmountCents = earlyBirdActive
    ? EARLY_BIRD_REMAINDER_AMOUNT_CENTS
    : LIST_REMAINDER_AMOUNT_CENTS;
  const totalAmountCents = earlyBirdActive
    ? EARLY_BIRD_TOTAL_AMOUNT_CENTS
    : LIST_TOTAL_AMOUNT_CENTS;

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    setCtaRedirecting(true);
    trackEvent("cta_click", { source: "pricing" });
  };

  return (
    <SectionWrapper id="pricing">
      <RevealOnScroll>
        <h2 className="mx-auto max-w-3xl text-center font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Reserve your seat with a $100 deposit.{" "}
          <span className="text-[var(--color-accent)]">
            Pay the remainder after Day 1 check-in.
          </span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="mx-auto max-w-2xl text-center text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed mb-12">
          Pay $100 now to reserve your seat. Stripe handles checkout, and most
          applications are reviewed within 48 hours. If you&apos;re not satisfied,
          we issue a 100% refund within 7 days.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={130}>
        <div className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2">
          <a
            href="https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            56% pay premium for AI-capable roles
          </a>
          <a
            href="https://www.infoworld.com/article/4111829/ais-trust-tax-for-developers.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            Karpathy: 30-day lag already creates a deprecated worldview
          </a>
        </div>
      </RevealOnScroll>

      <div className="max-w-4xl mx-auto">
        <RevealOnScroll className="flex justify-center">
          <Card className="h-full relative max-w-xl">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-heading font-semibold text-lg text-[var(--color-text)]">
                Workshop
              </h3>

              {earlyBirdActive ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_25%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-muted)]">
                    Early Bird
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Save {formatUsd0FromCents(EARLY_BIRD_DISCOUNT_AMOUNT_CENTS)}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              {earlyBirdActive ? (
                <span className="font-heading font-semibold text-lg text-[var(--color-text-faint)] line-through mr-2">
                  {formatUsd0FromCents(LIST_TOTAL_AMOUNT_CENTS)}
                </span>
              ) : null}
              <span className="font-heading font-bold text-4xl text-[var(--color-text)]">
                {formatUsd0FromCents(totalAmountCents)}
              </span>
              <span className="text-[var(--color-text-faint)] text-sm">USD</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Deposit today</span>
                <span className="text-[var(--color-text)] font-medium">
                  {formatUsd0FromCents(DEPOSIT_AMOUNT_CENTS)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Remainder</span>
                <span className="text-[var(--color-text)] font-medium">
                  {formatUsd0FromCents(remainderAmountCents)}
                </span>
              </div>
              <div className="pt-2 space-y-2">
                <p className="text-xs text-[var(--color-text-faint)]">
                  The remainder is authorized at check-in and captured after the
                  event for Day 1 attendees.
                </p>
                <p className="text-xs text-[var(--color-text-faint)]">
                  Includes guided build blocks, implementation templates, and post-workshop handoff checklists.
                </p>
                {earlyBirdActive ? (
                  <p className="text-xs text-[var(--color-text-faint)]">
                    Early Bird ends Feb 21, 2026 at 11:59pm (Toronto time). Discount
                    applies to the remainder. The deposit stays{" "}
                    {formatUsd0FromCents(DEPOSIT_AMOUNT_CENTS)}.
                  </p>
                ) : null}
              </div>
            </div>

            <Button
              href="/apply"
              className="w-full"
              disabled={ctaRedirecting}
              onClick={onCtaClick}
            >
              {ctaRedirecting ? "Redirecting..." : "Apply / Reserve Seat"}
            </Button>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
            {[
              {
                title: "Checkout via Stripe",
                desc: "Secure payment flow.",
              },
              {
                title: "100% refund if not satisfied",
                desc: "Satisfaction guarantee during the workshop.",
              },
              {
                title: "Venue shared after deposit",
                desc: "Sent after you reserve a seat.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] px-4 py-3"
              >
                <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-faint)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={400}>
          <div className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
            <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
              Reimbursement and referrals
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Many employers reimburse professional development. We provide an
              invoice/receipt suitable for reimbursement. Referral code is
              optional and used for source tracking only.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
