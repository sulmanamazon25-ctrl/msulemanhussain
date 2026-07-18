import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/content/insights";
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
    title: dict.insights.title,
    description: dict.insights.blurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/insights`,
      languages: alternateLanguages("/insights"),
    },
  };
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber">{dict.insights.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.insights.title}</h1>
      <p className="mt-4 text-bone-dim">
        {dict.insights.blurb}{" "}
        <Link href={lp("/build-log")} className="text-phosphor hover:underline">
          {dict.insights.buildLog}
        </Link>
        .
      </p>
      <ul className="mt-10 divide-y divide-white/10">
        {insights.map((post) => (
          <li key={post.slug} className="py-8">
            <p className="font-mono text-[10px] tracking-wider text-amber">
              {post.category} · {post.date}
            </p>
            <Link
              href={lp(`/insights/${post.slug}`)}
              className="mt-2 block font-display text-2xl font-semibold hover:text-amber"
            >
              {post.title}
            </Link>
            <p className="mt-3 text-sm text-bone-dim">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
