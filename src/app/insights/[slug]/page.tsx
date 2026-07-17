import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/content/insights";
import { readingTime } from "@/lib/utils";
import { site } from "@/content/site";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();
  const mins = readingTime(post.body);
  const related = insights.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Link href="/insights" className="text-sm text-bone-dim hover:text-amber">
        ← Insights
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
        <p className="text-xs tracking-widest text-bone-faint">RELATED</p>
        <ul className="mt-4 space-y-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/insights/${r.slug}`} className="hover:text-amber">
                {r.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/products" className="text-phosphor hover:underline">
              Explore the Product Universe →
            </Link>
          </li>
        </ul>
      </aside>
    </article>
  );
}
