import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { toolCategories, toolPlaceholders, tools, toolCopy } from "@/content/tools";
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
    title: dict.tools.pageTitle,
    description: dict.tools.pageDescription,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/tools`,
      languages: alternateLanguages("/tools"),
    },
    openGraph: {
      title: dict.tools.title,
      description: dict.tools.pageDescription,
      url: `https://msulemanhussain.com/${locale}/tools`,
    },
  };
}

export default async function ToolsPillarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);
  const loc = locale === "es" ? "es" : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.tools.title,
    description: dict.tools.pageDescription,
    url: `${site.url}/${locale}/tools`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/${locale}/tools/${t.slug}`,
        name: toolCopy(t, loc).name,
      })),
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden px-4 pb-16 pt-14 md:px-6 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-signal/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-cobalt/15 blur-[90px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.tools.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">{dict.tools.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim md:text-lg">{dict.tools.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#categories" className="rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink hover:bg-signal-hot">
              {dict.tools.exploreCta}
            </a>
            <Link
              href={lp("/expertise/spain-money-guides")}
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {locale === "es" ? "Guías salario / IRPF / finiquito" : "Spain salary / IRPF / finiquito guides"}
            </Link>
            <Link
              href={lp("/about")}
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {dict.tools.aboutCta}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-2.5 sm:gap-3">
            {toolCategories.map((c) => (
              <a
                key={c.id}
                href={`#cat-${c.id}`}
                className="rounded-full border border-white/20 bg-ink-3/80 px-3.5 py-2 font-mono text-[11px] tracking-wide text-bone-dim transition hover:border-phosphor/50 hover:bg-forest/50 hover:text-phosphor"
              >
                {c[loc].name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 border-t border-white/5 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl space-y-16">
          {toolCategories.map((cat) => {
            const items = tools.filter((t) => t.category === cat.id);
            const placeholders = toolPlaceholders.filter((p) => p.category === cat.id);
            if (items.length === 0 && placeholders.length === 0) return null;
            return (
              <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-28">
                <h2 className="font-display text-3xl font-bold md:text-4xl">{cat[loc].name}</h2>
                <p className="mt-2 max-w-xl text-bone-dim">{cat[loc].blurb}</p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {items.map((tool) => {
                    const copy = toolCopy(tool, loc);
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={lp(`/tools/${tool.slug}`)}
                          className="group flex h-full flex-col rounded-xl border border-white/10 bg-ink-3/60 p-5 transition hover:-translate-y-0.5 hover:border-phosphor/35"
                          style={{ boxShadow: `inset 3px 0 0 ${tool.accent}` }}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="border border-phosphor/40 px-2 py-0.5 font-mono text-[9px] tracking-wider text-phosphor">
                              FREE
                            </span>
                            <span className="border border-white/10 px-2 py-0.5 font-mono text-[9px] tracking-wider text-bone-faint">
                              {dict.tools.privacyLocal}
                            </span>
                          </div>
                          <h3 className="mt-4 font-display text-xl font-semibold group-hover:text-phosphor">
                            {copy.name}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-bone-dim">{copy.benefit}</p>
                          <p className="mt-4 text-sm font-medium" style={{ color: tool.accent }}>
                            {dict.tools.openTool} →
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                  {placeholders.map((ph) => {
                    const copy = ph[loc];
                    return (
                      <li key={ph.id}>
                        <div
                          className="flex h-full flex-col border border-dashed border-white/15 bg-ink-3/40 p-5 opacity-90"
                          style={{ boxShadow: `inset 3px 0 0 ${ph.accent}` }}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="border border-amber/40 px-2 py-0.5 font-mono text-[9px] tracking-wider text-amber">
                              {copy.status}
                            </span>
                          </div>
                          <h3 className="mt-4 font-display text-xl font-semibold text-bone">{copy.name}</h3>
                          <p className="mt-2 flex-1 text-sm text-bone-dim">{copy.benefit}</p>
                          <p className="mt-4 text-sm text-bone-faint">{dict.tools.placeholderHint}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-sm text-bone-faint">
                  {dict.tools.relatedProduct}{" "}
                  <a
                    href={cat.productUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-phosphor hover:underline"
                  >
                    {cat.productLabel} →
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-2/40 px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">{dict.tools.howTitle}</h2>
            <p className="mt-3 text-bone-dim">{dict.tools.howBody}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{dict.tools.whyTitle}</h2>
            <p className="mt-3 text-bone-dim">{dict.tools.whyBody}</p>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-4">
          <Link href={lp("/expertise")} className="text-sm text-phosphor hover:underline">
            {dict.tools.expertiseLink}
          </Link>
          <Link href={lp("/products")} className="text-sm text-phosphor hover:underline">
            {dict.tools.productsLink}
          </Link>
          <Link href={lp("/vs")} className="text-sm text-phosphor hover:underline">
            {dict.tools.vsLink}
          </Link>
          <a href={`mailto:${site.emails.support}`} className="text-sm text-phosphor hover:underline">
            {locale === "es" ? "Soporte" : "Support"}: {site.emails.support}
          </a>
        </div>
      </section>
    </div>
  );
}
