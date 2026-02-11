"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  company: string;
  linkedinUrl: string;
  useCase: string;
  networkCode: string;
}

interface FieldError {
  [key: string]: string;
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    roleTitle: "",
    company: "",
    linkedinUrl: "",
    useCase: "",
    networkCode: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [validationSummary, setValidationSummary] = useState<string | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [redirectFallbackUrl, setRedirectFallbackUrl] = useState<string | null>(
    null,
  );
  const [showRedirectHelp, setShowRedirectHelp] = useState(false);
  const [showNetworkCode, setShowNetworkCode] = useState(
    () => searchParams.get("referral") === "1",
  );
  const formStartedRef = useRef(false);

  function onFormFocusCapture() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent("apply_form_start");
  }

  function validate(): FieldError {
    const e: FieldError = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.roleTitle.trim()) e.roleTitle = "Role/title is required";
    if (form.linkedinUrl && !/^https?:\/\/.+/.test(form.linkedinUrl))
      e.linkedinUrl = "Enter a valid URL";
    if (!form.useCase.trim()) e.useCase = "Use case is required";
    return e;
  }

  function focusFirstInvalid(validationErrors: FieldError) {
    const order: Array<keyof FormData> = [
      "firstName",
      "lastName",
      "email",
      "roleTitle",
      "useCase",
      "linkedinUrl",
      "networkCode",
    ];

    const first = order.find((k) => Boolean(validationErrors[k]));
    if (!first) return;

    // Inputs use `id={name}`. The use-case textarea uses id="useCase".
    const el =
      document.getElementById(String(first)) ??
      document.querySelector<HTMLElement>(`[name="${String(first)}"]`);
    el?.focus();
  }

  async function submit() {
    if (submitting) return;

    setServerError(null);
    setValidationSummary(null);
    setRedirectFallbackUrl(null);
    setShowRedirectHelp(false);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setValidationSummary("Please fix the highlighted fields and try again.");
      focusFirstInvalid(validationErrors);
      return;
    }

    trackEvent("apply_submit_click");
    setSubmitting(true);

    try {
      const body: Record<string, string> = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        roleTitle: form.roleTitle.trim(),
        useCase: form.useCase.trim(),
      };
      if (form.company.trim()) body.company = form.company.trim();
      if (form.linkedinUrl.trim()) body.linkedinUrl = form.linkedinUrl.trim();
      if (form.networkCode.trim()) body.networkCode = form.networkCode.trim();

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15_000);

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      window.clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Redirect to Stripe Checkout
      setRedirectFallbackUrl(data.checkoutUrl);
      window.setTimeout(() => setShowRedirectHelp(true), 1500);
      window.location.href = data.checkoutUrl;
    } catch {
      setServerError(
        "Network error (or timeout). Please check your connection and try again.",
      );
      setSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validationSummary) setValidationSummary(null);
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container-content pt-28 pb-20">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <Link
            href="/"
            className="font-heading font-bold text-[15px] tracking-tight text-[var(--color-text)] hover:text-[color-mix(in_oklch,var(--color-accent)_70%,var(--color-text))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-full px-3 py-2"
          >
            Zero-to-Agent
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
              Application
            </p>
            <h1 className="mt-3 font-heading font-bold tracking-tight text-[clamp(30px,3.2vw,44px)] leading-[1.05] text-[var(--color-text)]">
              Apply in 2–3 minutes
            </h1>
            <p className="mt-3 text-[15px] md:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-[60ch]">
              Tell us what you want to automate. After you submit, you&apos;ll
              be redirected to Stripe for the $100 deposit to reserve your seat.
              Full refund is available through the end of Day 2.
            </p>

            <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "1. Application", active: true },
                  { label: "2. Deposit", active: false },
                  { label: "3. Confirmed", active: false },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-[var(--radius-md)] border px-3 py-3 text-[12px] font-medium ${
                      s.active
                        ? "border-[color-mix(in_oklch,var(--color-accent)_35%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] text-[var(--color-text)]"
                        : "border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-bg)_45%,var(--color-surface))] text-[var(--color-text-faint)]"
                    }`}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {canceled && (
              <div className="mt-6 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-warning)_40%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-warning)_10%,var(--color-surface))] p-5 text-sm text-[var(--color-text)] shadow-[var(--shadow-sm)]">
                Payment was canceled. Your application is saved. You can try again when you&apos;re ready.
              </div>
            )}

            {serverError && (
              <div className="mt-6 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-error)_45%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-error)_10%,var(--color-surface))] p-5 text-sm text-[var(--color-text)] shadow-[var(--shadow-sm)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p>{serverError}</p>
                  <button
                    type="button"
                    onClick={() => void submit()}
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[13px] font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-quart)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  >
                    Try again
                  </button>
                </div>
                {redirectFallbackUrl && (
                  <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                    If you are not redirected, use this link:{" "}
                    <a
                      className="underline text-[var(--color-accent)]"
                      href={redirectFallbackUrl}
                    >
                      Continue to Stripe
                    </a>
                    .
                  </p>
                )}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              onFocusCapture={onFormFocusCapture}
              className="mt-6 space-y-5"
            >
              {validationSummary && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-error)_35%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-error)_8%,var(--color-surface))] p-5 text-sm text-[var(--color-text)] shadow-[var(--shadow-sm)]"
                >
                  {validationSummary}
                </div>
              )}
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 md:p-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="First name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                    autoComplete="given-name"
                  />
                  <Field
                    label="Last name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <div className="mt-5 space-y-5">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    autoComplete="email"
                    placeholder="name@company.com"
                  />

                  <Field
                    label="Role / title"
                    name="roleTitle"
                    value={form.roleTitle}
                    onChange={handleChange}
                    error={errors.roleTitle}
                    required
                    autoComplete="organization-title"
                    placeholder="e.g., Product Manager"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Company (optional)"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      error={errors.company}
                      autoComplete="organization"
                    />

                    <Field
                      label="LinkedIn (optional)"
                      name="linkedinUrl"
                      type="url"
                      value={form.linkedinUrl}
                      onChange={handleChange}
                      error={errors.linkedinUrl}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="useCase"
                      className="block text-[13px] font-medium text-[var(--color-text)] mb-1.5"
                    >
                      What do you want to automate?{" "}
                      <span className="text-[var(--color-error)]">*</span>
                    </label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {[
                        {
                          label: "Support triage",
                          value:
                            "Triage inbound support tickets and draft replies with guardrails.",
                        },
                        {
                          label: "Lead qualifying",
                          value:
                            "Qualify leads and route them to the right rep with clear rules.",
                        },
                        {
                          label: "Call follow-ups",
                          value:
                            "Summarize customer calls and generate follow-up tasks automatically.",
                        },
                      ].map((ex) => (
                        <button
                          key={ex.label}
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, useCase: ex.value }));
                            if (errors.useCase) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.useCase;
                                return next;
                              });
                            }
                            setValidationSummary(null);
                          }}
                          className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] px-3 py-1 text-[12px] font-medium text-[var(--color-text-muted)] transition-colors [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-quart)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                        >
                          {ex.label}
                        </button>
                      ))}
                    </div>
                    <textarea
                      id="useCase"
                      name="useCase"
                      rows={4}
                      value={form.useCase}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.useCase)}
                      aria-describedby={errors.useCase ? "useCase-error" : undefined}
                      className={`w-full rounded-[var(--radius-md)] border bg-[color-mix(in_oklch,var(--color-bg)_45%,var(--color-surface))] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] transition-colors ${
                        errors.useCase
                          ? "border-[color-mix(in_oklch,var(--color-error)_55%,var(--color-border))]"
                          : "border-[var(--color-border)]"
                      }`}
                      placeholder="Example: triage inbound support tickets, route them, and draft responses with guardrails."
                    />
                    {errors.useCase ? (
                      <p id="useCase-error" className="mt-1.5 text-xs text-[var(--color-error)]">
                        {errors.useCase}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-[var(--color-text-faint)]">
                        Keep it short. A few sentences is enough.
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    {!showNetworkCode ? (
                      <button
                        type="button"
                        onClick={() => setShowNetworkCode(true)}
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-accent)] hover:text-[color-mix(in_oklch,var(--color-accent)_80%,black)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] rounded-full px-2 py-1"
                      >
                        Add a referral code (optional)
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    ) : (
                      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_6%,var(--color-surface))] p-4">
                        <Field
                          label="Referral code (optional)"
                          name="networkCode"
                          value={form.networkCode}
                          onChange={handleChange}
                          error={errors.networkCode}
                          placeholder="Enter your code"
                        />
                        <p className="mt-2 text-xs text-[var(--color-text-faint)]">
                          Referral codes help us track how you found us.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <Button type="submit" disabled={submitting} className="w-full justify-center">
                    {submitting ? "Redirecting to payment..." : "Continue to deposit ($100)"}
                  </Button>
                  <p className="mt-3 text-xs text-[var(--color-text-faint)] text-center">
                    You&apos;ll be redirected to Stripe to pay the $100 deposit
                    now. Full refund if unsatisfied by end of Day 2.
                  </p>
                  {submitting && redirectFallbackUrl && showRedirectHelp && (
                    <p className="mt-2 text-xs text-center text-[var(--color-text-muted)]">
                      Not redirected?{" "}
                      <a
                        className="underline text-[var(--color-accent)]"
                        href={redirectFallbackUrl}
                      >
                        Continue to Stripe
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          <aside className="md:col-span-5 md:sticky md:top-28">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_70%,transparent)] backdrop-blur-md shadow-[var(--shadow-lg)] p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-faint)]">
                What happens next
              </p>
              <ol className="mt-4 space-y-4">
                {[
                  {
                    t: "Submit your application",
                    d: "Basic details plus a short description of your workflow.",
                  },
                  {
                    t: "Pay the $100 deposit via Stripe",
                    d: "Secure checkout. The deposit reserves your seat immediately.",
                  },
                  {
                    t: "Get confirmation + prework",
                    d: "You’ll receive next steps (what to bring, setup guidance, and prework).",
                  },
                ].map((s, idx) => (
                  <li key={s.t} className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-[color-mix(in_oklch,var(--color-accent)_30%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] flex items-center justify-center font-mono text-[11px] text-[var(--color-accent)]">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-[15px] text-[var(--color-text)]">
                        {s.t}
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        {s.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <p className="font-heading font-semibold text-sm text-[var(--color-text)]">
                  Refund policy
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Full refund if unsatisfied by end of Day 2. Refunds issued within 7 days.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;
  const describedBy = error ? errorId : undefined;
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[13px] font-medium text-[var(--color-text)] mb-1.5"
      >
        {label}
        {required && (
          <span className="text-[var(--color-error)]"> *</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`w-full rounded-[var(--radius-md)] border bg-[color-mix(in_oklch,var(--color-bg)_45%,var(--color-surface))] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] transition-colors ${
          error
            ? "border-[color-mix(in_oklch,var(--color-error)_55%,var(--color-border))]"
            : "border-[var(--color-border)]"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-bg-900)] flex items-center justify-center">
          <p className="text-[var(--color-text-500)]">Loading...</p>
        </div>
      }
    >
      <ApplyForm />
    </Suspense>
  );
}
