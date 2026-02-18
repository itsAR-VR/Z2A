import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Refund Policy | Zero-to-Agent",
  description: "Refund terms for Zero-to-Agent workshop payments.",
  openGraph: {
    title: "Refund Policy | Zero-to-Agent",
    description: "Refund terms for Zero-to-Agent workshop payments.",
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPageShell
      title="Refund Policy"
      description="100% refund if you aren&apos;t satisfied."
      lastUpdated="February 18, 2026"
    >
      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Guarantee</h2>
        <p className="mt-3">
          100% refund if you aren&apos;t satisfied. We keep this policy plain on
          purpose to reduce risk for participants.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">How to Request a Refund</h2>
        <p className="mt-3">
          Email{" "}
          <a className="text-[var(--color-accent)] underline" href="mailto:hello@zerotoagent.com">
            hello@zerotoagent.com
          </a>{" "}
          with the email used for your application and payment. We may ask brief follow-up questions only to locate the
          transaction.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Processing Time</h2>
        <p className="mt-3">
          Approved refunds are issued to the original payment method within 7 calendar days. Bank posting times can
          vary after that.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Waitlist and Canceled Checkouts</h2>
        <p className="mt-3">
          If no payment was captured (for example, canceled checkout or waitlist card setup), there is no charge to
          refund. For any captured charge, the policy above applies.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--color-text)]">Questions</h2>
        <p className="mt-3">
          For policy questions, contact{" "}
          <a className="text-[var(--color-accent)] underline" href="mailto:hello@zerotoagent.com">
            hello@zerotoagent.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
