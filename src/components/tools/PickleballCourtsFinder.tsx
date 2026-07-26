"use client";

import { useMemo, useState } from "react";
import { germanStates, pickleballCourts, type CourtSurface } from "@/content/pickleball-courts";

export function PickleballCourtsFinder({ locale }: { locale: "en" | "es" }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("ALL");
  const [surface, setSurface] = useState<"ALL" | CourtSurface>("ALL");
  const es = locale === "es";

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pickleballCourts.filter((c) => {
      if (state !== "ALL" && c.state !== state) return false;
      if (surface !== "ALL") {
        if (surface === "both") {
          if (c.surface !== "both") return false;
        } else if (c.surface !== surface && c.surface !== "both") {
          return false;
        }
      }
      if (!q) return true;
      return (
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
      );
    });
  }, [query, state, surface]);

  return (
    <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm text-bone-dim md:col-span-1">
          {es ? "Buscar ciudad / estado" : "Search city / state"}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={es ? "p. ej. Berlin" : "e.g. Berlin"}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          />
        </label>
        <label className="block text-sm text-bone-dim">
          {es ? "Estado" : "State"}
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          >
            <option value="ALL">{es ? "Todos" : "All"}</option>
            {germanStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-bone-dim">
          {es ? "Superficie" : "Surface"}
          <select
            value={surface}
            onChange={(e) => setSurface(e.target.value as "ALL" | CourtSurface)}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          >
            <option value="ALL">{es ? "Todas" : "All"}</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="both">{es ? "Ambas" : "Both"}</option>
          </select>
        </label>
      </div>

      <p className="mt-4 font-mono text-[10px] tracking-wider text-bone-faint">
        {list.length} {es ? "resultados" : "results"}
      </p>

      <ul className="mt-4 divide-y divide-white/10">
        {list.map((c) => (
          <li key={c.id} className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-lg font-semibold text-bone">{c.name}</p>
              <p className="mt-1 text-sm text-bone-dim">
                {c.city}, {c.state} · {c.surface}
              </p>
              <p className="mt-1 text-xs text-bone-faint">{c.notes}</p>
            </div>
            <a
              href={c.guideUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-phosphor hover:underline"
            >
              {es ? "Guía →" : "City guide →"}
            </a>
          </li>
        ))}
        {list.length === 0 ? (
          <li className="py-6 text-sm text-bone-dim">
            {es ? "No hay resultados con esos filtros." : "No courts match those filters."}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
