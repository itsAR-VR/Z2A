"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Accordion } from "@/components/Accordion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const faqItems = [
  {
    question: "What's the refund policy?",
    answer:
      "If you're unsatisfied by the end of Day 2, we'll issue a full refund. Refunds are processed within 7 days.",
  },
  {
    question: "How does the remainder payment work?",
    answer:
      "You authorize the remainder at check-in. It is captured after the event for Day 1 attendees.",
  },
  {
    question: "Who is this for?",
    answer:
      "PMs, operators, and builder-minded teams who want to automate recurring work. You should be comfortable building hands-on.",
  },
  {
    question: "Do I need to be an engineer?",
    answer:
      "No. You do need to be comfortable building hands-on. Pods are structured to support mixed technical backgrounds.",
  },
  {
    question: "Can my employer reimburse this?",
    answer:
      "Yes. We provide invoices and receipts suitable for professional development reimbursement.",
  },
  {
    question: "Where is it?",
    answer:
      "Toronto. We share the exact venue after your deposit is completed.",
  },
  {
    question: "What if I already have an agent?",
    answer:
      "You'll refine it with a deployment path and evaluation loop, or build a new use case.",
  },
  {
    question: "Can I transfer my seat?",
    answer:
      "Yes. Transfers are allowed up to 7 days before the event.",
  },
  {
    question: "Is there alcohol or afterparties?",
    answer: "No alcohol. Professional, focused environment.",
  },
  {
    question: "What if I can't attend Day 2?",
    answer:
      "Contact us in advance. Refund decisions still follow the Day 2 policy.",
  },
  {
    question: "Is there a remote option?",
    answer:
      "Not for the pilot. This is intentionally in-person.",
  },
];

export function FAQ() {
  const confidenceFacts = [
    "Applications open now",
    "50 seats · Toronto",
    "$100 deposit via Stripe",
    "Full refund by end of Day 2",
  ];

  return (
    <SectionWrapper id="faq" alt>
      <RevealOnScroll>
        <h2 className="mx-auto max-w-3xl text-center font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-8 text-[var(--color-text)]">
          Frequently asked{" "}
          <span className="text-[var(--color-accent)]">questions</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="max-w-3xl mx-auto mb-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-4">
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
            Quick confidence check
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {confidenceFacts.map((fact) => (
              <span
                key={fact}
                className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-muted)]"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={140}>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
