"use client";

import { useState, useEffect, useCallback } from "react";
import { AttendeeDetail } from "./AttendeeDetail";
import { StatsBar } from "./StatsBar";

interface Attendee {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  company: string | null;
  depositStatus: string;
  remainderStatus: string;
  seatStatus: string;
  networkCode: string | null;
}

export function AttendeeTable({
  forcedNetworkCode = null,
}: {
  forcedNetworkCode?: string | null;
}) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const [depositStatusFilter, setDepositStatusFilter] = useState("");
  const [remainderStatusFilter, setRemainderStatusFilter] = useState("");
  const [seatStatusFilter, setSeatStatusFilter] = useState("");
  const [networkCodeFilter, setNetworkCodeFilter] = useState("");
  const [networkCodeOptions, setNetworkCodeOptions] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [captureBusy, setCaptureBusy] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const [captureResult, setCaptureResult] = useState<{
    captured: number;
    failed: Array<{ attendeeId: string; paymentIntentId: string; error: string }>;
  } | null>(null);

  const fetchAttendees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const q = search.trim();
      if (q) params.set("q", q);
      if (depositStatusFilter) params.set("depositStatus", depositStatusFilter);
      if (remainderStatusFilter) params.set("remainderStatus", remainderStatusFilter);
      if (seatStatusFilter) params.set("seatStatus", seatStatusFilter);
      if (networkCodeFilter) params.set("networkCode", networkCodeFilter);
      const query = params.toString();
      const url = query ? `/api/admin/attendees?${query}` : "/api/admin/attendees";
      const res = await fetch(url);
      const data = await res.json();
      setAttendees(data.attendees || []);
      setRefreshKey((value) => value + 1);
    } catch {
      // Handle error silently — table shows empty state
    } finally {
      setLoading(false);
    }
  }, [search, depositStatusFilter, remainderStatusFilter, seatStatusFilter, networkCodeFilter]);

  useEffect(() => {
    const timeout = setTimeout(fetchAttendees, 300);
    return () => clearTimeout(timeout);
  }, [fetchAttendees]);

  useEffect(() => {
    if (!forcedNetworkCode) return;
    setNetworkCodeFilter(forcedNetworkCode);
  }, [forcedNetworkCode]);

  const authorizedCount = attendees.filter(
    (a) => a.remainderStatus === "authorized",
  ).length;

  async function handleCaptureAll() {
    if (captureBusy) return;
    if (authorizedCount === 0) return;
    if (
      search.trim() &&
      !confirm(
        "You have a search filter applied. Capture all authorized remainders anyway?",
      )
    ) {
      return;
    }
    if (
      !confirm(
        `Capture ${authorizedCount} authorized remainder${
          authorizedCount === 1 ? "" : "s"
        } now?`,
      )
    ) {
      return;
    }

    setCaptureBusy(true);
    setCaptureError(null);
    setCaptureResult(null);

    try {
      const res = await fetch("/api/admin/remainder-capture-all", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setCaptureError(data.error || "Failed to capture authorized remainders.");
        return;
      }
      setCaptureResult(data);
      await fetchAttendees();
    } catch {
      setCaptureError("Network error. Please try again.");
    } finally {
      setCaptureBusy(false);
    }
  }

  return (
    <div>
      <StatsBar
        refreshKey={refreshKey}
        onLoaded={(stats) => setNetworkCodeOptions(stats.networkCodes || [])}
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full sm:w-80 rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-4 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50"
        />
        <button
          type="button"
          onClick={() => window.open("/api/admin/attendees/export", "_blank")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-300)] hover:text-[var(--color-text-100)] hover:border-[var(--color-text-500)] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <FilterSelect
          value={depositStatusFilter}
          onChange={setDepositStatusFilter}
          label="Deposit"
          options={[
            { value: "", label: "All deposit statuses" },
            { value: "paid", label: "Paid" },
            { value: "unpaid", label: "Unpaid" },
            { value: "refunded", label: "Refunded" },
          ]}
        />
        <FilterSelect
          value={remainderStatusFilter}
          onChange={setRemainderStatusFilter}
          label="Remainder"
          options={[
            { value: "", label: "All remainder statuses" },
            { value: "none", label: "None" },
            { value: "authorized", label: "Authorized" },
            { value: "captured", label: "Captured" },
            { value: "canceled", label: "Canceled" },
            { value: "refunded", label: "Refunded" },
          ]}
        />
        <FilterSelect
          value={seatStatusFilter}
          onChange={setSeatStatusFilter}
          label="Seat"
          options={[
            { value: "", label: "All seat statuses" },
            { value: "reserved", label: "Reserved" },
            { value: "attended_day1", label: "Attended Day 1" },
            { value: "attended_day2", label: "Attended Day 2" },
            { value: "no_show", label: "No Show" },
          ]}
        />
        <FilterSelect
          value={networkCodeFilter}
          onChange={setNetworkCodeFilter}
          label="Referral Code"
          options={[
            { value: "", label: "All referral codes" },
            ...networkCodeOptions.map((code) => ({ value: code, label: code })),
          ]}
        />
      </div>

      {authorizedCount > 0 && (
        <div className="mb-4 rounded-lg border border-[color-mix(in_oklch,var(--color-warning)_35%,var(--color-border-700))] bg-[color-mix(in_oklch,var(--color-warning)_10%,var(--color-bg-900))] p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-100)]">
                {authorizedCount} remainder
                {authorizedCount === 1 ? "" : "s"} authorized
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-500)]">
                Capture after Day 1. This charges all authorized cards in one batch.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCaptureAll}
              disabled={captureBusy}
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {captureBusy
                ? "Capturing..."
                : `Capture ${authorizedCount} authorized`}
            </button>
          </div>

          {captureError ? (
            <p className="mt-3 text-sm text-[var(--color-error)]">{captureError}</p>
          ) : null}

          {captureResult ? (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-[var(--color-text-300)]">
                Captured {captureResult.captured}. Failed{" "}
                {captureResult.failed?.length || 0}.
              </p>
              {captureResult.failed?.length ? (
                <ul className="text-xs text-[var(--color-text-500)] space-y-1">
                  {captureResult.failed.slice(0, 6).map((f) => (
                    <li key={`${f.attendeeId}-${f.paymentIntentId}`}>
                      {f.attendeeId}: {f.error}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[var(--color-text-500)] py-8 text-center">
          Loading...
        </p>
      ) : attendees.length === 0 ? (
        <p className="text-sm text-[var(--color-text-500)] py-8 text-center">
          No attendees found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border-700)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-bg-800)] text-left text-[var(--color-text-500)]">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Deposit</th>
                <th className="px-4 py-3 font-medium">Remainder</th>
                <th className="px-4 py-3 font-medium">Seat</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-700)]">
              {attendees.map((a) => (
                <tr
                  key={a.id}
                  className="hover:bg-[var(--color-bg-800)] transition-colors"
                >
                  <td className="px-4 py-3 text-[var(--color-text-100)] whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedId(a.id)}
                      className="group inline-flex items-center gap-2 font-medium text-[var(--color-text-100)] hover:text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50 rounded-md px-1 -mx-1"
                      aria-label={`View ${a.firstName} ${a.lastName} details`}
                    >
                      <span className="truncate">
                        {a.firstName} {a.lastName}
                      </span>
                      <svg
                        className="h-4 w-4 text-[var(--color-text-500)] transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 18l6-6-6-6"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-300)]">
                    {a.email}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-300)] whitespace-nowrap">
                    {a.roleTitle}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.depositStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.remainderStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.seatStatus} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-500)]">
                    {a.networkCode || "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-500)] text-xs whitespace-nowrap">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedId && (
        <AttendeeDetail
          attendeeId={selectedId}
          onClose={() => setSelectedId(null)}
          onUpdate={fetchAttendees}
        />
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="block text-xs mb-1 text-[var(--color-text-500)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    paid: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    unpaid: "text-[var(--color-warning)] bg-[var(--color-warning-surface)]",
    refunded: "text-[var(--color-error)] bg-[var(--color-error-surface)]",
    none: "text-[var(--color-text-500)] bg-[var(--color-bg-800)]",
    authorized: "text-[var(--color-warning)] bg-[var(--color-warning-surface)]",
    captured: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    canceled: "text-[var(--color-text-500)] bg-[var(--color-bg-800)]",
    reserved: "text-[var(--color-info)] bg-[var(--color-info-surface)]",
    attended_day1: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    attended_day2: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    no_show: "text-[var(--color-error)] bg-[var(--color-error-surface)]",
    submitted: "text-[var(--color-warning)] bg-[var(--color-warning-surface)]",
    approved: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    declined: "text-[var(--color-error)] bg-[var(--color-error-surface)]",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
        colorMap[status] || "text-[var(--color-text-500)] bg-[var(--color-bg-800)]"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
