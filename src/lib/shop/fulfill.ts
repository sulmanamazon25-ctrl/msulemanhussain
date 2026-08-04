import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { getDb } from "@/db";
import { downloadTokens, orders } from "@/db/schema";
import { site } from "@/content/site";
import { formatEur, sendMail } from "@/lib/shop/mail";

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId) return;

  const db = getDb();
  const rows = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  const order = rows[0];
  if (!order) return;
  if (
    order.status === "paid" ||
    order.status === "awaiting_schedule" ||
    order.status === "scheduled" ||
    order.status === "done"
  ) {
    return;
  }

  const email = session.customer_details?.email || session.customer_email || order.buyerEmail;
  const name = session.customer_details?.name || order.buyerName;
  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null;

  const nextStatus = order.kind === "session" ? "awaiting_schedule" : "paid";

  await db
    .update(orders)
    .set({
      status: nextStatus,
      buyerEmail: email,
      buyerName: name,
      stripePaymentIntentId: paymentIntent,
      paidAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, order.id));

  const origin = site.url;
  let downloadUrl: string | null = null;

  if (order.kind === "digital") {
    const token = randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.insert(downloadTokens).values({
      orderId: order.id,
      token,
      expiresAt,
      maxDownloads: 5,
    });
    downloadUrl = `${origin}/api/download/${token}`;
  }

  let snap: { title?: string; name?: string } = {};
  try {
    snap = JSON.parse(order.productSnapshot);
  } catch {
    snap = {};
  }
  const label = snap.title || snap.name || "Order";
  const amount = formatEur(order.amountCents, order.currency);

  await sendMail({
    to: email,
    subject: `Payment received — ${label}`,
    text:
      order.kind === "digital"
        ? [
            `Thanks for your purchase of ${label} (${amount}).`,
            "",
            downloadUrl
              ? `Download (valid 7 days, up to 5 downloads): ${downloadUrl}`
              : "Download link will follow.",
            "",
            `Support: ${site.emails.support}`,
          ].join("\n")
        : [
            `Thanks — your ${label} session is paid (${amount}).`,
            order.topic ? `Topic: ${order.topic}` : "",
            "",
            `Next: open ${origin}/en/checkout/success?session_id=${session.id} and share 2–3 times that work for you.`,
            "I'll email you to confirm the slot.",
            "",
            `Questions: ${site.emails.hello}`,
          ]
            .filter(Boolean)
            .join("\n"),
  });

  await sendMail({
    to: site.emails.hello,
    subject: `New ${order.kind} order — ${label}`,
    text: [
      `Kind: ${order.kind}`,
      `Buyer: ${name || "—"} <${email}>`,
      `Amount: ${amount}`,
      order.topic ? `Topic: ${order.topic}` : "",
      downloadUrl ? `Download: ${downloadUrl}` : "",
      `Order id: ${order.id}`,
      `Stripe session: ${session.id}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
