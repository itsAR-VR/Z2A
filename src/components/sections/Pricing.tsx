"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const plans = [
  {
    name: "List Price",
    price: "$1,500",
    deposit: "$100",
    remainder: "$1,400",
    badge: null,
    featured: false,
  },
  {
    name: "Network Code",
    price: "$1,000",
    deposit: "$100",
    remainder: "$900",
    badge: "Save $500",
    featured: true,
  },
];

export function Pricing() {
  return (
    <SectionWrapper id="pricing">
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Reserve with a deposit.{" "}
          <span className="text-[var(--color-accent)]">
            Pay the remainder after.
          </span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          Pay a $100 deposit to reserve your seat. If you&apos;re unsatisfied by
          the end of Day 2, we&apos;ll refund you in full. Refunds are issued within
          7 days.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {plans.map((plan, i) => (
          <RevealOnScroll key={plan.name} delay={i * 150}>
            <Card
              className={`h-full relative ${
                plan.featured
                  ? "border-[color-mix(in_oklch,var(--color-accent)_40%,var(--color-border-strong))] shadow-[var(--shadow-md)]"
                  : ""
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 right-6 border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] text-[var(--color-accent)]">
                  {plan.badge}
                </Badge>
              )}
              <h3 className="font-heading font-semibold text-lg text-[var(--color-text)] mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading font-bold text-4xl text-[var(--color-text)]">
                  {plan.price}
                </span>
                <span className="text-[var(--color-text-faint)] text-sm">USD</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Deposit today</span>
                  <span className="text-[var(--color-text)] font-medium">
                    {plan.deposit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Remainder</span>
                  <span className="text-[var(--color-text)] font-medium">
                    {plan.remainder}
                  </span>
                </div>
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-[var(--color-text-faint)]">
                    The remainder is authorized at check-in and captured after the
                    event for Day 1 attendees.
                  </p>
                  {plan.featured && (
                    <p className="text-xs text-[var(--color-text-faint)]">
                      Network codes discount the remainder only. The deposit stays $100.
                    </p>
                  )}
                </div>
              </div>

              <Button
                href="/apply"
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full"
              >
                Apply / Reserve Seat
              </Button>
            </Card>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={400}>
        <div className="mt-10 max-w-4xl">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
            <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
              Reimbursement and referrals
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Invoice/receipt is available for professional reimbursement. Network
              codes are discount-only for this pilot (no cash payouts).
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
