export function formatEur(cents: number, currency = "eur"): string {
  try {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  } catch {
    return `€${(cents / 100).toFixed(2)}`;
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

export const SESSION_TOPICS = [
  "Personal Assistance",
  "Product / tech review",
  "Spain / ops",
  "Career",
] as const;

export type SessionTopic = (typeof SESSION_TOPICS)[number];
