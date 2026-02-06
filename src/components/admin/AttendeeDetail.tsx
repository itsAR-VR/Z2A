"use client";

import { useState, useEffect } from "react";

interface AttendeeFull {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  company: string | null;
  linkedinUrl: string | null;
  useCase: string;
  networkCode: string | null;
  applicationStatus: string;
  seatStatus: string;
  depositStatus: string;
  remainderStatus: string;
  internalNotes: string | null;
  createdAt: string;
}

interface AttendeeDetailProps {
  attendeeId: string;
  onClose: () => void;
  onUpdate: () => void;
}

export function AttendeeDetail({
  attendeeId,
  onClose,
  onUpdate,
}: AttendeeDetailProps) {
  const [attendee, setAttendee] = useState<AttendeeFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seatStatus, setSeatStatus] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/attendees/${attendeeId}`);
        const data = await res.json();
        if (data.attendee) {
          setAttendee(data.attendee);
          setSeatStatus(data.attendee.seatStatus);
          setApplicationStatus(data.attendee.applicationStatus);
          setNotes(data.attendee.internalNotes || "");
        }
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [attendeeId]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/admin/attendees/${attendeeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatStatus,
          applicationStatus,
          internalNotes: notes,
        }),
      });
      onUpdate();
    } catch {
      // Handle error silently
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[var(--color-bg-850)] border border-[var(--color-border-700)] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-semibold text-lg text-[var(--color-text-100)]">
            Attendee Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-text-500)] hover:text-[var(--color-text-100)] cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--color-text-500)]">Loading...</p>
        ) : attendee ? (
          <div className="space-y-4">
            <InfoRow label="Name" value={`${attendee.firstName} ${attendee.lastName}`} />
            <InfoRow label="Email" value={attendee.email} />
            <InfoRow label="Role" value={attendee.roleTitle} />
            {attendee.company && (
              <InfoRow label="Company" value={attendee.company} />
            )}
            {attendee.linkedinUrl && (
              <InfoRow label="LinkedIn" value={attendee.linkedinUrl} />
            )}
            <InfoRow label="Use Case" value={attendee.useCase} />
            <InfoRow label="Network Code" value={attendee.networkCode || "None"} />
            <InfoRow label="Deposit" value={attendee.depositStatus} />
            <InfoRow label="Remainder" value={attendee.remainderStatus} />

            <div className="pt-4 border-t border-[var(--color-border-700)] space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-500)] mb-1">
                  Application Status
                </label>
                <select
                  value={applicationStatus}
                  onChange={(e) => setApplicationStatus(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50"
                >
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-text-500)] mb-1">
                  Seat Status
                </label>
                <select
                  value={seatStatus}
                  onChange={(e) => setSeatStatus(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50"
                >
                  <option value="reserved">Reserved</option>
                  <option value="attended_day1">Attended Day 1</option>
                  <option value="attended_day2">Attended Day 2</option>
                  <option value="no_show">No Show</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-text-500)] mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50"
                  placeholder="Internal notes (not visible to attendee)..."
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--color-error)]">
            Failed to load attendee.
          </p>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-[var(--color-text-500)] block">
        {label}
      </span>
      <span className="text-sm text-[var(--color-text-300)] break-all">
        {value}
      </span>
    </div>
  );
}
