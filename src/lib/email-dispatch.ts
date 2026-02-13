import {
  type EmailDispatch,
  type EmailDispatchTemplate,
} from "@/generated/prisma/client";
import { MS_PER_DAY, WORKSHOP_START_AT_ISO } from "@/lib/config";
import {
  buildTemplate,
  type EmailTemplateKey,
  validateTemplateSettings,
} from "@/lib/email-templates";
import { prisma } from "@/lib/db";
import {
  sendDepositConfirmationEmail,
  sendTemplatedEmail,
} from "@/lib/email";

export const POST_DEPOSIT_TEMPLATES: EmailDispatchTemplate[] = [
  "deposit_confirmation",
  "prework",
];

export const REMINDER_TEMPLATES: EmailDispatchTemplate[] = ["venue", "day1_prep"];

type ClaimDispatchResult =
  | { kind: "ready"; dispatch: EmailDispatch }
  | { kind: "already_sent"; dispatch: EmailDispatch }
  | { kind: "already_skipped"; dispatch: EmailDispatch }
  | { kind: "in_progress"; dispatch: EmailDispatch };

export type DispatchRunResult = {
  dispatchId?: string;
  template: EmailDispatchTemplate;
  status: "sent" | "failed" | "already_sent" | "already_skipped" | "in_progress";
  emailId?: string;
  error?: string;
};

function templateToEmailTemplateKey(template: EmailDispatchTemplate): EmailTemplateKey | null {
  if (template === "prework") return "prework";
  if (template === "venue") return "venue";
  if (template === "day1_prep") return "day1_prep";
  return null;
}

export async function getEmailSettingsMap() {
  const settings = await prisma.emailSetting.findMany({
    select: { key: true, value: true },
  });

  return new Map(settings.map((row) => [row.key, row.value || ""]));
}

export function getDueReminderTemplates(now = new Date()): EmailDispatchTemplate[] {
  const workshopStartMs = Date.parse(WORKSHOP_START_AT_ISO);
  if (!Number.isFinite(workshopStartMs)) return [];

  const nowMs = now.getTime();
  const venueThreshold = workshopStartMs - 7 * MS_PER_DAY;
  const day1Threshold = workshopStartMs - 1 * MS_PER_DAY;
  const cutoff = workshopStartMs + MS_PER_DAY;

  const due: EmailDispatchTemplate[] = [];
  if (nowMs >= venueThreshold && nowMs < cutoff) due.push("venue");
  if (nowMs >= day1Threshold && nowMs < cutoff) due.push("day1_prep");

  return due;
}

export async function claimDispatchForSend(params: {
  attendeeId: string;
  template: EmailDispatchTemplate;
}) {
  return prisma.$transaction<ClaimDispatchResult>(async (tx) => {
    const dispatch = await tx.emailDispatch.upsert({
      where: {
        attendeeId_template: {
          attendeeId: params.attendeeId,
          template: params.template,
        },
      },
      update: {},
      create: {
        attendeeId: params.attendeeId,
        template: params.template,
      },
    });

    if (dispatch.status === "sent") {
      return { kind: "already_sent", dispatch };
    }

    if (dispatch.status === "skipped") {
      return { kind: "already_skipped", dispatch };
    }

    const claimed = await tx.emailDispatch.updateMany({
      where: {
        id: dispatch.id,
        status: { in: ["pending", "failed"] },
      },
      data: {
        status: "sending",
        attemptCount: { increment: 1 },
        lastAttemptAt: new Date(),
        errorMessage: null,
      },
    });

    if (claimed.count === 0) {
      const latest = await tx.emailDispatch.findUniqueOrThrow({
        where: { id: dispatch.id },
      });

      if (latest.status === "sent") {
        return { kind: "already_sent", dispatch: latest };
      }

      if (latest.status === "skipped") {
        return { kind: "already_skipped", dispatch: latest };
      }

      return { kind: "in_progress", dispatch: latest };
    }

    const latest = await tx.emailDispatch.findUniqueOrThrow({
      where: { id: dispatch.id },
    });

    return { kind: "ready", dispatch: latest };
  });
}

