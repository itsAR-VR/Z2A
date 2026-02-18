import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { StageTimeline } from "@/components/motion/StageTimeline";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { BusinessOrchestrationLoop } from "@/components/BusinessOrchestrationLoop";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";

const businessCtaHref = BUSINESS_CALENDLY_URL || "#contact";

export const metadata: Metadata = {
  title: "Zero-to-Agent for Businesses | AI Setup + Enablement",
  description:
    "Free 30-minute discovery, a 3-hour in-person AI Enablement Workshop, and done-for-you setup + operator training inside your existing tools.",
  openGraph: {
    title: "Zero-to-Agent for Businesses",
    description:
      "We set up AI inside your current tools, train your team to use it, and keep improving what works.",
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
    title: "Discovery (30 min)",
    detail:
      "We pick one workflow, collect examples (emails, sheets, docs), constraints, and success criteria for a credible live demo.",
  },
  {
    number: "02",
    title: "AI Enablement Workshop (3h, in-person)",
    detail:
      "AI basics, tool map (ChatGPT/Claude), prompt formula (Intent/Context/Process/Outcome), and live exercises on your real work.",
  },
  {
    number: "03",
    title: "Done-for-you setup + enablement",
    detail:
      "We set up accounts, connect Google Drive/Gmail/Calendar/Slack/CRM, build templates + SOPs, and ship a rollout plan.",
  },
];

const capabilities = [
  "Tool selection + team setup (access, usage norms)",
  "Prompt library + context docs (pricing rules, policies, voice)",
  "Connectors to Google Drive/Gmail/Calendar/Slack/CRM",
  "Quick-win workflows (email drafting, reporting, SOP generation)",
  "Operator training + handoff documentation",
  "Optional monthly improvement cadence (tune-ups)",
];

