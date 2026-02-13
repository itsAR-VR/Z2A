"use client";

import { useEffect, useMemo, useState } from "react";

type StatsPayload = {
  totalRegistrants: number;
  depositsPaid: number;
  seatsRemaining: number;
  authorized: number;
  captured: number;
  totalRevenueCents: number;
  earlyBirdCount: number;
  waitlistPendingCount: number;
  waitlistConvertedCount: number;
  networkCodes: string[];
};

export function StatsBar({
  refreshKey,
  onLoaded,
}: {
  refreshKey: number;
  onLoaded?: (stats: StatsPayload) => void;
}) {
  const [stats, setStats] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadStats() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/stats");
        const data = (await res.json()) as StatsPayload;
        if (cancelled) return;
        setStats(data);
        onLoaded?.(data);
      } catch {
        if (cancelled) return;
        setStats(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadStats();
    return () => {
      cancelled = true;
    };
  }, [refreshKey, onLoaded]);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const cards = stats
    ? [
        { label: "Registrants", value: stats.totalRegistrants.toString() },
        { label: "Deposits Paid", value: stats.depositsPaid.toString() },
        { label: "Seats Remaining", value: stats.seatsRemaining.toString() },
        { label: "Remainders Authorized", value: stats.authorized.toString() },
        { label: "Remainders Captured", value: stats.captured.toString() },
        {
          label: "Total Revenue",
          value: currency.format(stats.totalRevenueCents / 100),
        },
        { label: "Early Bird", value: stats.earlyBirdCount.toString() },
        { label: "Waitlist Pending", value: stats.waitlistPendingCount.toString() },
      ]
    : [];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {(loading ? new Array(8).fill(null) : cards).map((card, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-3"
          >
            <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-500)]">
              {loading ? "Loading" : card?.label}
            </p>
            <p className="mt-1 text-lg font-heading font-semibold text-[var(--color-text-100)]">
              {loading ? "--" : card?.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
