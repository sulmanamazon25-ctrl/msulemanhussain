"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, statusClass } from "@/content/products";
import type { Product } from "@/content/site";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

function ProductPreview({ product }: { product: Product }) {
  if (!product.previewImage) {
    return (
      <div
        className="flex aspect-[16/10] items-center justify-center rounded-t-xl"
        style={{ background: product.accentSoft }}
      >
        <p className="font-display text-3xl font-bold" style={{ color: product.accent }}>
          {product.name}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-t-xl border-b border-white/10 bg-ink">
      <div className="flex items-center gap-2 bg-ink-3/90 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ember/80" />
        <span className="h-2 w-2 rounded-full bg-amber/80" />
        <span className="h-2 w-2 rounded-full bg-phosphor/80" />
        <p className="ml-2 truncate font-mono text-[10px] text-bone-faint">
          {product.liveUrl?.replace(/^https?:\/\//, "") ?? `${product.slug}.product`}
        </p>
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={product.previewImage}
          alt={`${product.name} product screenshot`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority={product.status === "LIVE"}
        />
      </div>
    </div>
  );
}

export function ProductWorld({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState(() => {
    const live = products.findIndex((p) => p.status === "LIVE");
    return live >= 0 ? live : 0;
  });
  const product = products[active] as Product;
  const { dict, href } = useLocale();

  return (
    <section
      id="products-world"
      className="scroll-mt-24 border-y border-white/5 px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        {showHeading ? (
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.products.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">{dict.products.title}</h2>
            <p className="mt-4 text-bone-dim">{dict.products.blurb}</p>
          </div>
        ) : null}

        {/* Compact product switcher */}
        <div
          className={cn(
            "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            showHeading ? "mt-10" : "mt-2",
          )}
          role="tablist"
          aria-label={dict.products.title}
        >
          {products.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-left transition",
                  selected
                    ? "border-phosphor/50 bg-forest text-phosphor"
                    : "border-white/10 text-bone-dim hover:border-white/25 hover:text-bone",
                )}
              >
                <span className="block font-display text-sm font-semibold">{p.name}</span>
                <span className="mt-0.5 block font-mono text-[9px] tracking-wider opacity-70">{p.status}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={product.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-ink-3/50"
          >
            <ProductPreview product={product} />

            <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] tracking-wider", statusClass(product.status))}>
                    {product.status}
                  </span>
                  {product.multilingual ? (
                    <span className="rounded-full border border-phosphor/35 px-2.5 py-0.5 text-[10px] tracking-wider text-phosphor">
                      {dict.products.multilingual}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold text-bone md:text-4xl">{product.name}</h3>
                <p className="mt-3 text-base text-bone-dim">{product.tagline}</p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-bone-faint">{product.problem}</p>
              </div>

              <div className="flex flex-col justify-between gap-6 md:items-end md:text-right">
                <p className="font-mono text-[11px] leading-relaxed tracking-wide text-bone-faint">
                  {product.stack.join(" · ")}
                </p>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  {product.liveUrl ? (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink hover:bg-signal-hot"
                    >
                      {dict.products.openLive}
                    </a>
                  ) : null}
                  <Link
                    href={href(`/products/${product.slug}`)}
                    className="inline-flex rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-bone hover:border-phosphor hover:text-phosphor"
                  >
                    {dict.products.enter} {product.name}
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
