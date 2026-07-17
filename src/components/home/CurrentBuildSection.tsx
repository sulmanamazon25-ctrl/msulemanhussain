"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { liveProducts, statusClass } from "@/content/products";
import { cn } from "@/lib/utils";

export function CurrentBuildSection() {
  const items = liveProducts();

  return (
    <section id="now" className="scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-signal">RIGHT NOW</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Live products.
        </h2>
        <p className="mt-4 max-w-xl text-bone-dim">
          Multilingual and live — DownitX, PinQuill, Wasup, and Pickleball Deutsch. Everything else is coming soon.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/products/${p.slug}`}
                className="group relative flex h-full min-h-[320px] flex-col overflow-hidden border border-white/10 bg-ink-3 transition duration-300 hover:-translate-y-1 hover:border-white/25"
                style={{ boxShadow: `inset 3px 0 0 ${p.accent}` }}
              >
                <div
                  className="relative h-44 overflow-hidden border-b border-white/10"
                  style={{ background: `linear-gradient(145deg, ${p.accentSoft}, #0c1118 60%)` }}
                >
                  {p.previewImage && !p.previewImage.endsWith(".svg") ? (
                    <Image
                      src={p.previewImage}
                      alt={p.name}
                      fill
                      className="object-cover object-top opacity-95 transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex items-center gap-2">
                        {p.logo ? (
                          <Image
                            src={p.logo}
                            alt=""
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                            unoptimized={p.logo.endsWith(".svg")}
                          />
                        ) : null}
                        <span className="font-display text-lg font-semibold text-bone">{p.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {p.metrics.slice(0, 3).map((m) => (
                          <div key={m.label} className="border border-white/10 bg-ink/50 px-2 py-2">
                            <p className="font-mono text-[9px] text-bone-faint">{m.label}</p>
                            <p className="text-xs font-semibold" style={{ color: p.accent }}>
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    {p.previewImage && !p.previewImage.endsWith(".svg") && p.logo ? (
                      <span className="flex h-8 w-8 items-center justify-center bg-ink/80 p-1 backdrop-blur">
                        <Image
                          src={p.logo}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                          unoptimized={p.logo.endsWith(".svg")}
                        />
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "border px-2 py-0.5 text-[10px] tracking-wider backdrop-blur",
                        statusClass(p.status),
                      )}
                    >
                      {p.status}
                    </span>
                  </div>
                  <motion.div className="absolute bottom-3 left-4 right-4 flex h-7 items-end gap-1" aria-hidden>
                    {[40, 65, 45, 80, 55, 70].map((h, idx) => (
                      <motion.span
                        key={idx}
                        className="flex-1 origin-bottom opacity-80"
                        style={{ background: p.accent, height: `${h}%` }}
                        animate={{ scaleY: [0.5, 1, 0.7, 1] }}
                        transition={{
                          duration: 1.6 + idx * 0.12,
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: idx * 0.08,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                <div className="relative flex flex-1 flex-col p-5">
                  <p className="text-xs tracking-wider text-bone-faint">{p.category}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold" style={{ color: p.accent }}>
                    {p.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-bone-dim">{p.tagline}</p>
                  {p.locales ? (
                    <p className="mt-3 font-mono text-[10px] text-phosphor">{p.locales.join(" · ")}</p>
                  ) : null}
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <p className="line-clamp-2 text-xs text-bone-faint">{p.happeningNow}</p>
                    <span className="shrink-0 text-sm font-medium" style={{ color: p.accent }}>
                      Open →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
