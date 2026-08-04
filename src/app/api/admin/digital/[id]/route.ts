import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { digitalProducts } from "@/db/schema";
import { requireAdmin, unauthorizedJson } from "@/lib/shop/admin-session";
import { ensureUploadDirs, getUploadRoot } from "@/lib/shop/uploads";
import { slugify } from "@/lib/shop/utils";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await requireAdmin())) return unauthorizedJson();
  const { id } = await ctx.params;
  await ensureUploadDirs();

  const form = await req.formData();
  const updates: Partial<typeof digitalProducts.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (form.has("title")) updates.title = String(form.get("title") || "").trim();
  if (form.has("slug")) updates.slug = slugify(String(form.get("slug") || ""));
  if (form.has("shortDescription")) updates.shortDescription = String(form.get("shortDescription") || "");
  if (form.has("longDescription")) updates.longDescription = String(form.get("longDescription") || "");
  if (form.has("tags")) updates.tags = String(form.get("tags") || "");
  if (form.has("seoTitle")) updates.seoTitle = String(form.get("seoTitle") || "") || null;
  if (form.has("seoDescription")) updates.seoDescription = String(form.get("seoDescription") || "") || null;
  if (form.has("status")) updates.status = form.get("status") === "live" ? "live" : "draft";
  if (form.has("priceEuros")) {
    const priceEuros = Number(form.get("priceEuros"));
    if (!Number.isFinite(priceEuros) || priceEuros < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    updates.priceCents = Math.round(priceEuros * 100);
  }

  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    const ext = path.extname(file.name) || ".bin";
    const rel = path.join("files", `${randomUUID()}${ext}`);
    await writeFile(path.join(getUploadRoot(), rel), Buffer.from(await file.arrayBuffer()));
    updates.filePath = rel.replace(/\\/g, "/");
    updates.fileName = file.name;
    updates.fileSize = file.size;
  }

  const cover = form.get("cover");
  if (cover instanceof File && cover.size > 0) {
    const ext = path.extname(cover.name) || ".png";
    const rel = path.join("covers", `${randomUUID()}${ext}`);
    await writeFile(path.join(getUploadRoot(), rel), Buffer.from(await cover.arrayBuffer()));
    updates.coverImagePath = rel.replace(/\\/g, "/");
    updates.ogImagePath = updates.coverImagePath;
  }

  const db = getDb();
  try {
    const [row] = await db
      .update(digitalProducts)
      .set(updates)
      .where(eq(digitalProducts.id, id))
      .returning();
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product: row });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await requireAdmin())) return unauthorizedJson();
  const { id } = await ctx.params;
  const db = getDb();
  const [row] = await db.delete(digitalProducts).where(eq(digitalProducts.id, id)).returning();
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
