import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
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
        <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-42 md:pb-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="animate-drift absolute -top-28 left-[-100px] h-[420px] w-[420px] rounded-full bg-[color-mix(in_oklch,var(--color-accent)_16%,transparent)] blur-[84px]" />
            <div className="animate-drift-slow absolute top-16 right-[-120px] h-[430px] w-[430px] rounded-full bg-[color-mix(in_oklch,var(--color-accent-2)_14%,transparent)] blur-[90px]" />
          </div>

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
              <RevealOnScroll className="md:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]">
                  For businesses
                </p>
                <h1 className="mt-5 font-heading text-[clamp(40px,5.4vw,76px)] font-bold leading-[0.98] tracking-tight text-[var(--color-text)]">
                  Agentic workflows for
                  <span className="block">real business operations.</span>
                </h1>
                <p className="mt-5 max-w-[66ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                  We deploy AI that acts inside your tools, tied to business outcomes and governed like an operating
                  system. Then we continue improving it after launch.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={businessCtaHref}>Book a call</Button>
                  <Button href="#pricing" variant="secondary">
                    See pricing
                  </Button>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-faint)]">
                  Managed deployment plus ongoing optimization.
                </p>
              </RevealOnScroll>

              <RevealOnScroll className="md:col-span-5" delay={100}>
                <div className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-border)_74%,var(--color-accent)_14%)] bg-[color-mix(in_oklch,var(--color-surface)_86%,transparent)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-sm">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Engagement shape
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                      <p className="font-heading text-base font-semibold text-[var(--color-text)]">Discovery Workshop</p>
                      <p className="text-sm text-[var(--color-text-muted)]">3-hour scope + roadmap + live workflow demo.</p>
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                      <p className="font-heading text-base font-semibold text-[var(--color-text)]">Implementation Sprint</p>
                      <p className="text-sm text-[var(--color-text-muted)]">Ship production workflows with checkpoints.</p>
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                      <p className="font-heading text-base font-semibold text-[var(--color-text)]">Ongoing AI Partnership</p>
                      <p className="text-sm text-[var(--color-text-muted)]">Monthly optimization, maintenance, and expansion.</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

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
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">Pricing</p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Engagement options
            </h2>
            <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Ordered high-to-low to anchor total operating potential, then let you choose your starting point.
            </p>
          </RevealOnScroll>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <RevealOnScroll className="h-full">
              <article className="relative h-full rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_44%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] p-6 shadow-[var(--shadow-lg)]">
                <p className="inline-flex rounded-full border border-[color-mix(in_oklch,var(--color-accent)_38%,var(--color-border))] bg-[var(--color-surface)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Highest leverage
                </p>
                <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Ongoing AI Partnership
                </h3>
                <p className="mt-2 font-heading text-xl text-[var(--color-accent)]">$2,000-$5,000/month</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Monthly optimization backlog and implementation</li>
                  <li>Agent maintenance and monitoring</li>
                  <li>Team training and workflow expansion</li>
                </ul>
                <div className="mt-6">
                  <Button href={businessCtaHref}>Book a call</Button>
                </div>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={90}>
              <article className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Implementation Sprint
                </h3>
                <p className="mt-2 font-heading text-xl text-[var(--color-accent)]">$5,000-$15,000</p>
                <p className="mt-1 text-sm text-[var(--color-text-faint)]">2-4 weeks</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Ship 1-3 production workflows (scoped in discovery)</li>
                  <li>Weekly demos and acceptance checkpoints</li>
                  <li>Guardrails and auditability setup for workflows we ship</li>
                  <li>Operating playbook for internal team handoff</li>
                </ul>
                <div className="mt-6">
                  <Button href={businessCtaHref} variant="secondary">
                    Book a call
                  </Button>
                </div>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={180}>
              <article className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Discovery Workshop
                </h3>
                <p className="mt-2 font-heading text-xl text-[var(--color-accent)]">$500-$1,500</p>
                <p className="mt-1 text-sm text-[var(--color-text-faint)]">3 hours</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Live workflow assessment on your systems</li>
                  <li>Bottleneck audit (where margin/time is leaking)</li>
                  <li>Prioritized automation roadmap</li>
                  <li>Implementation recommendation</li>
                </ul>
                <p className="mt-4 text-sm font-medium text-[var(--color-text)]">100% refund if you aren&apos;t satisfied</p>
                <p className="text-xs text-[var(--color-text-faint)]">Applies to the Discovery Workshop.</p>
                <div className="mt-6">
                  <Button href={businessCtaHref} variant="secondary">
                    Start with Discovery
                  </Button>
                </div>
              </article>
            </RevealOnScroll>
          </div>

          <p className="mt-5 text-sm text-[var(--color-text-faint)]">
            Final scope and quote are set after discovery based on workflow complexity and team capacity.
          </p>
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
