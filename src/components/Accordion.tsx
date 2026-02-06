"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border-700)]">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left font-heading text-base md:text-lg font-medium text-[var(--color-text-100)] cursor-pointer hover:text-[var(--color-accent-500)] transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-[var(--color-text-500)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[var(--color-text-300)] leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-[var(--color-border-700)] border-t border-[var(--color-border-700)]">
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
