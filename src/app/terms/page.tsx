import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Use | Zero-to-Agent",
  description: "Terms that govern use of the Zero-to-Agent website and workshop services.",
  openGraph: {
    title: "Terms of Use | Zero-to-Agent",
    description: "Terms that govern use of the Zero-to-Agent website and workshop services.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Use"
      description="These terms govern your use of our site and participation in Zero-to-Agent workshops."
      lastUpdated="February 18, 2026"
    >
      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Use of the Site</h2>
        <p className="mt-3">
          By using this site, you agree to use it lawfully and in a way that does not interfere with operations or
          other users.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Applications and Payments</h2>
        <p className="mt-3">
          Workshop seats are limited and subject to application review. Deposits and other payments are processed
          through Stripe. Your seat is considered reserved after successful payment confirmation.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Refunds</h2>
        <p className="mt-3">
          Refunds are governed by our{" "}
          <Link href="/refund-policy" className="text-[var(--color-accent)] underline">
            Refund Policy
          </Link>
          . If there is a conflict between marketing copy and the policy page, the policy page controls.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">No Guaranteed Outcomes</h2>
        <p className="mt-3">
          We provide training and implementation support, but we do not guarantee business, hiring, revenue, or
          employment outcomes.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Intellectual Property</h2>
        <p className="mt-3">
          Site content, workshop materials, and branding are protected by applicable intellectual-property laws.
          Unauthorized copying, resale, or distribution is prohibited unless expressly permitted in writing.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Liability</h2>
        <p className="mt-3">
          To the maximum extent permitted by law, Zero-to-Agent is not liable for indirect, incidental, or
          consequential damages related to use of the site or participation in the workshop.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Contact</h2>
        <p className="mt-3">
          Questions about these terms can be sent to{" "}
          <a className="text-[var(--color-accent)] underline" href="mailto:hello@zerotoagent.com">
            hello@zerotoagent.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
