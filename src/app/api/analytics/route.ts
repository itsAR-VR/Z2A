import { NextResponse } from "next/server";

type AnalyticsPayload = {
  name: string;
  properties?: Record<string, string | number | boolean | null>;
  path?: string;
  timestamp?: string;
};

export async function POST(req: Request) {
  let payload: AnalyticsPayload;

  try {
    payload = (await req.json()) as AnalyticsPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.name || typeof payload.name !== "string") {
    return NextResponse.json(
      { error: "Event name is required." },
      { status: 400 },
    );
  }

  console.info("[analytics]", {
    name: payload.name,
    path: payload.path ?? null,
    timestamp: payload.timestamp ?? null,
    properties: payload.properties ?? {},
  });

  return new NextResponse(null, { status: 204 });
}
