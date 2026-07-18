"use client";

import { useMemo, useState } from "react";
import { projects } from "@/content/projects";
import { useLocale } from "@/i18n/LocaleProvider";

const filters = ["ALL", "SAAS", "AI", "WEB", "AUTOMATION", "EXPERIMENTS", "CLIENT", "TOOLS"] as const;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const { dict } = useLocale();
  const list = useMemo(() => {
    const base = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [filter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.projects.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.projects.title}</h1>
      <p className="mt-4 max-w-2xl text-bone-dim">{dict.projects.blurb}</p>
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
      <ul className="mt-10">
        {list.map((p) => (
          <li key={p.slug} className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[5rem_1fr]">
            <p className="font-mono text-sm text-bone-faint">{p.year ?? "—"}</p>
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-display text-xl font-semibold">{p.title}</h2>
                <span className="font-mono text-[10px] text-cobalt">{p.category}</span>
                <span className="font-mono text-[10px] text-bone-faint">{p.status}</span>
              </div>
              <p className="mt-2 text-sm text-bone-dim">{p.summary}</p>
              <p className="mt-2 text-sm text-bone-faint">Problem: {p.problem}</p>
              <p className="mt-1 text-sm text-bone-faint">
                Role: {p.role} · {p.tech.join(" · ")}
              </p>
              <p className="mt-2 text-sm text-phosphor">{p.result}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
