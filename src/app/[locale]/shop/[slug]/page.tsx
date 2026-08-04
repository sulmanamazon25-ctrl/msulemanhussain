import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/shop/BuyButton";
import { site } from "@/content/site";
import type { DigitalProduct } from "@/db/schema";
import { getDigitalProductBySlug } from "@/lib/shop/catalog";
import { formatEur } from "@/lib/shop/utils";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  try {
    const product = await getDigitalProductBySlug(slug);
    if (!product || product.status !== "live") return {};
    const title = product.seoTitle || product.title;
    const description = product.seoDescription || product.shortDescription;
    return {
      title,
      description,
      alternates: {
        canonical: `${site.url}/${locale}/shop/${slug}`,
        languages: alternateLanguages(`/shop/${slug}`),
      },
      openGraph: {
        title,
        description,
        images: product.coverImagePath
          ? [{ url: `${site.url}/api/media/cover/${product.id}` }]
          : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  let product: DigitalProduct | null = null;
  try {
    product = await getDigitalProductBySlug(slug);
  } catch {
    product = null;
  }
  if (!product || product.status !== "live") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: (product.currency || "eur").toUpperCase(),
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${site.url}/${locale}/shop/${product.slug}`,
    },
  };

  return (
    <div className="pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Link href={lp("/shop")} className="text-sm text-phosphor hover:underline">
          {dict.shop.back}
        </Link>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">{product.title}</h1>
        <p className="mt-4 text-lg text-bone-dim">{product.shortDescription}</p>
        {product.coverImagePath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/media/cover/${product.id}`}
            alt=""
            className="mt-8 aspect-[16/9] w-full object-cover"
          />
        ) : null}
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <p className="font-display text-3xl text-phosphor">
            {formatEur(product.priceCents, product.currency)}
          </p>
          <BuyButton kind="digital" slug={product.slug} locale={locale} label={dict.shop.buy} />
        </div>
        <div className="prose-invert mt-10 whitespace-pre-wrap text-bone-dim">{product.longDescription}</div>
        {product.tags ? (
          <p className="mt-8 text-xs tracking-[0.16em] text-bone-faint">{product.tags}</p>
        ) : null}
      </div>
    </div>
  );
}
