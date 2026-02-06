import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const referralCode = await prisma.referralCode.findUnique({
    where: { id },
    select: { id: true, code: true },
  });

  if (!referralCode) {
    return NextResponse.json(
      { error: "Referral code not found" },
      { status: 404 },
    );
  }

  const auditLogs = await prisma.referralCodeAuditLog.findMany({
    where: { referralCodeId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    referralCode: referralCode.code,
    auditLogs: auditLogs.map((log) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
  });
}
