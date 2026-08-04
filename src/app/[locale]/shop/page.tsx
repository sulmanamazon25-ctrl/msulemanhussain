import type { Metadata } from "next";
import Link from "next/link";
import { listLiveDigitalProducts } from "@/lib/shop/catalog";
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
    title: dict.shop.pageTitle,
    description: dict.shop.pageBlurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/shop`,
      languages: alternateLanguages("/shop"),
    },
  };
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  let products: Awaited<ReturnType<typeof listLiveDigitalProducts>> = [];
  try {
    products = await listLiveDigitalProducts();
  } catch {
    products = [];
  }

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.nav.shop}</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.shop.pageTitle}</h1>
        <p className="mt-4 max-w-xl text-bone-dim">{dict.shop.pageBlurb}</p>
        <p className="mt-4 text-sm">
          <Link href={lp("/book")} className="text-phosphor hover:underline">
            {dict.shop.bookCta}
          </Link>
        </p>

        {products.length === 0 ? (
          <p className="mt-12 text-bone-dim">{dict.shop.empty}</p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <li key={p.id} className="border border-white/10 bg-ink-2/40">
                <Link href={lp(`/shop/${p.slug}`)} className="block p-5 hover:border-phosphor">
                  {p.coverImagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/media/cover/${p.id}`}
                      alt=""
                      className="mb-4 aspect-[16/10] w-full object-cover"
                    />
                  ) : null}
                  <h2 className="font-display text-2xl font-semibold">{p.title}</h2>
                  <p className="mt-2 text-sm text-bone-dim">{p.shortDescription}</p>
                  <p className="mt-4 text-phosphor">{formatEur(p.priceCents, p.currency)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
