"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const days = [
  {
    day: "Day 1",
    date: "Feb 28, 2026",
    blocks: [
      {
        time: "09:30 - 11:30",
        label: "Project 1: Build a complete app with Lovable",
      },
      {
        time: "11:30 - 12:15",
        label:
          "Project 1: job tracker buildout (board, details, dashboard, search)",
      },
      { time: "12:15 - 13:00", label: "Lunch" },
      {
        time: "13:00 - 14:00",
        label: "Project 2: chatbot setup (holds a conversation)",
      },
      {
        time: "14:00 - 15:00",
        label:
          "Project 2: design the chat flow + build sprint (topic TBD)",
      },
      {
        time: "15:00 - 16:00",
        label: "Project 3: web app setup with Replit + n8n",
      },
      {
        time: "16:00 - 17:30",
        label: "Project 3 + Project 4: plan + setup",
      },
      {
        time: "17:30 - 18:00",
        label: "Quick checkpoint + end-of-day recap",
      },
    ],
  },
  {
    day: "Day 2",
    date: "Mar 1, 2026",
    blocks: [
      {
        time: "09:30 - 10:00",
        label: "Day 1 recap + priorities for final build sprint",
      },
      {
        time: "10:00 - 11:30",
        label: "Project 4: put it online + make it stable",
      },
      {
        time: "11:30 - 13:00",
        label: "Project 4: add payments + safety checks",
      },
      { time: "13:00 - 13:45", label: "Lunch" },
      {
        time: "13:45 - 15:30",
        label:
          "Project 4: finish the end-to-end demo + basic monitoring",
      },
      {
        time: "15:30 - 17:00",
        label: "Project 3: finish and polish as needed",
      },
      {
        time: "17:00 - 18:00",
        label:
          "Project 4: final testing, live demo, and next steps",
      },
    ],
  },
];

export function Agenda() {
  return (
    <SectionWrapper id="agenda" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          4 Projects over{" "}
          <span className="text-[var(--color-accent)]">2 Days.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          We focus on finishing: quick setup first, then lots of time for{" "}
          <strong>Project 4</strong>.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map((day, i) => (
          <RevealOnScroll key={day.day} delay={i * 150}>
            <Card hoverable={false} className="h-full">
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="font-heading font-bold text-xl text-[var(--color-accent)]">
                  {day.day}
                </h3>
                <span className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  {day.date}
                </span>
              </div>
              <div className="space-y-3">
                {day.blocks.map((block) => (
                  <div
                    key={block.time}
                    className="flex gap-4 items-baseline py-2 border-b border-[var(--color-border)] last:border-0"
                  >
                    <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[var(--color-text-faint)] w-16 shrink-0">
                      {block.time}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {block.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
