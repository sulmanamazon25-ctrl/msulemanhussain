import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolInteractive } from "@/components/tools/ToolInteractive";
import { comparisonForTool } from "@/content/growth-links";
import { site } from "@/content/site";
import { getTool, toolCopy, tools } from "@/content/tools";
import { getComparison, comparisonCopy } from "@/lib/comparisons";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const tool = getTool(slug);
  if (!tool) return {};
  const locale = raw as Locale;
  const copy = toolCopy(tool, locale === "es" ? "es" : "en");
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/tools/${slug}`,
      languages: alternateLanguages(`/tools/${slug}`),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `https://msulemanhussain.com/${locale}/tools/${slug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const tool = getTool(slug);
  if (!tool) notFound();
  const loc = locale === "es" ? "es" : "en";
  const copy = toolCopy(tool, loc);
  const lp = (path: string) => localePath(locale, path);
  const related = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug);
  const relatedCmp = comparisonForTool(tool.slug);
  const relatedCmpDoc = relatedCmp ? getComparison(relatedCmp.comparisonSlug) : undefined;
  const relatedCmpCopy = relatedCmpDoc ? comparisonCopy(relatedCmpDoc, loc) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: copy.name,
        description: copy.description,
        url: `${site.url}/${locale}/tools/${slug}`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@type": "Person", name: site.name, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.tools.title,
            item: `${site.url}/${locale}/tools`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.name,
            item: `${site.url}/${locale}/tools/${slug}`,
          },
        ],
      },
      ...(copy.faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: copy.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-bone-faint">
        <Link href={lp("/tools")} className="hover:text-phosphor">
          {dict.tools.back}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-bone-dim">{copy.name}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="border border-phosphor/40 px-2 py-0.5 font-mono text-[9px] tracking-wider text-phosphor">
          FREE
        </span>
        <span className="border border-white/10 px-2 py-0.5 font-mono text-[9px] tracking-wider text-bone-faint">
          {dict.tools.privacyLocal}
        </span>
      </div>
      <p className="mt-2 text-xs text-bone-faint">{dict.tools.privacyHint}</p>

      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">{copy.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-bone-dim">{copy.intro}</p>

      <div className="mt-10">
        <ToolInteractive slug={tool.slug} locale={loc} />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold">{dict.tools.howToUse}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-bone-dim">
          {copy.howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-phosphor">{dict.tools.whatDoes}</h2>
          <p className="mt-3 text-sm text-bone-dim">{copy.whatItDoes}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-amber">{dict.tools.whatDoesNot}</h2>
          <p className="mt-3 text-sm text-bone-dim">{copy.whatItDoesNot}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">{dict.tools.tips}</h2>
        <ul className="mt-3 space-y-2 text-sm text-bone-dim">
          {copy.tips.map((tip) => (
            <li key={tip} className="border-l-2 border-white/15 pl-3">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {copy.faq.length ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold">{dict.tools.faq}</h2>
          <dl className="mt-4 space-y-5">
            {copy.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-bone">{f.q}</dt>
                <dd className="mt-1 text-sm text-bone-dim">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="mt-12 border border-white/10 bg-ink-3/50 p-5">
        <p className="text-sm text-bone-dim">
          {dict.tools.relatedProduct}{" "}
          <a
            href={tool.relatedProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-phosphor hover:underline"
          >
            {tool.relatedProductLabel} ↗
          </a>
        </p>
        <p className="mt-3 text-sm text-bone-faint">
          <Link href={lp(`/products/${tool.relatedProductSlug}`)} className="hover:text-bone">
            {locale === "es" ? "Ver en el portfolio →" : "See in the portfolio →"}
          </Link>
        </p>
        {relatedCmpDoc && relatedCmpCopy ? (
          <p className="mt-3 text-sm text-bone-dim">
            {dict.tools.relatedComparison}{" "}
            <Link href={lp(`/vs/${relatedCmpDoc.slug}`)} className="font-medium text-phosphor hover:underline">
              {relatedCmpDoc.our.name} vs {relatedCmpDoc.competitor.name} →
            </Link>
          </p>
        ) : null}
        <p className="mt-3 text-sm text-bone-faint">
          <Link href={lp("/vs")} className="hover:text-bone">
            {dict.tools.vsLink}
          </Link>
        </p>
      </section>

      {related.length ? (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{dict.tools.relatedTools}</h2>
          <ul className="mt-4 space-y-3">
            {related.map((t) => (
              <li key={t.slug}>
                <Link href={lp(`/tools/${t.slug}`)} className="text-phosphor hover:underline">
                  {toolCopy(t, loc).name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
