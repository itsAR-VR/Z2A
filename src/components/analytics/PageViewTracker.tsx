"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const query = window.location.search.replace(/^\?/, "");
    const url = query ? `${pathname}?${query}` : pathname;
    if (!url || lastUrlRef.current === url) return;

    lastUrlRef.current = url;
    trackEvent("page_view", {
      pathname,
      hasQuery: query.length > 0,
    });
  }, [pathname]);

  return null;
}
