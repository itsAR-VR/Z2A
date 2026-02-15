import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SectionWrapper } from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "Zero-to-Agent | Agentic Workflows for Individuals and Businesses",
  description:
    "Zero-to-Agent helps individuals and businesses move from AI confusion to practical, measurable execution.",
  openGraph: {
    title: "Zero-to-Agent",
    description:
      "Agentic workflows for individuals and businesses, built with clear execution and measurable outcomes.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <SectionWrapper id="top" className="pt-32 pb-14 md:pt-40">
          <div className="max-w-[72ch]">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Zero-to-Agent
            </p>
            <h1 className="mt-3 font-heading font-bold tracking-tight text-[clamp(40px,5.2vw,72px)] leading-[0.98] text-[var(--color-text)]">
              AI that does real work.
            </h1>
            <p className="mt-5 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[60ch]">
              We help individuals and businesses move from confusion to practical execution with clear workflows, plain language, and measurable outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/individuals">Explore Individuals</Button>
              <Button href="/businesses" variant="secondary">
                Explore Businesses
              </Button>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="vision" alt>
          <div className="max-w-[72ch]">
            <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
              Our vision
            </h2>
            <p className="mt-4 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)]">
              AI should feel usable on day one. We focus on workflows that people can run, trust, and improve over time.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper id="programs">
          <div className="max-w-[72ch]">
            <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
              Choose your path
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                For Individuals
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                Build and deploy your own workflows
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                Learn to build and ship your own agent workflows in a focused, hands-on format.
              </p>
              <div className="mt-6">
                <Button href="/individuals">Explore Individuals</Button>
              </div>
            </article>
            <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                For Businesses
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                Implement and run agentic workflows
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                Get managed implementation and ongoing optimization for high-impact workflows across your team.
              </p>
              <div className="mt-6">
                <Button href="/businesses">Explore Businesses</Button>
              </div>
            </article>
          </div>
        </SectionWrapper>

        <SectionWrapper id="principles" alt>
          <div className="max-w-[72ch]">
            <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
              How we work
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)]">
              <li>Abstract complexity so teams can focus on outcomes.</li>
              <li>Post-deploy value matters more than launch day.</li>
              <li>Pragmatic demos beat theory.</li>
              <li>Plain language first for non-technical operators.</li>
            </ul>
          </div>
        </SectionWrapper>
      </main>
    </LenisProvider>
  );
}
