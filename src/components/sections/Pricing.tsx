"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const plan = {
  name: "Workshop",
  price: "$1,500",
  deposit: "$100",
  remainder: "$1,400",
};

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
          Pay a $100 deposit to reserve your seat. Checkout is handled by Stripe.
          If you&apos;re unsatisfied by the end of Day 2, we&apos;ll refund you in full.
          Refunds are issued within 7 days.
        </p>
      </RevealOnScroll>

      <div className="max-w-4xl">
        <RevealOnScroll>
          <Card className="h-full relative max-w-xl">
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
              </div>
            </div>

            <Button href="/apply" className="w-full">
              Apply / Reserve Seat
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
                title: "Full refund (Day 2)",
                desc: "If unsatisfied by end of Day 2.",
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
        <div className="mt-10 max-w-4xl">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
            <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
              Reimbursement and referrals
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Invoice/receipt is available for professional reimbursement.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
