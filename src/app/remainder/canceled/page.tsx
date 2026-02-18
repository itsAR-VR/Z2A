import Link from "next/link";

export default function RemainderCanceledPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb--left animate-drift" />
        <div className="hero-orb hero-orb--right animate-drift-slow" />
        <div className="hero-orb hero-orb--center animate-drift" />
        <div className="hero-plane hero-plane--left animate-drift opacity-70" />
        <div className="hero-plane hero-plane--right animate-drift-slow opacity-62" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <div className="hero-frost-overlay hero-frost-overlay--horizon" />
      </div>

      <div className="container-content relative z-10 pt-28 pb-20">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
          Payment
        </p>
        <h1 className="mt-3 font-heading font-bold tracking-tight text-[clamp(30px,3.2vw,44px)] leading-[1.05] text-[var(--color-text)]">
          Checkout canceled
        </h1>
        <p className="mt-3 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[70ch]">
          No payment was authorized. If you still need to complete the remainder, head back to
          check-in and we&apos;ll restart checkout.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          >
            Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}
