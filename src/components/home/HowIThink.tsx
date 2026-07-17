"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { journeyStages } from "@/content/journey";
import { getProduct } from "@/content/products";

export function HowIThink() {
  const [active, setActive] = useState(0);
  const stage = journeyStages[active];
  const product = stage.productSlug ? getProduct(stage.productSlug) : undefined;

  return (
    <section id="think" className="scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-amber">HOW I THINK</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              I see problems everywhere. Then I build solutions.
            </h2>
          </div>
          <p className="max-w-lg text-bone-dim lg:pb-2">
            Not a consulting funnel. A founder loop — from friction to product to users to growth — with real
            examples from the workshop.
          </p>
        </div>

        <div className="mt-12 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
          {journeyStages.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className="shrink-0 px-3 py-2 font-mono text-[11px] tracking-wider transition"
              style={{
                color: active === i ? s.accent : "var(--bone-faint)",
                borderBottom: active === i ? `2px solid ${s.accent}` : "2px solid transparent",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="font-display text-3xl font-semibold" style={{ color: stage.accent }}>
                {stage.statement}
              </p>
              {active < journeyStages.length - 1 && (
                <p className="mt-6 font-mono text-xs text-bone-faint">
                  → {journeyStages[active + 1].label}
                </p>
              )}
            </div>
            <div className="relative pl-6" style={{ borderLeft: `2px solid ${stage.accent}` }}>
              <p className="text-lg text-bone-dim">{stage.example}</p>
              {product && (
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-6 inline-block text-sm font-medium hover:underline"
                  style={{ color: stage.accent }}
                >
                  See {product.name} →
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
