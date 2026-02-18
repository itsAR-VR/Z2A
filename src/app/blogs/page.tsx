import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { getAllBlogs } from "@/lib/blogs-data";

export const metadata: Metadata = {
  title: "Zero-to-Agent Blogs | Operator Playbooks for AI Execution",
  description:
    "73 field-tested operator blog posts adapted for Zero-to-Agent. Practical AI execution frameworks for teams that need measurable outcomes.",
  openGraph: {
    title: "Zero-to-Agent Blogs",
    description:
      "Operator-first AI execution posts adapted for teams that need practical workflow outcomes.",
    type: "website",
  },
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <LenisProvider>
      <Nav />
      <main>
        <section id="top" className="relative overflow-hidden pt-32 pb-18 md:pt-44 md:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-orb hero-orb--left animate-drift" />
            <div className="hero-orb hero-orb--right animate-drift-slow" />
            <div className="hero-plane hero-plane--left animate-drift opacity-60" />
            <div className="hero-plane hero-plane--right animate-drift-slow opacity-55" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
            <div className="hero-frost-overlay hero-frost-overlay--horizon hero-frost-overlay--soft-bottom" />
          </div>
          <div className="container-content relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_34%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Blog Library
            </p>
            <h1 className="mt-5 max-w-[16ch] font-heading text-[clamp(40px,5.2vw,70px)] font-bold leading-[0.96] tracking-tight text-[var(--color-text)] text-balance">
              Real operator playbooks for the AI transition
            </h1>
            <p className="mt-5 max-w-[70ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg text-pretty">
              This section delivers a full operator blog corpus rewritten for Zero-to-Agent with a direct execution
              angle: lead with facts, identify winners, make the market claim, and show how teams can act now.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
                {posts.length} posts
              </div>
              <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
                Randomized earlier publication dates
              </div>
              <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
                Adapted for Zero-to-Agent execution
              </div>
            </div>
          </div>
        </section>

        <section id="library" className="section-padding pt-2">
          <div className="container-content">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1 hover:border-[color-mix(in_oklch,var(--color-accent)_34%,var(--color-border-strong))] hover:shadow-[var(--shadow-md)]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_12%,transparent)] blur-2xl opacity-70 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                  <div className="relative z-10">
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-text-faint)]">
                      {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
                    </p>
                    <h2 className="mt-3 font-heading text-[25px] font-semibold leading-[1.08] tracking-tight text-[var(--color-text)]">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-faint)]">{post.heroStat}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${post.slug}-${tag}`}
                          className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] text-[var(--color-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-600)]"
                    >
                      Read article
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="section-padding pt-4">
          <div className="container-content">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] md:p-8">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                Adaptation Method
              </p>
              <h2 className="mt-3 font-heading text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.04] tracking-tight text-[var(--color-text)]">
                Source-grounded topics. Zero-to-Agent execution angle.
              </h2>
              <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
                Every post was rewritten around the same four-step operating narrative: facts first, then the behavior
                pattern of current winners, then the market-level claim, then a practical path to implementation. We
                also fused insights from the local scraped-courses corpus to strengthen context-engineering, workflow
                design, and execution guidance.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/individuals">See Individuals Program</Button>
                <Button href="/apply" variant="secondary">
                  Apply for Next Cohort
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LenisProvider>
  );
}
