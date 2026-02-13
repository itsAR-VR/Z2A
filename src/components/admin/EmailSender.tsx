"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildTemplate,
  EMAIL_SETTING_KEYS,
  EMAIL_TEMPLATE_KEYS,
  getTemplateLabel,
  type EmailTemplateKey,
  type EmailSettingKey,
  validateTemplateSettings,
} from "@/lib/email-templates";

type SettingRecord = Record<EmailSettingKey, string>;

type DryRunResponse = {
  dryRun: true;
  recipientCount: number;
  preview: { subject: string; text: string; html: string };
};

type SendResponse = {
  dryRun: false;
  sent: number;
  failed: number;
  errors: Array<{ email: string; error: string }>;
  failedRecipients: string[];
};

type DispatchTemplate =
  | "deposit_confirmation"
  | "prework"
  | "venue"
  | "day1_prep";

type DispatchStatus =
  | "pending"
  | "sending"
  | "sent"
  | "failed"
  | "skipped";

type DispatchRow = {
  id: string;
  template: DispatchTemplate;
  status: DispatchStatus;
  attemptCount: number;
  lastAttemptAt: string | null;
  sentAt: string | null;
  providerMessageId: string | null;
  errorMessage: string | null;
  attendee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

type RetryDispatchResponse = {
  attempted: number;
  sent: number;
  failed: number;
  alreadySent: number;
  skipped: number;
  inProgress: number;
  results: Array<{ dispatchId: string; status: string; error?: string }>;
};

const EMPTY_SETTINGS: SettingRecord = {
  venue_address: "",
  venue_parking: "",
  venue_start_time: "",
  prework_extra: "",
  day1_what_to_bring: "",
};

function dispatchTemplateLabel(template: DispatchTemplate) {
  if (template === "deposit_confirmation") return "Deposit Confirmation";
  if (template === "prework") return "Prework Reminder";
  if (template === "venue") return "Venue Details";
  return "Day 1 Prep";
}

export function EmailSender() {
  const [settings, setSettings] = useState<SettingRecord>(EMPTY_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [template, setTemplate] = useState<EmailTemplateKey>("prework");
  const [dryRunResult, setDryRunResult] = useState<DryRunResponse | null>(null);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<SendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [dispatches, setDispatches] = useState<DispatchRow[]>([]);
  const [dispatchLoading, setDispatchLoading] = useState(true);
  const [dispatchTemplateFilter, setDispatchTemplateFilter] = useState("");
  const [dispatchStatusFilter, setDispatchStatusFilter] = useState("");
  const [dispatchFailedOnly, setDispatchFailedOnly] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retryResult, setRetryResult] = useState<RetryDispatchResponse | null>(null);

  const loadDispatches = useCallback(async () => {
    setDispatchLoading(true);
    try {
      const params = new URLSearchParams();
      if (dispatchTemplateFilter) params.set("template", dispatchTemplateFilter);
      if (dispatchStatusFilter) params.set("status", dispatchStatusFilter);
      if (dispatchFailedOnly) params.set("failedOnly", "1");

      const query = params.toString();
      const url = query
        ? `/api/admin/email/dispatches?${query}`
        : "/api/admin/email/dispatches";

      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load email delivery status.");
        setDispatches([]);
        return;
      }

      setDispatches((data.dispatches || []) as DispatchRow[]);
    } catch {
      setError("Network error while loading email delivery status.");
      setDispatches([]);
    } finally {
      setDispatchLoading(false);
    }
  }, [dispatchTemplateFilter, dispatchStatusFilter, dispatchFailedOnly]);

  useEffect(() => {
    let cancelled = false;
    async function loadSettings() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/email-settings");
        const data = await res.json();
        if (!res.ok) {
          if (!cancelled) setError(data.error || "Failed to load email settings.");
          return;
        }
        if (cancelled) return;
        const next: SettingRecord = { ...EMPTY_SETTINGS };
        for (const row of data.settings || []) {
          if (row.key in next) next[row.key as EmailSettingKey] = row.value || "";
        }
        setSettings(next);
      } catch {
        if (!cancelled) setError("Network error while loading email settings.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    void loadDispatches();
  }, [loadDispatches]);

  const settingsMap = useMemo(
    () => new Map(Object.entries(settings)),
    [settings],
  );
  const missingSettings = validateTemplateSettings(template, settingsMap);
  const preview = useMemo(
    () => buildTemplate(template, settingsMap, { firstName: "Preview" }),
    [template, settingsMap],
  );

  async function saveSettings() {
    setSaving(true);
    setSaveMessage(null);
    setError(null);
    try {
      const payload = {
        settings: EMAIL_SETTING_KEYS.map((key) => ({ key, value: settings[key] })),
      };
      const res = await fetch("/api/admin/email-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save settings.");
        return;
      }
      setSaveMessage("Settings saved.");
    } catch {
      setError("Network error while saving settings.");
    } finally {
      setSaving(false);
    }
  }

  async function runDryRun() {
    setError(null);
    setDryRunResult(null);
    try {
      const res = await fetch("/api/admin/email/send-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template, dryRun: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Dry run failed.");
        return null;
      }
      const result = data as DryRunResponse;
      setDryRunResult(result);
      return result;
    } catch {
      setError("Network error during dry run.");
      return null;
    }
  }

  async function sendBatch(recipientMode: "all_paid" | "failed_only") {
    setError(null);
    setSending(true);
    try {
      const payload: Record<string, unknown> = {
        template,
        dryRun: false,
        recipientMode,
      };
      if (recipientMode === "failed_only") {
        payload.recipientEmails = sendResult?.failedRecipients || [];
      }

      const res = await fetch("/api/admin/email/send-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send batch.");
        return;
      }
      setSendResult(data as SendResponse);
      await loadDispatches();
    } catch {
      setError("Network error while sending batch.");
    } finally {
      setSending(false);
    }
  }

  async function retryDispatches(dispatchIds?: string[]) {
    if (retrying) return;
    setRetrying(true);
    setError(null);
    setRetryResult(null);

    try {
      const payload = dispatchIds?.length
        ? { dispatchIds, failedOnly: false }
        : { failedOnly: true, limit: 100 };

      const res = await fetch("/api/admin/email/dispatches/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to retry dispatches.");
        return;
      }

      setRetryResult(data as RetryDispatchResponse);
      await loadDispatches();
    } catch {
      setError("Network error while retrying dispatches.");
    } finally {
      setRetrying(false);
    }
  }

  async function confirmAndSendAll() {
    const dryRun = await runDryRun();
    if (!dryRun) return;
    const previewCount = dryRun?.recipientCount ?? 0;
    if (
      !confirm(
        `Send "${getTemplateLabel(template)}" to ${previewCount} paid attendee${previewCount === 1 ? "" : "s"}?`,
      )
    ) {
      return;
    }
    await sendBatch("all_paid");
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-text-500)] py-8 text-center">Loading...</p>;
  }

  const failedDispatches = dispatches.filter((row) => row.status === "failed");

  return (
    <div className="space-y-6">
      {error ? (
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      ) : null}
      {saveMessage ? (
        <p className="text-sm text-[var(--color-success)]">{saveMessage}</p>
      ) : null}

      <section className="rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] p-4">
        <h3 className="font-heading font-semibold text-[var(--color-text-100)] mb-4">
          Email Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingField
            label="Venue address"
            value={settings.venue_address}
            onChange={(value) => setSettings((prev) => ({ ...prev, venue_address: value }))}
          />
          <SettingField
            label="Venue start time"
            value={settings.venue_start_time}
            onChange={(value) => setSettings((prev) => ({ ...prev, venue_start_time: value }))}
          />
          <SettingField
            label="Venue parking"
            value={settings.venue_parking}
            onChange={(value) => setSettings((prev) => ({ ...prev, venue_parking: value }))}
          />
          <SettingField
            label="Day 1 what to bring"
            value={settings.day1_what_to_bring}
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, day1_what_to_bring: value }))
            }
          />
          <div className="md:col-span-2">
            <SettingField
              multiline
              label="Prework extra"
              value={settings.prework_extra}
              onChange={(value) => setSettings((prev) => ({ ...prev, prework_extra: value }))}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => void saveSettings()}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] p-4 space-y-4">
        <h3 className="font-heading font-semibold text-[var(--color-text-100)]">
          Send Batch Email
        </h3>

        <label className="block">
          <span className="block text-xs mb-1 text-[var(--color-text-500)]">Template</span>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as EmailTemplateKey)}
            className="w-full max-w-xs rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
          >
            {EMAIL_TEMPLATE_KEYS.map((key) => (
              <option key={key} value={key}>
                {getTemplateLabel(key)}
              </option>
            ))}
          </select>
        </label>

        {missingSettings.length > 0 ? (
          <p className="text-sm text-[var(--color-warning)]">
            Missing required settings: {missingSettings.join(", ")}
          </p>
        ) : null}

        <div className="rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-500)] mb-1">
            Preview subject
          </p>
          <p className="text-sm text-[var(--color-text-100)]">{preview.subject}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-500)] mt-3 mb-1">
            Preview body
          </p>
          <pre className="text-xs whitespace-pre-wrap text-[var(--color-text-300)]">
            {preview.text}
          </pre>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void runDryRun()}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-300)] px-4 py-2 text-sm font-medium hover:text-[var(--color-text-100)] hover:border-[var(--color-text-500)] transition-colors cursor-pointer"
          >
            Dry run
          </button>
          <button
            type="button"
            disabled={missingSettings.length > 0 || sending}
            onClick={() => void confirmAndSendAll()}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {sending ? "Sending..." : "Send to all paid attendees"}
          </button>
          {sendResult?.failedRecipients?.length ? (
            <button
              type="button"
              disabled={sending}
              onClick={() => void sendBatch("failed_only")}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-300)] px-4 py-2 text-sm font-medium hover:text-[var(--color-text-100)] hover:border-[var(--color-text-500)] transition-colors disabled:opacity-50 cursor-pointer"
            >
              Retry failed only
            </button>
          ) : null}
        </div>

        {dryRunResult ? (
          <p className="text-sm text-[var(--color-text-300)]">
            Dry run ready: {dryRunResult.recipientCount} recipient
            {dryRunResult.recipientCount === 1 ? "" : "s"}.
          </p>
        ) : null}

        {sendResult ? (
          <div className="rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] p-3 text-sm text-[var(--color-text-300)]">
            Sent: {sendResult.sent} · Failed: {sendResult.failed}
            {sendResult.errors.length > 0 ? (
              <ul className="mt-2 space-y-1 text-xs">
                {sendResult.errors.slice(0, 10).map((entry) => (
                  <li key={`${entry.email}-${entry.error}`}>
                    {entry.email}: {entry.error}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-800)] p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-heading font-semibold text-[var(--color-text-100)]">
            Delivery Status + Retry
          </h3>
          <button
            type="button"
            onClick={() => void loadDispatches()}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-300)] px-3 py-1.5 text-xs font-medium hover:text-[var(--color-text-100)] hover:border-[var(--color-text-500)] transition-colors cursor-pointer"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs mb-1 text-[var(--color-text-500)]">Template</span>
            <select
              value={dispatchTemplateFilter}
              onChange={(e) => setDispatchTemplateFilter(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
            >
              <option value="">All templates</option>
              <option value="deposit_confirmation">Deposit Confirmation</option>
              <option value="prework">Prework Reminder</option>
              <option value="venue">Venue Details</option>
              <option value="day1_prep">Day 1 Prep</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-xs mb-1 text-[var(--color-text-500)]">Status</span>
            <select
              value={dispatchStatusFilter}
              onChange={(e) => setDispatchStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] px-3 py-2 text-sm text-[var(--color-text-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="sending">Sending</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="skipped">Skipped</option>
            </select>
          </label>

          <label className="flex items-end gap-2 pb-2">
            <input
              type="checkbox"
              checked={dispatchFailedOnly}
              onChange={(e) => setDispatchFailedOnly(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--color-border-700)] bg-[var(--color-bg-850)]"
            />
            <span className="text-sm text-[var(--color-text-300)]">Failed only</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={retrying || failedDispatches.length === 0}
            onClick={() => void retryDispatches()}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] text-[var(--color-bg-900)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {retrying ? "Retrying..." : "Retry failed dispatches"}
          </button>
        </div>

        {retryResult ? (
          <p className="text-sm text-[var(--color-text-300)]">
            Attempted {retryResult.attempted} · Sent {retryResult.sent} · Failed {retryResult.failed} · Already sent {retryResult.alreadySent}
          </p>
        ) : null}

        {dispatchLoading ? (
          <p className="text-sm text-[var(--color-text-500)] py-4">Loading dispatches...</p>
        ) : dispatches.length === 0 ? (
          <p className="text-sm text-[var(--color-text-500)] py-4">No dispatch records yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border-700)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--color-bg-850)] text-left text-[var(--color-text-500)]">
                  <th className="px-3 py-2 font-medium">Recipient</th>
                  <th className="px-3 py-2 font-medium">Template</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Attempts</th>
                  <th className="px-3 py-2 font-medium">Last attempt</th>
                  <th className="px-3 py-2 font-medium">Error</th>
                  <th className="px-3 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-700)]">
                {dispatches.map((dispatch) => (
                  <tr key={dispatch.id} className="hover:bg-[var(--color-bg-850)] transition-colors">
                    <td className="px-3 py-2 text-[var(--color-text-100)]">
                      <div className="font-medium">
                        {dispatch.attendee.firstName} {dispatch.attendee.lastName}
                      </div>
                      <div className="text-xs text-[var(--color-text-500)]">{dispatch.attendee.email}</div>
                    </td>
                    <td className="px-3 py-2 text-[var(--color-text-300)]">
                      {dispatchTemplateLabel(dispatch.template)}
                    </td>
                    <td className="px-3 py-2">
                      <DispatchStatusBadge status={dispatch.status} />
                    </td>
                    <td className="px-3 py-2 text-[var(--color-text-300)]">{dispatch.attemptCount}</td>
                    <td className="px-3 py-2 text-xs text-[var(--color-text-500)] whitespace-nowrap">
                      {dispatch.lastAttemptAt
                        ? new Date(dispatch.lastAttemptAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-3 py-2 text-xs text-[var(--color-text-500)] max-w-[300px]">
                      {dispatch.errorMessage || "—"}
                    </td>
                    <td className="px-3 py-2">
                      {dispatch.status === "failed" ? (
                        <button
                          type="button"
                          disabled={retrying}
                          onClick={() => void retryDispatches([dispatch.id])}
                          className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-700)] text-[var(--color-text-300)] px-2 py-1 text-xs font-medium hover:text-[var(--color-text-100)] hover:border-[var(--color-text-500)] transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Retry
                        </button>
                      ) : (
                        <span className="text-xs text-[var(--color-text-500)]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function SettingField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs mb-1 text-[var(--color-text-500)]">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] px-3 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border-700)] bg-[var(--color-bg-850)] px-3 py-2 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]/50"
        />
      )}
    </label>
  );
}

function DispatchStatusBadge({ status }: { status: DispatchStatus }) {
  const styles: Record<DispatchStatus, string> = {
    pending: "text-[var(--color-warning)] bg-[var(--color-warning-surface)]",
    sending: "text-[var(--color-info)] bg-[var(--color-info-surface)]",
    sent: "text-[var(--color-success)] bg-[var(--color-success-surface)]",
    failed: "text-[var(--color-error)] bg-[var(--color-error-surface)]",
    skipped: "text-[var(--color-text-500)] bg-[var(--color-bg-800)]",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
