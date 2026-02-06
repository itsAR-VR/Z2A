"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view for nav highlighting.
 * Uses IntersectionObserver with a rootMargin to detect the "active" section.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        // Trigger when section crosses the top 30% of the viewport
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
