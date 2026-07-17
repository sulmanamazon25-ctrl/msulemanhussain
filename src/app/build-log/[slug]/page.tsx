import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLog, getBuildLogPost } from "@/content/build-log";
import { readingTime } from "@/lib/utils";
import { site } from "@/content/site";

export function generateStaticParams() {
  return buildLog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBuildLogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BuildLogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBuildLogPost(slug);
  if (!post) notFound();
  const mins = readingTime(post.body);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Link href="/build-log" className="text-sm text-bone-dim hover:text-phosphor">
        ← Build Log
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
