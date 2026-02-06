"use client";

import { useEffect, useRef, useCallback } from "react";
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
 * When reduced motion is preferred, isVisible is always true.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const { threshold = 0.15, repeat = false } = options;
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();
  const visibleRef = useRef(false);
  const listenersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const getSnapshot = useCallback(() => visibleRef.current, []);

  const isVisible = useSyncExternalStore(subscribe, getSnapshot, () => false);

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
