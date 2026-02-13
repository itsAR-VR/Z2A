"use client";

import { useEffect, useState } from "react";

type SeatState = {
  remaining: number;
  soldOut: boolean;
  waitlistCount: number;
};

export function SeatCounter({ variant = "inline" }: { variant?: "inline" | "badge" }) {
  const [state, setState] = useState<SeatState | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/seats");
        const data = await res.json();
        if (cancelled) return;
        setState({
          remaining: Number(data.remaining || 0),
          soldOut: Boolean(data.soldOut),
          waitlistCount: Number(data.waitlistCount || 0),
        });
      } catch {
        if (!cancelled) setState(null);
      }
    }

    void load();
    const timer = window.setInterval(() => void load(), 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (!state) {
    return <span>{variant === "badge" ? "-- seats" : "-- seats"}</span>;
  }

  if (state.soldOut) {
    if (variant === "badge") {
      return <span>Sold out · waitlist {state.waitlistCount}</span>;
    }
    return (
      <span>
        Sold out · waitlist {state.waitlistCount}
      </span>
    );
  }

  if (variant === "badge") {
    return <span>{state.remaining} seats</span>;
  }

  return <span>{state.remaining} of 50 seats remaining</span>;
}
