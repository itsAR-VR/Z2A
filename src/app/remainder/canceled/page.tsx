import Link from "next/link";

export default function RemainderCanceledPage() {
  return (
    <main className="min-h-screen">
      <div className="container-content pt-28 pb-20">
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

