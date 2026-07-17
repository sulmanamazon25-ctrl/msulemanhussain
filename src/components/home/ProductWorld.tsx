"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, statusClass } from "@/content/products";
import type { Product } from "@/content/site";
import { cn } from "@/lib/utils";

function ProductPreview({ product }: { product: Product }) {
  const bars = [42, 68, 51, 82, 60, 74];
  const cards = product.metrics;

  return (
    <div
      className="relative min-h-[300px] overflow-hidden p-5 md:min-h-[380px]"
      style={{ background: `linear-gradient(145deg, ${product.accentSoft}, transparent 55%)` }}
    >
      <div className="absolute inset-0 foundry-grid opacity-40" />
      {product.previewImage && (
        <div className="absolute inset-4 overflow-hidden border border-white/10 opacity-25">
          <Image
            src={product.previewImage}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="relative flex h-full min-h-[270px] flex-col justify-between border border-white/10 bg-ink/70 p-4 backdrop-blur-sm md:min-h-[340px]">
        <div className="flex items-center gap-3">
          {product.logo ? (
            <Image
              src={product.logo}
              alt={product.name}
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          ) : (
            <motion.span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: product.accent }}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}
          <div>
            <p className="font-mono text-[10px] text-bone-faint">{product.name}.os</p>
            {product.multilingual && product.locales && (
              <p className="font-mono text-[10px] text-phosphor">{product.locales.join(" · ")} · multilingual</p>
            )}
          </div>
          <span className="ml-auto font-mono text-[10px]" style={{ color: product.accent }}>
            {product.status}
          </span>
        </div>

        <div className="mt-5 grid flex-1 grid-cols-12 gap-3">
          <div className="col-span-12 grid grid-cols-3 gap-2">
            {cards.slice(0, 3).map((card, i) => (
              <motion.div
                key={card.label}
                className="border border-white/10 bg-ink/60 p-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <p className="font-mono text-[9px] tracking-wider text-bone-faint">{card.label}</p>
                <p className="mt-1 truncate text-xs font-semibold" style={{ color: product.accent }}>
                  {card.value}
                </p>
                <motion.div
                  className="mt-2 h-1 origin-left"
                  style={{ background: product.accent }}
                  animate={{ scaleX: [0.4, 1, 0.7] }}
                  transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, repeatType: "mirror" }}
                />
              </motion.div>
            ))}
          </div>
          <div className="col-span-12 grid h-20 grid-cols-6 items-end gap-1.5 border border-white/10 bg-ink/40 p-3">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="w-full origin-bottom"
                style={{ background: product.accent, height: `${h}%`, opacity: 0.8 }}
                animate={{ scaleY: [0.45, 1, 0.65, 1] }}
                transition={{
                  duration: 1.5 + i * 0.12,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductWorld({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <section id="products-world" className="scroll-mt-24 border-y border-white/5 bg-ink-2/40 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <>
            <p className="font-mono text-[11px] tracking-[0.28em] text-cobalt">PRODUCT WORLD</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
              Destinations inside the workshop.
            </h2>
            <p className="mt-4 max-w-xl text-bone-dim">
              Four live multilingual products. The rest are coming soon from the same workshop.
            </p>
          </>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist">
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="flex shrink-0 items-center gap-3 border px-4 py-3 text-left text-sm transition lg:w-full"
                style={{
                  borderColor: i === active ? p.accent : "rgba(255,255,255,0.1)",
                  color: i === active ? p.accent : "var(--bone-dim)",
                  background: i === active ? p.accentSoft : "transparent",
                }}
              >
                {p.logo && (
                  <Image src={p.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                )}
                <span>
                  <span className="block font-display font-semibold">{p.name}</span>
                  <span className="mt-1 block text-[10px] tracking-wider opacity-70">{p.status}</span>
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden"
              style={{ boxShadow: `inset 0 0 80px ${product.accentSoft}` }}
            >
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <ProductPreview product={product} />
                <div className="flex flex-col justify-between bg-ink-3/80 p-6 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("border px-2 py-0.5 text-[10px] tracking-wider", statusClass(product.status))}>
                        {product.status}
                      </span>
                      {product.multilingual && (
                        <span className="border border-phosphor/40 px-2 py-0.5 text-[10px] tracking-wider text-phosphor">
                          MULTILINGUAL
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl" style={{ color: product.accent }}>
                      {product.name}
                    </h3>
                    <p className="mt-3 text-bone-dim">{product.tagline}</p>
                    <p className="mt-4 text-sm text-bone-faint">{product.problem}</p>
                    <p className="mt-4 font-mono text-[11px] text-bone-faint">{product.stack.join(" · ")}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {product.liveUrl ? (
                      <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot"
                      >
                        Open live product
                      </a>
                    ) : null}
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
                    >
                      Enter {product.name}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
