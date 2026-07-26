"use client";

import dynamic from "next/dynamic";
import type { CountryCode } from "@/content/pickleball-courts";

const SpainTipCalculator = dynamic(
  () => import("@/components/tools/SpainTipCalculator").then((m) => m.SpainTipCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const MenuDelDiaCalculator = dynamic(
  () => import("@/components/tools/MenuDelDiaCalculator").then((m) => m.MenuDelDiaCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const PickleballCourtsFinder = dynamic(
  () => import("@/components/tools/PickleballCourtsFinder").then((m) => m.PickleballCourtsFinder),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const PickleballCourtDimensions = dynamic(
  () =>
    import("@/components/tools/PickleballCourtDimensions").then((m) => m.PickleballCourtDimensions),
  { ssr: false, loading: () => <ToolSkeleton /> },
);

function ToolSkeleton() {
  return <div className="min-h-48 animate-pulse border border-white/10 bg-ink-3/50" />;
}

const COURT_SLUG_COUNTRY: Record<string, CountryCode> = {
  "pickleball-courts-germany": "DE",
  "pickleball-courts-spain": "ES",
  "pickleball-courts-usa": "US",
  "pickleball-courts-canada": "CA",
  "pickleball-courts-australia": "AU",
  "pickleball-courts-uk": "UK",
};

export function ToolInteractive({ slug, locale }: { slug: string; locale: "en" | "es" }) {
  if (slug === "spain-tip-calculator") return <SpainTipCalculator locale={locale} />;
  if (slug === "menu-del-dia-calculator") return <MenuDelDiaCalculator locale={locale} />;
  if (slug === "pickleball-court-dimensions") return <PickleballCourtDimensions locale={locale} />;
  const country = COURT_SLUG_COUNTRY[slug];
  if (country) return <PickleballCourtsFinder locale={locale} country={country} />;
  return null;
}
