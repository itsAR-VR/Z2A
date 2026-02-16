import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { StageTimeline } from "@/components/motion/StageTimeline";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Signals } from "@/components/sections/Signals";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";

const businessCtaHref = BUSINESS_CALENDLY_URL || "#contact";

export const metadata: Metadata = {
  title: "Zero-to-Agent for Businesses | Managed Agentic Workflows",
  description:
    "Enterprise-focused agentic workflow implementation with managed deployment, ongoing optimization, and measurable business outcomes.",
  openGraph: {
    title: "Zero-to-Agent for Businesses",
    description:
      "Deploy agentic workflows in your existing stack, then improve continuously with a managed operating model.",
    type: "website",
  },
};

const fitSegments = [
  {
    title: "Operations and process teams",
    detail: "Reduce manual handoffs, exception churn, and workflow lag across core operations.",
  },
  {
    title: "Revenue and support organizations",
    detail: "Keep follow-up, triage, and customer workflows moving without adding headcount.",
  },
  {
    title: "Finance and procurement functions",
    detail: "Automate recurring reporting, document handling, reconciliations, and approval paths.",
  },
  {
    title: "Leadership teams scaling execution",
    detail: "Turn scattered AI experimentation into a managed system tied to business KPIs.",
  },
];

const operatingModel = [
  {
    number: "01",
    title: "Discovery and workflow mapping",
    detail:
      "We map bottlenecks, dependencies, and data flow. You get a prioritized roadmap tied to margin, time, and risk reduction.",
  },
  {
    number: "02",
    title: "Implementation inside your stack",
    detail:
      "We build agentic workflows in your existing tools and systems with clear guardrails, ownership, and auditability.",
  },
  {
    number: "03",
    title: "Managed improvement loop",
    detail:
      "After launch, we monitor, optimize, and expand what works so value compounds instead of stalling.",
  },
];

const capabilities = [
  "Cross-tool task execution and handoff automation",
  "CRM, support, and operations workflow orchestration",
  "Automated reporting, exception alerts, and approvals",
  "Playbooks, training, and operating documentation",
  "Monthly optimization backlog and delivery cadence",
  "Governance and reliability checkpoints",
];

