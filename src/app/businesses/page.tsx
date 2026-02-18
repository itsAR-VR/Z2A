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
  title: "Zero-to-Agent for Businesses | AI Setup + Training",
  description:
    "Free 30-minute call, a 3-hour in-person AI workshop, and hands-on setup + team training inside the tools you already use.",
  openGraph: {
    title: "Zero-to-Agent for Businesses",
    description:
      "We set up AI in the tools you already use, train your team, and keep improving what works.",
    type: "website",
  },
};

const fitSegments = [
  {
    title: "Operations and process teams",
    detail: "Cut handoffs, reduce rework, and keep operations moving.",
  },
  {
    title: "Revenue and support organizations",
    detail: "Keep follow-ups and support moving without adding headcount.",
  },
  {
    title: "Finance and procurement functions",
    detail: "Automate regular reports, document handling, reconciliations, and approvals.",
  },
  {
    title: "Leadership teams scaling work",
    detail: "Turn scattered AI tests into a clear system tied to business metrics.",
  },
];

const operatingModel = [
  {
    number: "01",
    title: "Discovery (30 min)",
    detail:
      "Pick one workflow. Review real examples: emails, sheets, docs. Agree on constraints and what success looks like for a live demo.",
  },
  {
    number: "02",
    title: "AI Workshop (3h, in-person)",
    detail:
      "AI basics in plain English. When to use ChatGPT vs Claude. A simple prompt template. Live practice on your real work.",
  },
  {
    number: "03",
    title: "Hands-on setup + training",
    detail:
      "Set up accounts. Connect Drive, Gmail, Calendar, Slack, and your CRM. Create templates and step-by-step guides. Deliver a rollout plan.",
  },
];

const capabilities = [
  "Pick the right tools + set up team access",
  "Prompt library + simple reference docs (rules, policies, tone)",
  "Connect Drive, Gmail, Calendar, Slack, and your CRM",
  "Quick wins: draft emails, create reports, write step-by-step guides",
  "Team training + handoff docs",
  "Optional monthly tune-ups",
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
                <h1
                  data-stage="2"
                  className="stage-enter mt-5 max-w-[12ch] font-heading text-[clamp(42px,5.6vw,74px)] font-bold leading-[0.96] tracking-tight text-[var(--color-text)] text-balance"
                >
                  Put AI to work
                  <span className="block text-[var(--color-text)]">
                    in the tools your team already uses.
                  </span>
                </h1>
                <p
                  data-stage="3"
                  className="stage-enter mt-5 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)] md:text-lg text-pretty"
                >
                  We start with one process that wastes time. Then we set it up in your tools so your team moves
                  faster, misses fewer follow-ups, and gets clearer reporting.
                </p>
                <div data-stage="3.5" className="stage-enter mt-4 flex flex-wrap gap-2">
                  {[
                    "Sales follow-up that doesn’t slip",
                    "Support inbox sorted and routed",
                    "Reports and approvals that move",
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
                  Start with a free 30-minute call and leave with a clear plan for one workflow.
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
                        detail: "Pick one workflow, review real examples, and agree on what success looks like.",
                      },
                      {
                        label: "AI Workshop (3h, in-person)",
                        detail: "Learn the basics in plain English and practice on your real work.",
                      },
                      {
                        label: "Hands-on setup + training",
                        detail: "Set up access, connect tools, create templates, and train your team.",
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
                  <p className="mt-3 text-xs text-[var(--color-text-faint)]">Optional monthly tune-ups after setup.</p>
                </div>
                <div data-stage="7.5" className="stage-enter mt-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                    Improvement loop
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Pick one workflow. Train your team. Set it up. Improve it with real numbers.
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
              Built for teams with lots of repeat work.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              If your work is spread across email, spreadsheets, apps, and approvals, AI can help right away.
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
                We start with simple helpers and automations. We only use agents when it’s safe day to day.
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
                  What we can set up
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
                    <li>One owner to make decisions.</li>
                    <li>A few real examples from the current process.</li>
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
              Pricing depends on scope
            </h2>
            <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              We don’t publish a price list. Price depends on how hard the workflow is, which tools we connect, your
              security and approval needs, and how fast you want to roll it out.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "No need to replace your tools",
                "Training included",
                "We scope it with you first",
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
                  <li>Pick the workflow</li>
                  <li>Gather examples</li>
                  <li>Define success</li>
                  <li>Prep the demo</li>
                </ul>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={90}>
              <article className="workflow-stage-card h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="workflow-stage-card__eyebrow font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Step 2
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  AI Workshop (3h, in-person)
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>AI basics in plain English</li>
                  <li>A simple prompt template you can reuse</li>
                  <li>Connect tools: ChatGPT/Claude + Google Workspace + Slack + CRM</li>
                  <li>Practice: emails, reports, step-by-step guides</li>
                  <li>Quick-win list to try next</li>
                </ul>
              </article>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" delay={180}>
              <article className="workflow-stage-card h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="workflow-stage-card__eyebrow font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Step 3
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Hands-on setup + training
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li>Set up accounts and access</li>
                  <li>Connect your tools</li>
                  <li>Templates + step-by-step guides</li>
                  <li>Train your team</li>
                  <li>Optional monthly tune-ups</li>
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
                After discovery, we send a clear scope and price based on your workflow, your team, and how much
                setup you want.
              </p>
              <div className="mt-5">
                <Button href={businessCtaHref}>Contact for pricing</Button>
              </div>
              <p className="mt-3 text-xs text-[var(--color-text-faint)]">
                No public rate card. Every engagement is scoped to your context.
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
                a: "If you want, we can keep helping each month: improve prompts, add workflows, and train new team members.",
              },
              {
                q: "How quickly will we see a first result?",
                a: "Most teams get a first workflow running after discovery and initial setup. Then you add more from that base.",
              },
              {
                q: "Do you build custom software/tools?",
                a: "Usually no. We set up proven tools inside what you already use and teach your team to run them. If custom software is the right next step, we plan it separately.",
              },
              {
                q: "What do you need from us?",
                a: "One workflow, a few real examples (emails, reports, docs), and access to the tools you use today.",
              },
              {
                q: "How do we start?",
                a: "Most teams start with a free 30-minute call, then an in-person workshop, then hands-on setup + training.",
              },
              {
                q: "Who owns workflows and documentation?",
                a: "You do. Ownership and handoff are built into delivery.",
              },
              {
                q: "Is this a software license?",
                a: "No. This is a setup + training engagement focused on workflows and business results.",
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
              Plan your first AI workflow
            </h2>
            <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              Tell us where work gets stuck and what tools you use today. We’ll map the simplest path to a workflow
              that saves time, without adding new tools.
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Book a 30-minute discovery call",
                "Get a clear plan + price within 48 hours",
                "Pick a workshop date and start setup",
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
