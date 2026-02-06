import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const patchSchema = z.object({
  seatStatus: z
    .enum(["reserved", "attended_day1", "attended_day2", "no_show"])
    .optional(),
  applicationStatus: z
    .enum(["submitted", "approved", "declined"])
    .optional(),
  internalNotes: z.string().max(5000).optional(),
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

  const data = parsed.data;
  if (!data.seatStatus && !data.applicationStatus && data.internalNotes === undefined) {
    return NextResponse.json(
      { error: "No fields to update" },
      { status: 400 },
    );
  }

  try {
    const attendee = await prisma.attendee.update({
      where: { id },
      data: {
        ...(data.seatStatus && { seatStatus: data.seatStatus }),
        ...(data.applicationStatus && {
          applicationStatus: data.applicationStatus,
        }),
        ...(data.internalNotes !== undefined && {
          internalNotes: data.internalNotes || null,
        }),
      },
    });
    return NextResponse.json({ attendee });
  } catch {
    return NextResponse.json({ error: "Attendee not found" }, { status: 404 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const attendee = await prisma.attendee.findUnique({ where: { id } });
  if (!attendee) {
    return NextResponse.json({ error: "Attendee not found" }, { status: 404 });
  }

  return NextResponse.json({ attendee });
}
