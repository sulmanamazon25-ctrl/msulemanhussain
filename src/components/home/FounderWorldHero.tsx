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
    }, 3800);
    return () => window.clearInterval(id);
  }, [live.length]);

  const featured = live[slide] ?? live[0];

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-signal/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cobalt/15 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className="relative overflow-hidden border border-white/15 bg-ink-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              style={{ boxShadow: featured ? `0 24px 70px ${featured.accentSoft}` : undefined }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 bg-ink/90 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-phosphor/80" />
                <p className="ml-2 truncate font-mono text-[10px] text-bone-faint">
                  {featured?.liveUrl?.replace(/^https?:\/\//, "") ?? "product"}
                </p>
              </div>
              <div className="relative aspect-[16/10] bg-ink">
                <AnimatePresence mode="wait">
                  {featured?.previewImage ? (
                    <motion.div
                      key={featured.slug}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={featured.previewImage}
                        alt={`${featured.name} live site`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 90vw, 540px"
                        priority
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-3/90 to-transparent" />
                {featured ? (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    {featured.logo ? (
                      <Image
                        src={featured.logo}
                        alt=""
                        width={22}
                        height={22}
                        className="h-5 w-5 object-contain"
                        unoptimized={featured.logo.endsWith(".svg")}
                      />
                    ) : null}
                    <span className="font-display text-sm font-semibold text-bone drop-shadow">{featured.name}</span>
                    <span
                      className="ml-auto rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-wider"
                      style={{
                        color: featured.accent,
                        borderColor: `${featured.accent}66`,
                        background: featured.accentSoft,
                      }}
                    >
                      LIVE
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {live.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Show ${p.name}`}
                  className="relative h-14 w-24 shrink-0 overflow-hidden border transition sm:h-16 sm:w-28"
                  style={{
                    borderColor: i === slide ? p.accent : "rgba(255,255,255,0.12)",
                    boxShadow: i === slide ? `0 0 0 1px ${p.accent}` : undefined,
                  }}
                >
                  {p.previewImage ? (
                    <Image src={p.previewImage} alt="" fill className="object-cover object-top" sizes="112px" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: p.accentSoft }} />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-ink/75 px-1 py-0.5 text-center font-mono text-[8px] text-bone">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] tracking-[0.28em] text-phosphor"
          >
            {dict.hero.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.02] text-bone text-balance md:text-6xl lg:text-7xl"
          >
            {dict.hero.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-bone-dim md:text-lg"
          >
            {dict.hero.support}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href={href("/#now")}
              className="bg-signal px-6 py-3.5 text-sm font-semibold tracking-wide text-bone hover:bg-signal-hot"
            >
              {dict.hero.ctaExplore}
            </Link>
            <Link
              href={href("/#think")}
              className="border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-wide text-bone hover:border-phosphor hover:text-phosphor"
            >
              {dict.hero.ctaThink}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-10 border-t border-white/10 pt-6"
          >
            <p className="mb-3 font-mono text-[10px] tracking-[0.24em] text-bone-faint">{dict.hero.liveNow}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {live.map((p) => (
                <li key={p.slug} className="flex items-center gap-2 text-sm text-bone-dim">
                  <span className="live-dot" style={{ background: p.accent }} />
                  <Link href={href(`/products/${p.slug}`)} className="hover:text-bone">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
