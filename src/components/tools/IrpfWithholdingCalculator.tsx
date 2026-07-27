"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

function annualIrpf(taxable: number) {
  const brackets = [
    { upTo: 12450, rate: 0.19 },
    { upTo: 20200, rate: 0.24 },
    { upTo: 35200, rate: 0.3 },
    { upTo: 60000, rate: 0.37 },
    { upTo: 300000, rate: 0.45 },
    { upTo: Infinity, rate: 0.47 },
  ];
  let remaining = Math.max(0, taxable);
  let prev = 0;
  let tax = 0;
  for (const b of brackets) {
    const slice = Math.min(remaining, b.upTo - prev);
    if (slice <= 0) break;
    tax += slice * b.rate;
    remaining -= slice;
    prev = b.upTo;
  }
  return tax;
}

export function IrpfWithholdingCalculator({ locale }: { locale: "en" | "es" }) {
  const [grossAnnual, setGrossAnnual] = useState("32000");
  const [pays, setPays] = useState<"12" | "14">("14");
  const [children, setChildren] = useState("0");
  const es = locale === "es";

  const result = useMemo(() => {
    const gross = parseNum(grossAnnual);
    const kids = Math.max(0, Math.floor(parseNum(children) || 0));
    if (!Number.isFinite(gross) || gross < 0) return null;
    const personal = 5550 + kids * 2400;
    const taxable = Math.max(0, gross - personal);
    const tax = annualIrpf(taxable);
    const effective = gross > 0 ? (tax / gross) * 100 : 0;
    const n = pays === "14" ? 14 : 12;
    const monthlyWithholding = tax / n;
    const grossMonthly = gross / n;
    const netMonthly = grossMonthly - monthlyWithholding - grossMonthly * 0.0635;
    return { tax, effective, monthlyWithholding, grossMonthly, netMonthly, n };
  }, [grossAnnual, pays, children]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={es ? "Bruto anual (€)" : "Gross annual (€)"}>
          <input type="number" value={grossAnnual} onChange={(e) => setGrossAnnual(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Pagas" : "Pay periods"}>
          <select value={pays} onChange={(e) => setPays(e.target.value as "12" | "14")} className={inputClass}>
            <option value="14">14</option>
            <option value="12">12</option>
          </select>
        </Field>
        <Field label={es ? "Hijos a cargo (simplificado)" : "Dependent children (simplified)"}>
          <input type="number" min={0} value={children} onChange={(e) => setChildren(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "RETENCIÓN MENSUAL EST." : "EST. MONTHLY WITHHOLDING"} title={money(result.monthlyWithholding, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "IRPF anual est." : "Est. annual IRPF"}: <span className="text-bone">{money(result.tax, locale)}</span> ({result.effective.toFixed(1)}%)
            </li>
            <li>
              {es ? "Bruto / paga" : "Gross / period"}: <span className="text-bone">{money(result.grossMonthly, locale)}</span>
            </li>
            <li>
              {es ? "Neto orientativo / paga" : "Orientative net / period"}: <span className="text-bone">{money(result.netMonthly, locale)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Modelo simplificado 2026. No sustituye el programa de ayuda AEAT ni tu nómina."
              : "Simplified 2026 model. Does not replace AEAT tools or real payroll."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
