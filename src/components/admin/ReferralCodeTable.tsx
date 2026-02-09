"use client";

import { useState, useEffect, useCallback } from "react";
import { AuditLogViewer } from "./AuditLogViewer";

interface ReferralCode {
  id: string;
  code: string;
  type: string;
  active: boolean;
  createdAt: string;
  _count: { auditLogs: number };
}

export function ReferralCodeTable() {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCode, setNewCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [toggleTarget, setToggleTarget] = useState<ReferralCode | null>(null);
  const [toggleReason, setToggleReason] = useState("");
  const [toggleError, setToggleError] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);
  const [auditCodeId, setAuditCodeId] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/referral-codes");
      const data = await res.json();
      setCodes(data.referralCodes || []);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  async function handleCreate() {
    if (!newCode.trim()) return;
    setCreating(true);
    setCreateError(null);

    try {
      const res = await fetch("/api/admin/referral-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: newCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.error || "Failed to create code");
      } else {
        setNewCode("");
        fetchCodes();
      }
    } catch {
      setCreateError("Network error");
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle() {
    if (!toggleTarget) return;
    const nextActive = !toggleTarget.active;
    const reason = toggleReason.trim();

    // Require a reason for deactivation; activation reason is optional.
    if (toggleTarget.active && !reason) {
      setToggleError("Reason is required to deactivate a code");
      return;
    }
    setToggling(true);
    setToggleError(null);

    try {
      const payload: { active: boolean; reason?: string } = { active: nextActive };
      if (reason) payload.reason = reason;

      const res = await fetch(`/api/admin/referral-codes/${toggleTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const reasonError =
          data?.details?.fieldErrors?.reason?.[0] ?? data?.details?.reason?.[0];
        setToggleError(reasonError || data?.error || "Failed to update code");
        return;
      }

      setToggleTarget(null);
      setToggleReason("");
      setToggleError(null);
      fetchCodes();
    } catch {
      setToggleError("Network error");
    } finally {
      setToggling(false);
    }
  }

  return (
    <div>
      {/* Create form */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          placeholder="New referral code..."
          className="flex-1 max-w-xs rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-4 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50 uppercase"
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating || !newCode.trim()}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {creating ? "Creating..." : "Create Code"}
        </button>
      </div>
      {createError && (
        <p className="text-sm text-[var(--color-error)] mb-4">{createError}</p>
      )}

      {loading ? (
        <p className="text-sm text-[var(--color-text-500)] py-8 text-center">
          Loading...
        </p>
      ) : codes.length === 0 ? (
        <p className="text-sm text-[var(--color-text-500)] py-8 text-center">
          No referral codes yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border-700)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-bg-800)] text-left text-[var(--color-text-500)]">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Audit Logs</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-700)]">
              {codes.map((code) => (
                <tr key={code.id} className="hover:bg-[var(--color-bg-800)] transition-colors">
                  <td className="px-4 py-3 font-mono text-sm text-[var(--color-text-100)]">
                    {code.code}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-300)]">
                    {code.type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        code.active
                          ? "text-[var(--color-success)] bg-[var(--color-success-surface)]"
                          : "text-[var(--color-error)] bg-[var(--color-error-surface)]"
                      }`}
                    >
                      {code.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setAuditCodeId(code.id)}
                      className="text-sm text-[var(--color-accent-500)] hover:underline cursor-pointer"
                    >
                      {code._count.auditLogs} entries
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-500)] text-xs">
                    {new Date(code.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        setToggleTarget(code);
                        setToggleReason("");
                        setToggleError(null);
                      }}
                      className={`text-sm font-medium cursor-pointer hover:opacity-80 ${
                        code.active
                          ? "text-[var(--color-error)]"
                          : "text-[var(--color-success)]"
                      }`}
                    >
                      {code.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toggle confirmation modal */}
      {toggleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-bg-850)] border border-[var(--color-border-700)] rounded-xl w-full max-w-md p-6">
            <h3 className="font-heading font-semibold text-base text-[var(--color-text-100)] mb-2">
              {toggleTarget.active ? "Deactivate" : "Activate"} code:{" "}
              <span className="font-mono">{toggleTarget.code}</span>
            </h3>
            <p className="text-sm text-[var(--color-text-300)] mb-4">
              {toggleTarget.active
                ? "Please provide a reason for deactivation (required for audit log)."
                : "Optional: add a reason for activation (will appear in the audit log)."}
            </p>
            {toggleError && (
              <p className="text-sm text-[var(--color-error)] mb-4">
                {toggleError}
              </p>
            )}
            <textarea
              rows={2}
              value={toggleReason}
              onChange={(e) => setToggleReason(e.target.value)}
              placeholder={
                toggleTarget.active
                  ? "Reason for deactivation..."
                  : "Reason for activation (optional)..."
              }
              className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] px-3 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50 mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setToggleTarget(null);
                  setToggleError(null);
                }}
                className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-300)] hover:text-[var(--color-text-100)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggle}
                disabled={toggling || (toggleTarget.active && !toggleReason.trim())}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] hover:bg-[var(--color-accent-600)] disabled:opacity-50 cursor-pointer"
              >
                {toggling ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit log modal */}
      {auditCodeId && (
        <AuditLogViewer
          referralCodeId={auditCodeId}
          onClose={() => setAuditCodeId(null)}
        />
      )}
    </div>
  );
}
