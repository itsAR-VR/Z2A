import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type AttendeeRow = {
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  company: string | null;
  linkedinUrl: string | null;
  useCase: string;
  networkCode: string | null;
  depositStatus: string;
  remainderStatus: string;
  seatStatus: string;
};

function csvEscape(value: unknown): string {
  const s = value == null ? "" : String(value);
  if (/[",\n]/.test(s)) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

export async function GET() {
  const attendees = (await prisma.attendee.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
    select: {
      createdAt: true,
      firstName: true,
      lastName: true,
      email: true,
      roleTitle: true,
      company: true,
      linkedinUrl: true,
      useCase: true,
      networkCode: true,
      depositStatus: true,
      remainderStatus: true,
      seatStatus: true,
    },
  })) as AttendeeRow[];

  const header = [
    "created_at",
    "first_name",
    "last_name",
    "email",
    "role_title",
    "company",
    "linkedin_url",
    "use_case",
    "network_code",
    "deposit_status",
    "remainder_status",
    "seat_status",
  ];

  const lines = [
    header.join(","),
    ...attendees.map((a) =>
      [
        a.createdAt.toISOString(),
        a.firstName,
        a.lastName,
        a.email,
        a.roleTitle,
        a.company,
        a.linkedinUrl,
        a.useCase,
        a.networkCode,
        a.depositStatus,
        a.remainderStatus,
        a.seatStatus,
      ]
        .map(csvEscape)
        .join(","),
    ),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="attendees.csv"',
    },
  });
}
