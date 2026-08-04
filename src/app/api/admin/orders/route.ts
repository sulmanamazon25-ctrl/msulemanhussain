import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { orders } from "@/db/schema";
import { requireAdmin, unauthorizedJson } from "@/lib/shop/admin-session";

export async function GET() {
  if (!(await requireAdmin())) return unauthorizedJson();
  const db = getDb();
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(200);
  return NextResponse.json({ orders: rows });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorizedJson();
  const body = (await req.json().catch(() => null)) as {
    id?: string;
    status?: "paid" | "awaiting_schedule" | "scheduled" | "done" | "refunded";
  } | null;
  if (!body?.id || !body.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }
  const db = getDb();
  const [row] = await db
    .update(orders)
    .set({ status: body.status, updatedAt: new Date() })
    .where(eq(orders.id, body.id))
    .returning();
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order: row });
}
