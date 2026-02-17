import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { StageTimeline } from "@/components/motion/StageTimeline";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "Zero-to-Agent | Agentic Workflows for Individuals and Businesses",
  description:
    "A focused path to practical AI execution for individuals and businesses. Clear workflows, plain language, measurable outcomes.",
  openGraph: {
    title: "Zero-to-Agent",
    description:
      "Move from AI confusion to production workflows with clear implementation and ongoing improvement.",
    type: "website",
  },
};

const pathwayCards = [
  {
    id: "individuals",
    eyebrow: "For individuals",
    title: "Ship one production workflow by Sunday.",
    description:
      "Hands-on weekend build sprint for PMs, operators, and builders who want shipped output, not passive lessons.",
    fit: "Best fit if you want to build your own workflow and lead rollout internally.",
    bullets: ["In-person cohort in Toronto", "Pods of 5 with live support", "Working demo plus rollout plan"],
    href: "/individuals",
    cta: "See Individuals Program",
  },
  {
    id: "businesses",
    eyebrow: "For businesses",
    title: "Install AI workflows into operations without platform sprawl.",
    description:
      "Service model for teams that want setup, operator enablement, and measurable workflow improvement inside existing tools.",
    fit: "Best fit if your team needs implementation ownership and a managed path after launch.",
    bullets: ["Free 30-minute discovery", "In-person enablement workshop", "Done-for-you setup + training"],
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
            <div className="hero-frost-overlay hero-frost-overlay--horizon" />
          </div>

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
              <div className="relative md:col-span-7">
                <p
                  data-stage="1"
                  className="stage-enter inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_34%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  Zero-to-Agent
                </p>
                <div data-stage="1.5" className="stage-enter mt-4">
                  <Link href="/individuals" className="offer-ticker group block rounded-[var(--radius-md)]">
                    <div className="offer-ticker__track" aria-hidden="true">
                      <span>Admissions are live</span>
                      <span>Toronto weekend cohort</span>
                      <span>50 seats total</span>
                      <span>$100 deposit via Stripe</span>
                      <span>100% refund if you are not satisfied</span>
                      <span>Apply now</span>
                      <span>Admissions are live</span>
                      <span>Toronto weekend cohort</span>
                      <span>50 seats total</span>
                      <span>$100 deposit via Stripe</span>
                      <span>100% refund if you are not satisfied</span>
                      <span>Apply now</span>
                    </div>
                    <span className="sr-only">
                      Admissions are live for the Toronto weekend cohort. 50 seats total. $100 deposit via Stripe and
                      100% refund if you are not satisfied.
                    </span>
                  </Link>
                </div>
                <h1
                  data-stage="2"
                  className="stage-enter mt-5 max-w-[14ch] font-heading text-[clamp(44px,5.8vw,78px)] font-bold leading-[0.95] tracking-tight text-[var(--color-text)] text-balance"
                >
                  Ship one production workflow
                  <span className="block text-[var(--color-text)]">
                    in a weekend. Then scale.
                  </span>
                </h1>
                <p
                  data-stage="3"
                  className="stage-enter mt-6 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)] md:text-lg text-pretty"
                >
                  For builders, PMs, operators, and teams: pick one high-value workflow, implement it in plain
                  language, and leave with a rollout path your team can actually run.
                </p>
                <div data-stage="4" className="stage-enter mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/individuals">See Individuals Program</Button>
                  <Button href="/businesses" variant="secondary">
                    See Businesses Services
                  </Button>
                </div>
                <p
                  data-stage="5"
                  className="stage-enter mt-4 text-sm text-[color-mix(in_oklch,var(--color-text-faint)_72%,var(--color-text-muted)_28%)]"
                >
                  Two paths. One standard: measurable outcomes over AI theater.
                </p>
              </div>

              <div data-stage="6" className="stage-enter md:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_92%,var(--color-bg)_8%)] p-6 shadow-[var(--shadow-sm)]">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    What this means in practice
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Scope one high-value workflow first.",
                      "Build with your current tools and team constraints.",
                      "Track outcomes and improve continuously.",
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
                      Practical outcomes over theory. Keep scope tight, ship quickly, and improve in cycles.
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
                Build systems people can trust, not demos people forget.
              </h2>
              <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
                AI should reduce friction inside real workflows, not add another layer of complexity. We focus on
                deployment quality, operational adoption, and measurable improvement over time.
              </p>
            </RevealOnScroll>

            <RevealOnScroll className="md:col-span-5" delay={120}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Core belief
                </p>
                <p className="mt-3 font-heading text-[24px] leading-[1.18] tracking-tight text-[var(--color-text)]">
                  The winners will be the ones who remove complexity for the customer.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] text-pretty">
                  This is why we bias toward plain language, visible delivery, and continuous servicing after launch.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["In-person execution", "Operator-first workflows", "Post-deploy improvement"].map((item) => (
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
              Choose based on ownership. Build it yourself in a weekend, or have us set it up and run enablement for your team.
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
                How we build.
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
