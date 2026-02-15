"use client";

import { useState, useEffect, useRef, useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";
import { Button } from "./Button";

type NavAnchor = {
  id: string;
  label: string;
};

type PageLink = {
  href: string;
  label: string;
};

type PageConfig = {
  anchors: NavAnchor[];
  ctaLabel: string;
  ctaHref: string;
  ctaEventSource: string;
  menuNote: string;
};

const pageLinks: PageLink[] = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/businesses", label: "Businesses" },
];

const homeAnchors: NavAnchor[] = [
  { id: "vision", label: "Vision" },
  { id: "programs", label: "Programs" },
  { id: "principles", label: "Principles" },
];

const individualsAnchors: NavAnchor[] = [
  { id: "why", label: "Why" },
  { id: "speakers", label: "Speakers" },
  { id: "how", label: "How" },
  { id: "agenda", label: "Agenda" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const businessesAnchors: NavAnchor[] = [
  { id: "who", label: "Who" },
  { id: "what", label: "What" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const fallbackBusinessCta = "#contact";

function getPageConfig(pathname: string): PageConfig {
  if (pathname.startsWith("/individuals")) {
    return {
      anchors: individualsAnchors,
      ctaLabel: "Apply",
      ctaHref: "/apply",
      ctaEventSource: "nav_individuals",
      menuNote: "Limited to 50 seats in Toronto.",
    };
  }

  if (pathname.startsWith("/businesses")) {
    return {
      anchors: businessesAnchors,
      ctaLabel: "Book a call",
      ctaHref: BUSINESS_CALENDLY_URL || fallbackBusinessCta,
      ctaEventSource: "nav_businesses",
      menuNote: "Start with Discovery Workshop.",
    };
  }

  return {
    anchors: homeAnchors,
    ctaLabel: "Explore Individuals",
    ctaHref: "/individuals",
    ctaEventSource: "nav_home",
    menuNote: "Choose your path and start quickly.",
  };
}

function isSamePageAnchor(href: string): boolean {
  return href.startsWith("#");
}

export function Nav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const pageConfig = getPageConfig(pathname);
  const sectionIds = [
    "top",
    ...pageConfig.anchors.map((anchor) => anchor.id),
    ...(pathname.startsWith("/individuals") ? ["apply"] : []),
  ];
  const activeId = useScrollSpy(sectionIds);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [ctaRedirecting, setCtaRedirecting] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const firstOverlayLinkRef = useRef<HTMLAnchorElement | null>(null);
  const prevMenuOpenRef = useRef(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const openRafRef = useRef<number | null>(null);

  const openMenu = useCallback(() => {
    if (openRafRef.current) {
      window.cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuRendered(true);
    if (reducedMotion) {
      setMenuOpen(true);
      return;
    }

    openRafRef.current = window.requestAnimationFrame(() => {
      openRafRef.current = null;
      setMenuOpen(true);
    });
  }, [reducedMotion]);

  const closeMenu = useCallback(() => {
    if (openRafRef.current) {
      window.cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setMenuOpen(false);

    if (reducedMotion) {
      setMenuRendered(false);
      return;
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      setMenuRendered(false);
    }, 420);
  }, [reducedMotion]);

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    trackEvent("cta_click", { source: pageConfig.ctaEventSource });
    if (!isSamePageAnchor(pageConfig.ctaHref)) {
      setCtaRedirecting(true);
    }
  };

  useEffect(() => {
    const wasOpen = prevMenuOpenRef.current;
    if (menuOpen && !wasOpen) {
      firstOverlayLinkRef.current?.focus();
    } else if (!menuOpen && wasOpen) {
      menuButtonRef.current?.focus();
    }
    prevMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    return () => {
      if (openRafRef.current) {
        window.cancelAnimationFrame(openRafRef.current);
        openRafRef.current = null;
      }
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  function trapFocus(e: ReactKeyboardEvent) {
    if (!menuOpen || e.key !== "Tab") return;
    const root = overlayRef.current;
    if (!root) return;
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => {
      if (el.getAttribute("aria-hidden") === "true") return false;
      if (el.hasAttribute("hidden")) return false;
      if ("disabled" in el && Boolean((el as { disabled?: boolean }).disabled)) {
        return false;
      }
      return true;
    });

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
            <Link
              href="/"
              className="font-heading font-bold text-[15px] tracking-tight text-[var(--color-text)] hover:text-[color-mix(in_oklch,var(--color-accent)_70%,var(--color-text))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-full px-3 py-2"
            >
              Zero-to-Agent
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {pageConfig.anchors.map((anchor) => (
                <a
                  key={anchor.id}
                  href={`#${anchor.id}`}
                  aria-current={activeId === anchor.id ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                    activeId === anchor.id
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {anchor.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Button
                href={pageConfig.ctaHref}
                className="text-[13px] px-4 py-2"
                disabled={ctaRedirecting}
                onClick={onCtaClick}
              >
                {ctaRedirecting ? "Redirecting..." : pageConfig.ctaLabel}
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-quart)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              onClick={() => (menuOpen ? closeMenu() : openMenu())}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
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

      {menuRendered && (
        <div
          ref={overlayRef}
          id="nav-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nav-menu-title"
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-[60] bg-[color-mix(in_oklch,var(--color-bg)_84%,black)] backdrop-blur-sm ${
            reducedMotion
              ? ""
              : "transition-opacity [transition-duration:var(--duration-slow)] [transition-timing-function:var(--ease-expo)]"
          } ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onKeyDown={trapFocus}
        >
          <div className="container-content pt-24 pb-10">
            <div
              className={`rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] p-6 ${
                reducedMotion
                  ? ""
                  : "transition-[transform,opacity] [transition-duration:var(--duration-slow)] [transition-timing-function:var(--ease-expo)]"
              } ${menuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-6 scale-[0.985]"}`}
            >
              <div className="relative mb-6 flex items-center justify-end">
                <p
                  id="nav-menu-title"
                  className="absolute left-1/2 -translate-x-1/2 font-heading font-semibold text-[13px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]"
                >
                  Navigate
                </p>
                <button
                  type="button"
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                  onClick={closeMenu}
                >
                  Close
                </button>
              </div>

              <section>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)] mb-3">
                  Pages
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {pageLinks.map((link, idx) => (
                    <Link
                      key={link.href}
                      ref={idx === 0 ? firstOverlayLinkRef : undefined}
                      href={link.href}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-4 font-heading text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] text-[var(--color-text)] hover:bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))]"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="mt-6">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)] mb-3">
                  On this page
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {pageConfig.anchors.map((anchor) => (
                    <a
                      key={anchor.id}
                      href={`#${anchor.id}`}
                      aria-current={activeId === anchor.id ? "page" : undefined}
                      className={`rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-4 font-heading text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] ${
                        activeId === anchor.id
                          ? "text-[var(--color-accent)] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))]"
                          : "text-[var(--color-text)] hover:bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))]"
                      }`}
                      onClick={closeMenu}
                    >
                      {anchor.label}
                    </a>
                  ))}
                </div>
              </section>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-col gap-3">
                <Button
                  href={pageConfig.ctaHref}
                  onClick={() => {
                    onCtaClick();
                    closeMenu();
                  }}
                  disabled={ctaRedirecting}
                  className="w-full justify-center"
                >
                  {ctaRedirecting ? "Redirecting..." : pageConfig.ctaLabel}
                  {!ctaRedirecting && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </Button>
                <p className="text-sm text-[var(--color-text-muted)]">{pageConfig.menuNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
