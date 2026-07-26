import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonFaq } from "@/components/vs/ComparisonFaq";
import { ComparisonTable } from "@/components/vs/ComparisonTable";
import { CompetitorSnapshot } from "@/components/vs/CompetitorSnapshot";
import { RoiCalculator } from "@/components/vs/RoiCalculator";
import { site } from "@/content/site";
import {
  comparisonCopy,
  getAllComparisonSlugs,
  getComparison,
} from "@/lib/comparisons";
import { toolForComparison } from "@/content/growth-links";
import { getTool, toolCopy } from "@/content/tools";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const doc = getComparison(slug);
  if (!doc) return {};
  const locale = raw as Locale;
  const copy = comparisonCopy(doc, locale === "es" ? "es" : "en");
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/vs/${slug}`,
      languages: alternateLanguages(`/vs/${slug}`),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `https://msulemanhussain.com/${locale}/vs/${slug}`,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const doc = getComparison(slug);
  if (!doc) notFound();
  const loc = locale === "es" ? "es" : "en";
  const copy = comparisonCopy(doc, loc);
  const lp = (path: string) => localePath(locale, path);
  const relatedToolRef = toolForComparison(doc.slug);
  const relatedTool = relatedToolRef ? getTool(relatedToolRef.toolSlug) : undefined;
  const relatedToolName = relatedTool ? toolCopy(relatedTool, loc).name : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: doc.our.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows",
        url: doc.our.liveUrl ?? `${site.url}/${locale}/products/${doc.ourProductSlug}`,
        description: copy.intro,
        inLanguage: ["en", "es"],
        author: { "@type": "Person", name: site.name, url: site.url },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.vs.title,
            item: `${site.url}/${locale}/vs`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${doc.our.name} vs ${doc.competitor.name}`,
            item: `${site.url}/${locale}/vs/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden px-4 pb-14 pt-12 md:px-6 md:pb-16 md:pt-16">
        <div
          className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full blur-[90px] opacity-40"
          style={{ backgroundColor: doc.accent }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href={lp("/vs")}
            className="font-mono text-[11px] tracking-[0.2em] text-bone-dim hover:text-phosphor"
          >
            ← {dict.vs.title}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {doc.our.logo ? (
              <Image src={doc.our.logo} alt="" width={40} height={40} className="h-10 w-10" />
            ) : null}
            <p className="font-mono text-[11px] tracking-[0.22em] text-bone-dim">
              {doc.our.name} VS {doc.competitor.name}
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">{copy.h1}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim md:text-lg">{copy.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {copy.heroBadges.map((b) => (
              <span
                key={b}
                className="border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-bone"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={copy.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-sm font-semibold text-ink"
              style={{ backgroundColor: doc.accent }}
            >
              {copy.cta.buttonLabel}
            </a>
            <Link
              href={lp(`/products/${doc.ourProductSlug}`)}
              className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {dict.vs.builtBy} {doc.our.name}
            </Link>
            {relatedTool && relatedToolName ? (
              <Link
                href={lp(`/tools/${relatedTool.slug}`)}
                className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
              >
                {dict.vs.relatedTool}: {relatedToolName}
              </Link>
            ) : null}
          </div>
          {copy.cta.badge ? (
            <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-phosphor">{copy.cta.badge}</p>
          ) : null}
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{dict.vs.atAGlance}</h2>
          <div className="mt-8">
            <CompetitorSnapshot
              our={doc.our}
              competitor={doc.competitor}
              ourMeta={copy.ourMeta}
              competitorMeta={copy.competitorMeta}
              accent={doc.accent}
              labels={{
                forWhom: dict.vs.forWhom,
                pricing: dict.vs.pricing,
                pros: dict.vs.pros,
                cons: dict.vs.cons,
              }}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{dict.vs.matrixTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim md:text-base">{copy.whySwitch}</p>
          <div className="mt-8">
            <ComparisonTable
              categories={copy.categories}
              ourName={doc.our.name}
              competitorName={doc.competitor.name}
              accent={doc.accent}
              featureLabel={dict.vs.featureColumn}
              yesLabel={dict.vs.yes}
              noLabel={dict.vs.no}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{dict.vs.roiTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim">{dict.vs.roiBlurb}</p>
          <div className="mt-8">
            <RoiCalculator
              roi={copy.roi}
              ourName={doc.our.name}
              competitorName={doc.competitor.name}
              accent={doc.accent}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <ComparisonFaq items={copy.faq} title={dict.vs.faqTitle} />
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 md:px-6 pb-28">
        <div className="mx-auto max-w-6xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.cta.heading}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={copy.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-sm font-semibold text-ink"
              style={{ backgroundColor: doc.accent }}
            >
              {copy.cta.buttonLabel}
            </a>
            <Link
              href={lp(`/products/${doc.ourProductSlug}`)}
              className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {dict.vs.portfolioLink}
            </Link>
            {relatedTool && relatedToolName ? (
              <Link
                href={lp(`/tools/${relatedTool.slug}`)}
                className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
              >
                {relatedToolName} →
              </Link>
            ) : (
              <Link
                href={lp("/tools")}
                className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
              >
                {dict.tools.title} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-bone-dim">
            <span className="font-semibold text-bone">{doc.our.name}</span>
            {" — "}
            {copy.cta.badge ?? copy.cta.heading}
          </p>
          <a
            href={copy.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-semibold text-ink"
            style={{ backgroundColor: doc.accent }}
          >
            {copy.cta.buttonLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
