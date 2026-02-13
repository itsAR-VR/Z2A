import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const waitlistSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(320),
  roleTitle: z.string().max(120).optional(),
  company: z.string().max(200).optional(),
  linkedinUrl: z.string().url().max(500).optional(),
  useCase: z.string().max(2000).optional(),
  networkCode: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  const reserved = await prisma.attendee.findUnique({
    where: { email: payload.email },
    select: { depositStatus: true },
  });
  if (reserved?.depositStatus === "paid") {
    return NextResponse.json(
      { error: "You already have a seat reserved with this email." },
      { status: 409 },
    );
  }

  const existing = await prisma.waitlist.findUnique({
    where: { email: payload.email },
    select: { id: true, status: true },
  });

  if (existing?.status === "converted") {
    return NextResponse.json(
      { error: "This email already has a converted waitlist entry." },
      { status: 409 },
    );
  }

  if (existing?.status === "seat_offered") {
    return NextResponse.json(
      {
        error:
          "A seat offer is already active for this email. Please use the existing checkout link from your email.",
      },
      { status: 409 },
    );
  }

  const waitlist = existing
    ? await prisma.waitlist.update({
        where: { id: existing.id },
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          roleTitle: payload.roleTitle || null,
          company: payload.company || null,
          linkedinUrl: payload.linkedinUrl || null,
          useCase: payload.useCase || null,
          networkCode: payload.networkCode?.trim() || null,
          status: "pending",
          source: "direct_waitlist",
        },
      })
    : await prisma.waitlist.create({
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          roleTitle: payload.roleTitle || null,
          company: payload.company || null,
          linkedinUrl: payload.linkedinUrl || null,
          useCase: payload.useCase || null,
          networkCode: payload.networkCode?.trim() || null,
          source: "direct_waitlist",
        },
      });

  return NextResponse.json(
    {
      success: true,
      waitlistId: waitlist.id,
      alreadyOnWaitlist: Boolean(existing),
    },
    { status: existing ? 200 : 201 },
  );
}
