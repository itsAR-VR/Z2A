"use client";

import { useEffect, useRef } from "react";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );

  return focusable.filter((el) => {
    if (el.hasAttribute("aria-hidden")) return false;
    // Skip elements that are not actually visible/focusable.
    if (el.getClientRects().length === 0) return false;
    return true;
  });
}

function trapFocus(
  e: React.KeyboardEvent,
  container: HTMLElement | null,
): void {
  if (e.key !== "Tab" || !container) return;
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
    return;
  }

  if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  children: React.ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
  panelId?: string;
  panelTestId?: string;
};

export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  overlayClassName = "",
  panelClassName = "",
  panelId,
  panelTestId,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Accessibility + UX behaviors: focus management, ESC to close, scroll lock.
  useEffect(() => {
    if (!open) return;

    previouslyFocusedElementRef.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const panel = panelRef.current;
    // Focus the first focusable element (usually the Close button) to enter the trap.
    requestAnimationFrame(() => {
      if (!panel) return;
      const focusable = getFocusableElements(panel);
      (focusable[0] ?? panel).focus();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.preventDefault();
      onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      previouslyFocusedElementRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] bg-[color-mix(in_oklch,var(--color-bg)_84%,black)] backdrop-blur-sm ${overlayClassName}`}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => trapFocus(e, panelRef.current)}
    >
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        data-testid={panelTestId}
        className={panelClassName}
      >
        {children}
      </div>
    </div>
  );
}
