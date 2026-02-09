import { NextResponse } from "next/server";

import { EARLY_BIRD_END_AT_ISO } from "@/lib/config";

export const runtime = "nodejs";

export async function GET() {
  const cutoffMs = Date.parse(EARLY_BIRD_END_AT_ISO);
  const earlyBirdActive = Number.isFinite(cutoffMs) && Date.now() < cutoffMs;

  return NextResponse.json(
    {
      earlyBirdActive,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

