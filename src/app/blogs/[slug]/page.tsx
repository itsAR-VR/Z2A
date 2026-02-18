import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/Button";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs-data";

type BlogPageParams = {
  slug: string;
};

type BlogPageProps = {
  params: Promise<BlogPageParams>;
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams(): BlogPageParams[] {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolved = await params;
  const post = getBlogBySlug(resolved.slug);

  if (!post) {
    return {
      title: "Blog Not Found | Zero-to-Agent",
    };
  }

  return {
    title: `${post.title} | Zero-to-Agent Blogs`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const resolved = await params;
  const post = getBlogBySlug(resolved.slug);

  if (!post) {
    notFound();
  }

  return (
    <LenisProvider>
      <Nav />
      <main>
        <section id="top" className="relative overflow-hidden pt-32 pb-18 md:pt-42 md:pb-22">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-orb hero-orb--left animate-drift" />
            <div className="hero-orb hero-orb--right animate-drift-slow" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
            <div className="hero-frost-overlay hero-frost-overlay--horizon" />
          </div>
          <div className="container-content relative z-10">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to blogs
            </Link>
            <p className="mt-5 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
            </p>
            <h1 className="mt-3 max-w-[20ch] font-heading text-[clamp(36px,4.8vw,64px)] font-bold leading-[0.98] tracking-tight text-[var(--color-text)] text-balance">
              {post.title}
            </h1>
            <p className="mt-4 max-w-[72ch] text-[16px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[12px] text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-[var(--radius-lg)] border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] p-4">
              <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-[var(--color-text-faint)]">Headline Signal</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{post.heroStat}</p>
            </div>
          </div>
        </section>

        <section className="section-padding pt-2">
          <div className="container-content">
            <article className="mx-auto max-w-[860px]">
              <div className="space-y-8">
                {post.sections.map((section) => (
                  <section
                    key={`${post.slug}-${section.heading}`}
                    className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] md:p-8"
                  >
                    <h2 className="font-heading text-[30px] font-semibold leading-[1.08] tracking-tight text-[var(--color-text)]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-[var(--color-text-muted)]">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${post.slug}-${section.heading}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 space-y-2">
                        {section.bullets.map((item) => (
                          <li key={`${post.slug}-${section.heading}-${item}`} className="flex gap-3 text-[15px] text-[var(--color-text-muted)]">
                            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <section className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] md:p-8">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">Bottom Line</p>
                <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-text-muted)]">{post.takeaway}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/individuals">Build Your First Workflow</Button>
                  <Button href="/apply" variant="secondary">
                    Apply for Zero-to-Agent
                  </Button>
                </div>
              </section>

            </article>
          </div>
        </section>
      </main>
    </LenisProvider>
  );
}
