import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { StageTimeline } from "@/components/motion/StageTimeline";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "Zero-to-Agent | Learn AI Workflows You Can Run",
  description:
    "Hands-on education and enablement for individuals and teams who want practical AI workflows, plain language, and measurable outcomes.",
  openGraph: {
    title: "Zero-to-Agent",
    description:
      "Move from AI confusion to practical workflows your team can run — with clear education, setup support, and ongoing improvement.",
    type: "website",
  },
};

const pathwayCards = [
  {
    id: "individuals",
    eyebrow: "For individuals",
    title: "Learn the tools. Ship one workflow by Sunday.",
    description:
      "Hands-on weekend sprint for PMs, operators, and builders who want to learn by shipping — not watching slides.",
    fit: "Best fit if you want to build your own workflow and lead rollout internally.",
    bullets: ["In-person cohort in Toronto", "Pods of 5 with live support", "Working demo plus rollout plan"],
    href: "/individuals",
    cta: "See Individuals Program",
  },
  {
    id: "businesses",
    eyebrow: "For businesses",
    title: "Equip your team to run AI workflows inside your existing tools.",
    description:
      "Education + guided setup for teams who want internal ownership, clear operators, and measurable workflow improvement — without platform sprawl.",
    fit: "Best fit if you want your operators to own the workflow — and keep improving without vendor dependency.",
    bullets: ["Free 30-minute discovery", "In-person enablement workshop", "Tool setup with your operators"],
    href: "/businesses",
    cta: "See Businesses Services",
  },
];

const principles = [
  {
    number: "01",
    title: "Abstract complexity",
    detail:
      "Most teams do not need more tooling jargon. They need a workflow that runs reliably and is easy to operate.",
  },
  {
    number: "02",
    title: "Value after deployment",
    detail:
      "Shipping is step one. The real win is improving quality, accuracy, and throughput month over month.",
  },
  {
    number: "03",
    title: "Demonstrate, then scale",
    detail:
      "We prioritize practical demos tied to your workflows so decision-makers can see impact before expansion.",
  },
  {
    number: "04",
    title: "Plain language first",
    detail:
      "If non-technical teams cannot explain or operate it, adoption stalls. Simplicity is a product requirement.",
  },
];

