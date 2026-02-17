"use client";

import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_CALENDLY_URL } from "@/lib/config";
import { DURATION, EASE, STAGGER } from "@/lib/motion-tokens";
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

type MobileMenuView = "pages" | "anchors";

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
      menuNote: "Limited to 50 seats in Toronto. Most decisions land within 48 hours.",
    };
  }

  if (pathname.startsWith("/businesses")) {
    return {
      anchors: businessesAnchors,
      ctaLabel: "Book discovery call",
      ctaHref: BUSINESS_CALENDLY_URL || fallbackBusinessCta,
      ctaEventSource: "nav_businesses",
      menuNote: "Start with discovery. Most business inquiries receive scoped implementation + commercial terms within 48 hours.",
    };
  }

  return {
    anchors: homeAnchors,
    ctaLabel: "Explore Individuals",
    ctaHref: "/individuals",
    ctaEventSource: "nav_home",
    menuNote: "Choose your path by scope: weekend build sprint or managed business implementation.",
  };
}

function isSamePageAnchor(href: string): boolean {
  return href.startsWith("#");
}

function isCurrentPage(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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
  const [mobileMenuView, setMobileMenuView] = useState<MobileMenuView>("pages");
  const [ctaRedirecting, setCtaRedirecting] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const menuCanvasRef = useRef<HTMLDivElement | null>(null);
  const firstOverlayLinkRef = useRef<HTMLAnchorElement | null>(null);
  const prevMenuOpenRef = useRef(false);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const openMenu = () => {
    setMenuRendered(true);
    setMenuOpen(true);
    setMobileMenuView("pages");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (reducedMotion) {
      setMenuRendered(false);
    }
  };

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    trackEvent("cta_click", { source: pageConfig.ctaEventSource });
    if (!isSamePageAnchor(pageConfig.ctaHref)) {
      setCtaRedirecting(true);
    }
  };

  useLayoutEffect(() => {
    if (!menuRendered) return;

    const overlay = overlayRef.current;
    const canvas = menuCanvasRef.current;
    if (!overlay || !canvas) return;

    menuTimelineRef.current?.kill();

    const items = canvas.querySelectorAll<HTMLElement>("[data-menu-item]");

    if (reducedMotion) {
      gsap.set([overlay, canvas, items], { clearProps: "all" });
      return;
    }

    if (menuOpen) {
      gsap.set(overlay, { opacity: 0 });
      gsap.set(canvas, { opacity: 0, y: 16, scale: 0.988 });
      gsap.set(items, { opacity: 0, y: 12 });

      menuTimelineRef.current = gsap
        .timeline({ defaults: { ease: EASE.expo } })
        .to(overlay, { opacity: 1, duration: DURATION.default }, 0)
        .to(canvas, { opacity: 1, y: 0, scale: 1, duration: DURATION.slow }, 0.03)
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: DURATION.default,
            stagger: STAGGER.step,
            clearProps: "transform,opacity",
          },
          0.14,
        );
    } else {
      menuTimelineRef.current = gsap.timeline({
        defaults: { ease: EASE.quart },
        onComplete: () => setMenuRendered(false),
      });
      menuTimelineRef.current
        .to(
          items,
          {
            opacity: 0,
            y: 8,
            duration: DURATION.fast,
            stagger: { each: 0.03, from: "end" },
          },
          0,
        )
        .to(canvas, { opacity: 0, y: 10, scale: 0.994, duration: DURATION.fast }, 0.05)
        .to(overlay, { opacity: 0, duration: DURATION.fast }, 0.08);
    }

    return () => {
      menuTimelineRef.current?.kill();
    };
  }, [menuOpen, menuRendered, reducedMotion]);

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
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

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
      if (e.key === "Escape") {
        setMenuOpen(false);
        if (reducedMotion) {
          setMenuRendered(false);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, reducedMotion]);

  useEffect(() => {
    return () => {
      menuTimelineRef.current?.kill();
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
      if ("disabled" in el && Boolean((el as { disabled?: boolean }).disabled)) return false;
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
          <div className="mx-auto flex items-center justify-between gap-3 rounded-full border border-[color-mix(in_oklch,var(--color-border)_74%,var(--color-accent)_6%)] bg-[color-mix(in_oklch,var(--color-surface)_72%,transparent)] px-3 py-2 backdrop-blur-md shadow-[0_10px_40px_rgba(12,12,20,0.12)]">
            <Link
              href="/"
              className="group rounded-full px-3 py-2 font-heading text-[15px] font-bold tracking-tight text-[var(--color-text)] transition-[color,transform] duration-300 [transition-timing-function:var(--ease-expo)] hover:-translate-y-0.5 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
            >
              <span className="flip-label" data-flip-disabled="false">
                <span className="flip-label__primary">Zero-to-Agent</span>
                <span aria-hidden="true" className="flip-label__secondary text-[var(--color-accent)]">
                  Zero-to-Agent
                </span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {pageConfig.anchors.map((anchor) => {
                const isActive = activeId === anchor.id;
                return (
                  <a
                    key={anchor.id}
                    href={`#${anchor.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`group tilt-hover rounded-full px-3.5 py-2 text-[13px] font-semibold transition-[background-color,color] duration-300 [transition-timing-function:var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                      isActive
                        ? "bg-[color-mix(in_oklch,var(--color-accent)_12%,var(--color-surface))] text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)] hover:bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))]"
                    }`}
                  >
                    <span className="flip-label" data-flip-disabled={isActive ? "true" : "false"}>
                      <span className="flip-label__primary">{anchor.label}</span>
                      <span aria-hidden="true" className="flip-label__secondary text-[var(--color-text)]">
                        {anchor.label}
                      </span>
                    </span>
                  </a>
                );
              })}
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
              className="group inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-border)_80%,var(--color-accent)_8%)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-quart)] hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--color-accent)_42%,var(--color-border-strong))] hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              onClick={() => (menuOpen ? closeMenu() : openMenu())}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
            >
              <span className="flip-label" data-flip-disabled={menuOpen ? "true" : "false"}>
                <span className="flip-label__primary">Menu</span>
                <span aria-hidden="true" className="flip-label__secondary">
                  Menu
                </span>
              </span>
              {menuOpen ? (
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
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
            menuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onKeyDown={trapFocus}
        >
          <div
            ref={menuCanvasRef}
            className="relative flex h-full w-full flex-col overflow-hidden bg-[color-mix(in_oklch,var(--color-surface)_94%,var(--color-bg)_6%)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_8%_0%,color-mix(in_oklch,var(--color-accent)_12%,transparent),transparent_60%),radial-gradient(920px_420px_at_96%_24%,color-mix(in_oklch,var(--color-accent-2)_12%,transparent),transparent_64%)]"
            />

            <header
              data-menu-item
              className="relative border-b border-[color-mix(in_oklch,var(--color-border)_78%,var(--color-accent)_8%)] px-4 py-4 md:px-10 md:py-6"
            >
              <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
                    Navigate
                  </p>
                  <p id="nav-menu-title" className="mt-1 font-heading text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                    Zero-to-Agent
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 [transition-timing-function:var(--ease-quart)] hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--color-accent)_42%,var(--color-border-strong))] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  onClick={closeMenu}
                >
                  Close
                </button>
              </div>
            </header>

            <div className="relative flex-1 overflow-y-auto px-4 pb-6 pt-4 md:px-10 md:pb-8 md:pt-6">
              <div className="mx-auto w-full max-w-[1320px]">
                <div
                  data-menu-item
                  className="mb-6 grid grid-cols-2 gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 md:hidden"
                >
                  <button
                    type="button"
                    aria-pressed={mobileMenuView === "pages"}
                    className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-[background-color,color] duration-200 ${
                      mobileMenuView === "pages"
                        ? "bg-[color-mix(in_oklch,var(--color-accent)_14%,var(--color-surface))] text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)]"
                    }`}
                    onClick={() => setMobileMenuView("pages")}
                  >
                    Pages
                  </button>
                  <button
                    type="button"
                    aria-pressed={mobileMenuView === "anchors"}
                    className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-[background-color,color] duration-200 ${
                      mobileMenuView === "anchors"
                        ? "bg-[color-mix(in_oklch,var(--color-accent)_14%,var(--color-surface))] text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)]"
                    }`}
                    onClick={() => setMobileMenuView("anchors")}
                  >
                    On this page
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-7 md:gap-8 lg:grid-cols-2 lg:gap-10">
                  <section
                    data-menu-item
                    className={`${mobileMenuView === "pages" ? "block" : "hidden"} md:block`}
                    aria-label="Pages"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
                      Pages
                    </p>
                    <div className="mt-3 grid gap-3">
                      {pageLinks.map((link, index) => {
                        const isActive = isCurrentPage(pathname, link.href);
                        return (
                          <Link
                            key={link.href}
                            ref={index === 0 ? firstOverlayLinkRef : undefined}
                            href={link.href}
                            aria-label={isActive ? `${link.label} (current page)` : link.label}
                            aria-current={isActive ? "page" : undefined}
                            onClick={closeMenu}
                            className={`group tilt-hover rounded-[var(--radius-lg)] border px-4 py-4 text-lg font-semibold transition-[background-color,color,border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                              isActive
                                ? "border-[color-mix(in_oklch,var(--color-accent)_48%,var(--color-border-strong))] bg-[color-mix(in_oklch,var(--color-accent)_14%,var(--color-surface))] text-[var(--color-accent)] shadow-[var(--shadow-sm)]"
                                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[color-mix(in_oklch,var(--color-accent)_36%,var(--color-border-strong))] hover:shadow-[var(--shadow-md)]"
                            }`}
                          >
                            <span className="flex items-center justify-between gap-3">
                              <span className="flip-label" data-flip-disabled={isActive ? "true" : "false"}>
                                <span className="flip-label__primary">{link.label}</span>
                                <span aria-hidden="true" className="flip-label__secondary">
                                  {link.label}
                                </span>
                              </span>
                              {isActive ? (
                                <span className="rounded-full border border-[color-mix(in_oklch,var(--color-accent)_45%,var(--color-border-strong))] bg-[color-mix(in_oklch,var(--color-accent)_12%,var(--color-surface))] px-2 py-0.5 text-[10px] font-mono tracking-[0.1em] uppercase text-[var(--color-accent)]">
                                  Current
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </section>

                  <section
                    data-menu-item
                    className={`${mobileMenuView === "anchors" ? "block" : "hidden"} md:block`}
                    aria-label="On this page"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
                      On this page
                    </p>
                    {pageConfig.anchors.length > 0 ? (
                      <div className="mt-3 grid gap-3">
                        {pageConfig.anchors.map((anchor) => {
                          const isActive = activeId === anchor.id;
                          return (
                            <a
                              key={anchor.id}
                              href={`#${anchor.id}`}
                              aria-current={isActive ? "page" : undefined}
                              onClick={closeMenu}
                              className={`group tilt-hover rounded-[var(--radius-lg)] border px-4 py-4 text-lg font-semibold transition-[background-color,color,border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                                isActive
                                  ? "border-[color-mix(in_oklch,var(--color-accent)_44%,var(--color-border-strong))] bg-[color-mix(in_oklch,var(--color-accent)_14%,var(--color-surface))] text-[var(--color-accent)] shadow-[var(--shadow-sm)]"
                                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[color-mix(in_oklch,var(--color-accent)_32%,var(--color-border-strong))] hover:shadow-[var(--shadow-md)]"
                              }`}
                            >
                              <span className="flip-label" data-flip-disabled={isActive ? "true" : "false"}>
                                <span className="flip-label__primary">{anchor.label}</span>
                                <span aria-hidden="true" className="flip-label__secondary">
                                  {anchor.label}
                                </span>
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 text-sm text-[var(--color-text-muted)]">
                        No section links on this page.
                      </p>
                    )}
                  </section>
                </div>

                <div
                  data-menu-item
                  className="mt-8 border-t border-[color-mix(in_oklch,var(--color-border)_78%,var(--color-accent)_8%)] pt-6"
                >
                  <Button
                    href={pageConfig.ctaHref}
                    className="w-full justify-center"
                    disabled={ctaRedirecting}
                    onClick={() => {
                      onCtaClick();
                      closeMenu();
                    }}
                  >
                    {ctaRedirecting ? "Redirecting..." : pageConfig.ctaLabel}
                  </Button>
                  <p className="mt-3 text-sm text-[var(--color-text-faint)]">{pageConfig.menuNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
