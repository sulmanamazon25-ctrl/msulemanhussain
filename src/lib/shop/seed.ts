import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { sessionPackages } from "@/db/schema";

const defaults = [
  {
    slug: "quick-assist",
    name: "Quick Assist",
    blurb: "One focused question — screenshare optional. Best for a clear blocker.",
    durationMinutes: 20,
    topicLabel: "Personal Assistance",
    priceCents: 3900,
    sortOrder: 1,
  },
  {
    slug: "working-session",
    name: "Working Session",
    blurb: "Hands-on help: review a flow, debug a launch issue, or pair on a decision.",
    durationMinutes: 45,
    topicLabel: "Personal Assistance",
    priceCents: 7900,
    sortOrder: 2,
  },
  {
    slug: "deep-dive",
    name: "Deep Dive",
    blurb: "Architecture, product, or launch plan — enough time to leave with a concrete next step.",
    durationMinutes: 90,
    topicLabel: "Personal Assistance",
    priceCents: 14900,
    sortOrder: 3,
  },
] as const;

export async function seedDefaultSessionPackages() {
  const db = getDb();
  for (const pack of defaults) {
    const existing = await db
      .select({ id: sessionPackages.id })
      .from(sessionPackages)
      .where(eq(sessionPackages.slug, pack.slug))
      .limit(1);
    if (existing.length) continue;
    await db.insert(sessionPackages).values({
      ...pack,
      currency: "eur",
      status: "live",
    });
    console.log(`[shop] seeded session package ${pack.slug}`);
  }
}
