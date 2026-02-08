"use client";

import { useCallback, useId, useMemo, useState } from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/Badge";
import { Dialog } from "@/components/Dialog";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";

type Speaker = {
  name: string;
  role: string;
  badges: string[];
  bio: string;
  highlights: string[];
  details?: string[];
  links?: { label: string; href: string }[];
  awardPlaqueSrc?: string;
  awardPlaqueAlt?: string;
  companyLogoSrc?: string;
  companyLogoAlt?: string;
  headshotSrc?: string;
  linkedinUrl?: string;
  initials?: string;
};

const speakers: Speaker[] = [
  {
    name: "Aadil Kazmi",
    role: "Instructor · Zero-to-Agent",
    bio: "Head of AI at Infios. Previously co-founded Swyft (Shopify-backed) and worked at Amazon.",
    highlights: [
      "Forbes 30 Under 30 Honoree.",
      "Head of AI at Infios.",
      "Cofounded Swyft (Shopify-backed).",
      "Former Amazon employee.",
      "Builder-first instruction: ship, test, and iterate.",
    ],
    details: [
      "Head of AI at Infios.",
      "Cofounded Swyft (Shopify-backed).",
      "Former Amazon employee.",
      "Forbes 30 Under 30 (Retail & Ecommerce, 2022).",
    ],
    badges: ["Instructor", "Infios", "Forbes 30 Under 30"],
    initials: "AK",
    headshotSrc: "/speakers/aadil-headshot.jpg",
    linkedinUrl: "https://www.linkedin.com/in/aadilkazmi/",
  },
  {
    name: "Abdur Sajid",
    role: "Guest Speaker · Zero Risk Growth (cold2close.ai)",
    bio: "Will share insights on scaling AI agent businesses from zero.",
    highlights: [
      "Head of AI & Development at Zero Risk Growth (cold2close.ai).",
      "Joined after the team passed 100B tokens; leading what comes next.",
      "Zero Risk Growth AI team was awarded by OpenAI for passing 100B tokens.",
      "Started first AI startup at 16.",
    ],
    details: [
      "Head of AI & Development at Zero Risk Growth.",
      "Joined after the team passed 100B tokens; leading what comes next.",
      "Zero Risk Growth AI team was awarded by OpenAI for passing 100B tokens.",
      "Started first AI startup at 16.",
      "20 years old, high school dropout.",
    ],
    links: [
      { label: "zeroriskgrowth.com", href: "https://zeroriskgrowth.com" },
      { label: "cold2close.ai", href: "https://cold2close.ai" },
    ],
    companyLogoSrc: "/speakers/cold2close-logo.svg",
    companyLogoAlt: "cold2close.ai logo",
    awardPlaqueSrc: "/speakers/openai-award-plaque.jpeg",
    awardPlaqueAlt:
      "OpenAI award plaque recognizing the Zero Risk Growth AI team for passing 100B tokens.",
    badges: ["Guest", "OpenAI 100B Tokens", "cold2close.ai"],
    initials: "AS",
    headshotSrc: "/speakers/abdur-headshot.jpg",
    linkedinUrl: "https://www.linkedin.com/in/abdur-sajid/",
  },
];

