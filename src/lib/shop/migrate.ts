import { readFileSync, readdirSync, existsSync } from "fs";
import path from "path";
import { getSql } from "@/db";

let migrated = false;

export async function ensureShopMigrated(): Promise<void> {
  if (migrated) return;
  if (!process.env.DATABASE_URL) {
    console.warn("[shop] DATABASE_URL missing — shop DB unavailable");
    return;
  }

  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS shop_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const candidates = [
    path.join(process.cwd(), "drizzle"),
    path.join(process.cwd(), "..", "drizzle"),
  ];
  const dir = candidates.find((d) => existsSync(d));
  if (!dir) {
    console.warn("[shop] drizzle/ folder not found — skip migrations");
    migrated = true;
    return;
  }

  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const id = file.replace(/\.sql$/, "");
    const existing = await sql`SELECT id FROM shop_migrations WHERE id = ${id}`;
    if (existing.length) continue;
    const body = readFileSync(path.join(dir, file), "utf8");
    console.log(`[shop] migrate ${id}`);
    await sql.unsafe(body);
    await sql`INSERT INTO shop_migrations (id) VALUES (${id})`;
  }

  migrated = true;
}
