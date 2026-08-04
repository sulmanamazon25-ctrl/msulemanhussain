import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { sessionPackages } from "@/db/schema";
import { requireAdmin, unauthorizedJson } from "@/lib/shop/admin-session";
import { slugify } from "@/lib/shop/utils";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await requireAdmin())) return unauthorizedJson();
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const updates: Partial<typeof sessionPackages.$inferInsert> = { updatedAt: new Date() };
  if (body.name !== undefined) updates.name = String(body.name).trim();
  if (body.slug !== undefined) updates.slug = slugify(String(body.slug));
  if (body.blurb !== undefined) updates.blurb = String(body.blurb);
  if (body.topicLabel !== undefined) updates.topicLabel = String(body.topicLabel);
  if (body.status !== undefined) updates.status = body.status === "live" ? "live" : "draft";
  if (body.sortOrder !== undefined) updates.sortOrder = Number(body.sortOrder) || 0;
  if (body.durationMinutes !== undefined) {
    const d = Number(body.durationMinutes);
    if (!Number.isFinite(d) || d < 5) return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
    updates.durationMinutes = d;
  }
  if (body.priceEuros !== undefined) {
    const p = Number(body.priceEuros);
    if (!Number.isFinite(p) || p < 0) return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    updates.priceCents = Math.round(p * 100);
  }

  const db = getDb();
  try {
    const [row] = await db
      .update(sessionPackages)
      .set(updates)
      .where(eq(sessionPackages.id, id))
      .returning();
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ package: row });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await requireAdmin())) return unauthorizedJson();
  const { id } = await ctx.params;
  const db = getDb();
  const [row] = await db.delete(sessionPackages).where(eq(sessionPackages.id, id)).returning();
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
