"use client";

import dynamic from "next/dynamic";

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

function ToolSkeleton() {
  return <div className="min-h-48 animate-pulse border border-white/10 bg-ink-3/50" />;
}

export function ToolInteractive({ slug, locale }: { slug: string; locale: "en" | "es" }) {
  switch (slug) {
    case "spain-tip-calculator":
      return <SpainTipCalculator locale={locale} />;
    case "menu-del-dia-calculator":
      return <MenuDelDiaCalculator locale={locale} />;
    case "pickleball-courts-germany":
      return <PickleballCourtsFinder locale={locale} />;
    default:
      return null;
  }
}
