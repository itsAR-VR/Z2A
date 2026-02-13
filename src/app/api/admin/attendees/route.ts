import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type AttendeeRow = {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  company: string | null;
  depositStatus: string;
  remainderStatus: string;
  seatStatus: string;
  networkCode: string | null;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim() || "";
  const depositStatus = url.searchParams.get("depositStatus")?.trim() || "";
  const remainderStatus = url.searchParams.get("remainderStatus")?.trim() || "";
  const seatStatus = url.searchParams.get("seatStatus")?.trim() || "";
  const networkCode = url.searchParams.get("networkCode")?.trim() || "";

  const clauses: Array<Record<string, unknown>> = [];
  if (q) {
    clauses.push({
      OR: [
        { email: { contains: q, mode: "insensitive" } },
        { firstName: { contains: q, mode: "insensitive" } },
        { lastName: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (depositStatus) clauses.push({ depositStatus });
  if (remainderStatus) clauses.push({ remainderStatus });
  if (seatStatus) clauses.push({ seatStatus });
  if (networkCode) clauses.push({ networkCode });

  const attendees = (await prisma.attendee.findMany({
    where: clauses.length > 0 ? { AND: clauses } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      createdAt: true,
      firstName: true,
      lastName: true,
      email: true,
      roleTitle: true,
      company: true,
      depositStatus: true,
      remainderStatus: true,
      seatStatus: true,
      networkCode: true,
    },
  })) as AttendeeRow[];

  return NextResponse.json({
    attendees: attendees.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
    })),
  });
}
