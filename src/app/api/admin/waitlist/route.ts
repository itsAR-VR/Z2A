import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type WaitlistRow = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string | null;
  company: string | null;
  useCase: string | null;
  networkCode: string | null;
  status: string;
  source: string;
  priorityIndex: number;
  setupIntentStatus: string | null;
  seatOfferedAt: Date | null;
  convertedAt: Date | null;
};

export async function GET() {
  const waitlist = (await prisma.waitlist.findMany({
    orderBy: [{ priorityIndex: "asc" }],
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      firstName: true,
      lastName: true,
      email: true,
      roleTitle: true,
      company: true,
      useCase: true,
      networkCode: true,
      status: true,
      source: true,
      priorityIndex: true,
      setupIntentStatus: true,
      seatOfferedAt: true,
      convertedAt: true,
    },
  })) as WaitlistRow[];

  return NextResponse.json({
    waitlist: waitlist.map((row) => ({
      ...row,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      seatOfferedAt: row.seatOfferedAt?.toISOString() || null,
      convertedAt: row.convertedAt?.toISOString() || null,
      isConverted: row.status === "converted" || row.convertedAt !== null,
    })),
  });
}
