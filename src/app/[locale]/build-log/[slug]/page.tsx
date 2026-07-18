import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLog, getBuildLogPost } from "@/content/build-log";
import { readingTime } from "@/lib/utils";
import { site } from "@/content/site";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return buildLog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const post = getBuildLogPost(slug);
  if (!post || !isLocale(raw)) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://msulemanhussain.com/${raw}/build-log/${slug}`,
      languages: alternateLanguages(`/build-log/${slug}`),
    },
  };
}

export default async function BuildLogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const post = getBuildLogPost(slug);
  if (!post) notFound();
  const mins = readingTime(post.body);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Link href={localePath(locale, "/build-log")} className="text-sm text-bone-dim hover:text-phosphor">
        {dict.buildLog.back}
      </Link>
      <p className="mt-6 text-[10px] tracking-widest text-cobalt">
        {post.category} · {post.date} · {mins} min read
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">{post.title}</h1>
      <p className="mt-3 text-sm text-bone-faint">By {site.name}</p>
      <div className="prose-foundry mt-10 space-y-4 text-base leading-relaxed text-bone-dim">
        {post.body.split("\n\n").map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
    </article>
  );
}
