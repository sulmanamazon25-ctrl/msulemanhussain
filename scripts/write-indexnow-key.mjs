/**
 * Writes public/{INDEXNOW_KEY}.txt for Bing IndexNow key verification.
 * No-op when INDEXNOW_KEY is unset (safe for local/CI without secrets).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const key = process.env.INDEXNOW_KEY?.trim();
if (!key) {
  console.log("[indexnow:key] INDEXNOW_KEY not set — skip writing key file.");
  process.exit(0);
}

if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  console.error("[indexnow:key] INDEXNOW_KEY must be 8–128 alphanumeric/hyphen characters.");
  process.exit(1);
}

const publicDir = join(process.cwd(), "public");
mkdirSync(publicDir, { recursive: true });
const filePath = join(publicDir, `${key}.txt`);
writeFileSync(filePath, key, "utf8");
console.log(`[indexnow:key] Wrote ${filePath}`);
