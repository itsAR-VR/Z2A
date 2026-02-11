"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackEvent } from "@/lib/analytics";

/**
 * TKS-inspired urgency motif: a minimal sticky status bar that appears
 * once the hero is out of view and hides again when the final CTA is visible.
 *
 * Progressive enhancement: if JS is off, this simply doesn't render.
 */
export function StickyApplyBar() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [ctaRedirecting, setCtaRedirecting] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const apply = document.getElementById("apply");
    if (!hero) return;

    let heroInView = true;
    let applyInView = false;

    const update = () => {
      setVisible(!heroInView && !applyInView);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry?.isIntersecting ?? false;
        update();
      },
      { threshold: 0.2 },
    );
    heroObserver.observe(hero);

    const applyObserver = apply
      ? new IntersectionObserver(
          ([entry]) => {
            applyInView = entry?.isIntersecting ?? false;
            update();
          },
          { threshold: 0.12 },
        )
      : null;

    if (applyObserver && apply) applyObserver.observe(apply);

    // Initialize state.
    update();

    return () => {
      heroObserver.disconnect();
      applyObserver?.disconnect();
    };
  }, []);

  const transition = prefersReduced
    ? ""
    : "transition-[transform,opacity] duration-300 ease-out";

  const onCtaClick = () => {
    if (ctaRedirecting) return;
    setCtaRedirecting(true);
    trackEvent("cta_click", { source: "sticky_apply_bar" });
  };

  return (
    <div
      role="region"
      aria-label="Applications"
      className="fixed inset-x-0 bottom-0 z-50 pointer-events-none"
    >
      <div className="container-content pb-[calc(14px+env(safe-area-inset-bottom))]">
        <div
          data-testid="sticky-apply-bar"
          aria-hidden={!visible}
          className={[
            "pointer-events-auto mx-auto flex items-center justify-between gap-3",
            "rounded-full border border-[var(--color-border)]",
            "bg-[color-mix(in_oklch,var(--color-surface)_82%,transparent)] backdrop-blur-md",
            "shadow-[var(--shadow-md)] px-3 py-2",
            transition,
            visible
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 translate-y-6 invisible",
          ].join(" ")}
          style={{ pointerEvents: visible ? "auto" : "none" }}
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-muted)] shadow-[var(--shadow-sm)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Applications open now
            </span>
            <span className="hidden sm:inline text-sm text-[var(--color-text-faint)] truncate">
              Feb 28 – Mar 1 · Toronto · 50 seats · $100 deposit
            </span>
          </div>

          <Button
            href="/apply"
            className="text-[13px] px-4 py-2"
            disabled={ctaRedirecting}
            onClick={onCtaClick}
          >
            {ctaRedirecting ? "Redirecting..." : "Apply now"}
            {!ctaRedirecting && (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
