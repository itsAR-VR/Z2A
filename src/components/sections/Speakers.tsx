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
    bio: "Head of AI at zeroriskgrowth.com. Launching a software suite of products focused on increasing gross profit through cold outbound (cold2close.ai).",
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
            <article className="group h-full w-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 md:p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_oklch,var(--color-accent)_25%,var(--color-border-strong))]">
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

              <div className="mt-5 flex justify-end">
                <a
                  href={speaker.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] text-[var(--color-accent)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-quart)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_oklch,var(--color-accent)_35%,var(--color-border-strong))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  aria-label={`Open ${speaker.name} on LinkedIn`}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.69h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.65c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.16 1.47-2.16 2.98V21h-4V9Z" />
                  </svg>
                </a>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