export default function BusinessesPage() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <StageTimeline rootId="top" />
        <section id="top" className="relative overflow-hidden pt-32 pb-18 md:pt-44 md:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(122%_88%_at_2%_18%,color-mix(in_oklch,var(--color-accent)_13%,transparent)_0%,transparent_56%),radial-gradient(88%_80%_at_98%_10%,color-mix(in_oklch,var(--color-accent-2)_11%,transparent)_0%,transparent_64%)]" />
            <div className="absolute -top-24 -left-20 h-[460px] w-[640px] rounded-full bg-[color-mix(in_oklch,var(--color-accent)_15%,transparent)] blur-[116px] opacity-74" />
            <div className="absolute top-[16%] right-[-9%] h-[460px] w-[460px] rounded-full bg-[color-mix(in_oklch,var(--color-accent-2)_13%,transparent)] blur-[122px] opacity-66" />
            <div className="absolute inset-x-0 top-[18%] h-[430px] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-surface)_84%,transparent)_0%,color-mix(in_oklch,var(--color-bg)_96%,transparent)_100%)] blur-[1px]" />
          </div>

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
              <div className="relative md:col-span-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 top-[-6%] -z-10 h-[520px] w-[620px] rounded-full bg-[color-mix(in_oklch,var(--color-surface)_90%,var(--color-accent)_10%)] blur-[82px]"
                />
                <p
                  data-stage="1"
                  className="stage-enter inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]"
                >
                  For businesses
                </p>
                <h1
                  data-stage="2"
                  className="stage-enter mt-5 font-heading text-[clamp(42px,5.8vw,82px)] font-bold leading-[0.95] tracking-tight text-[var(--color-text)]"
                >
                  Agentic workflows for
                  <span className="block text-[color-mix(in_oklch,var(--color-text)_84%,var(--color-accent)_16%)]">
                    real business operations.
                  </span>
                </h1>
                <p
                  data-stage="3"
                  className="stage-enter mt-5 max-w-[67ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg"
                >
                  We deploy AI that acts inside your tools, tied to business outcomes and governed like an operating
                  system. Then we continue improving it after launch.
                </p>
                <div data-stage="4" className="stage-enter mt-8 flex flex-wrap items-center gap-3">
                  <Button href={businessCtaHref}>Book a call</Button>
                  <Button href="#pricing" variant="secondary">
                    How pricing works
                  </Button>
                </div>
                <p data-stage="5" className="stage-enter mt-4 text-sm text-[var(--color-text-faint)]">
                  Managed deployment plus ongoing optimization.
                </p>

                <div
                  data-stage="6"
                  className="stage-enter mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_90%,transparent)] p-5 shadow-[var(--shadow-md)] backdrop-blur-sm"
                >
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Orchestration rail
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
                    <span>Intake</span>
                    <span className="text-center">Route</span>
                    <span className="text-center">Act</span>
                    <span className="text-center">Verify</span>
                    <span className="text-right">Improve</span>
                  </div>
                </div>
              </div>

              <div data-stage="7" className="stage-enter md:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-border)_74%,var(--color-accent)_14%)] bg-[color-mix(in_oklch,var(--color-surface)_86%,transparent)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-sm">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Engagement shape
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                      <p className="font-heading text-base font-semibold text-[var(--color-text)]">Discovery Workshop</p>
                      <p className="text-sm text-[var(--color-text-muted)]">Scope priorities and map value-linked execution.</p>
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                      <p className="font-heading text-base font-semibold text-[var(--color-text)]">Implementation Sprint</p>
                      <p className="text-sm text-[var(--color-text-muted)]">Deploy production workflows with checkpoints and guardrails.</p>
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                      <p className="font-heading text-base font-semibold text-[var(--color-text)]">Managed Partnership</p>
                      <p className="text-sm text-[var(--color-text-muted)]">Operate, optimize, and expand on a monthly cadence.</p>
                    </div>
                  </div>
                </div>

                <div data-stage="8" className="stage-enter mt-4 grid grid-cols-12 gap-3">
                  <div className="group relative col-span-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                    <Image
                      src="/program/pods-of-5.jpg"
                      alt="Operators reviewing workflow outputs"
                      width={1200}
                      height={900}
                      className="h-44 w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.05]"
                    />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,color-mix(in_oklch,var(--color-text)_30%,transparent)_100%)]" />
                  </div>
                  <div className="col-span-4 grid gap-3">
                    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                      <Image
                        src="/program/one-weekend.jpg"
                        alt="Hands-on deployment planning session"
                        width={1200}
                        height={900}
                        className="h-[84px] w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                      <Image
                        src="/program/future-ready.jpg"
                        alt="Workflow dashboard visualization"
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

        <Signals variant="businesses" />

        <SectionWrapper id="who" alt className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Who this is for
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Built for teams running high-volume, multi-step work.
            </h2>
            <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              If important workflows are split across inboxes, spreadsheets, SaaS tools, and approvals, this is where
              agentic execution has immediate value.
            </p>
          </RevealOnScroll>

          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
            {fitSegments.map((segment, index) => (
              <RevealOnScroll key={segment.title} delay={index * 90}>
                <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
                  <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--color-text)]">
                    {segment.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)]">{segment.detail}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="what" className="pt-14 md:pt-18">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-12 md:gap-12">
            <RevealOnScroll className="md:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                What we implement
              </p>
              <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
                AI that acts inside your workflows, not beside them.
              </h2>
              <div className="mt-6 space-y-3">
                {operatingModel.map((step, index) => (
                  <RevealOnScroll key={step.title} delay={index * 90}>
                    <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-[var(--shadow-sm)]">
                      <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--color-accent)]">{step.number}</p>
                      <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight text-[var(--color-text)]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-text-muted)]">{step.detail}</p>
                    </article>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="md:col-span-6" delay={120}>
              <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-border)_72%,var(--color-accent)_16%)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Capability lanes
                </p>
                <ul className="mt-4 space-y-2">
                  {capabilities.map((item) => (
                    <li
                      key={item}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_88%,var(--color-bg)_12%)] px-4 py-3 text-sm text-[var(--color-text-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </SectionWrapper>

        <SectionWrapper id="pricing" alt>
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Engagement
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Custom scope, custom pricing
            </h2>
            <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              We do not publish fixed pricing. Scope depends on workflow complexity, system integrations, governance
              requirements, and rollout speed.
            </p>
          </RevealOnScroll>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <RevealOnScroll className="h-full">
              <article className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">Step 1</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Discovery
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Live workflow assessment on your systems</li>
                  <li>Business-priority bottleneck mapping</li>
                  <li>Implementation roadmap and success criteria</li>
                </ul>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={90}>
              <article className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">Step 2</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Delivery
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Production workflow implementation</li>
                  <li>Demos, checkpoints, and handoff docs</li>
                  <li>Guardrails and operating ownership</li>
                </ul>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={180}>
              <article className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">Step 3</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Ongoing improvement
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Monthly optimization and expansion</li>
                  <li>Monitoring, retraining, and quality controls</li>
                  <li>Operator enablement over time</li>
                </ul>
              </article>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={220}>
            <div className="mt-6 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_42%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] p-6 shadow-[var(--shadow-md)]">
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                Contact for pricing
              </h3>
              <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                After discovery, we provide a custom scope and commercial proposal based on your workflows, team
                capacity, and implementation timeline.
              </p>
              <div className="mt-5">
                <Button href={businessCtaHref}>Contact for pricing</Button>
              </div>
              <p className="mt-3 text-xs text-[var(--color-text-faint)]">
                No public rate card. Every engagement is scoped to your operating context.
              </p>
            </div>
          </RevealOnScroll>
        </SectionWrapper>

        <SectionWrapper id="faq">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">FAQ</p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Common questions
            </h2>
          </RevealOnScroll>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                q: "What happens after deployment?",
                a: "We continue to manage and improve the workflows. You get monthly optimization, maintenance, and training so the system keeps getting better instead of collecting dust.",
              },
              {
                q: "What do you mean by managed?",
                a: "We handle deployment, monitoring, and improvement cycles. You get a clear backlog and ship cadence rather than one-and-done implementation.",
              },
              {
                q: "Do we need an internal AI team first?",
                a: "No. We work directly with business operators and function leads. Technical depth can grow over time as value is proven.",
              },
              {
                q: "How do we start?",
                a: "Most teams start with the Discovery Workshop, then move to an Implementation Sprint or ongoing partnership.",
              },
              {
                q: "Who owns workflows and documentation?",
                a: "You do. Ownership and internal handoff are built into delivery.",
              },
              {
                q: "Is this a software license?",
                a: "No. This is an implementation and operating partnership focused on deployed workflows and business outcomes.",
              },
            ].map((item, index) => (
              <RevealOnScroll key={item.q} delay={index * 70}>
                <article className="h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-[var(--color-text)]">{item.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)]">{item.a}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="contact" alt>
          <RevealOnScroll>
            <h2 className="font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Scope your first agentic workflow
            </h2>
            <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Share your current bottlenecks and stack. We will map the fastest path to measurable output and a
              realistic rollout plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={businessCtaHref}>Book a call</Button>
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-faint)]">Prefer email? hello@zerotoagent.com</p>
          </RevealOnScroll>
        </SectionWrapper>
      </main>
    </LenisProvider>
  );
}
