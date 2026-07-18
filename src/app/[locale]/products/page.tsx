import type { Metadata } from "next";
import { ProductWorld } from "@/components/home/ProductWorld";
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
    title: dict.products.pageTitle,
    description: dict.products.pageBlurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/products`,
      languages: alternateLanguages("/products"),
    },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const dict = getDictionary(raw as Locale);

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-signal">{dict.nav.products}</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{dict.products.pageTitle}</h1>
        <p className="mt-4 max-w-2xl text-bone-dim">{dict.products.pageBlurb}</p>
      </div>
      <ProductWorld showHeading={false} />
    </div>
  );
}
