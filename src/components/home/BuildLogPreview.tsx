import Link from "next/link";
import { buildLog } from "@/content/build-log";

export function BuildLogPreview() {
  return (
    <section className="border-t border-white/5 px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-signal">BUILD LOG</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Shipping notes from inside the workshop.
            </h2>
          </div>
          <Link href="/build-log" className="text-sm text-signal hover:underline">
            Open build log →
          </Link>
        </div>
        <ul className="mt-10 divide-y divide-white/10">
          {buildLog.map((post) => (
            <li key={post.slug} className="grid gap-2 py-6 md:grid-cols-[7rem_1fr]">
              <p className="font-mono text-[10px] tracking-wider text-bone-faint">
                {post.category}
                <br />
                {post.date}
              </p>
              <div>
                <Link href={`/build-log/${post.slug}`} className="font-display text-xl font-semibold hover:text-phosphor">
                  {post.title}
                </Link>
                <p className="mt-2 max-w-2xl text-sm text-bone-dim">{post.excerpt}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-bone-faint">
          Longer thinking lives in{" "}
          <Link href="/insights" className="text-amber hover:underline">
            Insights
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