export default function HomePage() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <StageTimeline rootId="top" />
        <section id="top" className="relative overflow-hidden pt-32 pb-18 md:pt-44 md:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-orb hero-orb--left animate-drift" />
            <div className="hero-orb hero-orb--right animate-drift-slow" />
            <div className="hero-orb hero-orb--center animate-drift" />
            <div className="hero-orb hero-orb--bottom animate-drift-slow" />
            <div className="hero-plane hero-plane--left animate-drift opacity-70" />
            <div className="hero-plane hero-plane--right animate-drift-slow opacity-62" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
            <div className="hero-frost-overlay hero-frost-overlay--horizon hero-frost-overlay--soft-bottom" />
          </div>

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
              <div className="relative md:col-span-7">
                <h1
                  data-stage="1"
                  className="stage-enter max-w-[14ch] font-heading text-[clamp(44px,5.8vw,78px)] font-bold leading-[0.95] tracking-tight text-[var(--color-text)] text-balance"
                >
                  Build the skill to adapt.
                  <span className="block text-[var(--color-text)]">Ship one workflow in a weekend.</span>
                </h1>
                <p
                  data-stage="2"
                  className="stage-enter mt-6 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)] md:text-lg text-pretty"
                >
                  In the U.S., ~70M people work white-collar jobs, and some forecasts expect a 20–50% reduction
                  over the next several years — with disruption accelerating in the next 12–18 months. The
                  winners will be the people and teams who learn new tools fast, redesign workflows, and keep
                  shipping.
                </p>
                <div data-stage="3" className="stage-enter mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/individuals">See Individuals Program</Button>
                  <Button href="/businesses" variant="secondary">
                    See Businesses Services
                  </Button>
                </div>
                <p
                  data-stage="4"
                  className="stage-enter mt-4 text-sm text-[color-mix(in_oklch,var(--color-text-faint)_72%,var(--color-text-muted)_28%)]"
                >
                  Two paths. One standard: measurable outcomes over AI theater.
                </p>
              </div>

              <div data-stage="5" className="stage-enter md:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_92%,var(--color-bg)_8%)] p-6 shadow-[var(--shadow-sm)]">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    What this means in practice
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Numbers: ~70M U.S. white-collar workers; forecasts expect 20–50% reduction.",
                      "Winners: adaptable teams learning new skills quickly.",
                      "Inflection: Blockbuster didn’t lose to better DVDs — it lost to Netflix and streaming.",
                      "We help you learn the tools and set them up so you can run the workflow yourself.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)]">
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm text-[var(--color-text-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                      One standard
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] text-pretty">
                      Practical outcomes over theory. Tight scope, clear operators, and workflows you can run
                      without us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionWrapper id="vision" className="pt-14 md:pt-18">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <RevealOnScroll className="md:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Vision
              </p>
              <h2 className="mt-3 font-heading text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.02] tracking-tight text-[var(--color-text)]">
                Build capability people can trust, not demos people forget.
              </h2>
              <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
                AI should reduce friction inside real workflows, not add another layer of complexity. We teach
                the tools, help you set them up inside your existing stack, and make sure your team can operate
                the workflow day one. That’s how you embrace the AI era: one owned workflow at a time.
              </p>
            </RevealOnScroll>

            <RevealOnScroll className="md:col-span-5" delay={120}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Core belief
                </p>
                <p className="mt-3 font-heading text-[24px] leading-[1.18] tracking-tight text-[var(--color-text)]">
                  You already have the context on your biggest problems. We equip you with the tools to solve
                  them.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] text-pretty">
                  This is education-first work. We build the skill inside your team, then help you set up the
                  tools so you can keep improving without a vendor dependency.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Education-first", "Operator-owned workflows", "Guided setup"].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[11px] text-[var(--color-text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </SectionWrapper>

        <SectionWrapper id="programs" className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Programs
            </p>
            <h2 className="mt-3 font-heading text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.02] tracking-tight text-[var(--color-text)]">
              Pick your path fast.
            </h2>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
              Choose based on ownership. Learn it yourself in a weekend, or run a team enablement sprint where
              we set up the tools together.
            </p>
          </RevealOnScroll>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {pathwayCards.map((card, index) => (
              <RevealOnScroll key={card.id} delay={index * 110}>
                <Link
                  href={card.href}
                  className="group relative block overflow-hidden rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-border)_74%,var(--color-accent)_12%)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1.5 hover:border-[color-mix(in_oklch,var(--color-accent)_38%,var(--color-border))] hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_12%,transparent)] blur-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                  />
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-[24ch] font-heading text-[29px] font-semibold leading-[1.06] tracking-tight text-[var(--color-text)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                    {card.description}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-faint)]">{card.fit}</p>
                  <ul className="mt-5 space-y-2">
                    {card.bullets.map((item) => (
                      <li key={item} className="text-sm text-[var(--color-text-muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-accent)]">
                    {card.cta}
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="principles">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <RevealOnScroll className="md:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Principles
              </p>
              <h2 className="mt-3 font-heading text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.04] tracking-tight text-[var(--color-text)]">
                How we work.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
                These operating rules keep the work grounded, credible, and useful for real teams.
              </p>
            </RevealOnScroll>

            <div className="md:col-span-8">
              <div className="space-y-3">
                {principles.map((item, index) => (
                  <RevealOnScroll key={item.title} delay={index * 85}>
                    <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-[var(--shadow-sm)]">
                      <div className="grid grid-cols-[44px_1fr] gap-4">
                        <p className="font-mono text-[12px] tracking-[0.14em] text-[var(--color-accent)]">
                          {item.number}
                        </p>
                        <div>
                          <h3 className="font-heading text-xl font-semibold tracking-tight text-[var(--color-text)]">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </article>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </LenisProvider>
  );
}
