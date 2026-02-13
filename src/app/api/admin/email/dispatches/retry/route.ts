import { NextResponse } from "next/server";
import { z } from "zod";

import { getEmailSettingsMap, runDispatchForAttendee } from "@/lib/email-dispatch";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const retrySchema = z.object({
  dispatchIds: z.array(z.string().uuid()).max(200).optional(),
  failedOnly: z.boolean().optional(),
  limit: z.number().int().min(1).max(200).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = retrySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { dispatchIds, failedOnly = true, limit = 100 } = parsed.data;

  const dispatches = dispatchIds?.length
    ? await prisma.emailDispatch.findMany({
        where: { id: { in: dispatchIds } },
        include: {
          attendee: {
            select: { id: true, firstName: true, email: true },
          },
        },
        take: 200,
      })
    : await prisma.emailDispatch.findMany({
        where: failedOnly ? { status: "failed" } : undefined,
        include: {
          attendee: {
            select: { id: true, firstName: true, email: true },
          },
        },
        orderBy: [{ updatedAt: "asc" }],
        take: limit,
      });

  const settingsMap = await getEmailSettingsMap();

  let sent = 0;
  let failed = 0;
  let alreadySent = 0;
  let inProgress = 0;
  let skipped = 0;

  const results: Array<{ dispatchId: string; status: string; error?: string }> = [];

  for (const dispatch of dispatches) {
    const result = await runDispatchForAttendee({
      attendeeId: dispatch.attendee.id,
      firstName: dispatch.attendee.firstName,
      email: dispatch.attendee.email,
      template: dispatch.template,
      settingsMap,
    });

    if (result.status === "sent") sent += 1;
    else if (result.status === "failed") failed += 1;
    else if (result.status === "already_sent") alreadySent += 1;
    else if (result.status === "already_skipped") skipped += 1;
    else if (result.status === "in_progress") inProgress += 1;

    results.push({
      dispatchId: dispatch.id,
      status: result.status,
      ...(result.error ? { error: result.error } : {}),
    });
  }

  return NextResponse.json({
    attempted: dispatches.length,
    sent,
    failed,
    alreadySent,
    skipped,
    inProgress,
    results,
  });
}
