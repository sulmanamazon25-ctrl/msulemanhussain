"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, moneyFx, parseNum } from "./tool-ui";

const PRESETS = [
  { id: "yt_pk", en: "YouTube (PK-heavy audience)", es: "YouTube (audiencia mayormente PK)", low: 0.4, mid: 1.2, high: 2.5 },
  { id: "yt_mix", en: "YouTube (mixed / US viewers)", es: "YouTube (mixto / viewers US)", low: 1.5, mid: 4, high: 8 },
  { id: "reels", en: "Reels / Shorts (bonus / brand)", es: "Reels / Shorts (bonus / marca)", low: 0.2, mid: 0.8, high: 2 },
  { id: "custom", en: "Custom CPM (USD)", es: "CPM personalizado (USD)", low: 1, mid: 1, high: 1 },
] as const;

export function PkYoutubeCpmEstimator({ locale }: { locale: "en" | "es" }) {
  const [views, setViews] = useState("100000");
  const [preset, setPreset] = useState<(typeof PRESETS)[number]["id"]>("yt_pk");
  const [customCpm, setCustomCpm] = useState("1.5");
  const [usdToPkr, setUsdToPkr] = useState("278.5");
  const es = locale === "es";

  const result = useMemo(() => {
    const v = parseNum(views);
    const rate = parseNum(usdToPkr);
    if (![v, rate].every(Number.isFinite) || v < 0 || rate <= 0) return null;
    const row = PRESETS.find((p) => p.id === preset) ?? PRESETS[0];
    let low: number = row.low;
    let mid: number = row.mid;
    let high: number = row.high;
    if (preset === "custom") {
      const c = parseNum(customCpm);
      if (!Number.isFinite(c) || c < 0) return null;
      low = c;
      mid = c;
      high = c;
    }
    // Revenue ≈ views/1000 * CPM (RPM proxy)
    const toRev = (cpm: number) => (v / 1000) * cpm;
    const lowUsd = toRev(low);
    const midUsd = toRev(mid);
    const highUsd = toRev(high);
    return {
      lowUsd,
      midUsd,
      highUsd,
      lowPkr: lowUsd * rate,
      midPkr: midUsd * rate,
      highPkr: highUsd * rate,
      low,
      mid,
      high,
    };
  }, [views, preset, customCpm, usdToPkr]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={es ? "Vistas / mes" : "Views / month"}>
          <input type="number" min={0} value={views} onChange={(e) => setViews(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Tipo de contenido" : "Content type"}>
          <select value={preset} onChange={(e) => setPreset(e.target.value as typeof preset)} className={inputClass}>
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {es ? p.es : p.en}
              </option>
            ))}
          </select>
        </Field>
        {preset === "custom" ? (
          <Field label={es ? "CPM USD" : "CPM USD"}>
            <input type="number" min={0} step="0.1" value={customCpm} onChange={(e) => setCustomCpm(e.target.value)} className={inputClass} />
          </Field>
        ) : null}
        <Field label="USD/PKR">
          <input type="number" min={0} step="0.01" value={usdToPkr} onChange={(e) => setUsdToPkr(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "BANDA MEDIA (RPM aprox.)" : "MID BAND (approx. RPM)"} title={moneyFx(result.midPkr, "PKR")}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Bajo" : "Low"} (${result.low.toFixed(2)} CPM):{" "}
              <span className="text-bone">
                {moneyFx(result.lowUsd, "USD")} · {moneyFx(result.lowPkr, "PKR")}
              </span>
            </li>
            <li>
              {es ? "Medio" : "Mid"} (${result.mid.toFixed(2)} CPM):{" "}
              <span className="text-bone">
                {moneyFx(result.midUsd, "USD")} · {moneyFx(result.midPkr, "PKR")}
              </span>
            </li>
            <li>
              {es ? "Alto" : "High"} (${result.high.toFixed(2)} CPM):{" "}
              <span className="text-bone">
                {moneyFx(result.highUsd, "USD")} · {moneyFx(result.highPkr, "PKR")}
              </span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "No es un pago garantizado de YouTube/Meta. Solo orientación para pitch y planificación."
              : "Not a guaranteed YouTube/Meta payout. Orientation for pitching and planning only."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
