"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { liveProducts } from "@/content/products";
import { useLocale } from "@/i18n/LocaleProvider";

export function FounderWorldHero() {
  const live = liveProducts();
  const [slide, setSlide] = useState(0);
  const { dict, href } = useLocale();

  useEffect(() => {
    if (live.length < 2) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % live.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [live.length]);

  const featured = live[slide] ?? live[0];

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-14 md:px-6 md:pb-28 md:pt-20">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-phosphor/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-forest/35 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy first — brand-led, one job */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] tracking-[0.28em] text-phosphor"
          >
            {dict.hero.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.05] text-bone text-balance md:text-6xl"
          >
            {dict.hero.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-md text-base leading-relaxed text-bone-dim md:text-lg"
          >
            {dict.hero.support}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href={href("/#now")}
              className="rounded-md bg-signal px-6 py-3.5 text-sm font-semibold tracking-wide text-ink hover:bg-signal-hot"
            >
              {dict.hero.ctaExplore}
            </Link>
            <Link
              href={href("/#think")}
              className="rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-wide text-bone hover:border-phosphor hover:text-phosphor"
            >
              {dict.hero.ctaThink}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="mt-10 font-mono text-[10px] tracking-[0.22em] text-bone-faint"
          >
            {dict.hero.liveNow}{" "}
            <span className="text-bone-dim">
              {live.map((p) => p.name).join(" · ")}
            </span>
          </motion.p>
        </div>

        {/* Single clean preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative"
        >
          <div className="scene-stripe overflow-hidden rounded-xl border border-white/12 bg-ink-3">
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-ember/80" />
              <span className="h-2 w-2 rounded-full bg-amber/80" />
              <span className="h-2 w-2 rounded-full bg-phosphor/80" />
              <p className="ml-2 truncate font-mono text-[10px] text-bone-faint">
                {featured?.liveUrl?.replace(/^https?:\/\//, "") ?? "product"}
              </p>
            </div>
            <div className="relative aspect-[16/10] bg-ink">
              <AnimatePresence mode="wait">
                {featured?.previewImage ? (
                  <motion.div
                    key={featured.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featured.previewImage}
                      alt={`${featured.name} live site`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 90vw, 560px"
                      priority
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {featured ? (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/10 bg-ink/80 px-2.5 py-1.5 backdrop-blur-sm">
                  {featured.logo ? (
                    <Image
                      src={featured.logo}
                      alt=""
                      width={18}
                      height={18}
                      className="h-4 w-4 object-contain"
                      unoptimized={featured.logo.endsWith(".svg")}
                    />
                  ) : null}
                  <span className="font-display text-xs font-semibold text-bone">{featured.name}</span>
                </div>
              ) : null}
            </div>
          </div>

          {live.length > 1 ? (
            <div className="mt-5 flex items-center justify-center gap-2">
              {live.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  aria-label={p.name}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === slide ? "w-6 bg-phosphor" : "w-2 bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
