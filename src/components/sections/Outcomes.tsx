"use client";

import { useState } from "react";

import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

type OutcomePillar = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  kicker: string;
};

const pillars: OutcomePillar[] = [
  {
    title: "One weekend",
    imageSrc: "/program/one-weekend.jpg",
    imageAlt: "Participants building together during a weekend workshop",
    kicker: "Format",
  },
  {
    title: "Pods of 5",
    imageSrc: "/program/pods-of-5.jpg",
    imageAlt: "Small pod collaboration around a shared table",
    kicker: "Build system",
  },
  {
    title: "Future-ready",
    imageSrc: "/program/future-ready.jpg",
    imageAlt: "Operator presenting a completed workflow to peers",
    kicker: "Outcome",
  },
];

function PillarCard({ pillar, delay }: { pillar: OutcomePillar; delay: number }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <RevealOnScroll delay={delay}>
      <article className="group relative min-h-[220px] sm:min-h-[250px] overflow-hidden rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_22%,var(--color-border))] bg-[var(--color-surface)] shadow-[var(--shadow-md)]">
        {!imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pillar.imageSrc}
            alt={pillar.imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            onError={() => setImageFailed(true)}
          />
        ) : null}

        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            imageFailed
              ? "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--color-accent)_24%,var(--color-surface))_0%,color-mix(in_oklch,var(--color-accent-2)_20%,var(--color-surface))_100%)]"
              : "bg-[linear-gradient(180deg,transparent_20%,color-mix(in_oklch,black_60%,transparent)_100%)]"
          }`}
        />

        <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
          <p
            className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
              imageFailed ? "text-[var(--color-text-faint)]" : "text-white/80"
            }`}
          >
            {pillar.kicker}
          </p>
          <h3
            className={`mt-2 font-heading font-bold tracking-tight text-[clamp(30px,7vw,46px)] leading-[0.95] ${
              imageFailed ? "text-[var(--color-text)]" : "text-white"
            }`}
          >
            {pillar.title}
          </h3>
        </div>
      </article>
    </RevealOnScroll>
  );
}

export function Outcomes() {
  return (
    <SectionWrapper id="outcomes" alt>
      <RevealOnScroll>
        <h2 className="font-heading font-semibold tracking-tight text-[clamp(28px,3.2vw,44px)] leading-[1.05] mb-4 text-[var(--color-text)]">
          Build with a format that{" "}
          <span className="text-[var(--color-accent)]">forces outcomes.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={90}>
        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed max-w-2xl mb-8 md:mb-10">
          A focused weekend. Small pods. A practical workflow you can keep
          improving after the workshop.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <div className="md:col-span-7">
          <PillarCard pillar={pillars[0]} delay={120} />
        </div>
        <div className="md:col-span-5">
          <PillarCard pillar={pillars[1]} delay={170} />
        </div>
        <div className="md:col-span-12">
          <PillarCard pillar={pillars[2]} delay={220} />
        </div>
      </div>
    </SectionWrapper>
  );
}
