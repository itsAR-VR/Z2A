import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SectionWrapper } from "@/components/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";

const businessCtaHref = BUSINESS_CALENDLY_URL || "/businesses#contact";

export const metadata: Metadata = {
  title: "OpenClaw | Infrastructure for AI Workflows",
  description:
    "OpenClaw connects AI to your real tools. Z2A sets it up for your business and trains your team to run it.",
  openGraph: {
    title: "OpenClaw by Zero-to-Agent",
    description:
      "Open-source infrastructure that lets your AI run real workflows across email, calendar, Slack, CRM, and more.",
    type: "website",
  },
};

export default function OpenClawPage() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <section id="top" className="hero-terminal-boot relative overflow-hidden pt-32 pb-18 md:pt-44 md:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <div className="hero-orb hero-orb--left animate-drift" />
            <div className="hero-orb hero-orb--right animate-drift-slow" />
            <div className="hero-plane hero-plane--left animate-drift opacity-70" />
            <div className="hero-plane hero-plane--right animate-drift-slow opacity-62" />
          </div>

          <div className="container-content relative z-10">
            <RevealOnScroll>
              <p className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]">
                Built on OpenClaw
              </p>
              <h1 className="mt-5 max-w-[13ch] font-heading text-[clamp(42px,5.6vw,74px)] font-bold leading-[0.96] tracking-tight text-[var(--color-text)] text-balance">
                Your AI needs a place to live. This is it.
              </h1>
              <p className="mt-5 max-w-[72ch] text-[15px] leading-relaxed text-[color-mix(in_oklch,var(--color-text-muted)_72%,var(--color-text)_28%)] md:text-lg text-pretty">
                OpenClaw is the open-source system that connects AI to your real tools — email, calendar, Slack, CRM,
                and more. Z2A builds it for your business and trains your team to run it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#what-is-openclaw" variant="secondary">
                  See how it works
                </Button>
                <Button href={businessCtaHref}>Book a call</Button>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <SectionWrapper id="what-is-openclaw" className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              What it is
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              What OpenClaw actually is
            </h2>
            <div className="mt-4 max-w-[74ch] space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              <p>
                You&apos;ve probably used ChatGPT. It&apos;s great at answering questions and writing things. But it can&apos;t log
                into your tools, update your records, or send emails on your behalf. It just sits there until you ask
                it something.
              </p>
              <p>OpenClaw bridges that gap.</p>
              <p>
                It runs on your server (or one we set up for you) and connects your AI to the tools your business
                already uses — email, calendar, Slack, your CRM, your project management software. Once connected,
                your AI can actually <em>do</em> things. Check the inbox. Update a record. Send a follow-up. Generate a
                weekly summary and post it to Slack.
              </p>
              <p>It&apos;s the difference between an AI that gives you advice and an AI that does the work.</p>
              <p>
                OpenClaw is open-source — no licensing fees for the infrastructure, no getting trapped with one
                vendor, and full visibility into how it works. It&apos;s built to be owned by your business, not rented
                from a subscription.
              </p>
            </div>
          </RevealOnScroll>
        </SectionWrapper>

        <SectionWrapper id="why-not-built-in" alt className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Why businesses need it
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Why not just use the built-in AI tools?
            </h2>
            <div className="mt-4 max-w-[74ch] space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              <p>
                Most AI add-ons in business software are fine for one thing: summarizing emails in Gmail, drafting
                responses in your CRM. They&apos;re narrow. They don&apos;t talk to each other. And they don&apos;t handle multi-step
                work across tools.
              </p>
              <p>
                When a lead fills out your form, you might need the AI to check their website, add them to your CRM,
                assign a sales rep, draft a personalized email, and set a reminder. No single built-in AI tool does
                all of that.
              </p>
              <p>OpenClaw can, because it connects across all your tools at once.</p>
              <p>
                There&apos;s also a data question. When you use closed AI tools, your business data — customer records,
                internal docs, email history — flows through servers you don&apos;t control, under terms they can change
                anytime. With OpenClaw, you choose what the AI can access. You own the infrastructure. Your data stays
                where you put it.
              </p>
            </div>
          </RevealOnScroll>
        </SectionWrapper>

        <SectionWrapper id="how-we-use-it" className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              How Z2A uses OpenClaw
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              How we use it to build your AI workflows
            </h2>
            <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              OpenClaw is the platform. Z2A is the team that sets it up, connects it to your tools, and builds your
              first real workflows.
            </p>
          </RevealOnScroll>

          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              "We talk about your work — What takes too long? What gets missed? Where does the team waste time on repetitive work?",
              "We pick the right workflows — Not everything should be automated. We find the 2-3 that will save the most time in the first 30 days.",
              "We set up OpenClaw — Installed, connected to your tools, secured.",
              "We build and test the workflows — You see them run before we hand anything over.",
              "We train your team — Not a slide deck. Live, in your system, with your actual workflows.",
              "You own it — We leave you with documentation, access, and a team that knows how to keep building.",
            ].map((item, index) => (
              <RevealOnScroll key={item} delay={index * 80}>
                <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)] text-pretty">{item}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={220}>
            <p className="mt-5 text-sm text-[var(--color-text-faint)]">
              Most businesses have their first workflow running within two weeks of starting.
            </p>
          </RevealOnScroll>
        </SectionWrapper>

        <SectionWrapper id="learn-it" alt className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              For individuals
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Want to learn it yourself? Here&apos;s how.
            </h2>
            <div className="mt-4 max-w-[74ch] space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              <p>The weekend workshop teaches OpenClaw setup from zero.</p>
              <p>
                You don&apos;t need to be a developer. You need a laptop, a few hours, and a workflow you want to
                automate. We walk through installation, connecting your tools, and building an agent that actually
                runs.
              </p>
              <p>By Sunday afternoon, you have a working setup and enough to keep going on your own.</p>
              <p>
                Groups of 5. In-person, Toronto. Small enough that everyone gets hands-on time — not just a seat in a
                room watching someone else work.
              </p>
            </div>
          </RevealOnScroll>
        </SectionWrapper>

        <SectionWrapper id="proof" className="pt-14 md:pt-18">
          <RevealOnScroll>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Social proof
            </p>
            <h2 className="mt-3 font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Built for businesses that want to own their AI — not rent it.
            </h2>
            <div className="mt-4 max-w-[74ch] space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              <p>
                OpenClaw is open-source. Every workflow you build, every integration you set up, every hour your team
                saves — that&apos;s yours. Not tied to a subscription. Not disappearing if a vendor changes their pricing.
              </p>
              <p>
                We run Z2A on it. We teach it because we trust it. We set it up for businesses because we know how to
                make it reliable.
              </p>
              <p className="text-sm md:text-base italic">
                [Placeholder: Add 1-2 short testimonials here when available. Ideal format: "We had [X workflow]
                running in [Y days]. The team actually uses it." — Name, Role, Company]
              </p>
            </div>
          </RevealOnScroll>
        </SectionWrapper>

        <SectionWrapper id="cta" alt className="pt-14 md:pt-18">
          <RevealOnScroll>
            <h2 className="font-heading text-[clamp(30px,4vw,52px)] font-bold leading-[1.03] tracking-tight text-[var(--color-text)]">
              Ready to stop talking about AI and start running it?
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">For businesses</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)] text-pretty">
                  Book a 30-minute call. We&apos;ll look at your workflows and tell you what makes sense to automate first.
                </p>
                <div className="mt-5">
                  <Button href={businessCtaHref}>Book a call →</Button>
                </div>
              </article>

              <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">For individuals</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)] text-pretty">
                  Join the next weekend workshop in Toronto. Seats fill fast — we cap every session at 5.
                </p>
                <div className="mt-5">
                  <Button href="/individuals">See workshop dates →</Button>
                </div>
              </article>
            </div>
          </RevealOnScroll>
        </SectionWrapper>
      </main>
      <SiteFooter />
    </LenisProvider>
  );
}
