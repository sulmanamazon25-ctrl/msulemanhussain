"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

const REGIONS: Record<string, { labelEn: string; labelEs: string; itp: number }> = {
  madrid: { labelEn: "Madrid (ITP ~6%)", labelEs: "Madrid (ITP ~6%)", itp: 0.06 },
  catalunya: { labelEn: "Catalunya (ITP ~10%)", labelEs: "Catalunya (ITP ~10%)", itp: 0.1 },
  andalucia: { labelEn: "Andalucía (ITP ~7%)", labelEs: "Andalucía (ITP ~7%)", itp: 0.07 },
  valencia: { labelEn: "Valencia (ITP ~10%)", labelEs: "Valencia (ITP ~10%)", itp: 0.1 },
  other: { labelEn: "Other / default 8%", labelEs: "Otra / defecto 8%", itp: 0.08 },
};

export function HomeBuyingCostCalculator({ locale }: { locale: "en" | "es" }) {
  const [price, setPrice] = useState("280000");
  const [region, setRegion] = useState("madrid");
  const [newBuild, setNewBuild] = useState(false);
  const [notary, setNotary] = useState("1200");
  const [registry, setRegistry] = useState("600");
  const [agency, setAgency] = useState("0");
  const es = locale === "es";

  const result = useMemo(() => {
    const p = parseNum(price);
    const n = parseNum(notary);
    const r = parseNum(registry);
    const a = parseNum(agency);
    if (![p, n, r, a].every((x) => Number.isFinite(x) && x >= 0)) return null;
    let tax = 0;
    let taxLabel = "";
    if (newBuild) {
      tax = p * 0.1; // IVA 10% vivienda nueva orientativo
      taxLabel = es ? "IVA 10% (nueva)" : "VAT 10% (new build)";
    } else {
      const itp = REGIONS[region]?.itp ?? 0.08;
      tax = p * itp;
      taxLabel = `ITP ${(itp * 100).toFixed(0)}%`;
    }
    const closing = n + r + a;
    const totalExtra = tax + closing;
    const allIn = p + totalExtra;
    return { tax, taxLabel, closing, totalExtra, allIn };
  }, [price, region, newBuild, notary, registry, agency, es]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Precio compraventa (€)" : "Purchase price (€)"}>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Tipo" : "Type"}>
          <select value={newBuild ? "new" : "resale"} onChange={(e) => setNewBuild(e.target.value === "new")} className={inputClass}>
            <option value="resale">{es ? "Segunda mano (ITP)" : "Resale (ITP)"}</option>
            <option value="new">{es ? "Obra nueva (IVA)" : "New build (VAT)"}</option>
          </select>
        </Field>
        {!newBuild ? (
          <Field label={es ? "CCAA (ITP orientativo)" : "Region (orientative ITP)"}>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className={inputClass}>
              {Object.entries(REGIONS).map(([k, v]) => (
                <option key={k} value={k}>
                  {es ? v.labelEs : v.labelEn}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        <Field label={es ? "Notaría (€)" : "Notary (€)"}>
          <input type="number" value={notary} onChange={(e) => setNotary(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Registro (€)" : "Land registry (€)"}>
          <input type="number" value={registry} onChange={(e) => setRegistry(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Agencia (€)" : "Agency (€)"}>
          <input type="number" value={agency} onChange={(e) => setAgency(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "COSTE EXTRA EST." : "EST. EXTRA COST"} title={money(result.totalExtra, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {result.taxLabel}: <span className="text-bone">{money(result.tax, locale)}</span>
            </li>
            <li>
              {es ? "Cierres" : "Closing"}: <span className="text-bone">{money(result.closing, locale)}</span>
            </li>
            <li>
              {es ? "Total con vivienda" : "All-in with home"}: <span className="text-bone">{money(result.allIn, locale)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Ballpark. ITP/AJD reales varían por CCAA y tramos. Consulta notaría/asesor."
              : "Ballpark. Real ITP/AJD varies by region. Confirm with notary/advisor."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
