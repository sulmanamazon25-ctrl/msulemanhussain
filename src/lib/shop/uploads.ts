import { mkdir } from "fs/promises";
import path from "path";

/** Absolute upload root — prefer UPLOAD_DIR in production (Docker volume). */
export function getUploadRoot(): string {
  const fromEnv = process.env.UPLOAD_DIR?.trim();
  if (fromEnv) return fromEnv;
  return path.join(process.cwd(), "data", "uploads");
}

export async function ensureUploadDirs() {
  const root = getUploadRoot();
  await mkdir(path.join(root, "files"), { recursive: true });
  await mkdir(path.join(root, "covers"), { recursive: true });
  return root;
}

export function absoluteUploadPath(relative: string): string {
  return path.join(getUploadRoot(), relative);
}
