"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capabilityGroups } from "@/content/capabilities";
import { getProduct } from "@/content/products";

export function CapabilityOverlap() {
  const [active, setActive] = useState(0);
  const group = capabilityGroups[active];

  return (
    <section className="border-y border-white/5 bg-ink-2/50 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">UNFAIR ADVANTAGE</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
          My advantage is the overlap.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-bone-dim">
          I can understand the problem, design the product, build the system, connect the AI, launch it, and think
          about how it grows.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          {capabilityGroups.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(i)}
              className="px-4 py-2 font-display text-sm font-semibold tracking-wide transition"
              style={{
                color: active === i ? g.accent : "var(--bone-faint)",
                background: active === i ? `color-mix(in srgb, ${g.accent} 14%, transparent)` : "transparent",
                outline: `1px solid ${active === i ? g.accent : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {g.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <ul className="columns-1 gap-x-8 sm:columns-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="mb-3 break-inside-avoid border-b border-white/8 py-2 text-bone-dim"
                  style={{ borderBottomColor: `${group.accent}33` }}
                >
                  {skill}
                </li>
              ))}
            </ul>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">TIED TO PRODUCTS</p>
              <ul className="mt-4 space-y-3">
                {group.relatedProductSlugs.map((slug) => {
                  const p = getProduct(slug);
                  if (!p) return null;
                  return (
                    <li key={slug}>
                      <Link href={`/products/${slug}`} className="text-lg font-medium hover:underline" style={{ color: group.accent }}>
                        {p.name}
                      </Link>
                      <p className="text-sm text-bone-faint">{p.tagline}</p>
                    </li>
                  );
                })}
              </ul>
              <Link href="/expertise" className="mt-8 inline-block text-sm text-phosphor hover:underline">
                Explore all ecosystems →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
