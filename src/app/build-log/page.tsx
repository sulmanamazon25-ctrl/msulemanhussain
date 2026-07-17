import type { Metadata } from "next";
import Link from "next/link";
import { buildLog } from "@/content/build-log";

export const metadata: Metadata = {
  title: "Build Log",
  description:
    "Shipping notes from inside the workshop — AI pipelines, product decisions, infrastructure, experiments, and lessons.",
};

export default function BuildLogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-cobalt">BUILD LOG</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Shipping in public</h1>
      <p className="mt-4 text-bone-dim">
        Not a generic blog. Notes from the workshop — building, failing, shipping, learning.
      </p>
      <ul className="mt-10 divide-y divide-white/10">
        {buildLog.map((post) => (
          <li key={post.slug} className="py-8">
            <p className="font-mono text-[10px] tracking-wider text-phosphor">
              {post.category} · {post.date}
            </p>
            <Link
              href={`/build-log/${post.slug}`}
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
