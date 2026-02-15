import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SectionWrapper } from "@/components/SectionWrapper";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";

const businessCtaHref = BUSINESS_CALENDLY_URL || "#contact";

export const metadata: Metadata = {
  title: "Zero-to-Agent for Businesses | Managed Agentic Workflows",
  description:
    "Managed implementation for agentic workflows across operations, sales, support, finance, and procurement teams.",
  openGraph: {
    title: "Zero-to-Agent for Businesses",
    description:
      "Agentic workflows implemented and improved over time across your existing tools.",
    type: "website",
  },
};

export default function BusinessesPage() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <SectionWrapper id="top" className="pt-32 pb-14 md:pt-40">
          <div className="max-w-[80ch]">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              For businesses
            </p>
            <h1 className="mt-3 font-heading font-bold tracking-tight text-[clamp(38px,5vw,68px)] leading-[0.98] text-[var(--color-text)]">
              Put AI agents to work across the tools your team already uses.
            </h1>
            <p className="mt-5 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[66ch]">
              We design, implement, and manage agentic workflows: AI that can take action across your apps with guardrails and measurable outcomes.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)] max-w-[66ch]">
              Start with a 3-hour Discovery Workshop: map bottlenecks and demo one workflow on your systems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={businessCtaHref}>Book a call</Button>
              <Button href="#pricing" variant="secondary">
                See pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-[var(--color-text-faint)]">
              Built for operators who need measurable outcomes, not theory.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper id="who" alt>
          <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
            Who this is for
          </h2>
          <p className="mt-4 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[70ch]">
            Best fit: teams with repeatable, multi-step work spread across too many tools.
          </p>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            <li>Operations leaders who want fewer manual handoffs</li>
            <li>Sales and RevOps teams who want cleaner pipelines and faster follow-up</li>
            <li>Customer support and CS Ops teams who need actions, not just answers</li>
            <li>Finance Ops teams doing reporting, reconciliations, and approvals</li>
            <li>Procurement and supply chain teams handling exceptions and vendor workflows</li>
          </ul>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] max-w-[70ch]">
            If work is stuck in spreadsheets, inboxes, and back-and-forth across systems, this is likely a fit.
          </p>
        </SectionWrapper>

        <SectionWrapper id="what">
          <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
            What we implement
          </h2>
          <p className="mt-4 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[70ch]">
            We build agentic workflows that act inside your existing systems, then continuously improve them.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
              Workflow mapping: we identify the highest-value operational bottlenecks first.
            </article>
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
              Implementation: we deploy workflows directly in your current tooling stack (no rip-and-replace).
            </article>
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
              Enablement: your team gets hands-on training and SOP-level documentation.
            </article>
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
              Ongoing improvement: monthly optimization, monitoring, and expansion to new workflows.
            </article>
          </div>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            <li>CRM hygiene and follow-up tasks that don&apos;t slip</li>
            <li>Support triage with back-office actions</li>
            <li>Reporting and exception alerts across systems</li>
            <li>Quote and document workflows with approvals</li>
          </ul>
        </SectionWrapper>

        <SectionWrapper id="pricing" alt>
          <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
            Pricing
          </h2>
          <p className="mt-4 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[70ch]">
            Three engagement paths, shown in high-to-low order for planning clarity.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
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
            <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
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
            <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
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
          </div>
          <p className="mt-5 text-sm text-[var(--color-text-faint)]">
            Final scope and quote are set after discovery based on workflow complexity and team capacity.
          </p>
        </SectionWrapper>

        <SectionWrapper id="faq">
          <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
            FAQ
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "What happens after deployment?",
                a: "We continue to manage and improve the workflows. You get monthly optimization, maintenance, and training so the system keeps getting better instead of collecting dust.",
              },
              {
                q: "What do you mean by managed?",
                a: "We handle deployment, monitoring, and improvements. You get a backlog and a monthly ship cadence, so value increases after launch rather than stopping at go-live.",
              },
              {
                q: "Do we need a technical team to use this?",
                a: "No. We design for operators and non-technical teams. We handle implementation and give your team practical operating procedures.",
              },
              {
                q: "How do we start?",
                a: "Most teams start with the Discovery Workshop, then choose either an Implementation Sprint or an ongoing partnership.",
              },
              {
                q: "Who owns the workflows and process docs?",
                a: "You do. We provide documentation and training as part of delivery.",
              },
              {
                q: "What do you need from us?",
                a: "A point of contact, access to the tools involved, and feedback during demos. We do the implementation work.",
              },
              {
                q: "Is this a platform purchase?",
                a: "No. It is an implementation and operating partnership. We build the workflows and keep them improving after launch.",
              },
            ].map((item) => (
              <article
                key={item.q}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]"
              >
                <h3 className="font-heading text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  {item.q}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)]">{item.a}</p>
              </article>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="contact" alt>
          <h2 className="font-heading font-bold tracking-tight text-[clamp(30px,3.8vw,48px)] leading-[1.04] text-[var(--color-text)]">
            Let&apos;s scope your first workflow
          </h2>
          <p className="mt-4 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[70ch]">
            Share your bottlenecks and we will map the fastest path to measurable operational gains.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={businessCtaHref}>Book a call</Button>
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-faint)]">Prefer email? hello@zerotoagent.com</p>
        </SectionWrapper>
      </main>
    </LenisProvider>
  );
}
