"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";

export default function ApplySuccessPage() {
  useEffect(() => {
    trackEvent("deposit_success_view");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-content max-w-lg text-center py-20">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-accent)_12%,var(--color-surface))] border border-[color-mix(in_oklch,var(--color-accent)_35%,var(--color-border))] shadow-[var(--shadow-sm)] flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[var(--color-accent-500)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-heading font-bold tracking-tight text-[clamp(28px,3vw,40px)] leading-[1.05] mb-3 text-[var(--color-text)]">
          Deposit received. Seat reserved.
        </h1>

        <p className="text-[var(--color-text-muted)] text-[15px] md:text-lg leading-relaxed mb-8">
          You&apos;ll receive a confirmation email shortly with next steps, including
          prework and what to bring.
        </p>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] p-6 mb-8 text-left space-y-3">
          <h2 className="font-heading font-semibold text-base text-[var(--color-text)]">
            What happens next
          </h2>
          <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <p>
              <span className="text-[var(--color-accent-500)] font-medium">1.</span>{" "}
              Check your email for a confirmation receipt.
            </p>
            <p>
              <span className="text-[var(--color-accent-500)] font-medium">2.</span>{" "}
              Complete the prework: choose a workflow to automate, set up Node 20+, Python 3.11+, Git, and VS Code.
            </p>
            <p>
              <span className="text-[var(--color-accent-500)] font-medium">3.</span>{" "}
              Join us Feb 28 – Mar 1, 2026 in Toronto. Exact location will be shared after registration.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button href="/">Back to home</Button>
          <Link
            href="/"
            className="text-sm text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
          >
            Questions? Email us and we&apos;ll respond within 24 hours.
          </Link>
        </div>
      </div>
    </div>
  );
}