export function Speakers() {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const dialogIds = useId();
  const titleId = `${dialogIds}-speaker-title`;
  const descId = `${dialogIds}-speaker-desc`;

  const open = Boolean(activeSpeaker);
  const close = useCallback(() => setActiveSpeaker(null), []);

  const dialogTitle = activeSpeaker?.name ?? "";

  const dialogBody = useMemo(() => {
    if (!activeSpeaker) return null;

    return (
      <div className="p-6 md:p-7">
        <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
          <SpeakerAvatar
            name={activeSpeaker.name}
            initials={activeSpeaker.initials}
            src={activeSpeaker.headshotSrc}
            size={72}
            className="mx-auto md:mx-0"
          />

          <div className="min-w-0 flex-1">
            <h3
              id={titleId}
              className="font-heading font-semibold tracking-tight text-2xl text-[var(--color-text)]"
            >
              {activeSpeaker.name}
            </h3>
            <p
              id={descId}
              className="mt-1 text-[var(--color-text-faint)] text-sm"
            >
              {activeSpeaker.role}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeSpeaker.badges.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-[color-mix(in_oklch,var(--color-accent)_7%,var(--color-surface))] text-[var(--color-text-muted)]"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {activeSpeaker.companyLogoSrc ? (
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeSpeaker.companyLogoSrc}
                  alt={activeSpeaker.companyLogoAlt ?? "Company logo"}
                  className="h-6 w-auto"
                  loading="lazy"
                />
              </div>
            ) : null}

            {activeSpeaker.links?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeSpeaker.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-1 rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] text-[var(--color-text-muted)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--color-accent)_22%,var(--color-border))] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                  >
                    {link.label}
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3h7v7m0-7L10 14"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 7v14h14v-5"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            ) : null}

            {activeSpeaker.linkedinUrl ? (
              <div className="mt-4">
                <a
                  href={activeSpeaker.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-[14px] leading-none px-4 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_oklch,var(--color-accent)_42%,var(--color-border-strong))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 114.126 0 2.062 2.062 0 01-2.063 2.065zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 3h7v7m0-7L10 14"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 7v14h14v-5"
                    />
                  </svg>
                </a>
              </div>
            ) : null}

            <div className="mt-5 text-[var(--color-text-muted)] text-sm leading-relaxed">
              {activeSpeaker.details ? (
                <ul className="space-y-2">
                  {activeSpeaker.details.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_60%,var(--color-border))] shrink-0"
                      />
                      <span className="min-w-0">{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{activeSpeaker.bio}</p>
              )}

              {activeSpeaker.details ? (
                <p className="mt-4">{activeSpeaker.bio}</p>
              ) : null}
            </div>

            {activeSpeaker.awardPlaqueSrc ? (
              <div className="mt-6">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Award plaque
                </p>
                <figure className="mt-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-bg)_45%,var(--color-surface))] shadow-[var(--shadow-sm)]">
                  <div className="p-3">
                    <Image
                      src={activeSpeaker.awardPlaqueSrc}
                      alt={activeSpeaker.awardPlaqueAlt ?? "Award plaque"}
                      width={1206}
                      height={1501}
                      className="h-auto w-full rounded-[calc(var(--radius-lg)-6px)]"
                    />
                  </div>
                </figure>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }, [activeSpeaker, descId, titleId]);

  return (
    <SectionWrapper id="speakers">
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Learn from builders,{" "}
          <span className="text-[var(--color-accent)]">not lecturers.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">
          You’ll be supported by people who have shipped real systems. The goal is
          execution: scope, build, test, and demo.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {speakers.map((speaker, i) => (
          <RevealOnScroll key={speaker.name} delay={i * 150} className="h-full">
            <button
              type="button"
              className="group h-full w-full text-left rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 md:p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_oklch,var(--color-accent)_25%,var(--color-border-strong))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              onClick={() => setActiveSpeaker(speaker)}
              aria-haspopup="dialog"
              aria-label={`View ${speaker.name} details`}
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
                      d="M9 18l6-6-6-6"
                    />
                  </svg>
                </div>
              </div>

              <ul className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5 space-y-1.5">
                {speaker.highlights.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_55%,var(--color-border))] shrink-0"
                    />
                    <span className="min-w-0">{line}</span>
                  </li>
                ))}
              </ul>

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
            </button>
          </RevealOnScroll>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={close}
        labelledBy={titleId}
        describedBy={descId}
        overlayClassName="flex items-end md:items-center justify-center p-4 md:p-8"
        panelClassName="relative w-full md:max-w-2xl rounded-t-[var(--radius-xl)] md:rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] overflow-hidden"
      >
        <button
          type="button"
          className="absolute top-4 right-4 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
          onClick={close}
          aria-label={`Close ${dialogTitle} details`}
        >
          Close
        </button>

        <div className="overflow-auto max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)]">
          {dialogBody}
        </div>
      </Dialog>
    </SectionWrapper>
  );
}
