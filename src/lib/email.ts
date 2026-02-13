import { DEPOSIT_AMOUNT_CENTS } from "@/lib/config";
import { env } from "@/lib/env";

const RESEND_EMAILS_API_URL = "https://api.resend.com/emails";
const WORKSHOP_DATES = "Feb 28 - Mar 1, 2026";
const WORKSHOP_LOCATION = "Toronto";

export type EmailTemplateContent = {
  subject: string;
  text: string;
  html: string;
};

export type SendEmailResult =
  | { skipped: true; reason: string }
  | { skipped: false; emailId: string };

export type DepositConfirmationEmailInput = {
  firstName: string;
  to: string;
};

function isResendConfigured() {
  return Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL);
}

function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<SendEmailResult> {
  if (!isResendConfigured()) {
    return { skipped: true, reason: "RESEND_API_KEY/RESEND_FROM_EMAIL not configured" };
  }

  const response = await fetch(RESEND_EMAILS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
      ...(env.RESEND_REPLY_TO_EMAIL ? { reply_to: [env.RESEND_REPLY_TO_EMAIL] } : {}),
    }),
  });

  const body = (await response.json().catch(() => null)) as
    | { id?: unknown; message?: unknown; error?: unknown; name?: unknown }
    | null;

  if (!response.ok) {
    const reason =
      typeof body?.message === "string"
        ? body.message
        : typeof body?.error === "string"
          ? body.error
          : `HTTP ${response.status}`;
    throw new Error(`Resend send failed: ${reason}`);
  }

  if (!body || typeof body.id !== "string") {
    throw new Error("Resend send succeeded but response did not include an email id.");
  }

  return { skipped: false, emailId: body.id };
}

export async function sendTemplatedEmail(
  to: string,
  template: EmailTemplateContent,
): Promise<SendEmailResult> {
  return sendTransactionalEmail({
    to,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
}

export async function sendDepositConfirmationEmail(
  input: DepositConfirmationEmailInput,
): Promise<SendEmailResult> {
  const safeFirstName = escapeHtml(input.firstName.trim() || "there");
  const depositAmount = formatUsd(DEPOSIT_AMOUNT_CENTS);
  const subject = `Deposit received: seat reserved for Zero-to-Agent (${WORKSHOP_DATES})`;

  const text = [
    `Hi ${input.firstName.trim() || "there"},`,
    "",
    `Your ${depositAmount} deposit is confirmed and your seat is reserved for Zero-to-Agent.`,
    "",
    "What happens next:",
    "1) Check this email thread for your confirmation receipt.",
    "2) Complete prework: choose one workflow to automate, and install Node 20+, Python 3.11+, Git, and VS Code.",
    `3) Join us ${WORKSHOP_DATES} in ${WORKSHOP_LOCATION}. Exact location details are shared after registration.`,
    "",
    "If you have questions, reply to this email.",
  ].join("\n");

  const html = `
    <div style="font-family: IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; color: #1f2030; line-height: 1.55; font-size: 16px;">
      <p>Hi ${safeFirstName},</p>
      <p>Your <strong>${depositAmount}</strong> deposit is confirmed and your seat is reserved for Zero-to-Agent.</p>
      <p style="margin: 20px 0 8px; font-weight: 600;">What happens next</p>
      <ol style="padding-left: 20px; margin-top: 0;">
        <li style="margin-bottom: 8px;">Check this email thread for your confirmation receipt.</li>
        <li style="margin-bottom: 8px;">Complete prework: choose one workflow to automate, and install Node 20+, Python 3.11+, Git, and VS Code.</li>
        <li>Join us ${WORKSHOP_DATES} in ${WORKSHOP_LOCATION}. Exact location details are shared after registration.</li>
      </ol>
      <p>If you have questions, reply to this email.</p>
    </div>
  `;

  return sendTemplatedEmail(input.to, { subject, text, html });
}

export async function sendWaitlistSeatOfferEmail(params: {
  firstName: string;
  to: string;
  checkoutUrl: string;
}): Promise<SendEmailResult> {
  const safeFirstName = escapeHtml(params.firstName.trim() || "there");
  const safeCheckoutUrl = escapeHtml(params.checkoutUrl);
  const subject = `A seat opened up: complete your Zero-to-Agent deposit`;

  const text = [
    `Hi ${params.firstName.trim() || "there"},`,
    "",
    "A seat opened up for Zero-to-Agent.",
    `Complete your deposit checkout here: ${params.checkoutUrl}`,
    "",
    `Workshop dates: ${WORKSHOP_DATES} (${WORKSHOP_LOCATION})`,
    "",
    "If you have questions, reply to this email.",
  ].join("\n");

  const html = `
    <div style="font-family: IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; color: #1f2030; line-height: 1.55; font-size: 16px;">
      <p>Hi ${safeFirstName},</p>
      <p>A seat opened up for Zero-to-Agent.</p>
      <p>Complete your deposit checkout here:</p>
      <p><a href="${safeCheckoutUrl}" style="color:#4f46e5; text-decoration: underline;">Finish deposit checkout</a></p>
      <p>Workshop dates: <strong>${WORKSHOP_DATES}</strong> (${WORKSHOP_LOCATION})</p>
      <p>If you have questions, reply to this email.</p>
    </div>
  `;

  return sendTemplatedEmail(params.to, { subject, text, html });
}
