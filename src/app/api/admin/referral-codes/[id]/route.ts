import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getAdminActor } from "@/lib/admin-auth";

export const runtime = "nodejs";

const patchSchema = z
  .object({
    active: z.boolean(),
    reason: z.string().min(1).max(500).optional(),
  })
  .superRefine((val, ctx) => {
    // Reason is optional in the payload; the server enforces when it's required based
    // on the referral code's previous state (loaded below).
    //
    // Note: This is validated again after loading `existing` since the rule depends on
    // server truth (previous state), not the client payload alone.
    if (val.reason !== undefined && val.reason.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["reason"],
        message: "Reason cannot be empty",
      });
    }
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
  const wasActive = existing.active;
  const willBeActive = parsed.data.active;

  const isDeactivation = wasActive && !willBeActive;

  // If the requested state matches server truth, treat as a no-op (no audit row).
  if (wasActive === willBeActive) {
    return NextResponse.json({ referralCode: existing });
  }

  // Reason is required for deactivation; reactivation reason is optional.
  if (isDeactivation && !parsed.data.reason?.trim()) {
    return NextResponse.json(
      {
        error: "Invalid request",
        details: {
          formErrors: [],
          fieldErrors: {
            reason: ["Reason is required to deactivate a code"],
          },
        },
      },
      { status: 400 },
    );
  }

  const action = willBeActive ? "reactivated" : "deactivated";

  const referralCode = await prisma.referralCode.update({
    where: { id },
    data: { active: parsed.data.active },
  });

  await prisma.referralCodeAuditLog.create({
    data: {
      referralCodeId: id,
      action,
      actor,
      reason: parsed.data.reason?.trim() || null,
    },
  });

  return NextResponse.json({ referralCode });
}
