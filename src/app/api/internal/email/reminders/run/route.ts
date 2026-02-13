import { NextResponse, type NextRequest } from "next/server";

import {
  getDueReminderTemplates,
  getEmailSettingsMap,
  runDispatchForAttendee,
} from "@/lib/email-dispatch";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

export const runtime = "nodejs";

const MAX_ATTENDEES_PER_RUN = 200;

export async function GET(req: NextRequest) {
  if (!env.CRON_SECRET) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 500 },
    );
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dueTemplates = getDueReminderTemplates(new Date());
  if (dueTemplates.length === 0) {
    return NextResponse.json({
      ok: true,
      dueTemplates: [],
      message: "No reminder templates are currently due.",
    });
  }

  const attendees = await prisma.attendee.findMany({
    where: { depositStatus: "paid" },
    select: {
      id: true,
      firstName: true,
      email: true,
    },
    orderBy: { createdAt: "asc" },
    take: MAX_ATTENDEES_PER_RUN + 1,
  });

  const limited = attendees.slice(0, MAX_ATTENDEES_PER_RUN);
  const truncated = attendees.length > MAX_ATTENDEES_PER_RUN;
  const settingsMap = await getEmailSettingsMap();

  const summary: Record<
    string,
    {
      eligible: number;
      sent: number;
      failed: number;
      alreadySent: number;
      skipped: number;
      inProgress: number;
    }
  > = {};

  for (const template of dueTemplates) {
    summary[template] = {
      eligible: limited.length,
      sent: 0,
      failed: 0,
      alreadySent: 0,
      skipped: 0,
      inProgress: 0,
    };

    for (const attendee of limited) {
      const result = await runDispatchForAttendee({
        attendeeId: attendee.id,
        firstName: attendee.firstName,
        email: attendee.email,
        template,
        settingsMap,
      });

      if (result.status === "sent") {
        summary[template].sent += 1;
      } else if (result.status === "already_sent") {
        summary[template].alreadySent += 1;
      } else if (result.status === "already_skipped") {
        summary[template].skipped += 1;
      } else if (result.status === "in_progress") {
        summary[template].inProgress += 1;
      } else {
        summary[template].failed += 1;
      }
    }
  }

  return NextResponse.json({
    ok: true,
    dueTemplates,
    attendeeCount: limited.length,
    truncated,
    summary,
  });
}
