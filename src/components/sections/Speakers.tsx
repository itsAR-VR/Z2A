"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const speakers = [
  {
    name: "Aadil Kazmi",
    role: "Instructor · Zero-to-Agent",
    bio: "Forbes 30 Under 30 Honoree. With experience spanning the founding of a Shopify-backed startup to leading AI deployments for Fortune 100 companies, including managing large-scale data pipelines at Amazon, he brings significant expertise across AI and supply chain execution.",
    badges: ["Forbes 30 Under 30"],
    initials: "AK",
  },
  {
    name: "Abdur",
    role: "Guest Speaker · Zero Risk Growth",
    bio: "20 years old, high school dropout, and started his first AI startup at 16. Recipient of the OpenAI award \"Honored for passing 100 Billion Tokens.\" Will share insights on scaling AI agent businesses from zero.",
    badges: ["OpenAI 100B Tokens", "cold2close.ai"],
    initials: "AR",
  },
];

export function Speakers() {
  return (
    <SectionWrapper id="speakers" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] mb-4">
          Learn from builders,{" "}
          <span className="text-[var(--color-accent-500)]">not lecturers.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-300)] text-base md:text-lg max-w-2xl mb-12">
          Your instructors have built real AI systems at scale — not just talked about them.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {speakers.map((speaker, i) => (
          <RevealOnScroll key={speaker.name} delay={i * 150}>
            <Card className="h-full">
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-[var(--color-accent-500)]/10 border border-[var(--color-accent-500)]/20 flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-[var(--color-accent-500)] text-lg">
                    {speaker.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-[var(--color-text-100)]">
                    {speaker.name}
                  </h3>
                  <p className="text-[var(--color-text-500)] text-sm">
                    {speaker.role}
                  </p>
                </div>
              </div>
              <p className="text-[var(--color-text-300)] text-sm leading-relaxed mb-4">
                {speaker.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {speaker.badges.map((badge) => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
