import type { Metadata } from "next";
import Link from "next/link";
import { buildLog } from "@/content/build-log";
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
    title: dict.buildLog.pageTitle,
    description: dict.buildLog.pageBlurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/build-log`,
      languages: alternateLanguages("/build-log"),
    },
  };
}

export default async function BuildLogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-cobalt">{dict.buildLog.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.buildLog.pageTitle}</h1>
      <p className="mt-4 text-bone-dim">{dict.buildLog.pageBlurb}</p>
      <ul className="mt-10 divide-y divide-white/10">
        {buildLog.map((post) => (
          <li key={post.slug} className="py-8">
            <p className="font-mono text-[10px] tracking-wider text-phosphor">
              {post.category} · {post.date}
            </p>
            <Link
              href={lp(`/build-log/${post.slug}`)}
              className="mt-2 block font-display text-2xl font-semibold hover:text-phosphor"
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
