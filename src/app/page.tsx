import type { Metadata } from "next";
import { FounderWorldHero } from "@/components/home/FounderWorldHero";
import { CurrentBuildSection } from "@/components/home/CurrentBuildSection";
import { ProductWorld } from "@/components/home/ProductWorld";
import { HowIThink } from "@/components/home/HowIThink";
import { CapabilityOverlap } from "@/components/home/CapabilityOverlap";
import { ShippedArchive } from "@/components/home/ShippedArchive";
import { BuildLogPreview } from "@/components/home/BuildLogPreview";
import { FutureSection } from "@/components/home/FutureSection";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Founder World",
  description: site.description,
  alternates: { canonical: site.url },
};

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
