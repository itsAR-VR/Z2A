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
    <SectionWrapper id="pricing" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] mb-4">
          Reserve with a deposit.{" "}
          <span className="text-[var(--color-accent-500)]">
            Pay the remainder after.
          </span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-300)] text-base md:text-lg max-w-2xl mb-12">
          Full refund if unsatisfied by end of Day 2, no questions asked. Refunds
          issued within 7 days.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {plans.map((plan, i) => (
          <RevealOnScroll key={plan.name} delay={i * 150}>
            <Card
              className={`h-full relative ${
                plan.featured
                  ? "border-[var(--color-accent-500)]/40 shadow-[0_0_24px_rgba(33,226,124,0.08)]"
                  : ""
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 right-6 bg-[var(--color-accent-500)]/10 border-[var(--color-accent-500)]/30 text-[var(--color-accent-500)]">
                  {plan.badge}
                </Badge>
              )}
              <h3 className="font-heading font-semibold text-lg text-[var(--color-text-100)] mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading font-bold text-4xl text-[var(--color-text-100)]">
                  {plan.price}
                </span>
                <span className="text-[var(--color-text-500)] text-sm">USD</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-300)]">Deposit today</span>
                  <span className="text-[var(--color-text-100)] font-medium">
                    {plan.deposit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-300)]">Remainder</span>
                  <span className="text-[var(--color-text-100)] font-medium">
                    {plan.remainder}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-500)] pt-2">
                  Authorized at check-in, captured after event for Day 1 attendees.
                </p>
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
        <div className="mt-8 max-w-3xl">
          <p className="text-sm text-[var(--color-text-500)]">
            Invoice/receipt available for professional reimbursement. Have a
            network code? Use it at checkout to access the $1,000 price. No cash
            payouts for pilot referrals.
          </p>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
