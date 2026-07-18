"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { useLocale } from "@/i18n/LocaleProvider";

const filters = ["ALL", "SAAS", "AI", "WEB", "AUTOMATION", "TOOLS", "EXPERIMENTS", "CLIENT"] as const;

export function ShippedArchive() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const { dict, href } = useLocale();
  const list = useMemo(() => {
    const base = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [filter]);

  return (
    <section id="archive" className="scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-cobalt">{dict.archive.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">{dict.archive.title}</h2>
          </div>
          <Link href={href("/projects")} className="text-sm text-phosphor hover:underline">
            {dict.archive.full}
          </Link>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-wider"
              style={{
                color: filter === f ? "var(--phosphor)" : "var(--bone-faint)",
                borderBottom: filter === f ? "2px solid var(--phosphor)" : "2px solid transparent",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 relative">
          <div className="absolute bottom-0 left-[4.5rem] top-0 hidden w-px bg-white/10 md:block" />
          <ul className="space-y-0">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[5rem_1fr_8rem]"
              >
                <p className="font-mono text-sm text-bone-faint">{p.year ?? "—"}</p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <span className="font-mono text-[10px] tracking-wider text-cobalt">{p.category}</span>
                    <span className="font-mono text-[10px] text-bone-faint">{p.status}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-bone-dim">{p.summary}</p>
                  <p className="mt-1 text-xs text-bone-faint">
                    {p.role} · {p.tech.join(", ")}
                  </p>
                </div>
                <p className="text-sm text-phosphor md:text-right">{p.result}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