export default function BusinessesPage() {
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
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
              <div className="relative md:col-span-7">
                <p
                  data-stage="1"
                  className="stage-enter inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]"
                >
                  For businesses
                </p>
                <div data-stage="1.5" className="stage-enter mt-4">
                  <a href="#contact" className="offer-ticker group block rounded-[var(--radius-md)]">
                    <div className="offer-ticker__track" aria-hidden="true">
                      <span>Discovery calls open</span>
                      <span>Implementation inside your existing stack</span>
                      <span>Operator enablement included</span>
                      <span>Contact for pricing</span>
                      <span>Custom-scoped engagements only</span>
                      <span>Book discovery call</span>
                      <span>Discovery calls open</span>
                      <span>Implementation inside your existing stack</span>
                      <span>Operator enablement included</span>
                      <span>Contact for pricing</span>
                      <span>Custom-scoped engagements only</span>
                      <span>Book discovery call</span>
                    </div>
                    <span className="sr-only">
                      Discovery calls are open. We implement inside your existing stack with operator enablement and
                      custom-scoped pricing.
                    </span>
                  </a>
                </div>
                <h1
                  data-stage="2"
                  className="stage-enter mt-5 max-w-[12ch] font-heading text-[clamp(42px,5.6vw,74px)] font-bold leading-[0.96] tracking-tight text-[var(--color-text)] text-balance"
                >
                  Put AI agents to work
                  <span className="block text-[var(--color-text)]">
                    across tools your team already uses.
                  </span>
                </h1>
                <p
                  data-stage="3"
                  className="stage-enter mt-5 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)] md:text-lg text-pretty"
                >
                  We map one high-friction workflow first, then implement inside your stack so operators can move
                  faster with fewer handoffs, fewer follow-up misses, and clearer reporting.
                </p>
                <div data-stage="3.5" className="stage-enter mt-4 flex flex-wrap gap-2">
                  {[
                    "CRM follow-up that does not slip",
                    "Support triage with action paths",
                    "Reporting and approval loops",
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div data-stage="4" className="stage-enter mt-8 flex flex-wrap items-center gap-3">
                  <Button href={businessCtaHref}>Book discovery call</Button>
                  <Button href="#pricing" variant="secondary">
                    How pricing works
                  </Button>
                </div>
                <p
                  data-stage="5"
                  className="stage-enter mt-4 text-sm text-[color-mix(in_oklch,var(--color-text-faint)_72%,var(--color-text-muted)_28%)]"
                >
                  Start with a free 30-minute discovery and leave with a scoped implementation path.
                </p>
              </div>

              <div data-stage="7" className="stage-enter md:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_92%,var(--color-bg)_8%)] p-6 shadow-[var(--shadow-sm)]">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    How this works
                  </p>
                  <ol className="mt-4 space-y-4">
                    {[
                      {
                        label: "30-min Discovery (free)",
                        detail: "Map one workflow, collect sample inputs, and define demo success criteria.",
                      },
                      {
                        label: "AI Enablement Workshop (3h, in-person)",
                        detail: "Teach AI clearly, demo current tools, and run live exercises on your actual work.",
                      },
                      {
                        label: "Done-for-you setup + enablement",
                        detail: "Configure access, connect tools, create SOPs/templates, and train operators.",
                      },
                    ].map((item, index) => (
                      <li
                        key={item.label}
                        className="grid grid-cols-[28px_1fr] gap-3 border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0"
                      >
                        <span className="inline-flex size-7 items-center justify-center rounded-full border border-[color-mix(in_oklch,var(--color-accent)_34%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] font-mono text-[10px] tracking-[0.1em] text-[var(--color-accent)]">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-heading text-base font-semibold text-[var(--color-text)]">{item.label}</p>
                          <p className="text-sm leading-relaxed text-[var(--color-text-muted)] text-pretty">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 text-xs text-[var(--color-text-faint)]">Optional monthly improvement cadence after setup.</p>
                </div>
                <div data-stage="7.5" className="stage-enter mt-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Business orchestration loop
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Scope one workflow, enable operators, deploy inside your stack, and iterate with real metrics.
                  </p>
                  <BusinessOrchestrationLoop className="mt-2" />
                </div>
              </div>
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
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              If important workflows are split across inboxes, spreadsheets, SaaS tools, and approvals, this is where
              agentic execution has immediate value.
            </p>
          </RevealOnScroll>

          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
            {fitSegments.map((segment, index) => (
              <RevealOnScroll key={segment.title} delay={index * 90}>
                <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
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
                What we set up
              </p>
              <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
                AI that runs inside your current tools.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)] text-pretty">
                We focus on copilots + automations first, and use agents only where they are operationally safe.
              </p>
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
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Capability lanes
                </p>
                <ul className="mt-4 space-y-3">
                  {capabilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      <span className="mt-1 inline-flex size-4 shrink-0 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_18%,var(--color-surface))]" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    What we need from you
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-text-muted)]">
                    <li>One workflow owner for decisions.</li>
                    <li>Sample inputs and outputs from the current process.</li>
                    <li>Access to the tools where work already happens.</li>
                  </ul>
                </div>
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
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "No rip-and-replace platform",
                "Operator training included",
                "Discovery before commercial scope",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </RevealOnScroll>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <RevealOnScroll className="h-full">
              <article className="workflow-stage-card h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="workflow-stage-card__eyebrow font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Step 1
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  30-minute discovery (free)
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Workflow selection</li>
                  <li>Sample collection</li>
                  <li>Success criteria</li>
                  <li>Demo prep</li>
                </ul>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={90}>
              <article className="workflow-stage-card h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="workflow-stage-card__eyebrow font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Step 2
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  AI Enablement Workshop (3h, in-person)
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>AI landscape explained simply</li>
                  <li>Prompt formula: Intent + Context + Process + Outcome</li>
                  <li>Connect tools: ChatGPT/Claude + Google workspace + Slack + CRM</li>
                  <li>Live exercises: email, reports, SOPs</li>
                  <li>Quick-win use case list</li>
                </ul>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={180}>
              <article className="workflow-stage-card h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="workflow-stage-card__eyebrow font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Step 3
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Done-for-you setup + enablement
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Configure tools</li>
                  <li>Connectors across your stack</li>
                  <li>Templates + SOPs</li>
                  <li>Operator training</li>
                  <li>Optional monthly improvement</li>
                </ul>
              </article>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={220}>
            <div className="mt-6 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-accent)_28%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_4%,var(--color-surface))] p-6 shadow-[var(--shadow-sm)]">
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                Contact for pricing
              </h3>
              <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                After discovery, we provide a custom scope and commercial proposal based on your workflows, team
                readiness, and setup depth.
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
                q: "What happens after setup?",
                a: "Optional managed improvement cadence: tune prompts, expand workflows, and train new operators over time.",
              },
              {
                q: "How quickly will we see a first result?",
                a: "Most teams see a first production workflow after discovery + initial setup, then expand from that base in structured cycles.",
              },
              {
                q: "Do you build custom software/tools?",
                a: "No by default. We set up best-in-class tools inside your stack and teach your team to run them. If custom software is the right next step, we scope it separately.",
              },
              {
                q: "What do you need from us?",
                a: "One workflow plus a few real examples (emails, reports, docs) and the tools you use today.",
              },
              {
                q: "How do we start?",
                a: "Most teams start with a free 30-minute discovery, then an in-person AI Enablement Workshop, then done-for-you setup + enablement.",
              },
              {
                q: "Who owns workflows and documentation?",
                a: "You do. Ownership and internal handoff are built into delivery.",
              },
              {
                q: "Is this a software license?",
                a: "No. This is a setup + enablement partnership focused on workflows and measurable business outcomes.",
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
              Scope your first AI workflow setup
            </h2>
            <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              Share your current bottlenecks and stack. We map the fastest route to measurable output and return a
              practical scope your team can execute without adding tool chaos.
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Book a 30-minute discovery call",
                "Receive scoped plan + commercial proposal within 48 hours",
                "Confirm workshop date and setup kickoff",
              ].map((step, index) => (
                <li
                  key={step}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)]"
                >
                  <span className="mr-2 font-mono text-[11px] tracking-[0.12em] text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={businessCtaHref}>Book discovery call</Button>
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-faint)]">Prefer email? hello@zerotoagent.com</p>
          </RevealOnScroll>
        </SectionWrapper>
      </main>
    </LenisProvider>
  );
}
