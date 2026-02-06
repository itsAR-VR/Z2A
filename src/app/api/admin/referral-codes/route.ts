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
  const referralCodes = await prisma.referralCode.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { auditLogs: true } } },
  });

  return NextResponse.json({ referralCodes });
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
