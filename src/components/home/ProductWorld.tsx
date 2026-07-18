"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, statusClass } from "@/content/products";
import type { Product } from "@/content/site";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

function ProductPreview({ product }: { product: Product }) {
  if (!product.previewImage) {
    return (
      <div
        className="relative flex min-h-[300px] items-center justify-center md:min-h-[380px]"
        style={{ background: product.accentSoft }}
      >
        <p className="font-display text-3xl font-bold" style={{ color: product.accent }}>
          {product.name}
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[300px] overflow-hidden bg-ink md:min-h-[380px]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-ink-3/95 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-phosphor/80" />
        <p className="ml-2 truncate font-mono text-[10px] text-bone-faint">
          {product.liveUrl?.replace(/^https?:\/\//, "") ?? `${product.slug}.product`}
        </p>
        {product.logo ? (
          <Image
            src={product.logo}
            alt=""
            width={18}
            height={18}
            className="ml-auto h-4 w-4 object-contain opacity-80"
            unoptimized={product.logo.endsWith(".svg")}
          />
        ) : null}
      </div>
      <div className="relative aspect-[16/11] w-full md:aspect-auto md:min-h-[340px]">
        <motion.div
          key={product.slug}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={product.previewImage}
            alt={`${product.name} product screenshot`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority={product.status === "LIVE"}
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${product.accentSoft}, transparent 40%)`,
          }}
        />
      </div>
    </div>
  );
}

export function ProductWorld({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState(0);
  const product = products[active];
  const { dict, href } = useLocale();

  useEffect(() => {
    const liveIndexes = products
      .map((p, i) => (p.status === "LIVE" ? i : -1))
      .filter((i) => i >= 0);
    if (liveIndexes.length < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const pos = liveIndexes.indexOf(current);
        const next = pos < 0 ? liveIndexes[0] : liveIndexes[(pos + 1) % liveIndexes.length];
        return next;
      });
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="products-world" className="scroll-mt-24 border-y border-white/5 bg-ink-2/40 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <>
            <p className="font-mono text-[11px] tracking-[0.28em] text-cobalt">{dict.products.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
              {dict.products.title}
            </h2>
            <p className="mt-4 max-w-xl text-bone-dim">{dict.products.blurb}</p>
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
                  <Image
                    src={p.logo}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                    unoptimized={p.logo.endsWith(".svg")}
                  />
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
              className="relative overflow-hidden border border-white/10"
              style={{ boxShadow: `0 0 80px ${product.accentSoft}` }}
            >
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <ProductPreview product={product} />
                <div className="flex flex-col justify-between bg-ink-3/80 p-6 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("border px-2 py-0.5 text-[10px] tracking-wider", statusClass(product.status))}>
                        {product.status}
                      </span>
                      {product.multilingual && (
                        <span className="border border-phosphor/40 px-2 py-0.5 text-[10px] tracking-wider text-phosphor">
                          {dict.products.multilingual}
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
                        {dict.products.openLive}
                      </a>
                    ) : null}
                    <Link
                      href={href(`/products/${product.slug}`)}
                      className="inline-flex border border-white/20 px-5 py-3 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
                    >
                      {dict.products.enter} {product.name}
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
