import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { comparisonCopy, listComparisons } from "@/lib/comparisons";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
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
    title: dict.vs.pageTitle,
    description: dict.vs.pageDescription,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/vs`,
      languages: alternateLanguages("/vs"),
    },
    openGraph: {
      title: dict.vs.title,
      description: dict.vs.pageDescription,
      url: `https://msulemanhussain.com/${locale}/vs`,
    },
  };
}

export default async function VsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);
  const loc = locale === "es" ? "es" : "en";
  const items = listComparisons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.vs.title,
    description: dict.vs.pageDescription,
    url: `${site.url}/${locale}/vs`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/${locale}/vs/${c.slug}`,
        name: comparisonCopy(c, loc).h1,
      })),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden px-4 pb-16 pt-14 md:px-6 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-signal/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-cobalt/15 blur-[90px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.vs.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">{dict.vs.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim md:text-lg">{dict.vs.intro}</p>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {items.map((doc) => {
            const copy = comparisonCopy(doc, loc);
            return (
              <Link
                key={doc.slug}
                href={lp(`/vs/${doc.slug}`)}
                className="group border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-bone-dim">
                  {doc.our.name} VS {doc.competitor.name}
                </p>
                <h2 className="mt-3 font-display text-xl font-bold group-hover:text-phosphor md:text-2xl">
                  {copy.h1}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim line-clamp-3">{copy.intro}</p>
                <p className="mt-5 text-sm font-semibold" style={{ color: doc.accent }}>
                  {dict.vs.readComparison} →
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
