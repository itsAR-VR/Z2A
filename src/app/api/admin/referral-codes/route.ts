import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getAdminActor } from "@/lib/admin-auth";

export const runtime = "nodejs";

const createSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(64)
    .transform((s) => s.trim().toUpperCase()),
});

export async function GET() {
  const [referralCodes, registeredRows, paidRows] = await Promise.all([
    prisma.referralCode.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { auditLogs: true } } },
    }),
    prisma.attendee.groupBy({
      by: ["networkCode"],
      _count: { id: true },
      where: { networkCode: { not: null } },
    }),
    prisma.attendee.groupBy({
      by: ["networkCode"],
      _count: { id: true },
      where: {
        networkCode: { not: null },
        depositStatus: "paid",
      },
    }),
  ]);

  const registeredMap = new Map<string, number>();
  const paidMap = new Map<string, number>();
  for (const row of registeredRows) {
    if (row.networkCode) registeredMap.set(row.networkCode, row._count.id);
  }
  for (const row of paidRows) {
    if (row.networkCode) paidMap.set(row.networkCode, row._count.id);
  }

  const referralCodesWithMetrics = referralCodes.map((code) => ({
    ...code,
    registeredCount: registeredMap.get(code.code) || 0,
    paidCount: paidMap.get(code.code) || 0,
  }));

  const totals = {
    totalReferralRegistrations: referralCodesWithMetrics.reduce(
      (sum, code) => sum + code.registeredCount,
      0,
    ),
    totalReferralPaid: referralCodesWithMetrics.reduce(
      (sum, code) => sum + code.paidCount,
      0,
    ),
  };

  return NextResponse.json({ referralCodes: referralCodesWithMetrics, ...totals });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const existing = await prisma.referralCode.findUnique({
    where: { code: parsed.data.code },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Code already exists" },
      { status: 409 },
    );
  }

  const actor = getAdminActor(req);

  const referralCode = await prisma.referralCode.create({
    data: { code: parsed.data.code },
  });

  await prisma.referralCodeAuditLog.create({
    data: {
      referralCodeId: referralCode.id,
      action: "created",
      actor,
    },
  });

  return NextResponse.json({ referralCode }, { status: 201 });
}
