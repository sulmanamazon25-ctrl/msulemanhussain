import { asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { sessionPackages } from "@/db/schema";
import { requireAdmin, unauthorizedJson } from "@/lib/shop/admin-session";
import { slugify } from "@/lib/shop/utils";

export async function GET() {
  if (!(await requireAdmin())) return unauthorizedJson();
  const db = getDb();
  const rows = await db.select().from(sessionPackages).orderBy(asc(sessionPackages.sortOrder));
  return NextResponse.json({ packages: rows });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorizedJson();
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const name = String(body.name || "").trim();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const priceEuros = Number(body.priceEuros);
  const durationMinutes = Number(body.durationMinutes);
  if (!Number.isFinite(priceEuros) || priceEuros < 0) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }
  if (!Number.isFinite(durationMinutes) || durationMinutes < 5) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  const db = getDb();
  try {
    const [row] = await db
      .insert(sessionPackages)
      .values({
        name,
        slug: slugify(String(body.slug || name)),
        blurb: String(body.blurb || ""),
        durationMinutes,
        topicLabel: String(body.topicLabel || "Personal Assistance"),
        priceCents: Math.round(priceEuros * 100),
        currency: "eur",
        status: body.status === "live" ? "live" : "draft",
        sortOrder: Number(body.sortOrder) || 0,
      })
      .returning();
    return NextResponse.json({ package: row });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create package" }, { status: 400 });
  }
}
