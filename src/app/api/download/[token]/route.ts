import { createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { Readable } from "stream";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { digitalProducts, downloadTokens, orders } from "@/db/schema";
import { getUploadRoot } from "@/lib/shop/uploads";

type Ctx = { params: Promise<{ token: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const db = getDb();
  const tokenRows = await db.select().from(downloadTokens).where(eq(downloadTokens.token, token)).limit(1);
  const row = tokenRows[0];
  if (!row) return NextResponse.json({ error: "Invalid link" }, { status: 404 });
  if (row.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Link expired" }, { status: 410 });
  }
  if (row.downloadCount >= row.maxDownloads) {
    return NextResponse.json({ error: "Download limit reached" }, { status: 410 });
  }

  const orderRows = await db.select().from(orders).where(eq(orders.id, row.orderId)).limit(1);
  const order = orderRows[0];
  if (!order?.digitalProductId) return NextResponse.json({ error: "Order missing" }, { status: 404 });

  const productRows = await db
    .select()
    .from(digitalProducts)
    .where(eq(digitalProducts.id, order.digitalProductId))
    .limit(1);
  const product = productRows[0];
  if (!product?.filePath) return NextResponse.json({ error: "File missing" }, { status: 404 });

  const abs = path.join(getUploadRoot(), product.filePath);
  if (!existsSync(abs)) return NextResponse.json({ error: "File missing" }, { status: 404 });

  await db
    .update(downloadTokens)
    .set({ downloadCount: row.downloadCount + 1 })
    .where(eq(downloadTokens.id, row.id));

  const stat = statSync(abs);
  const stream = createReadStream(abs);
  const filename = product.fileName || path.basename(abs);

  return new NextResponse(Readable.toWeb(stream) as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": String(stat.size),
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
      "Cache-Control": "no-store",
    },
  });
}
