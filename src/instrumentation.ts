export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.DATABASE_URL) return;
  try {
    const { ensureShopMigrated } = await import("@/lib/shop/migrate");
    await ensureShopMigrated();
    const { ensureUploadDirs } = await import("@/lib/shop/uploads");
    await ensureUploadDirs();
    const { seedDefaultSessionPackages } = await import("@/lib/shop/seed");
    await seedDefaultSessionPackages();
  } catch (err) {
    console.error("[shop] startup migrate/seed failed", err);
  }
}
