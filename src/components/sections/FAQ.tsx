"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Accordion } from "@/components/Accordion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const faqItems = [
  {
    question: "Who is this for?",
    answer:
      "PMs and operators who want to ship a working agent with guidance. You should be comfortable building hands-on.",
  },
  {
    question: "Do I need to be an engineer?",
    answer:
      "You should be comfortable building hands-on; pods are structured to support different skill levels.",
  },
  {
    question: "What if I already have an agent?",
    answer:
      "You'll refine it with a deployment path and evaluation loop, or build a new use case.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "Full refund if unsatisfied by end of Day 2. No questions asked. Refunds issued within 7 days.",
  },
  {
    question: "How does the remainder payment work?",
    answer:
      "You authorize the remainder at check-in. It is captured after the event for Day 1 attendees.",
  },
  {
    question: "Can my employer reimburse this?",
    answer:
      "Yes. We provide invoices/receipts suitable for professional development reimbursement.",
  },
  {
    question: "Where is it?",
    answer:
      "Toronto. Please register to see the exact location of this event.",
  },
  {
    question: "Is there alcohol or afterparties?",
    answer: "No alcohol. Professional, focused environment.",
  },
  {
    question: "What if I can't attend Day 2?",
    answer:
      "Contact us in advance; refunds follow the Day 2 policy.",
  },
  {
    question: "Can I transfer my seat?",
    answer:
      "Yes, transfers are allowed up to 7 days before the event.",
  },
  {
    question: "Is there a remote option?",
    answer:
      "Not for the pilot. This is intentionally in-person.",
  },
];

export function FAQ() {
  return (
    <SectionWrapper id="faq" alt>
      <RevealOnScroll>
        <h2 className="mx-auto max-w-3xl text-center font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-8 text-[var(--color-text)]">
          Frequently asked{" "}
          <span className="text-[var(--color-accent)]">questions</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
