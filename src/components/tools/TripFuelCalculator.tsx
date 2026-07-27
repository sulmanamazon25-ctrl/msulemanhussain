"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

export function TripFuelCalculator({ locale }: { locale: "en" | "es" }) {
  const [km, setKm] = useState("450");
  const [lPer100, setLPer100] = useState("6.5");
  const [price, setPrice] = useState("1.55");
  const [passengers, setPassengers] = useState("1");
  const es = locale === "es";

  const result = useMemo(() => {
    const d = parseNum(km);
    const cons = parseNum(lPer100);
    const p = parseNum(price);
    const n = Math.max(1, Math.floor(parseNum(passengers) || 1));
    if (![d, cons, p].every((x) => Number.isFinite(x) && x >= 0)) return null;
    const liters = (d / 100) * cons;
    const cost = liters * p;
    return { liters, cost, each: cost / n };
  }, [km, lPer100, price, passengers]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Field label={es ? "Distancia (km)" : "Distance (km)"}>
          <input type="number" min={0} value={km} onChange={(e) => setKm(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Consumo (L/100km)" : "Consumption (L/100km)"}>
          <input type="number" min={0} step="0.1" value={lPer100} onChange={(e) => setLPer100(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Precio combustible (€/L)" : "Fuel price (€/L)"}>
          <input type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Personas (reparto)" : "People (split)"}>
          <input type="number" min={1} value={passengers} onChange={(e) => setPassengers(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "COSTE VIAJE" : "TRIP COST"} title={money(result.cost, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Litros" : "Liters"}: <span className="text-bone">{result.liters.toFixed(1)} L</span>
            </li>
            <li>
              {es ? "Por persona" : "Per person"}: <span className="text-bone">{money(result.each, locale)}</span>
            </li>
          </ul>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
