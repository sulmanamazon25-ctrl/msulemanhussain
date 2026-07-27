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
const WhatsAppLinkGenerator = dynamic(
  () => import("@/components/tools/WhatsAppLinkGenerator").then((m) => m.WhatsAppLinkGenerator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const TikTokReelsSafeZone = dynamic(
  () => import("@/components/tools/TikTokReelsSafeZone").then((m) => m.TikTokReelsSafeZone),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const VerticalAspectGuide = dynamic(
  () => import("@/components/tools/VerticalAspectGuide").then((m) => m.VerticalAspectGuide),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const Pinterest23Canvas = dynamic(
  () => import("@/components/tools/Pinterest23Canvas").then((m) => m.Pinterest23Canvas),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const PinterestPinCopyLength = dynamic(
  () => import("@/components/tools/PinterestPinCopyLength").then((m) => m.PinterestPinCopyLength),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const CvBuilder = dynamic(() => import("@/components/tools/CvBuilder").then((m) => m.CvBuilder), {
  ssr: false,
  loading: () => <ToolSkeleton />,
});
const EvauCalculator = dynamic(
  () => import("@/components/tools/EvauCalculator").then((m) => m.EvauCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const GradeAverageCalculator = dynamic(
  () => import("@/components/tools/GradeAverageCalculator").then((m) => m.GradeAverageCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const SmartDealFinder = dynamic(
  () => import("@/components/tools/SmartDealFinder").then((m) => m.SmartDealFinder),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const DietPlanner = dynamic(() => import("@/components/tools/DietPlanner").then((m) => m.DietPlanner), {
  ssr: false,
  loading: () => <ToolSkeleton />,
});
const SalaryCalculator = dynamic(
  () => import("@/components/tools/SalaryCalculator").then((m) => m.SalaryCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const BudgetPlanner = dynamic(
  () => import("@/components/tools/BudgetPlanner").then((m) => m.BudgetPlanner),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const ShippingEstimator = dynamic(
  () => import("@/components/tools/ShippingEstimator").then((m) => m.ShippingEstimator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const MortgageCalculator = dynamic(
  () => import("@/components/tools/MortgageCalculator").then((m) => m.MortgageCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const DniNieValidator = dynamic(
  () => import("@/components/tools/DniNieValidator").then((m) => m.DniNieValidator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const SeveranceCalculator = dynamic(
  () => import("@/components/tools/SeveranceCalculator").then((m) => m.SeveranceCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const AutonomoCuotaCalculator = dynamic(
  () => import("@/components/tools/AutonomoCuotaCalculator").then((m) => m.AutonomoCuotaCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const DueDateCalculator = dynamic(
  () => import("@/components/tools/DueDateCalculator").then((m) => m.DueDateCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const IvaCalculator = dynamic(
  () => import("@/components/tools/IvaCalculator").then((m) => m.IvaCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const IbanEsTool = dynamic(() => import("@/components/tools/IbanEsTool").then((m) => m.IbanEsTool), {
  ssr: false,
  loading: () => <ToolSkeleton />,
});
const IrpfWithholdingCalculator = dynamic(
  () => import("@/components/tools/IrpfWithholdingCalculator").then((m) => m.IrpfWithholdingCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const BillSplitCalculator = dynamic(
  () => import("@/components/tools/BillSplitCalculator").then((m) => m.BillSplitCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const CoverLetterGenerator = dynamic(
  () => import("@/components/tools/CoverLetterGenerator").then((m) => m.CoverLetterGenerator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const TripFuelCalculator = dynamic(
  () => import("@/components/tools/TripFuelCalculator").then((m) => m.TripFuelCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const HomeBuyingCostCalculator = dynamic(
  () => import("@/components/tools/HomeBuyingCostCalculator").then((m) => m.HomeBuyingCostCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const MexicoIvaCalculator = dynamic(
  () => import("@/components/tools/MexicoIvaCalculator").then((m) => m.MexicoIvaCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const LatAmSalaryCalculator = dynamic(
  () => import("@/components/tools/LatAmTools").then((m) => m.LatAmSalaryCalculator),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
const LatAmIdValidator = dynamic(
  () => import("@/components/tools/LatAmTools").then((m) => m.LatAmIdValidator),
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

const SIMPLE: Record<string, React.ComponentType<{ locale: "en" | "es" }>> = {
  "crear-cv-profesional": CvBuilder,
  "calculadora-evau-2026": EvauCalculator,
  "calculadora-nota-media": GradeAverageCalculator,
  "smart-deal-finder": SmartDealFinder,
  "planificador-de-dieta": DietPlanner,
  "calculadora-de-salario": SalaryCalculator,
  "planificador-de-presupuesto": BudgetPlanner,
  "estimador-de-envios": ShippingEstimator,
  "calculadora-de-hipoteca": MortgageCalculator,
  "validador-dni-nie": DniNieValidator,
  "calculadora-de-finiquito": SeveranceCalculator,
  "cuota-de-autonomos": AutonomoCuotaCalculator,
  "calculadora-fecha-de-parto": DueDateCalculator,
  "calculadora-iva": IvaCalculator,
  "validador-iban-es": IbanEsTool,
  "calculadora-irpf-retencion": IrpfWithholdingCalculator,
  "dividir-cuenta": BillSplitCalculator,
  "carta-de-presentacion": CoverLetterGenerator,
  "calculadora-coste-viaje": TripFuelCalculator,
  "coste-compra-vivienda": HomeBuyingCostCalculator,
  "iva-mexico": MexicoIvaCalculator,
};

export function ToolInteractive({ slug, locale }: { slug: string; locale: "en" | "es" }) {
  if (slug === "whatsapp-link-generator") return <WhatsAppLinkGenerator locale={locale} />;
  if (slug === "tiktok-reels-safe-zone") return <TikTokReelsSafeZone locale={locale} />;
  if (slug === "vertical-aspect-guide") return <VerticalAspectGuide locale={locale} />;
  if (slug === "pinterest-23-canvas") return <Pinterest23Canvas locale={locale} />;
  if (slug === "pinterest-pin-copy-length") return <PinterestPinCopyLength locale={locale} />;
  if (slug === "spain-tip-calculator") return <SpainTipCalculator locale={locale} />;
  if (slug === "menu-del-dia-calculator") return <MenuDelDiaCalculator locale={locale} />;
  if (slug === "pickleball-court-dimensions") return <PickleballCourtDimensions locale={locale} />;

  if (slug === "salario-neto-mexico") return <LatAmSalaryCalculator locale={locale} country="mx" />;
  if (slug === "salario-neto-colombia") return <LatAmSalaryCalculator locale={locale} country="co" />;
  if (slug === "salario-neto-argentina") return <LatAmSalaryCalculator locale={locale} country="ar" />;
  if (slug === "validador-rfc-mexico") return <LatAmIdValidator locale={locale} country="mx" />;
  if (slug === "validador-rut-colombia") return <LatAmIdValidator locale={locale} country="co" />;
  if (slug === "validador-cuit-argentina") return <LatAmIdValidator locale={locale} country="ar" />;

  const Simple = SIMPLE[slug];
  if (Simple) return <Simple locale={locale} />;

  const country = COURT_SLUG_COUNTRY[slug];
  if (country) return <PickleballCourtsFinder locale={locale} country={country} />;
  return null;
}
