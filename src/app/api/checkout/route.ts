import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { orders } from "@/db/schema";
import {
  getDigitalProductBySlug,
  getSessionPackageBySlug,
} from "@/lib/shop/catalog";
import { site } from "@/content/site";
import { getStripe, shopCurrency } from "@/lib/shop/stripe";
import { SESSION_TOPICS } from "@/lib/shop/utils";

const bodySchema = z.object({
  kind: z.enum(["digital", "session"]),
  slug: z.string().min(1),
  locale: z.enum(["en", "es"]).default("en"),
  buyerEmail: z.string().email().optional(),
  buyerName: z.string().max(200).optional(),
  topic: z.string().max(160).optional(),
});

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { kind, slug, locale, buyerEmail, buyerName, topic } = parsed.data;

  const origin = site.url;
  const db = getDb();
  const stripe = getStripe();
  const currency = shopCurrency();

  if (kind === "digital") {
    const product = await getDigitalProductBySlug(slug);
    if (!product || product.status !== "live" || !product.filePath) {
      return NextResponse.json({ error: "Product unavailable" }, { status: 404 });
    }

    const [order] = await db
      .insert(orders)
      .values({
        kind: "digital",
        status: "pending",
        digitalProductId: product.id,
        buyerEmail: buyerEmail || "pending@checkout.local",
        buyerName: buyerName || null,
        amountCents: product.priceCents,
        currency: product.currency || currency,
        productSnapshot: JSON.stringify({
          title: product.title,
          slug: product.slug,
          priceCents: product.priceCents,
        }),
      })
      .returning();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: buyerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency || currency,
            unit_amount: product.priceCents,
            product_data: {
              name: product.title,
              description: product.shortDescription?.slice(0, 400) || undefined,
            },
          },
        },
      ],
      metadata: {
        orderId: order.id,
        kind: "digital",
        slug: product.slug,
      },
      success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/shop/${product.slug}?canceled=1`,
    });

    await db
      .update(orders)
      .set({ stripeCheckoutSessionId: session.id, updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    return NextResponse.json({ url: session.url });
  }

  const pack = await getSessionPackageBySlug(slug);
  if (!pack || pack.status !== "live") {
    return NextResponse.json({ error: "Package unavailable" }, { status: 404 });
  }

  const chosenTopic =
    topic && (SESSION_TOPICS as readonly string[]).includes(topic) ? topic : pack.topicLabel;

  const [order] = await db
    .insert(orders)
    .values({
      kind: "session",
      status: "pending",
      sessionPackageId: pack.id,
      buyerEmail: buyerEmail || "pending@checkout.local",
      buyerName: buyerName || null,
      topic: chosenTopic,
      amountCents: pack.priceCents,
      currency: pack.currency || currency,
      productSnapshot: JSON.stringify({
        name: pack.name,
        slug: pack.slug,
        durationMinutes: pack.durationMinutes,
        priceCents: pack.priceCents,
        topic: chosenTopic,
      }),
    })
    .returning();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: buyerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: pack.currency || currency,
          unit_amount: pack.priceCents,
          product_data: {
            name: `${pack.name} (${pack.durationMinutes} min)`,
            description: `${chosenTopic} — ${pack.blurb}`.slice(0, 400),
          },
        },
      },
    ],
    metadata: {
      orderId: order.id,
      kind: "session",
      slug: pack.slug,
      topic: chosenTopic,
    },
    success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/book?canceled=1`,
  });

  await db
    .update(orders)
    .set({ stripeCheckoutSessionId: session.id, updatedAt: new Date() })
    .where(eq(orders.id, order.id));

  return NextResponse.json({ url: session.url });
}
