"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Accordion } from "@/components/Accordion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const faqItems = [
  {
    question: "I can learn this for free online. Why pay?",
    answer:
      "You can learn the pieces for free. You’re paying for speed and shipped output: two focused in-person days, live debugging, pod accountability, and a working agent demo by Day 2. Most people don’t lack information. They lack a structure that gets them to finished work.",
  },
  {
    question: "I’m not technical. Will I be lost?",
    answer:
      "You don’t need to be a software engineer, but you do need to be comfortable following step-by-step instructions in a code editor. We provide clear prework, starter scaffolds, and live support in pods of 5 so you’re not stuck alone.",
  },
  {
    question: "Will this actually help my job?",
    answer:
      "That’s the point of the weekend. You leave with a working agent, a deployment path, and an evaluation workflow you can reuse with your team. We don’t promise promotions or guaranteed outcomes. We do help you ship faster and scope agent work realistically.",
  },
  {
    question: "How do I know this isn’t a scam?",
    answer:
      "Healthy skepticism is fair. We keep this concrete: in-person Toronto workshop, public agenda, explicit payment terms through Stripe, and full refund by end of Day 2 if you’re unsatisfied. No hype claims, no job guarantees, and no vague “AI magic” promises.",
  },
  {
    question: "What if I’m busy and can’t commit much time?",
    answer:
      "The format is intentionally short: one weekend, around six hours per day. If you’re overloaded right now, wait for another cohort. If you’re tired of postponing this, blocking one focused weekend is the fastest path to a shipped first version.",
  },
  {
    question: "Can my company reimburse this?",
    answer:
      "Many employers reimburse professional development. We provide an invoice and receipt suitable for reimbursement and keep the workshop description practical so finance teams can review it quickly.",
  },
  {
    question: "Why in-person instead of Zoom?",
    answer:
      "Because the promise is a shipped outcome, not passive watching. In person gives you faster setup help, real-time debugging, and pod accountability. That compression is hard to reproduce on Zoom, especially if your goal is to leave with something running.",
  },
];

export function FAQ() {
  const confidenceFacts = [
    "Applications open now",
    "50 seats · Toronto",
    "$100 deposit via Stripe",
    "Full refund by end of Day 2",
    "Pods of 5",
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
