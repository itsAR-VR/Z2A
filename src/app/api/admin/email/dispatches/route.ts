import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const MAX_LIMIT = 200;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const template = url.searchParams.get("template")?.trim() || "";
  const status = url.searchParams.get("status")?.trim() || "";
  const q = url.searchParams.get("q")?.trim() || "";
  const failedOnly = url.searchParams.get("failedOnly") === "1";
  const limitRaw = Number(url.searchParams.get("limit") || MAX_LIMIT);
  const limit = Number.isFinite(limitRaw)
    ? Math.max(1, Math.min(MAX_LIMIT, Math.floor(limitRaw)))
    : MAX_LIMIT;

  const clauses: Array<Record<string, unknown>> = [];
  if (template) clauses.push({ template });
  if (status) clauses.push({ status });
  if (failedOnly) clauses.push({ status: "failed" });
  if (q) {
    clauses.push({
      attendee: {
        OR: [
          { email: { contains: q, mode: "insensitive" } },
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
        ],
      },
    });
  }

  const dispatches = await prisma.emailDispatch.findMany({
    where: clauses.length > 0 ? { AND: clauses } : undefined,
    include: {
      attendee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
    take: limit,
  });

  return NextResponse.json({
    dispatches: dispatches.map((row) => ({
      id: row.id,
      template: row.template,
      status: row.status,
      attemptCount: row.attemptCount,
      lastAttemptAt: row.lastAttemptAt?.toISOString() || null,
      sentAt: row.sentAt?.toISOString() || null,
      providerMessageId: row.providerMessageId,
      errorMessage: row.errorMessage,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      attendee: row.attendee,
    })),
  });
}
