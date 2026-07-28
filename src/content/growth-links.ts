import { listComparisons, getComparison, comparisonCopy } from "@/lib/comparisons";
import { getTool, toolCopy, tools } from "@/content/tools";

/** Maps portfolio products → related free tools + comparison pages (internal SEO graph). */
export const productGrowthLinks: Record<
  string,
  { toolSlugs: string[]; comparisonSlugs: string[] }
> = {
  wasup: {
    toolSlugs: [
      "whatsapp-link-generator",
      "upwork-fiverr-payout-calculator-pakistan",
      "fbr-freelance-tax-calculator-pakistan",
      "invoice-generator-pakistan",
      "daraz-profit-calculator-pakistan",
      "meta-tiktok-ad-roas-calculator-pakistan",
      "youtube-reels-cpm-estimator-pakistan",
    ],
    comparisonSlugs: ["wasup-vs-manychat"],
  },
  downitx: {
    toolSlugs: ["tiktok-reels-safe-zone", "vertical-aspect-guide"],
    comparisonSlugs: ["downitx-vs-4kdownloader"],
  },
  pinquill: {
    toolSlugs: ["pinterest-23-canvas", "pinterest-pin-copy-length"],
    comparisonSlugs: [],
  },
  "spain-eats": {
    toolSlugs: ["spain-tip-calculator", "menu-del-dia-calculator"],
    comparisonSlugs: [],
  },
  "pickleball-deutsch": {
    toolSlugs: [
      "pickleball-courts-germany",
      "pickleball-courts-spain",
      "pickleball-courts-usa",
      "pickleball-courts-canada",
      "pickleball-courts-australia",
      "pickleball-courts-uk",
      "pickleball-court-dimensions",
    ],
    comparisonSlugs: [],
  },
};

/** Canonical live product URLs (external) — keep in sync with products.ts. */
export const externalProductUrls = {
  wasup: "https://wasup.app/es",
  downitx: "https://downitx.com/",
  pinquill: "https://pinquill.com/en",
  "pickleball-deutsch": "https://pickleballdeutch.com/",
  "spain-eats": "https://spaineats.info/",
  bokily: "https://www.bokily.com/",
} as const;

export function growthForProduct(productSlug: string) {
  return productGrowthLinks[productSlug] ?? { toolSlugs: [], comparisonSlugs: [] };
}

export function comparisonsForProduct(productSlug: string, locale: "en" | "es") {
  return growthForProduct(productSlug)
    .comparisonSlugs.map((slug) => getComparison(slug))
    .filter(Boolean)
    .map((doc) => ({
      slug: doc!.slug,
      title: comparisonCopy(doc!, locale).h1,
      label: `${doc!.our.name} vs ${doc!.competitor.name}`,
    }));
}

export function toolsForProduct(productSlug: string, locale: "en" | "es") {
  return growthForProduct(productSlug)
    .toolSlugs.map((slug) => getTool(slug))
    .filter(Boolean)
    .map((tool) => ({
      slug: tool!.slug,
      name: toolCopy(tool!, locale).name,
    }));
}

export function comparisonForTool(toolSlug: string) {
  for (const [productSlug, links] of Object.entries(productGrowthLinks)) {
    if (links.toolSlugs.includes(toolSlug) && links.comparisonSlugs[0]) {
      return { productSlug, comparisonSlug: links.comparisonSlugs[0] };
    }
  }
  return null;
}

export function toolForComparison(comparisonSlug: string) {
  for (const [productSlug, links] of Object.entries(productGrowthLinks)) {
    if (links.comparisonSlugs.includes(comparisonSlug) && links.toolSlugs[0]) {
      return { productSlug, toolSlug: links.toolSlugs[0] };
    }
  }
  return null;
}

export function allGrowthHubLinks() {
  return {
    tools: tools.map((t) => t.slug),
    comparisons: listComparisons().map((c) => c.slug),
  };
}
