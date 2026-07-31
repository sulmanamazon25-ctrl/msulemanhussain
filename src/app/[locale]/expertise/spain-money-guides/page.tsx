import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonFaq } from "@/components/vs/ComparisonFaq";
import { spainMoneyGuides, spainMoneyGuidesCopy } from "@/content/spain-money-guides";
import { site } from "@/content/site";
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
  const copy = spainMoneyGuidesCopy(locale === "es" ? "es" : "en");
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/expertise/spain-money-guides`,
      languages: alternateLanguages("/expertise/spain-money-guides"),
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `https://msulemanhussain.com/${locale}/expertise/spain-money-guides`,
    },
  };
}

export default async function SpainMoneyGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const loc = locale === "es" ? "es" : "en";
  const copy = spainMoneyGuidesCopy(loc);
  const lp = (path: string) => localePath(locale, path);
  const accent = spainMoneyGuides.accent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: copy.hero.h1,
        description: copy.meta.description,
        url: `${site.url}/${locale}/expertise/spain-money-guides`,
        inLanguage: loc,
        isPartOf: { "@id": `${site.url}/#website` },
        author: { "@type": "Person", name: site.name, url: site.url },
      },
      {
        "@type": "ItemList",
        name: copy.card.title,
        itemListElement: copy.clusters.flatMap((c, ci) =>
          c.tools.map((t, ti) => ({
            "@type": "ListItem",
            position: ci * 10 + ti + 1,
            name: t.label,
            url: `${site.url}/${locale}/tools/${t.slug}`,
          })),
        ),
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
            name: dict.expertise.title,
            item: `${site.url}/${locale}/expertise`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.card.title,
            item: `${site.url}/${locale}/expertise/spain-money-guides`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden px-4 pb-14 pt-12 md:px-6 md:pb-16 md:pt-16">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full opacity-30 blur-[100px]" style={{ background: accent }} />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.28em]" style={{ color: accent }}>
            {copy.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight md:text-5xl">{copy.hero.h1}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-bone-dim md:text-lg">{copy.hero.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {copy.hero.badges.map((b) => (
              <span key={b} className="border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-wide text-bone-faint">
                {b}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#clusters" className="rounded-md px-5 py-3 text-sm font-semibold text-ink" style={{ backgroundColor: accent }}>
              {loc === "es" ? "Ver clusters →" : "See clusters →"}
            </a>
            <Link href={lp("/tools")} className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor">
              {copy.cta.toolsLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold">{copy.trust.heading}</h2>
          <p className="mt-4 text-sm leading-relaxed text-bone-dim md:text-base">{copy.trust.body}</p>
        </div>
      </section>

      <section id="clusters" className="scroll-mt-24 border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl space-y-14">
          {copy.clusters.map((cluster) => (
            <article key={cluster.id} id={cluster.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold md:text-3xl" style={{ color: accent }}>
                {cluster.heading}
              </h2>
              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
                    {loc === "es" ? "PROBLEMA REAL" : "REAL PROBLEM"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-dim md:text-base">{cluster.problem}</p>
                  <h3 className="mt-6 font-mono text-[10px] tracking-[0.2em] text-bone-faint">
                    {loc === "es" ? "CÓMO RESOLVERLO" : "HOW TO SOLVE IT"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-dim md:text-base">{cluster.solution}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-signal">
                    {loc === "es" ? "ERRORES FRECUENTES" : "COMMON MISTAKES"}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {cluster.mistakes.map((m) => (
                      <li key={m} className="border-l-2 border-white/20 pl-3 text-sm text-bone-dim">
                        {m}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-6 font-mono text-[10px] tracking-[0.2em] text-phosphor">
                    {loc === "es" ? "HERRAMIENTAS" : "TOOLS"}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {cluster.tools.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={lp(`/tools/${t.slug}`)}
                          className="block border border-white/10 bg-ink-3/60 p-4 transition hover:border-phosphor/40"
                        >
                          <span className="font-medium text-phosphor">{t.label} →</span>
                          <span className="mt-1 block text-xs text-bone-dim">{t.why}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.how.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim md:text-base">{copy.how.intro}</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.how.steps.map((step, i) => (
              <li key={step.title} className="border border-white/10 bg-ink-3 p-5" style={{ borderLeftColor: accent, borderLeftWidth: 3 }}>
                <p className="font-mono text-[10px] text-bone-faint">0{i + 1}</p>
                <h3 className="mt-2 font-display text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-bone-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-4xl">
          <ComparisonFaq items={copy.faq} title={dict.tools.faq} />
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.cta.heading}</h2>
          <p className="mt-4 max-w-2xl text-sm text-bone-dim md:text-base">{copy.cta.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={lp("/tools")} className="px-5 py-3 text-sm font-semibold text-ink" style={{ backgroundColor: accent }}>
              {copy.cta.toolsLabel}
            </Link>
            <Link
              href={lp("/contact")}
              className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {copy.cta.contactLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
