"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Button } from "./Button";

const navLinks = [
  { id: "why", label: "Why" },
  { id: "speakers", label: "Speakers" },
  { id: "outcomes", label: "Outcomes" },
  { id: "how", label: "How" },
  { id: "agenda", label: "Agenda" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const sectionIds = ["top", ...navLinks.map((l) => l.id), "apply"];

export function Nav() {
  const activeId = useScrollSpy(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const firstOverlayLinkRef = useRef<HTMLAnchorElement | null>(null);
  const prevMenuOpenRef = useRef(false);

  useEffect(() => {
    const wasOpen = prevMenuOpenRef.current;
    if (menuOpen && !wasOpen) {
      // Focus first link when opening.
      firstOverlayLinkRef.current?.focus();
    } else if (!menuOpen && wasOpen) {
      // Restore focus to the menu button when closing.
      menuButtonRef.current?.focus();
    }
    prevMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ESC closes the overlay menu.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function trapFocus(e: React.KeyboardEvent) {
    if (!menuOpen || e.key !== "Tab") return;
    const root = overlayRef.current;
    if (!root) return;
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("aria-hidden"));

    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container-content pt-4">
          <div className="mx-auto flex items-center justify-between gap-3 rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_78%,transparent)] backdrop-blur-md shadow-[var(--shadow-sm)] px-3 py-2">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading font-bold text-[15px] tracking-tight text-[var(--color-text)] hover:text-[color-mix(in_oklch,var(--color-accent)_70%,var(--color-text))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-full px-3 py-2"
            >
              Zero-to-Agent
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                    activeId === link.id
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Button href="/apply" className="text-[13px] px-4 py-2">
                Apply
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              type="button"
              className="md:hidden inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span>Menu</span>
              {menuOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-[color-mix(in_oklch,var(--color-bg)_84%,black)] backdrop-blur-sm"
          onKeyDown={trapFocus}
        >
          <div className="container-content pt-24 pb-10">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] p-6">
              <div className="flex items-center justify-between gap-3 mb-6">
                <p className="font-heading font-semibold text-[13px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                  Navigate
                </p>
                <button
                  type="button"
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.id}
                    ref={idx === 0 ? firstOverlayLinkRef : undefined}
                    href={`#${link.id}`}
                    className={`rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-4 font-heading text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] ${
                      activeId === link.id
                        ? "text-[var(--color-accent)] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))]"
                        : "text-[var(--color-text)] hover:bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-col gap-3">
                <Button href="/apply" onClick={() => setMenuOpen(false)} className="w-full justify-center">
                  Apply / Reserve Seat
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Limited to 50 seats. Toronto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
