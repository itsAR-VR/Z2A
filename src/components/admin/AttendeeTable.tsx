"use client";

import { useState, useEffect, useCallback } from "react";
import { AttendeeDetail } from "./AttendeeDetail";

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

export function AttendeeTable() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchAttendees = useCallback(async () => {
    setLoading(true);
    try {
      const q = search.trim();
      const url = q
        ? `/api/admin/attendees?q=${encodeURIComponent(q)}`
        : "/api/admin/attendees";
      const res = await fetch(url);
      const data = await res.json();
      setAttendees(data.attendees || []);
    } catch {
      // Handle error silently — table shows empty state
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(fetchAttendees, 300);
    return () => clearTimeout(timeout);
  }, [fetchAttendees]);

  return (
    <div>
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
                <th className="px-4 py-3 font-medium">Seat</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-700)]">
              {attendees.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className="hover:bg-[var(--color-bg-800)] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-[var(--color-text-100)] whitespace-nowrap">
                    {a.firstName} {a.lastName}
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

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    paid: "text-green-400 bg-green-400/10",
    unpaid: "text-yellow-400 bg-yellow-400/10",
    refunded: "text-red-400 bg-red-400/10",
    reserved: "text-blue-400 bg-blue-400/10",
    attended_day1: "text-green-400 bg-green-400/10",
    attended_day2: "text-green-400 bg-green-400/10",
    no_show: "text-red-400 bg-red-400/10",
    submitted: "text-yellow-400 bg-yellow-400/10",
    approved: "text-green-400 bg-green-400/10",
    declined: "text-red-400 bg-red-400/10",
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
