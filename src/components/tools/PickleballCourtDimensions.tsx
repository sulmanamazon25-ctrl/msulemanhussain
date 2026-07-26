"use client";

import { useMemo, useState } from "react";

const FT_TO_M = 0.3048;

const STANDARDS = [
  { key: "width", labelEn: "Court width", labelEs: "Ancho de pista", ft: 20 },
  { key: "length", labelEn: "Court length", labelEs: "Largo de pista", ft: 44 },
  { key: "kitchen", labelEn: "Kitchen / NVZ depth", labelEs: "Kitchen / NVZ", ft: 7 },
  { key: "service", labelEn: "Service box length", labelEs: "Cuadro de saque (largo)", ft: 15 },
  { key: "netSide", labelEn: "Net height (sideline)", labelEs: "Altura red (lateral)", ft: 3 },
  { key: "netCenter", labelEn: "Net height (center)", labelEs: "Altura red (centro)", ft: 34 / 12 },
];

export function PickleballCourtDimensions({ locale }: { locale: "en" | "es" }) {
  const [ft, setFt] = useState("20");
  const [m, setM] = useState((20 * FT_TO_M).toFixed(2));
  const es = locale === "es";

  const fromFt = (value: string) => {
    setFt(value);
    const n = Number.parseFloat(value.replace(",", "."));
    if (Number.isFinite(n)) setM((n * FT_TO_M).toFixed(2));
  };

  const fromM = (value: string) => {
    setM(value);
    const n = Number.parseFloat(value.replace(",", "."));
    if (Number.isFinite(n)) setFt((n / FT_TO_M).toFixed(2));
  };

  const standards = useMemo(
    () =>
      STANDARDS.map((s) => ({
        ...s,
        label: es ? s.labelEs : s.labelEn,
        meters: (s.ft * FT_TO_M).toFixed(2),
        feetDisplay: Number.isInteger(s.ft) ? String(s.ft) : s.ft.toFixed(2),
      })),
    [es],
  );

  return (
    <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
      <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
        {es ? "MEDIDAS OFICIALES" : "OFFICIAL STANDARDS"}
      </p>
      <ul className="mt-4 divide-y divide-white/10">
        {standards.map((s) => (
          <li key={s.key} className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm">
            <span className="text-bone-dim">{s.label}</span>
            <span className="font-mono text-phosphor">
              {s.feetDisplay} ft · {s.meters} m
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
          {es ? "CONVERTIDOR" : "CONVERTER"}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-bone-dim">
            {es ? "Pies (ft)" : "Feet (ft)"}
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={ft}
              onChange={(e) => fromFt(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
            />
          </label>
          <label className="block text-sm text-bone-dim">
            {es ? "Metros (m)" : "Meters (m)"}
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={m}
              onChange={(e) => fromM(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-bone-faint">1 ft = 0.3048 m</p>
      </div>
    </div>
  );
}
