import Link from "next/link";

type LegalPageShellProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageShell({ title, description, lastUpdated, children }: LegalPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb--left animate-drift" />
        <div className="hero-orb hero-orb--right animate-drift-slow" />
        <div className="hero-plane hero-plane--left animate-drift opacity-65" />
        <div className="hero-plane hero-plane--right animate-drift-slow opacity-55" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <div className="hero-frost-overlay hero-frost-overlay--horizon hero-frost-overlay--soft-bottom" />
      </div>

      <div className="container-content relative z-10 py-28 md:py-34">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to site
          </Link>

          <Link
            href="/"
            className="font-heading text-[15px] font-semibold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
          >
            Zero-to-Agent
          </Link>
        </div>

        <p className="mt-9 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">Legal</p>
        <h1 className="mt-3 max-w-[18ch] font-heading text-[clamp(34px,4.4vw,56px)] font-bold leading-[0.98] tracking-tight text-[var(--color-text)]">
          {title}
        </h1>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
          {description}
        </p>
        <p className="mt-3 text-xs text-[var(--color-text-faint)]">Last updated: {lastUpdated}</p>

        <article className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] md:p-8">
          <div className="space-y-8 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
