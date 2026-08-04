import type { Metadata } from "next";
import Link from "next/link";
import { BookPackages } from "@/components/shop/BookPackages";
import { listLiveSessionPackages } from "@/lib/shop/catalog";
import { formatEur } from "@/lib/shop/utils";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamic = "force-dynamic";

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
    title: dict.book.pageTitle,
    description: dict.book.pageBlurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/book`,
      languages: alternateLanguages("/book"),
    },
  };
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  let packages: Awaited<ReturnType<typeof listLiveSessionPackages>> = [];
  try {
    packages = await listLiveSessionPackages();
  } catch {
    packages = [];
  }

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.nav.book}</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.book.pageTitle}</h1>
        <p className="mt-4 max-w-2xl text-bone-dim">{dict.book.pageBlurb}</p>
        <p className="mt-4 text-sm text-bone-faint">{dict.book.how}</p>
        <p className="mt-4 text-sm">
          <Link href={lp("/shop")} className="text-phosphor hover:underline">
            {dict.book.shopCta}
          </Link>
        </p>

        {packages.length === 0 ? (
          <p className="mt-12 text-bone-dim">{dict.book.empty}</p>
        ) : (
          <BookPackages
            locale={locale}
            buyLabel={dict.book.buy}
            topicLabel={dict.book.topic}
            packages={packages.map((p) => ({
              slug: p.slug,
              name: p.name,
              blurb: p.blurb,
              durationMinutes: p.durationMinutes,
              priceLabel: formatEur(p.priceCents, p.currency),
            }))}
          />
        )}
      </div>
    </div>
  );
}
