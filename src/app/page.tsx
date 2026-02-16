import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
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
    title: "Build and ship your own workflow in a weekend.",
    description:
      "Hands-on training for builders, PMs, and operators who want to leave with a working agent and a deployment plan.",
    bullets: ["In-person cohort format", "Clear sprint structure", "Working output by the end"],
    href: "/individuals",
    cta: "Explore Individuals",
  },
  {
    id: "businesses",
    eyebrow: "For businesses",
    title: "Deploy agentic workflows that keep improving after launch.",
    description:
      "Managed implementation for teams that need outcomes across operations, sales, support, and finance.",
    bullets: ["Discovery to deployment", "Runs in your existing tools", "Ongoing optimization and governance"],
    href: "/businesses",
    cta: "Explore Businesses",
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
        <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-42 md:pb-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="animate-drift absolute -top-40 -left-24 h-[420px] w-[420px] rounded-full bg-[color-mix(in_oklch,var(--color-accent)_14%,transparent)] blur-[80px]" />
            <div className="animate-drift-slow absolute top-20 right-[-120px] h-[380px] w-[380px] rounded-full bg-[color-mix(in_oklch,var(--color-accent-2)_14%,transparent)] blur-[86px]" />
          </div>

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
              <RevealOnScroll className="md:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  Zero-to-Agent
                </p>
                <h1 className="mt-5 font-heading text-[clamp(42px,5.6vw,80px)] font-bold leading-[0.96] tracking-tight text-[var(--color-text)]">
                  AI that actually ships.
                  <span className="block text-[color-mix(in_oklch,var(--color-text)_82%,var(--color-accent)_18%)]">
                    From first workflow to operating system.
                  </span>
                </h1>
                <p className="mt-5 max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                  We help people and teams move from scattered experiments to production workflows with clear scope,
                  plain-language implementation, and measurable output.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/individuals">Explore Individuals</Button>
                  <Button href="/businesses" variant="secondary">
                    Explore Businesses
                  </Button>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-faint)]">
                  Two paths. One standard: practical outcomes over theory.
                </p>
              </RevealOnScroll>

              <RevealOnScroll className="md:col-span-5" delay={100}>
                <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-border)_74%,var(--color-accent)_12%)] bg-[color-mix(in_oklch,var(--color-surface)_86%,transparent)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-sm">
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
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_oklch,var(--color-accent)_35%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] text-[var(--color-accent)]">
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm text-[var(--color-text-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-[var(--shadow-sm)]">
                    <p className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">2</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">entry points</p>
                  </div>
                  <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-[var(--shadow-sm)]">
                    <p className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">1</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">execution standard</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <SectionWrapper id="vision" alt className="pt-14 md:pt-18">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <RevealOnScroll className="md:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Vision
              </p>
              <h2 className="mt-3 font-heading text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.02] tracking-tight text-[var(--color-text)]">
                Build systems people can trust, not demos people forget.
              </h2>
              <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                AI should reduce friction inside real workflows, not add another layer of complexity. We focus on
                deployment quality, operational adoption, and measurable improvement over time.
              </p>
            </RevealOnScroll>

            <RevealOnScroll className="md:col-span-5" delay={120}>
              <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_26%,var(--color-border))] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Core belief
                </p>
                <p className="mt-3 font-heading text-[24px] leading-[1.18] tracking-tight text-[var(--color-text)]">
                  The winners will be the ones who remove complexity for the customer.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  This is why we bias toward plain language, visible delivery, and continuous servicing after launch.
                </p>
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
              Pick your pathway.
            </h2>
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

        <SectionWrapper id="principles" alt>
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
