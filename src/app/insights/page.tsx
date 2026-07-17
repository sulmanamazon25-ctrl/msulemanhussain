import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Founder thinking on SaaS, AI, development, SEO, automation, digital business — editorial and searchable.",
};

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber">INSIGHTS</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Thinking, structured</h1>
      <p className="mt-4 text-bone-dim">
        Longer-form founder thinking. For shipping notes, see the{" "}
        <Link href="/build-log" className="text-phosphor hover:underline">
          Build Log
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
              href={`/insights/${post.slug}`}
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
