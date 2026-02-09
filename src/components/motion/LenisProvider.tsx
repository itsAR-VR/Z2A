"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lenis smooth scroll provider.
 * - Desktop only (disabled on touch devices via pointer: coarse check)
 * - Disabled when prefers-reduced-motion is active
 * - Safe teardown on unmount
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    function setLenisMarker(on: boolean) {
      if (on) {
        document.documentElement.dataset.z2aLenis = "on";
      } else {
        delete document.documentElement.dataset.z2aLenis;
      }
    }

    // Skip on mobile/touch or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) {
      setLenisMarker(false);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    setLenisMarker(true);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 0, // disable on touch
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      setLenisMarker(false);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
