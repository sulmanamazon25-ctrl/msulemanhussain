"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

/** Simplified autónomos cuota estimate (reforma tramos) — orientative 2026. */
function cuotaFromNetMonthly(net: number) {
  const brackets = [
    { upTo: 670, base: 751.63, rate: 0.313 },
    { upTo: 900, base: 849.67, rate: 0.313 },
    { upTo: 1166.7, base: 898.69, rate: 0.313 },
    { upTo: 1300, base: 950.98, rate: 0.313 },
    { upTo: 1500, base: 960.78, rate: 0.313 },
    { upTo: 1700, base: 960.78, rate: 0.313 },
    { upTo: 1850, base: 1045.75, rate: 0.313 },
    { upTo: 2030, base: 1059.61, rate: 0.313 },
    { upTo: 2330, base: 1129.47, rate: 0.313 },
    { upTo: 2760, base: 1200.78, rate: 0.313 },
    { upTo: 3190, base: 1275.0, rate: 0.313 },
    { upTo: 3620, base: 1350.0, rate: 0.313 },
    { upTo: 4050, base: 1425.0, rate: 0.313 },
    { upTo: 6000, base: 1500.0, rate: 0.313 },
    { upTo: Infinity, base: 1600.0, rate: 0.313 },
  ];
  const b = brackets.find((x) => net <= x.upTo) ?? brackets[brackets.length - 1];
  return { base: b.base, cuota: b.base * b.rate };
}

export function AutonomoCuotaCalculator({ locale }: { locale: "en" | "es" }) {
  const [netMonthly, setNetMonthly] = useState("1500");
  const [tarifaPlana, setTarifaPlana] = useState(false);
  const es = locale === "es";

  const result = useMemo(() => {
    const net = parseNum(netMonthly);
    if (!Number.isFinite(net) || net < 0) return null;
    if (tarifaPlana) {
      return { base: 751.63, cuota: 80, note: es ? "Tarifa plana orientativa (~80 €/mes primeros meses)" : "Flat rate guidance (~€80/mo early months)" };
    }
    const { base, cuota } = cuotaFromNetMonthly(net);
    return { base, cuota, note: es ? "Tramo simplificado 2026" : "Simplified 2026 bracket" };
  }, [netMonthly, tarifaPlana, es]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Rendimiento neto mensual estimado (€)" : "Estimated monthly net earnings (€)"}>
          <input type="number" min={0} value={netMonthly} onChange={(e) => setNetMonthly(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "¿Tarifa plana / alta nueva?" : "Flat rate / new registration?"}>
          <select
            value={tarifaPlana ? "yes" : "no"}
            onChange={(e) => setTarifaPlana(e.target.value === "yes")}
            className={inputClass}
          >
            <option value="no">{es ? "No" : "No"}</option>
            <option value="yes">{es ? "Sí (estimación inicial)" : "Yes (early estimate)"}</option>
          </select>
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "CUOTA MENSUAL EST." : "EST. MONTHLY QUOTA"} title={money(result.cuota, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Base de cotización" : "Contribution base"}: <span className="text-bone">{money(result.base, locale)}</span>
            </li>
            <li>{result.note}</li>
            <li>
              {es ? "Anual aprox." : "Approx. yearly"}: <span className="text-bone">{money(result.cuota * 12, locale)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Modelo simplificado. Usa Importass / gestoría para la cuota oficial."
              : "Simplified model. Use Importass / an advisor for the official quota."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce un rendimiento válido." : "Enter a valid amount."}</p>
      )}
    </ToolShell>
  );
}
