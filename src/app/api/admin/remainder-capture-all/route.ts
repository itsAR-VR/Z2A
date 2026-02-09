import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

type Failure = { attendeeId: string; paymentIntentId: string; error: string };

export async function POST() {
  const targets = await prisma.attendee.findMany({
    where: {
      remainderStatus: "authorized",
      remainderPaymentIntentId: { not: null },
    },
    select: { id: true, remainderPaymentIntentId: true },
    take: 500,
  });

  const failed: Failure[] = [];
  let captured = 0;

  for (const t of targets) {
    const pi = t.remainderPaymentIntentId;
    if (!pi) continue;

    try {
      await stripe.paymentIntents.capture(pi);
      await prisma.attendee.update({
        where: { id: t.id },
        data: {
          remainderStatus: "captured",
          remainderCapturedAt: new Date(),
        },
      });
      captured += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      failed.push({ attendeeId: t.id, paymentIntentId: pi, error: message });
    }
  }

  return NextResponse.json({ captured, failed });
}

