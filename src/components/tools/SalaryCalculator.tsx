"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

/** Simplified 2026 IRPF estimate for monthly net from gross annual (orientative). */
function estimateIrpfAnnual(gross: number) {
  const brackets = [
    { upTo: 12450, rate: 0.19 },
    { upTo: 20200, rate: 0.24 },
    { upTo: 35200, rate: 0.3 },
    { upTo: 60000, rate: 0.37 },
    { upTo: 300000, rate: 0.45 },
    { upTo: Infinity, rate: 0.47 },
  ];
  let remaining = Math.max(0, gross);
  let prev = 0;
  let tax = 0;
  for (const b of brackets) {
    const slice = Math.min(remaining, b.upTo - prev);
    if (slice <= 0) break;
    tax += slice * b.rate;
    remaining -= slice;
    prev = b.upTo;
  }
  // Rough personal allowance reduction
  const allowance = Math.min(5500, gross * 0.1);
  return Math.max(0, tax - allowance * 0.19);
}

export function SalaryCalculator({ locale }: { locale: "en" | "es" }) {
  const [grossAnnual, setGrossAnnual] = useState("30000");
  const [extraPays, setExtraPays] = useState<"12" | "14">("14");
  const [ssRate, setSsRate] = useState("6.35");
  const es = locale === "es";

  const result = useMemo(() => {
    const gross = parseNum(grossAnnual);
    const ss = parseNum(ssRate) / 100;
    if (![gross, ss].every((n) => Number.isFinite(n) && n >= 0)) return null;
    const employeeSs = gross * ss;
    const irpf = estimateIrpfAnnual(gross);
    const netAnnual = gross - employeeSs - irpf;
    const months = extraPays === "14" ? 14 : 12;
    const netMonthly = netAnnual / months;
    const grossMonthly = gross / months;
    return { gross, employeeSs, irpf, netAnnual, netMonthly, grossMonthly, months };
  }, [grossAnnual, extraPays, ssRate]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={es ? "Salario bruto anual (€)" : "Gross annual salary (€)"}>
          <input type="number" min={0} step="100" value={grossAnnual} onChange={(e) => setGrossAnnual(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Pagas" : "Pay periods"}>
          <select value={extraPays} onChange={(e) => setExtraPays(e.target.value as "12" | "14")} className={inputClass}>
            <option value="14">{es ? "14 pagas" : "14 payments"}</option>
            <option value="12">{es ? "12 pagas" : "12 payments"}</option>
          </select>
        </Field>
        <Field label={es ? "% Seguridad Social trabajador" : "Employee SS %"}>
          <input type="number" min={0} step="0.01" value={ssRate} onChange={(e) => setSsRate(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "NETO ESTIMADO" : "ESTIMATED NET"} title={money(result.netMonthly, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Neto anual" : "Net annual"}: <span className="text-bone">{money(result.netAnnual, locale)}</span>
            </li>
            <li>
              {es ? "IRPF estimado" : "Estimated IRPF"}: <span className="text-bone">{money(result.irpf, locale)}</span>
            </li>
            <li>
              {es ? "SS trabajador" : "Employee SS"}: <span className="text-bone">{money(result.employeeSs, locale)}</span>
            </li>
            <li>
              {es ? "Bruto / paga" : "Gross / period"}: <span className="text-bone">{money(result.grossMonthly, locale)}</span> ({result.months}×)
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Orientativo 2026. No incluye CCAA especiales, retenciones personales ni nómina real."
              : "2026 guidance only. Ignores regional nuances, personal deductions, and real payroll software."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce valores válidos." : "Enter valid values."}</p>
      )}
    </ToolShell>
  );
}
