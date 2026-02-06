import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getAdminActor } from "@/lib/admin-auth";

export const runtime = "nodejs";

const patchSchema = z.object({
  active: z.boolean(),
  reason: z.string().min(1).max(500),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const existing = await prisma.referralCode.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { error: "Referral code not found" },
      { status: 404 },
    );
  }

  const actor = getAdminActor(req);
  const action = parsed.data.active ? "activated" : "deactivated";

  const referralCode = await prisma.referralCode.update({
    where: { id },
    data: { active: parsed.data.active },
  });

  await prisma.referralCodeAuditLog.create({
    data: {
      referralCodeId: id,
      action,
      actor,
      reason: parsed.data.reason,
    },
  });

  return NextResponse.json({ referralCode });
}
