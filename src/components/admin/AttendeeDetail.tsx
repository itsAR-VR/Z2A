"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { Dialog } from "@/components/Dialog";

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
  const dialogIds = useId();
  const titleId = `${dialogIds}-attendee-title`;
  const descId = `${dialogIds}-attendee-desc`;

  const [attendee, setAttendee] = useState<AttendeeFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [seatStatus, setSeatStatus] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [remainderBusy, setRemainderBusy] = useState<
    null | "checkout" | "capture" | "cancel"
  >(null);
  const [remainderError, setRemainderError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/admin/attendees/${attendeeId}`);
      if (!res.ok) {
        setLoadError("Failed to load attendee. Please try again.");
        setAttendee(null);
        return;
      }

      const data = await res.json();
      if (data.attendee) {
        setAttendee(data.attendee);
        setSeatStatus(data.attendee.seatStatus);
        setApplicationStatus(data.attendee.applicationStatus);
        setNotes(data.attendee.internalNotes || "");
      } else {
        setLoadError("Attendee not found.");
        setAttendee(null);
      }
    } catch {
      setLoadError("Network error. Please try again.");
      setAttendee(null);
    } finally {
      setLoading(false);
    }
  }, [attendeeId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/attendees/${attendeeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatStatus,
          applicationStatus,
          internalNotes: notes,
        }),
      });
      if (!res.ok) {
        setSaveError("Failed to save changes. Please try again.");
        return;
      }
      onUpdate();
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemainderCheckout() {
    if (remainderBusy) return;
    setRemainderBusy("checkout");
    setRemainderError(null);

    // Open synchronously to avoid popup blocking, then navigate when URL arrives.
    const popup = window.open("about:blank", "_blank", "noopener,noreferrer");

    try {
      const res = await fetch(
        `/api/admin/attendees/${attendeeId}/remainder-checkout`,
        { method: "POST" },
      );

      const data = await res.json();
      if (!res.ok) {
        if (popup) popup.close();
        setRemainderError(data.error || "Failed to start remainder checkout.");
        return;
      }

      const url: string | undefined = data.checkoutUrl;
      if (!url) {
        if (popup) popup.close();
        setRemainderError("Missing Stripe checkout URL.");
        return;
      }

      if (popup) {
        popup.location.href = url;
      } else {
        window.location.href = url;
      }
    } catch {
      if (popup) popup.close();
      setRemainderError("Network error. Please try again.");
    } finally {
      setRemainderBusy(null);
    }
  }

  async function handleRemainderCapture() {
    if (remainderBusy) return;
    if (!confirm("Capture this attendee's remainder now?")) return;

    setRemainderBusy("capture");
    setRemainderError(null);
    try {
      const res = await fetch(
        `/api/admin/attendees/${attendeeId}/remainder-capture`,
        { method: "POST" },
      );
      const data = await res.json();
      if (!res.ok) {
        setRemainderError(data.error || "Failed to capture remainder.");
        return;
      }

      await load();
      onUpdate();
    } catch {
      setRemainderError("Network error. Please try again.");
    } finally {
      setRemainderBusy(null);
    }
  }

  async function handleRemainderCancel() {
    if (remainderBusy) return;
    if (!confirm("Cancel the authorization hold for this attendee?")) return;

    setRemainderBusy("cancel");
    setRemainderError(null);
    try {
      const res = await fetch(
        `/api/admin/attendees/${attendeeId}/remainder-cancel`,
        { method: "POST" },
      );
      const data = await res.json();
      if (!res.ok) {
        setRemainderError(data.error || "Failed to cancel authorization.");
        return;
      }

      await load();
      onUpdate();
    } catch {
      setRemainderError("Network error. Please try again.");
    } finally {
      setRemainderBusy(null);
    }
  }

  return (
    <Dialog
      open
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descId}
      overlayClassName="flex items-end md:items-center justify-center p-4"
      panelClassName="relative w-full max-w-lg rounded-t-xl md:rounded-xl bg-[var(--color-bg-850)] border border-[var(--color-border-700)] shadow-[var(--shadow-lg)] max-h-[calc(100vh-2rem)] overflow-hidden"
      panelId="admin-attendee-detail-dialog"
      panelTestId="admin-attendee-detail-dialog"
    >
      <div className="p-6">
        <p id={descId} className="sr-only">
          View attendee details and update internal status fields.
        </p>

        <div className="flex items-center justify-between mb-6">
          <h2
            id={titleId}
            className="font-heading font-semibold text-lg text-[var(--color-text-100)]"
          >
            Attendee Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-[var(--color-text-500)] hover:text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
            aria-label="Close attendee details"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-9rem)] pr-2 -mr-2">
          {loading ? (
            <p className="text-sm text-[var(--color-text-500)]">Loading...</p>
          ) : loadError ? (
            <div className="space-y-3">
              <p className="text-sm text-[var(--color-error)]">{loadError}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-700)] px-4 py-2 text-sm font-medium text-[var(--color-text-100)] hover:border-[var(--color-text-500)] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : attendee ? (
            <div className="space-y-4">
              <InfoRow
                label="Name"
                value={`${attendee.firstName} ${attendee.lastName}`}
              />
              <InfoRow label="Email" value={attendee.email} />
              <InfoRow label="Role" value={attendee.roleTitle} />
              {attendee.company && (
                <InfoRow label="Company" value={attendee.company} />
              )}
              {attendee.linkedinUrl && (
                <InfoRow label="LinkedIn" value={attendee.linkedinUrl} />
              )}
              <InfoRow label="Use Case" value={attendee.useCase} />
              <InfoRow
                label="Referral code"
                value={attendee.networkCode || "None"}
              />
              <InfoRow label="Deposit" value={attendee.depositStatus} />
              <InfoRow label="Remainder" value={attendee.remainderStatus} />

              <div className="pt-4 border-t border-[var(--color-border-700)] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text-500)]">
                      Remainder actions
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-500)]">
                      Collect the remainder via Stripe at check-in. Promo codes are entered in
                      Stripe Checkout.
                    </p>
                  </div>
                </div>

                {remainderError ? (
                  <p className="text-sm text-[var(--color-error)]">{remainderError}</p>
                ) : null}

                {attendee.depositStatus !== "paid" ? (
                  <p className="text-sm text-[var(--color-text-500)]">
                    Deposit must be paid before collecting the remainder.
                  </p>
                ) : attendee.remainderStatus === "none" ? (
                  <button
                    type="button"
                    onClick={handleRemainderCheckout}
                    disabled={remainderBusy !== null}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {remainderBusy === "checkout"
                      ? "Opening Stripe Checkout..."
                      : "Collect remainder (Stripe)"}
                  </button>
                ) : attendee.remainderStatus === "authorized" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleRemainderCapture}
                      disabled={remainderBusy !== null}
                      className="inline-flex items-center justify-center rounded-lg bg-[var(--color-success-surface)] text-[var(--color-success)] px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                    >
                      {remainderBusy === "capture" ? "Capturing..." : "Capture remainder"}
                    </button>
                    <button
                      type="button"
                      onClick={handleRemainderCancel}
                      disabled={remainderBusy !== null}
                      className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-100)] px-4 py-2 text-sm font-medium hover:border-[var(--color-text-500)] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {remainderBusy === "cancel"
                        ? "Canceling..."
                        : "Cancel authorization"}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-text-500)]">
                    No actions available for remainder status: {attendee.remainderStatus}
                  </p>
                )}

                <p className="text-xs text-[var(--color-text-500)]">
                  After checkout completes, refresh this dialog to see{" "}
                  <span className="font-mono">authorized</span>. Capture should happen after Day
                  1.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-700)] space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-500)] mb-1">
                    Application Status
                  </label>
                  <select
                    value={applicationStatus}
                    onChange={(e) => setApplicationStatus(e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
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
                    className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
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
                    className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
                    placeholder="Internal notes (not visible to attendee)..."
                  />
                </div>

                {saveError ? (
                  <p className="text-sm text-[var(--color-error)]">{saveError}</p>
                ) : null}

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
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-[var(--color-text-500)] block">
        {label}
      </span>
      <span className="text-sm text-[var(--color-text-300)] break-words">
        {value}
      </span>
    </div>
  );
}
