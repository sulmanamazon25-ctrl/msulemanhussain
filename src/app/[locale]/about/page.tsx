import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { products, buildingNow } from "@/content/products";
import { founderTimeline } from "@/content/timeline";
import { nextUp } from "@/content/next-up";
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
    title: dict.about.title,
    description: dict.about.who,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/about`,
      languages: alternateLanguages("/about"),
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const now = buildingNow();
  const lp = (path: string) => localePath(locale, path);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-signal">{dict.about.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{dict.about.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-bone-dim">{dict.about.who}</p>

      <h2 className="mt-14 font-display text-2xl font-semibold text-phosphor">{dict.about.whatTitle}</h2>
      <p className="mt-3 text-bone-dim">{dict.about.what}</p>

      <h2 className="mt-14 font-display text-2xl font-semibold text-cobalt">{dict.about.thinkTitle}</h2>
      <ul className="mt-4 space-y-3 text-bone-dim">
        <li className="border-l-2 border-signal pl-4">{dict.about.p1}</li>
        <li className="border-l-2 border-phosphor pl-4">{dict.about.p2}</li>
        <li className="border-l-2 border-cobalt pl-4">{dict.about.p3}</li>
        <li className="border-l-2 border-amber pl-4">{dict.about.p4}</li>
      </ul>

      <h2 className="mt-14 font-display text-2xl font-semibold">{dict.about.evolution}</h2>
      <ol className="mt-6 space-y-8">
        {founderTimeline.map((event) => (
          <li key={event.year} className="grid gap-2 md:grid-cols-[7rem_1fr]">
            <p className="font-mono text-xs tracking-wider text-bone-faint">{event.year}</p>
            <div>
              <p className="font-display text-lg font-semibold">{event.title}</p>
              <p className="mt-1 text-sm text-bone-dim">{event.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-2xl font-semibold">{dict.about.shipped}</h2>
      <ul className="mt-4 space-y-3">
        {products.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-baseline gap-2 border-b border-white/10 pb-3">
            <Link href={lp(`/products/${p.slug}`)} className="font-medium hover:text-phosphor">
              {p.name}
            </Link>
            <span className="text-xs text-bone-faint">{p.status}</span>
            <span className="w-full text-sm text-bone-dim">{p.tagline}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-2xl font-semibold text-signal">{dict.about.focused}</h2>
      <ul className="mt-4 space-y-2 text-bone-dim">
        {now.map((p) => (
          <li key={p.slug}>
            <Link href={lp(`/products/${p.slug}`)} className="hover:text-phosphor">
              {p.name}
            </Link>
            {" — "}
            {p.happeningNow}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-2xl font-semibold text-amber">{dict.about.next}</h2>
      <ul className="mt-4 space-y-4">
        {nextUp.map((item) => (
          <li key={item.title} className="border-l-2 pl-4" style={{ borderColor: item.accent }}>
            <p className="font-semibold" style={{ color: item.accent }}>
              {item.title}
            </p>
            <p className="text-sm text-bone-dim">{item.note}</p>
          </li>
        ))}
      </ul>

      <Link href={lp("/contact")} className="mt-14 inline-block bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot">
        {dict.about.cta}
      </Link>
    </div>
  );
}
