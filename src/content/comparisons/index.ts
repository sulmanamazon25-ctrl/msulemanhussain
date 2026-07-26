import type { ComparisonDoc } from "@/types/comparison";
import wasupVsManychat from "./wasup-vs-manychat.json";
import downitxVs4k from "./downitx-vs-4kdownloader.json";

export const comparisons: ComparisonDoc[] = [
  wasupVsManychat as ComparisonDoc,
  downitxVs4k as ComparisonDoc,
];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs() {
  return comparisons.map((c) => c.slug);
}

export function listComparisons() {
  return comparisons;
}

export function comparisonCopy(doc: ComparisonDoc, locale: "en" | "es") {
  return locale === "es" ? doc.es : doc.en;
}