export async function markDispatchSent(params: {
  dispatchId: string;
  emailId: string;
}) {
  await prisma.emailDispatch.updateMany({
    where: { id: params.dispatchId, status: "sending" },
    data: {
      status: "sent",
      sentAt: new Date(),
      providerMessageId: params.emailId,
      errorMessage: null,
    },
  });
}

export async function markDispatchFailed(params: {
  dispatchId: string;
  error: string;
}) {
  await prisma.emailDispatch.updateMany({
    where: { id: params.dispatchId, status: "sending" },
    data: {
      status: "failed",
      errorMessage: params.error,
    },
  });
}

export async function runDispatchForAttendee(params: {
  attendeeId: string;
  firstName: string;
  email: string;
  template: EmailDispatchTemplate;
  settingsMap?: Map<string, string>;
}): Promise<DispatchRunResult> {
  const claimed = await claimDispatchForSend({
    attendeeId: params.attendeeId,
    template: params.template,
  });

  if (claimed.kind === "already_sent") {
    return {
      dispatchId: claimed.dispatch.id,
      template: params.template,
      status: "already_sent",
    };
  }

  if (claimed.kind === "already_skipped") {
    return {
      dispatchId: claimed.dispatch.id,
      template: params.template,
      status: "already_skipped",
    };
  }

  if (claimed.kind === "in_progress") {
    return {
      dispatchId: claimed.dispatch.id,
      template: params.template,
      status: "in_progress",
    };
  }

  try {
    const result =
      params.template === "deposit_confirmation"
        ? await sendDepositConfirmationEmail({
            firstName: params.firstName,
            to: params.email,
          })
        : await (() => {
            const key = templateToEmailTemplateKey(params.template);
            if (!key) {
              throw new Error(`Unsupported dispatch template: ${params.template}`);
            }

            const settingsMap = params.settingsMap ?? new Map<string, string>();
            const missing = validateTemplateSettings(key, settingsMap);
            if (missing.length > 0) {
              throw new Error(
                `Missing required email settings: ${missing.join(", ")}`,
              );
            }

            return sendTemplatedEmail(
              params.email,
              buildTemplate(
                key,
                settingsMap,
                { firstName: params.firstName },
              ),
            );
          })();

    if (result.skipped) {
      await markDispatchFailed({
        dispatchId: claimed.dispatch.id,
        error: result.reason,
      });
      return {
        dispatchId: claimed.dispatch.id,
        template: params.template,
        status: "failed",
        error: result.reason,
      };
    }

    await markDispatchSent({
      dispatchId: claimed.dispatch.id,
      emailId: result.emailId,
    });

    return {
      dispatchId: claimed.dispatch.id,
      template: params.template,
      status: "sent",
      emailId: result.emailId,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown dispatch error";
    await markDispatchFailed({
      dispatchId: claimed.dispatch.id,
      error: message,
    });

    return {
      dispatchId: claimed.dispatch.id,
      template: params.template,
      status: "failed",
      error: message,
    };
  }
}

export async function runDispatchById(params: {
  dispatchId: string;
  settingsMap?: Map<string, string>;
}): Promise<DispatchRunResult | { status: "not_found"; error: string }> {
  const dispatch = await prisma.emailDispatch.findUnique({
    where: { id: params.dispatchId },
    include: {
      attendee: {
        select: {
          id: true,
          firstName: true,
          email: true,
        },
      },
    },
  });

  if (!dispatch) {
    return { status: "not_found", error: "Dispatch record not found" };
  }

  return runDispatchForAttendee({
    attendeeId: dispatch.attendee.id,
    firstName: dispatch.attendee.firstName,
    email: dispatch.attendee.email,
    template: dispatch.template,
    settingsMap: params.settingsMap,
  });
}
