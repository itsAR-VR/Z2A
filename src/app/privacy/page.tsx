import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Zero-to-Agent",
  description: "How Zero-to-Agent collects, uses, and protects personal information.",
  openGraph: {
    title: "Privacy Policy | Zero-to-Agent",
    description: "How Zero-to-Agent collects, uses, and protects personal information.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="This policy explains what information we collect, how we use it, and the choices you have."
      lastUpdated="February 18, 2026"
    >
      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Information We Collect</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Application information you submit (name, email, role, company, use case, and optional links).</li>
          <li>Transaction records related to workshop payments and enrollment status.</li>
          <li>Basic usage and analytics events to improve site performance and application flow quality.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">How We Use Information</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Review applications and manage admissions decisions.</li>
          <li>Process workshop payments, confirmations, and support follow-ups.</li>
          <li>Operate and improve the website, customer support, and workshop delivery.</li>
          <li>Meet legal, accounting, and fraud-prevention obligations.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Payments</h2>
        <p className="mt-3">
          Payments are processed by Stripe. We do not store full card numbers in our systems. Stripe handles card
          details under its own policies and compliance framework.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Sharing and Retention</h2>
        <p className="mt-3">
          We only share data with service providers needed to run operations (for example payments, email, and
          infrastructure). We retain information for as long as needed to provide services, comply with laws, and
          resolve disputes.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Your Choices</h2>
        <p className="mt-3">
          To request access, correction, or deletion of your information, email{" "}
          <a className="text-[var(--color-accent)] underline" href="mailto:hello@zerotoagent.com">
            hello@zerotoagent.com
          </a>
          . You can also opt out of non-essential updates at any time.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Related Policies</h2>
        <p className="mt-3">
          Read our{" "}
          <Link href="/terms" className="text-[var(--color-accent)] underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/refund-policy" className="text-[var(--color-accent)] underline">
            Refund Policy
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
