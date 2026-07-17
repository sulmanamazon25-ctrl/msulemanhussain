"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { activeProducts } from "@/content/products";

export function FounderWorldHero() {
  const live = activeProducts().slice(0, 5);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-signal/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cobalt/15 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[11px] tracking-[0.28em] text-phosphor"
        >
          {site.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.98] text-bone md:text-7xl lg:text-8xl"
        >
          {site.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-6 max-w-xl text-lg text-bone-dim md:text-xl"
        >
          {site.support}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="#now"
            className="bg-signal px-6 py-3.5 text-sm font-semibold tracking-wide text-bone hover:bg-signal-hot"
          >
            Explore what I&apos;m building
          </Link>
          <Link
            href="#think"
            className="border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-wide text-bone hover:border-phosphor hover:text-phosphor"
          >
            See how I think
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:gap-8"
        >
          <p className="shrink-0 font-mono text-[10px] tracking-[0.24em] text-bone-faint">
            CURRENTLY BUILDING
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {live.map((p) => (
              <li key={p.slug} className="flex items-center gap-2 text-sm text-bone-dim">
                <span className="live-dot" style={{ background: p.accent }} />
                <Link href={`/products/${p.slug}`} className="hover:text-bone">
                  {p.name}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm text-bone-faint">
              <span className="live-dot" />
              New experiments
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
