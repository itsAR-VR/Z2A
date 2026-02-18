"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerNavigation = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/businesses", label: "Businesses" },
  { href: "/apply", label: "Apply" },
  { href: "/blogs", label: "Blogs" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
];

function shouldHideFooter(pathname: string): boolean {
  return pathname.startsWith("/admin");
}

export function SiteFooter() {
  const pathname = usePathname();

  if (shouldHideFooter(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_75%,var(--color-bg)_25%)]">
      <div className="container-content py-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-heading text-[22px] font-semibold tracking-tight text-[var(--color-text)]">
              Zero-to-Agent
            </p>
            <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              In-person weekend workshop for PMs, operators, and builder-minded teams. Learn the tools, ship one real
              workflow, and leave with a rollout plan.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Toronto cohort", "Limited to 50 seats", "Stripe checkout"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[11px] text-[var(--color-text-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">Explore</p>
            <ul className="mt-3 space-y-2">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links" className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">Legal</p>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">Contact</p>
            <a
              href="mailto:hello@zerotoagent.com"
              className="mt-3 inline-block text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              hello@zerotoagent.com
            </a>
            <p className="mt-2 text-sm text-[var(--color-text-faint)]">Toronto, ON</p>
            <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-faint)]">
              Payments are processed by Stripe. We do not store full card details.
            </p>
          </div>
        </div>

        <div className="mt-9 border-t border-[var(--color-border)] pt-4">
          <p className="text-xs text-[var(--color-text-faint)]">
            &copy; {new Date().getFullYear()} Zero-to-Agent. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-faint)]">
            Zero-to-Agent is a trademark of its owner. All other trademarks, service marks, and logos belong to their
            respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
