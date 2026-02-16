import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { StageTimeline } from "@/components/motion/StageTimeline";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ProofEvidence } from "@/components/sections/ProofEvidence";

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

const homeProofStats = [
  {
    value: "56%",
    label: "AI skill premium",
    detail: "Workers with AI skills earned materially higher pay versus the same role without that capability.",
    sourceHref:
      "https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html",
  },
  {
    value: "3x",
    label: "Revenue growth per employee",
    detail: "Industries that adopted AI faster showed stronger per-employee growth trajectories.",
    sourceHref: "https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-jobs-barometer.html",
  },
  {
    value: "90%",
    label: "Missed AI training",
    detail: "A large share of the workforce still has not completed meaningful AI training.",
    sourceHref:
      "https://www.cornerstoneondemand.com/company/news-room/press-releases/hidden-ai-lack-of-training-keeps-ai-use-in-the-shadows-despite-ai-usage-encouragement-from-employers/",
  },
];

const homeProofQuotes = [
  {
    quote:
      "AI won't replace humans. But humans who use AI will replace those who don't.",
    author: "Sam Altman",
    role: "CEO and Co-Founder, OpenAI",
    sourceHref: "https://x.com/sama/status/1751733984631882743",
  },
  {
    quote: "The era of humans writing code is over.",
    author: "Ryan Dahl",
    role: "Creator of Node.js",
    sourceHref: "https://x.com/rough__sea/status/2013280952370573666",
  },
  {
    quote: "People who aren't keeping up even over the last 30 days already have a deprecated worldview on this topic.",
    author: "Andrej Karpathy",
    role: "Co-Founder, OpenAI",
    sourceHref: "https://www.infoworld.com/article/4111829/ais-trust-tax-for-developers.html",
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
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_4%_16%,color-mix(in_oklch,var(--color-accent)_12%,transparent)_0%,transparent_58%),radial-gradient(90%_78%_at_96%_8%,color-mix(in_oklch,var(--color-accent-2)_10%,transparent)_0%,transparent_62%)]" />
            <div className="absolute -top-28 -left-16 h-[460px] w-[620px] rounded-full bg-[color-mix(in_oklch,var(--color-accent)_14%,transparent)] blur-[110px] opacity-72" />
            <div className="absolute top-[20%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[color-mix(in_oklch,var(--color-accent-2)_14%,transparent)] blur-[120px] opacity-68" />
            <div className="absolute inset-x-0 top-[18%] h-[420px] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-surface)_82%,transparent)_0%,color-mix(in_oklch,var(--color-bg)_96%,transparent)_100%)] blur-[1px]" />
          </div>

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
              <div className="relative md:col-span-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-20 top-[-8%] -z-10 h-[520px] w-[620px] rounded-full bg-[color-mix(in_oklch,var(--color-surface)_92%,var(--color-accent)_8%)] blur-[78px]"
                />
                <p
                  data-stage="1"
                  className="stage-enter inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_34%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  Zero-to-Agent
                </p>
                <h1
                  data-stage="2"
                  className="stage-enter mt-5 font-heading text-[clamp(46px,6vw,86px)] font-bold leading-[0.94] tracking-tight text-[var(--color-text)]"
                >
                  AI that actually ships.
                  <span className="block text-[color-mix(in_oklch,var(--color-text)_84%,var(--color-accent)_16%)]">
                    From first workflow to operating system.
                  </span>
                </h1>
                <p
                  data-stage="3"
                  className="stage-enter mt-6 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg"
                >
                  We help people and teams move from scattered experiments to production workflows with clear scope,
                  plain-language implementation, and measurable output.
                </p>
                <div data-stage="4" className="stage-enter mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/individuals">Explore Individuals</Button>
                  <Button href="/businesses" variant="secondary">
                    Explore Businesses
                  </Button>
                </div>
                <p data-stage="5" className="stage-enter mt-4 text-sm text-[var(--color-text-faint)]">
                  Two paths. One standard: practical outcomes over theory.
                </p>

                <div
                  data-stage="6"
                  className="stage-enter mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_90%,transparent)] p-5 shadow-[var(--shadow-md)] backdrop-blur-sm"
                >
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Signature sequence
                  </p>
                  <div className="mt-4 signature-rail">
                    <div className="signature-rail__track" />
                    <span className="signature-rail__node signature-rail__node--1" />
                    <span className="signature-rail__node signature-rail__node--2" />
                    <span className="signature-rail__node signature-rail__node--3" />
                    <span className="signature-rail__node signature-rail__node--4" />
                    <span className="signature-rail__node signature-rail__node--5" />
                    <span className="signature-rail__runner" />
                  </div>
                  <div className="mt-3 grid grid-cols-5 text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                    <span>Scope</span>
                    <span className="text-center">Build</span>
                    <span className="text-center">Deploy</span>
                    <span className="text-center">Measure</span>
                    <span className="text-right">Scale</span>
                  </div>
                </div>
              </div>

              <div data-stage="7" className="stage-enter md:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-border)_74%,var(--color-accent)_16%)] bg-[color-mix(in_oklch,var(--color-surface)_86%,transparent)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-sm">
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

                <div data-stage="8" className="stage-enter mt-4 grid grid-cols-12 gap-3">
                  <div className="group relative col-span-7 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                    <Image
                      src="/program/one-weekend.jpg"
                      alt="Workshop planning table"
                      width={1200}
                      height={900}
                      className="h-44 w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.04]"
                    />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,color-mix(in_oklch,var(--color-text)_24%,transparent)_100%)]" />
                  </div>
                  <div className="col-span-5 grid gap-3">
                    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                      <Image
                        src="/program/pods-of-5.jpg"
                        alt="Small team collaboration"
                        width={1200}
                        height={900}
                        className="h-[84px] w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                      <Image
                        src="/program/future-ready.jpg"
                        alt="Future-ready operations image"
                        width={1200}
                        height={900}
                        className="h-[84px] w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>
                </div>
              </div>
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

        <ProofEvidence
          id="proof"
          eyebrow="Signal"
          heading="The opportunity is real, and measurable."
          lead="No single tactic is enough. Evidence has to compound across teams, quality, and momentum."
          stats={homeProofStats}
          quotes={homeProofQuotes}
        />

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
