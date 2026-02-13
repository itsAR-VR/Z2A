import { NextResponse } from "next/server";
import { z } from "zod";

import {
  defaultEmailSettings,
  EMAIL_SETTING_KEYS,
  type EmailSettingKey,
} from "@/lib/email-templates";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const putSchema = z.object({
  settings: z
    .array(
      z.object({
        key: z.enum(EMAIL_SETTING_KEYS),
        value: z.string().max(10000),
      }),
    )
    .min(1),
});

async function ensureDefaultSettings() {
  await prisma.emailSetting.createMany({
    data: defaultEmailSettings(),
    skipDuplicates: true,
  });
}

export async function GET() {
  await ensureDefaultSettings();

  const settings = await prisma.emailSetting.findMany({
    orderBy: { key: "asc" },
    select: { key: true, value: true, updatedAt: true },
  });

  return NextResponse.json({
    settings: settings.map((entry) => ({
      key: entry.key as EmailSettingKey,
      value: entry.value,
      updatedAt: entry.updatedAt.toISOString(),
    })),
  });
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = putSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const updates = parsed.data.settings;
  await prisma.$transaction(
    updates.map((entry) =>
      prisma.emailSetting.upsert({
        where: { key: entry.key },
        update: { value: entry.value },
        create: { key: entry.key, value: entry.value },
      }),
    ),
  );

  const settings = await prisma.emailSetting.findMany({
    orderBy: { key: "asc" },
    select: { key: true, value: true, updatedAt: true },
  });

  return NextResponse.json({
    settings: settings.map((entry) => ({
      key: entry.key as EmailSettingKey,
      value: entry.value,
      updatedAt: entry.updatedAt.toISOString(),
    })),
  });
}
