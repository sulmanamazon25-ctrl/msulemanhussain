import { createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { digitalProducts } from "@/db/schema";
import { getUploadRoot } from "@/lib/shop/uploads";
import { Readable } from "stream";

type Ctx = { params: Promise<{ id: string }> };

/** Public cover image for live digital products (or any product when admin cookie present — kept simple: live only). */
export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();
  const rows = await db.select().from(digitalProducts).where(eq(digitalProducts.id, id)).limit(1);
  const product = rows[0];
  if (!product?.coverImagePath || product.status !== "live") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const abs = path.join(getUploadRoot(), product.coverImagePath);
  if (!existsSync(abs)) return NextResponse.json({ error: "Missing file" }, { status: 404 });
  const stat = statSync(abs);
  const stream = createReadStream(abs);
  const ext = path.extname(abs).toLowerCase();
  const type =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : ext === ".gif"
          ? "image/gif"
          : "image/jpeg";
  return new NextResponse(Readable.toWeb(stream) as unknown as BodyInit, {
    headers: {
      "Content-Type": type,
      "Content-Length": String(stat.size),
      "Cache-Control": "public, max-age=86400",
    },
  });
}
