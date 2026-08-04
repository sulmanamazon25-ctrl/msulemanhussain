import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { ScheduleForm } from "@/components/shop/ScheduleForm";
import { getDb } from "@/db";
import { downloadTokens, orders } from "@/db/schema";
import type { Order } from "@/db/schema";
import { getOrderByCheckoutSession } from "@/lib/shop/catalog";
import { fulfillCheckoutSession } from "@/lib/shop/fulfill";
import { getStripe } from "@/lib/shop/stripe";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return {
    title: dict.checkout.successTitle,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale: raw } = await params;
  const { session_id: sessionId } = await searchParams;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-display text-3xl font-bold">{dict.checkout.successTitle}</h1>
        <p className="mt-4 text-bone-dim">{dict.checkout.missingSession}</p>
        <Link href={lp("/shop")} className="mt-6 inline-block text-phosphor hover:underline">
          {dict.shop.back}
        </Link>
      </div>
    );
  }

  let order: Order | null = null;
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        await fulfillCheckoutSession(session);
      }
    }
    order = await getOrderByCheckoutSession(sessionId);
    if (!order && process.env.STRIPE_SECRET_KEY) {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.metadata?.orderId) {
        const db = getDb();
        const rows = await db
          .select()
          .from(orders)
          .where(eq(orders.id, session.metadata.orderId))
          .limit(1);
        order = rows[0] ?? null;
      }
    }
  } catch {
    order = null;
  }

  let downloadHref: string | null = null;
  if (order?.kind === "digital" && (order.status === "paid" || order.paidAt)) {
    try {
      const db = getDb();
      const tokens = await db
        .select()
        .from(downloadTokens)
        .where(eq(downloadTokens.orderId, order.id))
        .limit(1);
      if (tokens[0]) downloadHref = `/api/download/${tokens[0].token}`;
    } catch {
      downloadHref = null;
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">CHECKOUT</p>
      <h1 className="mt-3 font-display text-3xl font-bold">{dict.checkout.successTitle}</h1>
      <p className="mt-4 text-bone-dim">{dict.checkout.successBlurb}</p>

      {!order ? (
        <p className="mt-6 text-amber">{dict.checkout.processing}</p>
      ) : order.kind === "digital" ? (
        <div className="mt-8">
          <p className="text-bone">{dict.checkout.digitalReady}</p>
          {downloadHref ? (
            <a
              href={downloadHref}
              className="mt-4 inline-block border border-phosphor bg-phosphor/10 px-5 py-3 text-sm font-semibold tracking-[0.14em] text-phosphor"
            >
              {dict.checkout.download}
            </a>
          ) : (
            <p className="mt-4 text-sm text-bone-dim">{dict.checkout.downloadEmail}</p>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-bone">{dict.checkout.sessionNext}</p>
          <ScheduleForm
            sessionId={sessionId}
            submitLabel={dict.checkout.scheduleSubmit}
            timesLabel={dict.checkout.preferredTimes}
            notesLabel={dict.checkout.notes}
            successMessage={dict.checkout.scheduleSaved}
          />
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href={lp("/shop")} className="text-phosphor hover:underline">
          {dict.nav.shop}
        </Link>
        <Link href={lp("/book")} className="text-phosphor hover:underline">
          {dict.nav.book}
        </Link>
      </div>
    </div>
  );
}
