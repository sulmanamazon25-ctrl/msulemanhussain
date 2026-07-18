import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/content/insights";
import { readingTime } from "@/lib/utils";
import { site } from "@/content/site";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const post = getInsight(slug);
  if (!post || !isLocale(raw)) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://msulemanhussain.com/${raw}/insights/${slug}`,
      languages: alternateLanguages(`/insights/${slug}`),
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);
  const post = getInsight(slug);
  if (!post) notFound();
  const mins = readingTime(post.body);
  const related = insights.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Link href={lp("/insights")} className="text-sm text-bone-dim hover:text-amber">
        {dict.insights.back}
      </Link>
      <p className="mt-6 text-[10px] tracking-widest text-amber">
        {post.category} · {post.date} · {mins} min read
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">{post.title}</h1>
      <p className="mt-3 text-sm text-bone-faint">By {site.name}</p>
      <div className="mt-10 space-y-4 text-base leading-relaxed text-bone-dim">
        {post.body.split("\n\n").map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
      <aside className="mt-14 border-t border-white/10 pt-8">
        <p className="text-xs tracking-widest text-bone-faint">{dict.insights.related}</p>
        <ul className="mt-4 space-y-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={lp(`/insights/${r.slug}`)} className="hover:text-amber">
                {r.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href={lp("/products")} className="text-phosphor hover:underline">
              {dict.insights.explore}
            </Link>
          </li>
        </ul>
      </aside>
    </article>
  );
}
