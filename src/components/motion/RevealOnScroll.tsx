"use client";

import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMemo } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for items within a group. Default: 0 */
  delay?: number;
  /** Direction of reveal. Default: "up" */
  direction?: "up" | "left" | "right" | "none";
  /** Motion feel preset. Default: "soft" */
  variant?: "soft" | "snappy" | "cinematic";
}

/**
 * Wraps children with an IntersectionObserver-based reveal animation.
 * Uses CSS transitions for performance (no JS animation library needed).
 */
export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  variant = "soft",
}: RevealOnScrollProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const prefersReduced = useReducedMotion();

  const tokens = useMemo(() => {
    switch (variant) {
      case "snappy":
        return {
          offsetPx: 10,
          durationVar: "var(--duration-default)",
          easeVar: "var(--ease-quart)",
          durationMs: 400,
        };
      case "cinematic":
        return {
          offsetPx: 36,
          durationVar: "var(--duration-cinematic)",
          easeVar: "var(--ease-quint)",
          durationMs: 1000,
        };
      case "soft":
      default:
        return {
          offsetPx: 28,
          durationVar: "var(--duration-slow)",
          easeVar: "var(--ease-expo)",
          durationMs: 720,
        };
    }
  }, [variant]);

  const translateMap = {
    up: `translate3d(0, ${tokens.offsetPx}px, 0)`,
    left: `translate3d(-${tokens.offsetPx}px, 0, 0)`,
    right: `translate3d(${tokens.offsetPx}px, 0, 0)`,
    none: "none",
  } as const;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : translateMap[direction],
        willChange:
          prefersReduced || isVisible ? undefined : "transform, opacity",
        transition: prefersReduced
          ? "none"
          : `opacity ${tokens.durationVar} ${tokens.easeVar} ${delay}ms, transform ${tokens.durationVar} ${tokens.easeVar} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
