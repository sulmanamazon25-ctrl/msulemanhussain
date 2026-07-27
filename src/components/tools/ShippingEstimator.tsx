"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

const ZONES: Record<string, { labelEn: string; labelEs: string; base: number; perKg: number; days: string }> = {
  local: { labelEn: "Spain mainland", labelEs: "Península", base: 4.5, perKg: 0.9, days: "1–3" },
  islands: { labelEn: "Balearics / Canarias", labelEs: "Baleares / Canarias", base: 8.5, perKg: 1.6, days: "3–6" },
  eu: { labelEn: "EU", labelEs: "UE", base: 12, perKg: 2.4, days: "3–7" },
  intl: { labelEn: "International", labelEs: "Internacional", base: 18, perKg: 4.2, days: "5–12" },
};

export function ShippingEstimator({ locale }: { locale: "en" | "es" }) {
  const [weight, setWeight] = useState("2");
  const [zone, setZone] = useState("local");
  const [express, setExpress] = useState(false);
  const es = locale === "es";

  const result = useMemo(() => {
    const kg = parseNum(weight);
    const z = ZONES[zone];
    if (!z || !Number.isFinite(kg) || kg <= 0) return null;
    let cost = z.base + kg * z.perKg;
    if (express) cost *= 1.45;
    return { cost, days: z.days, label: es ? z.labelEs : z.labelEn };
  }, [weight, zone, express, es]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={es ? "Peso (kg)" : "Weight (kg)"}>
          <input type="number" min={0.1} step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Destino" : "Destination"}>
          <select value={zone} onChange={(e) => setZone(e.target.value)} className={inputClass}>
            {Object.entries(ZONES).map(([k, v]) => (
              <option key={k} value={k}>
                {es ? v.labelEs : v.labelEn}
              </option>
            ))}
          </select>
        </Field>
        <Field label={es ? "Servicio" : "Service"}>
          <select value={express ? "express" : "std"} onChange={(e) => setExpress(e.target.value === "express")} className={inputClass}>
            <option value="std">{es ? "Estándar" : "Standard"}</option>
            <option value="express">{es ? "Exprés (+45%)" : "Express (+45%)"}</option>
          </select>
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "COSTE ESTIMADO" : "ESTIMATED COST"} title={money(result.cost, locale)}>
          <p className="mt-2 text-sm text-bone-dim">
            {result.label} · {es ? "plazo" : "ETA"} {result.days} {es ? "días laborables" : "business days"}
          </p>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Modelo genérico de paquetería. Compara con Correos / carriers reales antes de enviar."
              : "Generic parcel model. Compare with Correos / real carriers before shipping."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce un peso válido." : "Enter a valid weight."}</p>
      )}
    </ToolShell>
  );
}
