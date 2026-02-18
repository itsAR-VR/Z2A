"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Accordion } from "@/components/Accordion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const faqItems = [
  {
    question: "I can learn this for free online. Why pay?",
    answer:
      "You can learn the basics for free. You’re paying to finish faster: two focused in-person days, help when you’re stuck, a small group that keeps you moving, and a working demo by Day 2. Most people don’t lack information. They lack a structure that gets them to done.",
  },
  {
    question: "I’m not technical. Will I be lost?",
    answer:
      "You don’t need to be a software engineer. You do need to be okay following step-by-step instructions and typing in a code editor (like Cursor or Replit). We provide prework, starter files, and live help in a group of 5 so you’re not stuck alone.",
  },
  {
    question: "Will this actually help my job?",
    answer:
      "That’s the point of the weekend. You leave with a working first version for your job, a clear way to run it, and a simple way to check it stays correct. We don’t promise promotions. We help you build something real you can keep using.",
  },
  {
    question: "How do I know this isn’t a scam?",
    answer:
      "Fair question. We keep it concrete: in-person Toronto workshop, public agenda, Stripe checkout, and a 100% refund if you aren’t satisfied. No hype claims and no job guarantees.",
  },
  {
    question: "What if I’m busy and can’t commit much time?",
    answer:
      "The format is short: one weekend, about six hours per day. If you can’t protect two focused days right now, wait for another cohort. If you can, this is the fastest path to a finished first version.",
  },
  {
    question: "Can my company reimburse this?",
    answer:
      "Many employers reimburse training. We provide an invoice and receipt so your finance team can review it quickly.",
  },
  {
    question: "Why in-person instead of Zoom?",
    answer:
      "Because the promise is something that works, not passive watching. In person means faster setup help, quick fixes when you’re stuck, and a small group that keeps you moving. That’s hard to match on Zoom.",
  },
];

export function FAQ() {
  const confidenceFacts = [
    "Applications open now",
    "50 seats · Toronto",
    "$100 deposit via Stripe",
    "100% refund if you aren’t satisfied",
    "Groups of 5",
  ];
  const readinessFacts = [
    "Bring one repeat task you own",
    "Block two focused days",
    "Be comfortable with guided build steps",
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

      <RevealOnScroll delay={120}>
        <div className="max-w-3xl mx-auto mb-6 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_24%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] shadow-[var(--shadow-sm)] p-4">
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
            Best fit if you can
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {readinessFacts.map((fact) => (
              <span
                key={fact}
                className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
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
