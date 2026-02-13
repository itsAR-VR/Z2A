import { NextResponse } from "next/server";

import { EARLY_BIRD_REMAINDER_AMOUNT_CENTS, SEAT_CAP } from "@/lib/config";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const [
    totalRegistrants,
    depositsPaid,
    authorized,
    captured,
    waitlistPendingCount,
    waitlistConvertedCount,
    depositRevenue,
    remainderRevenue,
    earlyBirdCount,
    networkCodesRaw,
  ] = await Promise.all([
    prisma.attendee.count(),
    prisma.attendee.count({ where: { depositStatus: "paid" } }),
    prisma.attendee.count({ where: { remainderStatus: "authorized" } }),
    prisma.attendee.count({ where: { remainderStatus: "captured" } }),
    prisma.waitlist.count({ where: { status: { in: ["pending", "seat_offered"] } } }),
    prisma.waitlist.count({ where: { status: "converted" } }),
    prisma.attendee.aggregate({
      where: { depositStatus: "paid" },
      _sum: { depositAmount: true },
    }),
    prisma.attendee.aggregate({
      where: { remainderStatus: "captured" },
      _sum: { remainderAmount: true },
    }),
    prisma.attendee.count({
      where: {
        depositStatus: "paid",
        remainderAmount: EARLY_BIRD_REMAINDER_AMOUNT_CENTS,
      },
    }),
    prisma.attendee.findMany({
      where: { networkCode: { not: null } },
      select: { networkCode: true },
      distinct: ["networkCode"],
    }),
  ]);

  const depositTotal = depositRevenue._sum.depositAmount || 0;
  const remainderTotal = remainderRevenue._sum.remainderAmount || 0;
  const totalRevenueCents = depositTotal + remainderTotal;
  const seatsRemaining = Math.max(0, SEAT_CAP - depositsPaid);

  const networkCodes = networkCodesRaw
    .map((entry) => entry.networkCode)
    .filter((code): code is string => Boolean(code))
    .sort((a, b) => a.localeCompare(b));

  return NextResponse.json({
    totalRegistrants,
    depositsPaid,
    seatsRemaining,
    authorized,
    captured,
    totalRevenueCents,
    earlyBirdCount,
    waitlistPendingCount,
    waitlistConvertedCount,
    networkCodes,
  });
}
