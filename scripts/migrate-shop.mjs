import { readFileSync, readdirSync } from "fs";
import path from "path";
import postgres from "postgres";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("[migrate] DATABASE_URL is required");
    process.exit(1);
  }

  const sql = postgres(url, { max: 1 });
  await sql`
    CREATE TABLE IF NOT EXISTS shop_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const dir = path.join(process.cwd(), "drizzle");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const id = file.replace(/\.sql$/, "");
    const existing = await sql`SELECT id FROM shop_migrations WHERE id = ${id}`;
    if (existing.length) {
      console.log(`[migrate] skip ${id}`);
      continue;
    }
    const body = readFileSync(path.join(dir, file), "utf8");
    console.log(`[migrate] apply ${id}`);
    await sql.unsafe(body);
    await sql`INSERT INTO shop_migrations (id) VALUES (${id})`;
  }

  await sql.end();
  console.log("[migrate] done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
