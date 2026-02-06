"use client";

import { useState, useEffect } from "react";

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  reason: string | null;
  metadata: string | null;
  createdAt: string;
}

interface AuditLogViewerProps {
  referralCodeId: string;
  onClose: () => void;
}

export function AuditLogViewer({ referralCodeId, onClose }: AuditLogViewerProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [codeStr, setCodeStr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/referral-codes/${referralCodeId}/audit`,
        );
        const data = await res.json();
        setLogs(data.auditLogs || []);
        setCodeStr(data.referralCode || "");
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [referralCodeId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[var(--color-bg-850)] border border-[var(--color-border-700)] rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-semibold text-base text-[var(--color-text-100)]">
            Audit Log{codeStr ? `: ${codeStr}` : ""}
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
        ) : logs.length === 0 ? (
          <p className="text-sm text-[var(--color-text-500)]">No audit logs.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border-l-2 border-[var(--color-border-700)] pl-4 py-1"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                      log.action === "created"
                        ? "text-blue-400 bg-blue-400/10"
                        : log.action === "activated"
                          ? "text-green-400 bg-green-400/10"
                          : "text-red-400 bg-red-400/10"
                    }`}
                  >
                    {log.action}
                  </span>
                  <span className="text-xs text-[var(--color-text-500)]">
                    by {log.actor}
                  </span>
                  <span className="text-xs text-[var(--color-text-500)]">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                {log.reason && (
                  <p className="text-sm text-[var(--color-text-300)]">
                    {log.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
