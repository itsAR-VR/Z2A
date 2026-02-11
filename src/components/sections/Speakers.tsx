"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/Badge";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";

type Speaker = {
  name: string;
  role: string;
  badges: string[];
  bio: string;
  headshotSrc: string;
  linkedinUrl: string;
  initials?: string;
};

const speakers: Speaker[] = [
  {
    name: "Aadil Kazmi",
    role: "Instructor · Zero-to-Agent",
    bio: "Head of AI at Infios. Previously co-founded Swyft (Shopify-backed) and worked at Amazon.",
    badges: ["Instructor", "Head of AI · Infios", "Forbes 30 Under 30"],
    initials: "AK",
    headshotSrc: "/speakers/aadil-headshot.jpg",
    linkedinUrl: "https://www.linkedin.com/in/aadilkazmi/",
  },
  {
    name: "Abdur Sajid",
    role: "Guest Operator · cold2close.ai",
    bio: "Founder of Zero Risk Growth (cold2close.ai). Shares how he scales outbound and GTM workflows with AI systems.",
    badges: ["Operator", "cold2close.ai", "OpenAI 100B Tokens"],
    initials: "AS",
    headshotSrc: "/speakers/abdur-headshot.jpg",
    linkedinUrl: "https://www.linkedin.com/in/abdur-sajid/",
  },
];

export function Speakers() {
  return (
    <SectionWrapper id="speakers">
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Learn from operators{" "}
          <span className="text-[var(--color-accent)]">who ship.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          You&apos;ll build with people who run real systems. The goal is
          practical output: scope, build, test, and launch.
        </p>
      </RevealOnScroll>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl items-stretch">
        {speakers.map((speaker, i) => (
          <RevealOnScroll key={speaker.name} delay={i * 150} className="h-full">
            <a
              href={speaker.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full w-full text-left rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 md:p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_oklch,var(--color-accent)_25%,var(--color-border-strong))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              aria-label={`Open ${speaker.name} on LinkedIn`}
            >
              <div className="flex items-start gap-4 mb-4">
                <SpeakerAvatar
                  name={speaker.name}
                  initials={speaker.initials}
                  src={speaker.headshotSrc}
                  size={56}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-semibold text-lg text-[var(--color-text)]">
                    {speaker.name}
                  </h3>
                  <p className="text-[var(--color-text-faint)] text-sm">
                    {speaker.role}
                  </p>
                </div>
                <div className="pt-1">
                  <svg
                    className="h-5 w-5 text-[var(--color-text-faint)] transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 7h7v7" />
                  </svg>
                </div>
              </div>

              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5">
                {speaker.bio}
              </p>

              <p className="mb-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Proof points
              </p>
              <div className="flex flex-wrap gap-2">
                {speaker.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className="bg-[color-mix(in_oklch,var(--color-accent)_7%,var(--color-surface))] text-[var(--color-text-muted)]"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              <p className="mt-5 text-sm font-medium text-[var(--color-accent)]">
                View LinkedIn profile
              </p>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
