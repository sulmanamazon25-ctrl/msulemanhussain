import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { orders } from "@/db/schema";
import { getOrderByCheckoutSession } from "@/lib/shop/catalog";
import { site } from "@/content/site";
import { sendMail } from "@/lib/shop/mail";

const schema = z.object({
  sessionId: z.string().min(1),
  preferredTimes: z.string().min(10).max(4000),
  notes: z.string().max(4000).optional(),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please share a few times that work" }, { status: 400 });
  }

  const order = await getOrderByCheckoutSession(parsed.data.sessionId);
  if (!order || order.kind !== "session") {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (!["awaiting_schedule", "paid", "scheduled"].includes(order.status)) {
    return NextResponse.json({ error: "Order not ready for scheduling" }, { status: 400 });
  }

  const db = getDb();
  const [updated] = await db
    .update(orders)
    .set({
      preferredTimes: parsed.data.preferredTimes,
      scheduleNotes: parsed.data.notes || null,
      status: "awaiting_schedule",
      updatedAt: new Date(),
    })
    .where(eq(orders.id, order.id))
    .returning();

  await sendMail({
    to: site.emails.hello,
    subject: `Schedule request — ${order.buyerEmail}`,
    text: [
      `Buyer: ${order.buyerName || "—"} <${order.buyerEmail}>`,
      `Topic: ${order.topic || "—"}`,
      "",
      "Preferred times:",
      parsed.data.preferredTimes,
      "",
      parsed.data.notes ? `Notes:\n${parsed.data.notes}` : "",
      "",
      `Order: ${order.id}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  await sendMail({
    to: order.buyerEmail,
    subject: "Got your availability — I'll confirm the slot",
    text: [
      "Thanks — I received the times you suggested.",
      "I'll reply from hello@msulemanhussain.com to lock the call.",
      "",
      "Your preferences:",
      parsed.data.preferredTimes,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true, order: updated });
}
