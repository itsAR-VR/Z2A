"use client";

import { useReveal } from "@/hooks/useReveal";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for items within a group. Default: 0 */
  delay?: number;
  /** Direction of reveal. Default: "up" */
  direction?: "up" | "left" | "right" | "none";
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
}: RevealOnScrollProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const translateMap = {
    up: "translate3d(0, 18px, 0)",
    left: "translate3d(-18px, 0, 0)",
    right: "translate3d(18px, 0, 0)",
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : translateMap[direction],
        willChange: "transform, opacity",
        transition: `opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.72s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
