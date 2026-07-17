import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { founderTimeline } from "@/content/timeline";
import { nextUp } from "@/content/next-up";
import { buildingNow } from "@/content/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Suleman Hussain is, how he thinks, what he has shipped, what he is focused on now, and what comes next.",
};

export default function AboutPage() {
  const now = buildingNow();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-signal">ABOUT</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Who I am</h1>
      <p className="mt-6 text-lg leading-relaxed text-bone-dim">
        I&apos;m {site.name} — a multidisciplinary founder and product builder. I am not presenting a finished career.
        I am actively building.
      </p>

      <h2 className="mt-14 font-display text-2xl font-semibold text-phosphor">What I build</h2>
      <p className="mt-3 text-bone-dim">
        SaaS products, AI systems, software, web applications, automation, growth systems, and digital businesses —
        across the full journey from problem to users.
      </p>

      <h2 className="mt-14 font-display text-2xl font-semibold text-cobalt">How I think</h2>
      <ul className="mt-4 space-y-3 text-bone-dim">
        <li className="border-l-2 border-signal pl-4">Build fast.</li>
        <li className="border-l-2 border-phosphor pl-4">Solve real problems.</li>
        <li className="border-l-2 border-cobalt pl-4">Automate what should not be manual.</li>
        <li className="border-l-2 border-amber pl-4">Learn by shipping.</li>
      </ul>

      <h2 className="mt-14 font-display text-2xl font-semibold">Evolution</h2>
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

      <h2 className="mt-14 font-display text-2xl font-semibold">What I have shipped</h2>
      <ul className="mt-4 space-y-3">
        {products.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-baseline gap-2 border-b border-white/10 pb-3">
            <Link href={`/products/${p.slug}`} className="font-medium hover:text-phosphor">
              {p.name}
            </Link>
            <span className="text-xs text-bone-faint">{p.status}</span>
            <span className="w-full text-sm text-bone-dim">{p.tagline}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-2xl font-semibold text-signal">Focused on now</h2>
      <ul className="mt-4 space-y-2 text-bone-dim">
        {now.map((p) => (
          <li key={p.slug}>
            <Link href={`/products/${p.slug}`} className="hover:text-phosphor">
              {p.name}
            </Link>
            {" — "}
            {p.happeningNow}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-2xl font-semibold text-amber">What I want to build next</h2>
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

      <Link href="/contact" className="mt-14 inline-block bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot">
        Let&apos;s build
      </Link>
    </div>
  );
}
