import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonFaq } from "@/components/vs/ComparisonFaq";
import { aiCallingAgents, aiCallingAgentsCopy } from "@/content/ai-calling-agents";
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
  const copy = aiCallingAgentsCopy(locale === "es" ? "es" : "en");
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/expertise/ai-calling-agents`,
      languages: alternateLanguages("/expertise/ai-calling-agents"),
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `https://msulemanhussain.com/${locale}/expertise/ai-calling-agents`,
    },
  };
}

export default async function AiCallingAgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const loc = locale === "es" ? "es" : "en";
  const copy = aiCallingAgentsCopy(loc);
  const lp = (path: string) => localePath(locale, path);
  const accent = aiCallingAgents.accent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "AI Calling Agent Development",
        name: copy.hero.h1,
        description: copy.meta.description,
        url: `${site.url}/${locale}/expertise/ai-calling-agents`,
        provider: { "@type": "Person", name: site.name, url: site.url },
        areaServed: "Worldwide",
        availableLanguage: ["en", "es"],
        offers: copy.pricing.tiers.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          price: tier.price.replace(/[^0-9.]/g, "") || undefined,
          priceCurrency: tier.price.startsWith("$") ? "USD" : undefined,
          description: tier.description,
        })),
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
            item: `${site.url}/${locale}/expertise/ai-calling-agents`,
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
          style={{ backgroundColor: accent }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href={lp("/expertise")}
            className="font-mono text-[11px] tracking-[0.2em] text-bone-dim hover:text-phosphor"
          >
            ← {dict.expertise.eyebrow}
          </Link>
          <p className="mt-5 font-mono text-[11px] tracking-[0.22em] text-bone-dim">{copy.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">{copy.hero.h1}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim md:text-lg">{copy.hero.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {copy.hero.badges.map((b) => (
              <span
                key={b}
                className="border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-bone"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={lp("/contact")}
              className="px-5 py-3 text-sm font-semibold text-ink"
              style={{ backgroundColor: accent }}
            >
              {copy.cta.buttonLabel}
            </Link>
            <Link
              href={lp("/projects")}
              className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {loc === "es" ? "Ver Voice Agent Lab" : "See Voice Agent Lab"} →
            </Link>
          </div>
          <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-phosphor">{copy.cta.badge}</p>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.what.heading}</h2>
          <div className="mt-6 space-y-4">
            {copy.what.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-bone-dim">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.why.heading}</h2>
          <div className="mt-6 space-y-4">
            {copy.why.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-bone-dim">
                {p}
              </p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {copy.why.bullets.map((b) => (
              <li
                key={b}
                className="border border-white/10 bg-ink-3 px-4 py-4 text-sm text-bone"
                style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.how.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim md:text-base">{copy.how.intro}</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.how.steps.map((step, i) => (
              <li key={step.title} className="border border-white/10 bg-ink-3/50 p-5">
                <span
                  className="font-mono text-xs tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-bone">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.pricing.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim md:text-base">{copy.pricing.intro}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {copy.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col border p-6 ${
                  tier.highlighted ? "border-2 bg-white/[0.03]" : "border-white/10 bg-ink-3/50"
                }`}
                style={tier.highlighted ? { borderColor: accent } : undefined}
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-bone-faint">{tier.name}</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-bone">{tier.price}</span>
                  <span className="text-xs text-bone-dim">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm text-bone-dim">{tier.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-bone-dim">
                      <span style={{ color: accent }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={lp("/contact")}
                  className="mt-6 border border-white/20 px-4 py-2.5 text-center text-sm font-semibold hover:border-phosphor hover:text-phosphor"
                >
                  {copy.cta.buttonLabel}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-bone-faint">{copy.pricing.disclaimer}</p>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.useCases.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim md:text-base">{copy.useCases.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.useCases.items.map((item) => (
              <div key={item.title} className="border border-white/10 bg-ink-3/50 p-5">
                <h3 className="font-display text-base font-semibold text-bone">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.whyUs.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim md:text-base">{copy.whyUs.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.whyUs.reasons.map((reason) => (
              <div
                key={reason.title}
                className="border border-white/10 bg-ink-3 p-5"
                style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
              >
                <h3 className="font-display text-base font-semibold text-bone">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-4xl">
          <ComparisonFaq items={copy.faq} title={dict.tools.faq} />
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{copy.cta.heading}</h2>
          <p className="mt-4 max-w-2xl text-sm text-bone-dim md:text-base">{copy.cta.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={lp("/contact")}
              className="px-5 py-3 text-sm font-semibold text-ink"
              style={{ backgroundColor: accent }}
            >
              {copy.cta.buttonLabel}
            </Link>
            <Link
              href={lp("/expertise")}
              className="border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
            >
              {dict.expertise.eyebrow} →
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-bone-dim">
            <span className="font-semibold text-bone">{copy.card.title}</span>
            {" — "}
            {copy.cta.badge}
          </p>
          <Link
            href={lp("/contact")}
            className="px-5 py-2.5 text-sm font-semibold text-ink"
            style={{ backgroundColor: accent }}
          >
            {copy.cta.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
