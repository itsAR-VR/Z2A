"use client";

import { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseRevealOptions {
  /** Viewport fraction required to trigger (0–1). Default: 0.15 */
  threshold?: number;
  /** If true, re-triggers when element leaves and re-enters. Default: false (reveal once) */
  repeat?: boolean;
}

/**
 * IntersectionObserver-based reveal hook.
 * Returns a ref to attach and a boolean `isVisible`.
 * Progressive enhancement: content is visible on the server / without JS.
 * When reduced motion is preferred, isVisible is always true.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const { threshold = 0.15, repeat = false } = options;
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();
  const visibleRef = useRef(true);
  const listenersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const getSnapshot = useCallback(() => visibleRef.current, []);

  const isVisible = useSyncExternalStore(subscribe, getSnapshot, () => true);

  // Before the first paint, approximate whether the element is in view. This
  // avoids "blank page" SSR and reduces flicker for above-the-fold content.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;

    const completelyOut =
      rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw;

    // We use a generous "activation band" so above-the-fold content stays
    // visible even before the IntersectionObserver callback fires.
    const bandTop = vh * 0.1;
    const bandBottom = vh * 0.9;
    const intersectsBand =
      rect.bottom > bandTop + vh * threshold && rect.top < bandBottom;

    const nextVisible = completelyOut ? false : intersectsBand;
    if (visibleRef.current !== nextVisible) {
      visibleRef.current = nextVisible;
      listenersRef.current.forEach((cb) => cb());
    }
  }, [prefersReduced, threshold]);

  useEffect(() => {
    if (prefersReduced) {
      visibleRef.current = true;
      listenersRef.current.forEach((cb) => cb());
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleRef.current = true;
          listenersRef.current.forEach((cb) => cb());
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          visibleRef.current = false;
          listenersRef.current.forEach((cb) => cb());
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, threshold, repeat]);

  return { ref, isVisible };
}
