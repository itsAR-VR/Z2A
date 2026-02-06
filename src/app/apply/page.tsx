"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/Button";

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
  const [submitting, setSubmitting] = useState(false);
  const [showNetworkCode, setShowNetworkCode] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

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

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.checkoutUrl;
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-900)]">
      <div className="container-content py-20 md:py-28 max-w-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-500)] hover:text-[var(--color-accent-500)] transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        <h1 className="font-heading font-bold text-[28px] md:text-[40px] leading-tight mb-3">
          Apply / Reserve Seat
        </h1>
        <p className="text-[var(--color-text-300)] mb-8">
          Submit your application and pay a $100 deposit to reserve your spot.
          Limited to 50 seats.
        </p>

        {canceled && (
          <div className="mb-6 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 text-yellow-200 text-sm">
            Payment was canceled. Your application is saved — you can try again.
          </div>
        )}

        {serverError && (
          <div className="mb-6 p-4 rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 text-red-300 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <Field
              label="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>

          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Field
            label="Role / Title"
            name="roleTitle"
            value={form.roleTitle}
            onChange={handleChange}
            error={errors.roleTitle}
            required
          />

          <Field
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            error={errors.company}
          />

          <Field
            label="LinkedIn URL"
            name="linkedinUrl"
            type="url"
            value={form.linkedinUrl}
            onChange={handleChange}
            error={errors.linkedinUrl}
            placeholder="https://linkedin.com/in/..."
          />

          <div>
            <label
              htmlFor="useCase"
              className="block text-sm font-medium text-[var(--color-text-300)] mb-1.5"
            >
              Use case <span className="text-[var(--color-error)]">*</span>
            </label>
            <textarea
              id="useCase"
              name="useCase"
              rows={4}
              value={form.useCase}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-[var(--color-bg-800)] px-4 py-3 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50 transition-all ${
                errors.useCase
                  ? "border-[var(--color-error)]"
                  : "border-[var(--color-border-700)]"
              }`}
              placeholder="Describe the workflow or use case you want to automate with an AI agent..."
            />
            {errors.useCase && (
              <p className="mt-1 text-xs text-[var(--color-error)]">
                {errors.useCase}
              </p>
            )}
          </div>

          {/* Network code toggle */}
          <div>
            {!showNetworkCode ? (
              <button
                type="button"
                onClick={() => setShowNetworkCode(true)}
                className="text-sm text-[var(--color-accent-500)] hover:underline cursor-pointer"
              >
                Have a network code?
              </button>
            ) : (
              <Field
                label="Network Code"
                name="networkCode"
                value={form.networkCode}
                onChange={handleChange}
                error={errors.networkCode}
                placeholder="Enter your code for the $1,000 price"
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full mt-2"
          >
            {submitting ? "Redirecting to payment..." : "Continue to deposit ($100)"}
          </Button>

          <p className="text-xs text-[var(--color-text-500)] text-center">
            You&apos;ll be redirected to Stripe to pay the $100 deposit. Full
            refund if unsatisfied by end of Day 2.
          </p>
        </form>
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
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[var(--color-text-300)] mb-1.5"
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
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-[var(--color-bg-800)] px-4 py-3 text-sm text-[var(--color-text-100)] placeholder:text-[var(--color-text-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/50 transition-all ${
          error
            ? "border-[var(--color-error)]"
            : "border-[var(--color-border-700)]"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>
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
