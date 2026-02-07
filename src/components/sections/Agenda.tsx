"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const days = [
  {
    day: "Day 1",
    date: "Feb 28, 2026",
    blocks: [
      { time: "09:30", label: "Check-in + scope your build" },
      { time: "10:30", label: "Instruction block: agent foundations" },
      { time: "12:00", label: "Lunch" },
      { time: "13:00", label: "Pod build time (guided)" },
      { time: "16:00", label: "Checkpoint: progress review" },
      { time: "18:00", label: "Wrap Day 1" },
    ],
  },
  {
    day: "Day 2",
    date: "Mar 1, 2026",
    blocks: [
      { time: "10:00", label: "Build completion + testing" },
      { time: "12:00", label: "Lunch" },
      { time: "13:00", label: "Evaluation workflows + deployment" },
      { time: "15:00", label: "Demo prep" },
      { time: "16:00", label: "Demo presentations" },
      { time: "17:30", label: "Wrap + next steps" },
    ],
  },
];

export function Agenda() {
  return (
    <SectionWrapper id="agenda" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Two days, structured for{" "}
          <span className="text-[var(--color-accent)]">shipping.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          Short instruction blocks, long build blocks, clear checkpoints.
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
