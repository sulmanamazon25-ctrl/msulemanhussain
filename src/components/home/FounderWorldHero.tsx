"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { liveProducts } from "@/content/products";

export function FounderWorldHero() {
  const live = liveProducts();

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-signal/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cobalt/15 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Visual — fills the blank side with live product stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            <div className="absolute inset-0 foundry-grid opacity-50" />
            <div
              className="absolute inset-6 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,61,31,0.35), rgba(61,139,255,0.2), transparent 70%)",
              }}
            />

            {live.map((p, i) => {
              const positions = [
                "left-[6%] top-[8%] w-[58%] rotate-[-6deg]",
                "right-[4%] top-[22%] w-[54%] rotate-[5deg]",
                "left-[10%] bottom-[26%] w-[56%] rotate-[3deg]",
                "right-[8%] bottom-[6%] w-[52%] rotate-[-4deg]",
              ];
              return (
                <motion.div
                  key={p.slug}
                  className={`absolute ${positions[i] ?? positions[0]}`}
                  style={{ zIndex: 10 + i }}
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="group block overflow-hidden border border-white/15 bg-ink-3/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur transition hover:border-white/30"
                    style={{ boxShadow: `0 18px 50px ${p.accentSoft}` }}
                  >
                    <div className="relative h-28 w-full bg-ink sm:h-32">
                      {p.previewImage ? (
                        <Image
                          src={p.previewImage}
                          alt={p.name}
                          fill
                          className="object-cover object-top"
                          sizes="280px"
                          unoptimized={p.previewImage.endsWith(".svg")}
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: p.accentSoft }} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-3 to-transparent" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2.5">
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt=""
                          width={22}
                          height={22}
                          className="h-5 w-5 object-contain"
                          unoptimized={p.logo.endsWith(".svg")}
                        />
                      ) : (
                        <span className="live-dot" style={{ background: p.accent }} />
                      )}
                      <span className="font-display text-sm font-semibold text-bone">{p.name}</span>
                      <span className="ml-auto font-mono text-[9px] tracking-wider" style={{ color: p.accent }}>
                        LIVE
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
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
            className="mt-5 font-display text-4xl font-bold leading-[1.02] text-bone text-balance md:text-6xl lg:text-7xl"
          >
            {site.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-bone-dim md:text-lg"
          >
            {site.support}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
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
            className="mt-10 border-t border-white/10 pt-6"
          >
            <p className="mb-3 font-mono text-[10px] tracking-[0.24em] text-bone-faint">LIVE NOW</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {live.map((p) => (
                <li key={p.slug} className="flex items-center gap-2 text-sm text-bone-dim">
                  <span className="live-dot" style={{ background: p.accent }} />
                  <Link href={`/products/${p.slug}`} className="hover:text-bone">
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
