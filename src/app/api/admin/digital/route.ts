import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { digitalProducts } from "@/db/schema";
import { requireAdmin, unauthorizedJson } from "@/lib/shop/admin-session";
import { ensureUploadDirs, getUploadRoot } from "@/lib/shop/uploads";
import { slugify } from "@/lib/shop/utils";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function GET() {
  if (!(await requireAdmin())) return unauthorizedJson();
  const db = getDb();
  const rows = await db.select().from(digitalProducts).orderBy(desc(digitalProducts.updatedAt));
  return NextResponse.json({ products: rows });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorizedJson();
  await ensureUploadDirs();

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const slugRaw = String(form.get("slug") || title);
  const slug = slugify(slugRaw);
  const priceEuros = Number(form.get("priceEuros"));
  if (!Number.isFinite(priceEuros) || priceEuros < 0) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }
  const priceCents = Math.round(priceEuros * 100);
  const status = form.get("status") === "live" ? "live" : "draft";

  let filePath: string | null = null;
  let fileName: string | null = null;
  let fileSize: number | null = null;
  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    const ext = path.extname(file.name) || ".bin";
    const rel = path.join("files", `${randomUUID()}${ext}`);
    const abs = path.join(getUploadRoot(), rel);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(abs, buf);
    filePath = rel.replace(/\\/g, "/");
    fileName = file.name;
    fileSize = file.size;
  }

  let coverImagePath: string | null = null;
  const cover = form.get("cover");
  if (cover instanceof File && cover.size > 0) {
    const ext = path.extname(cover.name) || ".png";
    const rel = path.join("covers", `${randomUUID()}${ext}`);
    const abs = path.join(getUploadRoot(), rel);
    await writeFile(abs, Buffer.from(await cover.arrayBuffer()));
    coverImagePath = rel.replace(/\\/g, "/");
  }

  const db = getDb();
  try {
    const [row] = await db
      .insert(digitalProducts)
      .values({
        title,
        slug,
        shortDescription: String(form.get("shortDescription") || ""),
        longDescription: String(form.get("longDescription") || ""),
        priceCents,
        currency: "eur",
        status,
        tags: String(form.get("tags") || ""),
        seoTitle: String(form.get("seoTitle") || "") || null,
        seoDescription: String(form.get("seoDescription") || "") || null,
        coverImagePath,
        ogImagePath: coverImagePath,
        filePath,
        fileName,
        fileSize,
      })
      .returning();
    return NextResponse.json({ product: row });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create product (slug taken?)" }, { status: 400 });
  }
}
