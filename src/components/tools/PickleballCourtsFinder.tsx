"use client";

import { useMemo, useState } from "react";
import {
  regionsForCountry,
  courtsByCountry,
  type CountryCode,
  type CourtSurface,
} from "@/content/pickleball-courts";

const REGION_LABEL: Record<CountryCode, { en: string; es: string; placeholder: string }> = {
  DE: { en: "State", es: "Estado", placeholder: "Berlin" },
  ES: { en: "Region", es: "Comunidad / región", placeholder: "Madrid" },
  US: { en: "State", es: "Estado", placeholder: "Phoenix" },
  CA: { en: "Province", es: "Provincia", placeholder: "Toronto" },
  AU: { en: "State / territory", es: "Estado / territorio", placeholder: "Sydney" },
  UK: { en: "Nation / region", es: "Nación / región", placeholder: "London" },
};

export function PickleballCourtsFinder({
  locale,
  country,
}: {
  locale: "en" | "es";
  country: CountryCode;
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("ALL");
  const [surface, setSurface] = useState<"ALL" | CourtSurface>("ALL");
  const es = locale === "es";
  const labels = REGION_LABEL[country];
  const regions = regionsForCountry(country);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courtsByCountry(country).filter((c) => {
      if (region !== "ALL" && c.region !== region) return false;
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
        c.region.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
      );
    });
  }, [country, query, region, surface]);

  return (
    <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
      <p className="mb-4 text-xs text-bone-faint">
        {es
          ? "Lista curada de hubs — no es un directorio completo. Confirma siempre con el club."
          : "Curated hubs only — not a complete directory. Always confirm with the venue."}
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm text-bone-dim md:col-span-1">
          {es ? "Buscar ciudad / región" : "Search city / region"}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={es ? `p. ej. ${labels.placeholder}` : `e.g. ${labels.placeholder}`}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          />
        </label>
        <label className="block text-sm text-bone-dim">
          {es ? labels.es : labels.en}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          >
            <option value="ALL">{es ? "Todos" : "All"}</option>
            {regions.map((s) => (
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
                {c.city}, {c.region} · {c.surface}
              </p>
              <p className="mt-1 text-xs text-bone-faint">{c.notes}</p>
            </div>
            {c.guideUrl ? (
              <a
                href={c.guideUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-phosphor hover:underline"
              >
                {es ? "Guía →" : "City guide →"}
              </a>
            ) : (
              <span className="text-xs text-bone-faint">{es ? "Hub local" : "Local hub"}</span>
            )}
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
