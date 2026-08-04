import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import {
  digitalProducts,
  downloadTokens,
  orders,
  sessionPackages,
  type DigitalProduct,
  type Order,
  type SessionPackage,
  type DownloadToken,
} from "@/db/schema";

export async function listLiveDigitalProducts(): Promise<DigitalProduct[]> {
  const db = getDb();
  return db
    .select()
    .from(digitalProducts)
    .where(eq(digitalProducts.status, "live"))
    .orderBy(desc(digitalProducts.updatedAt));
}

export async function getDigitalProductBySlug(slug: string): Promise<DigitalProduct | null> {
  const db = getDb();
  const rows = await db
    .select()
    .from(digitalProducts)
    .where(eq(digitalProducts.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function listLiveSessionPackages(): Promise<SessionPackage[]> {
  const db = getDb();
  return db
    .select()
    .from(sessionPackages)
    .where(eq(sessionPackages.status, "live"))
    .orderBy(sessionPackages.sortOrder);
}

export async function getSessionPackageBySlug(slug: string): Promise<SessionPackage | null> {
  const db = getDb();
  const rows = await db
    .select()
    .from(sessionPackages)
    .where(eq(sessionPackages.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const db = getDb();
  const rows = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getOrderByCheckoutSession(sessionId: string): Promise<Order | null> {
  const db = getDb();
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeCheckoutSessionId, sessionId))
    .limit(1);
  return rows[0] ?? null;
}

export async function getDownloadToken(token: string): Promise<DownloadToken | null> {
  const db = getDb();
  const rows = await db
    .select()
    .from(downloadTokens)
    .where(eq(downloadTokens.token, token))
    .limit(1);
  return rows[0] ?? null;
}

export { digitalProducts, sessionPackages, orders, downloadTokens };
