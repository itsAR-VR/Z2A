"use client";

import { useCallback, useEffect, useState } from "react";

type WaitlistEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string | null;
  company: string | null;
  useCase: string | null;
  networkCode: string | null;
  status: string;
  source: string;
  priorityIndex: number;
  setupIntentStatus: string | null;
  seatOfferedAt: string | null;
  convertedAt: string | null;
  isConverted: boolean;
};

export function WaitlistTable() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/waitlist");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load waitlist.");
        setEntries([]);
        return;
      }
      setEntries(data.waitlist || []);
    } catch {
      setError("Network error while loading waitlist.");
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function convertEntry(entry: WaitlistEntry) {
    if (busyId) return;
    setBusyId(entry.id);
    setError(null);

    const popup = window.open("about:blank", "_blank", "noopener,noreferrer");
    try {
      const res = await fetch(`/api/admin/waitlist/${entry.id}/convert`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        if (popup) popup.close();
        setError(data.error || "Failed to convert waitlist entry.");
        return;
      }
      if (data.checkoutUrl) {
        if (popup) popup.location.href = data.checkoutUrl;
        else window.location.href = data.checkoutUrl;
      } else if (popup) {
        popup.close();
      }
      await load();
    } catch {
      if (popup) popup.close();
      setError("Network error while converting waitlist entry.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      {error ? (
        <p className="mb-4 text-sm text-[var(--color-error)]">{error}</p>
      ) : null}

      {loading ? (
        <p className="text-sm text-[var(--color-text-500)] py-8 text-center">
          Loading waitlist...
        </p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-[var(--color-text-500)] py-8 text-center">
          No waitlist entries yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border-700)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-bg-800)] text-left text-[var(--color-text-500)]">
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-700)]">
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-[var(--color-bg-800)] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-300)]">
                    #{entry.priorityIndex}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-100)] whitespace-nowrap">
                    {entry.firstName} {entry.lastName}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-300)]">{entry.email}</td>
                  <td className="px-4 py-3 text-[var(--color-text-300)]">
                    {entry.roleTitle || "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-500)]">
                    {entry.networkCode || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-500)] whitespace-nowrap">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {entry.status === "pending" || entry.status === "seat_offered" ? (
                      <button
                        type="button"
                        onClick={() => void convertEntry(entry)}
                        disabled={busyId === entry.id}
                        className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {busyId === entry.id ? "Opening..." : "Convert"}
                      </button>
                    ) : (
                      <span className="text-xs text-[var(--color-text-500)]">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "text-[var(--color-warning)] bg-[var(--color-warning-surface)]",
    seat_offered: "text-[var(--color-info)] bg-[var(--color-info-surface)]",
    converted: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    rolled_next_cohort: "text-[var(--color-text-500)] bg-[var(--color-bg-800)]",
    expired: "text-[var(--color-error)] bg-[var(--color-error-surface)]",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
        styles[status] || "text-[var(--color-text-500)] bg-[var(--color-bg-800)]"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
