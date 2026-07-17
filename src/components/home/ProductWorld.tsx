"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, statusClass } from "@/content/products";
import type { Product } from "@/content/site";
import { cn } from "@/lib/utils";

function ProductPreview({ product }: { product: Product }) {
  return (
    <div
      className="relative min-h-[280px] overflow-hidden p-5 md:min-h-[360px]"
      style={{ background: `linear-gradient(145deg, ${product.accentSoft}, transparent 55%)` }}
    >
      <div className="absolute inset-0 foundry-grid opacity-40" />
      <div className="relative flex h-full flex-col justify-between border border-white/10 bg-ink/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: product.accent }} />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-phosphor/80" />
          <span className="ml-auto font-mono text-[10px] text-bone-faint">{product.name}.os</span>
        </div>
        <div className="mt-6 grid flex-1 grid-cols-12 gap-2">
          <div className="col-span-3 space-y-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-6 bg-white/5" style={{ opacity: 0.4 + n * 0.1 }} />
            ))}
          </div>
          <div className="col-span-9 grid grid-rows-3 gap-2">
            <div className="border border-white/10 bg-ink-3/80 p-3">
              <div className="h-2 w-1/3" style={{ background: product.accent, opacity: 0.8 }} />
              <div className="mt-3 h-16 border border-dashed border-white/10" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[40, 70, 55].map((h, i) => (
                <div key={i} className="flex items-end border border-white/10 bg-ink/40 p-2">
                  <div className="w-full" style={{ height: `${h}%`, background: product.accent, opacity: 0.65 }} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border border-white/10 px-3 font-mono text-[10px] text-bone-faint">
              <span>pipeline · ok</span>
              <span style={{ color: product.accent }}>{product.status}</span>
            </div>
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
              Select a product. Watch the atmosphere shift. Step into what was actually built.
            </p>
          </>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]">
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Products"
          >
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="shrink-0 border px-4 py-3 text-left text-sm transition lg:w-full"
                style={{
                  borderColor: i === active ? p.accent : "rgba(255,255,255,0.1)",
                  color: i === active ? p.accent : "var(--bone-dim)",
                  background: i === active ? p.accentSoft : "transparent",
                }}
              >
                <span className="block font-display font-semibold">{p.name}</span>
                <span className="mt-1 block text-[10px] tracking-wider opacity-70">{p.status}</span>
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
                    <span className={cn("border px-2 py-0.5 text-[10px] tracking-wider", statusClass(product.status))}>
                      {product.status}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl" style={{ color: product.accent }}>
                      {product.name}
                    </h3>
                    <p className="mt-3 text-bone-dim">{product.tagline}</p>
                    <p className="mt-4 text-sm text-bone-faint">{product.problem}</p>
                    <p className="mt-4 font-mono text-[11px] text-bone-faint">{product.stack.join(" · ")}</p>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-8 inline-flex w-fit items-center bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot"
                  >
                    Enter {product.name}
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
