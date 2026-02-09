import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const attendee = await prisma.attendee.findUnique({ where: { id } });
  if (!attendee) {
    return NextResponse.json({ error: "Attendee not found" }, { status: 404 });
  }

  if (attendee.remainderStatus !== "authorized") {
    return NextResponse.json(
      { error: "Remainder is not authorized for capture" },
      { status: 409 },
    );
  }

  if (!attendee.remainderPaymentIntentId) {
    return NextResponse.json(
      { error: "Missing remainder payment intent" },
      { status: 409 },
    );
  }

  try {
    await stripe.paymentIntents.capture(attendee.remainderPaymentIntentId);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to capture: ${message}` },
      { status: 502 },
    );
  }

  const updated = await prisma.attendee.update({
    where: { id },
    data: {
      remainderStatus: "captured",
      remainderCapturedAt: new Date(),
    },
  });

  return NextResponse.json({ attendee: updated });
}

