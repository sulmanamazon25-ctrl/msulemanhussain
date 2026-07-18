import type { Metadata } from "next";
import { FounderWorldHero } from "@/components/home/FounderWorldHero";
import { CurrentBuildSection } from "@/components/home/CurrentBuildSection";
import { ProductWorld } from "@/components/home/ProductWorld";
import { HowIThink } from "@/components/home/HowIThink";
import { CapabilityOverlap } from "@/components/home/CapabilityOverlap";
import { ShippedArchive } from "@/components/home/ShippedArchive";
import { BuildLogPreview } from "@/components/home/BuildLogPreview";
import { FutureSection } from "@/components/home/FutureSection";
import { alternateLanguages, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}`,
      languages: alternateLanguages(""),
    },
  };
}

export default function HomePage() {
  return (
    <>
      <FounderWorldHero />
      <CurrentBuildSection />
      <ProductWorld />
      <HowIThink />
      <CapabilityOverlap />
      <ShippedArchive />
      <BuildLogPreview />
      <FutureSection />
    </>
  );
}
