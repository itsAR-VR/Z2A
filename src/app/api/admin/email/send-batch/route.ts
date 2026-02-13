import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  buildTemplate,
  EMAIL_TEMPLATE_KEYS,
  getTemplateLabel,
  type EmailTemplateKey,
  validateTemplateSettings,
} from "@/lib/email-templates";
import { prisma } from "@/lib/db";
import { runDispatchForAttendee } from "@/lib/email-dispatch";

export const runtime = "nodejs";

const sendBatchSchema = z.object({
  template: z.enum(EMAIL_TEMPLATE_KEYS),
  dryRun: z.boolean().optional(),
  recipientMode: z.enum(["all_paid", "failed_only"]).optional(),
  recipientEmails: z.array(z.string().email()).optional(),
});

const SEND_TIMEOUT_MS = 15_000;
const MAX_RECIPIENTS = 200;

type Recipient = {
  id: string;
  firstName: string;
  email: string;
};

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err: unknown) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

function mapSettings(entries: Array<{ key: string; value: string }>) {
  return new Map(entries.map((entry) => [entry.key, entry.value || ""]));
}

function normalizeUniqueEmails(emails: string[]) {
  const set = new Set<string>();
  for (const email of emails) set.add(email.trim().toLowerCase());
  return Array.from(set);
}

async function loadRecipients(params: {
  recipientMode: "all_paid" | "failed_only";
  recipientEmails?: string[];
}) {
  if (params.recipientMode === "failed_only") {
    const emails = normalizeUniqueEmails(params.recipientEmails || []);
    if (emails.length === 0) return [];

    const attendees = await prisma.attendee.findMany({
      where: {
        depositStatus: "paid",
        email: { in: emails },
      },
      select: { id: true, firstName: true, email: true },
    });
    return attendees as Recipient[];
  }

  const attendees = await prisma.attendee.findMany({
    where: { depositStatus: "paid" },
    orderBy: { createdAt: "asc" },
    select: { id: true, firstName: true, email: true },
    take: MAX_RECIPIENTS + 1,
  });
  return attendees as Recipient[];
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = sendBatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const templateKey = parsed.data.template as EmailTemplateKey;
  const dryRun = Boolean(parsed.data.dryRun);
  const recipientMode = parsed.data.recipientMode || "all_paid";
  const batchId = randomUUID();

  const settingRows = await prisma.emailSetting.findMany({
    select: { key: true, value: true },
  });
  const settings = mapSettings(settingRows);
  const missingSettings = validateTemplateSettings(templateKey, settings);
  if (missingSettings.length > 0) {
    return NextResponse.json(
      {
        error: "Missing required email settings",
        missingSettings,
      },
      { status: 400 },
    );
  }

  const recipients = await loadRecipients({
    recipientMode,
    recipientEmails: parsed.data.recipientEmails,
  });
  if (recipientMode === "all_paid" && recipients.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { error: `Too many recipients. Limit is ${MAX_RECIPIENTS}.` },
      { status: 400 },
    );
  }

  const firstPreviewName = recipients[0]?.firstName || "there";
  const previewTemplate = buildTemplate(templateKey, settings, {
    firstName: firstPreviewName,
  });

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      batchId,
      template: templateKey,
      templateLabel: getTemplateLabel(templateKey),
      recipientMode,
      recipientCount: recipients.length,
      preview: previewTemplate,
    });
  }

  let sent = 0;
  let alreadySent = 0;
  let skipped = 0;
  let inProgress = 0;
  const errors: Array<{ email: string; error: string }> = [];
  for (const recipient of recipients) {
    try {
      const result = await withTimeout(
        runDispatchForAttendee({
          attendeeId: recipient.id,
          firstName: recipient.firstName,
          email: recipient.email,
          template: templateKey,
          settingsMap: settings,
        }),
        SEND_TIMEOUT_MS,
      );
      if (result.status === "sent") {
        sent += 1;
      } else if (result.status === "failed") {
        errors.push({ email: recipient.email, error: result.error || "Unknown send error" });
      } else if (result.status === "already_sent") {
        alreadySent += 1;
      } else if (result.status === "already_skipped") {
        skipped += 1;
      } else if (result.status === "in_progress") {
        inProgress += 1;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown send error";
      errors.push({ email: recipient.email, error: message });
    }
  }

  return NextResponse.json({
    dryRun: false,
    batchId,
    template: templateKey,
    templateLabel: getTemplateLabel(templateKey),
    recipientMode,
    recipientCount: recipients.length,
    sent,
    alreadySent,
    skipped,
    inProgress,
    failed: errors.length,
    failedRecipients: errors.map((entry) => entry.email),
    errors,
  });
}
