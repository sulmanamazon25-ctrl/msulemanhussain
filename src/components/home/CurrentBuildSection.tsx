"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildingNow, statusClass } from "@/content/products";
import { cn } from "@/lib/utils";

export function CurrentBuildSection() {
  const items = buildingNow();

  return (
    <section id="now" className="scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-signal">RIGHT NOW</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          I&apos;m building…
        </h2>
        <p className="mt-4 max-w-xl text-bone-dim">
          A live snapshot of the workshop — not a finished brochure.
        </p>

        <div className="mt-14 space-y-0">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/products/${p.slug}`}
                className="group grid gap-4 border-t border-white/10 py-8 transition md:grid-cols-[140px_1fr_200px] md:items-start"
              >
                <div className="flex items-center gap-2 md:block">
                  <span className={cn("border px-2 py-0.5 text-[10px] tracking-wider", statusClass(p.status))}>
                    {p.status}
                  </span>
                  <p className="mt-0 text-xs text-bone-faint md:mt-3">{p.category}</p>
                </div>
                <div>
                  <h3
                    className="font-display text-2xl font-semibold transition group-hover:translate-x-1 md:text-3xl"
                    style={{ color: p.accent }}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-bone-dim">{p.tagline}</p>
                  <p className="mt-3 text-sm text-bone-faint">
                    <span className="text-phosphor">Now: </span>
                    {p.happeningNow}
                  </p>
                </div>
                <p className="text-sm text-bone-faint md:text-right md:pt-2">Enter product →</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
