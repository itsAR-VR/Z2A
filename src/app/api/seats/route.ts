import { NextResponse } from "next/server";

import { SEAT_CAP } from "@/lib/config";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const paidSeats = await prisma.attendee.count({
    where: { depositStatus: "paid" },
  });
  const waitlistCount = await prisma.waitlist.count({
    where: { status: { in: ["pending", "seat_offered"] } },
  });

  const remaining = Math.max(0, SEAT_CAP - paidSeats);
  const soldOut = remaining === 0;

  return NextResponse.json(
    {
      total: SEAT_CAP,
      paidSeats,
      remaining,
      soldOut,
      waitlistCount,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
