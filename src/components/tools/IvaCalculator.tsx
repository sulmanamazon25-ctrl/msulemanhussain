"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

const RATES = [
  { id: "21", rate: 0.21, labelEn: "General 21%", labelEs: "General 21%" },
  { id: "10", rate: 0.1, labelEn: "Reduced 10%", labelEs: "Reducido 10%" },
  { id: "4", rate: 0.04, labelEn: "Super-reduced 4%", labelEs: "Superreducido 4%" },
  { id: "0", rate: 0, labelEn: "Exempt 0%", labelEs: "Exento 0%" },
] as const;

export function IvaCalculator({ locale }: { locale: "en" | "es" }) {
  const [mode, setMode] = useState<"add" | "extract">("add");
  const [amount, setAmount] = useState("100");
  const [rateId, setRateId] = useState("21");
  const es = locale === "es";

  const result = useMemo(() => {
    const baseOrGross = parseNum(amount);
    const rate = RATES.find((r) => r.id === rateId)?.rate ?? 0.21;
    if (!Number.isFinite(baseOrGross) || baseOrGross < 0) return null;
    if (mode === "add") {
      const iva = baseOrGross * rate;
      return { base: baseOrGross, iva, total: baseOrGross + iva, rate };
    }
    const base = rate === 0 ? baseOrGross : baseOrGross / (1 + rate);
    const iva = baseOrGross - base;
    return { base, iva, total: baseOrGross, rate };
  }, [amount, rateId, mode]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={es ? "Modo" : "Mode"}>
          <select value={mode} onChange={(e) => setMode(e.target.value as "add" | "extract")} className={inputClass}>
            <option value="add">{es ? "Añadir IVA a base" : "Add VAT to base"}</option>
            <option value="extract">{es ? "Extraer IVA de total" : "Extract VAT from total"}</option>
          </select>
        </Field>
        <Field label={mode === "add" ? (es ? "Base imponible (€)" : "Taxable base (€)") : es ? "Total con IVA (€)" : "Gross with VAT (€)"}>
          <input type="number" min={0} step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Tipo IVA" : "VAT rate"}>
          <select value={rateId} onChange={(e) => setRateId(e.target.value)} className={inputClass}>
            {RATES.map((r) => (
              <option key={r.id} value={r.id}>
                {es ? r.labelEs : r.labelEn}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "RESULTADO IVA" : "VAT RESULT"} title={money(result.total, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Base" : "Base"}: <span className="text-bone">{money(result.base, locale)}</span>
            </li>
            <li>
              IVA ({(result.rate * 100).toFixed(0)}%): <span className="text-bone">{money(result.iva, locale)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es ? "Orientativo para facturas ES. Confirma el tipo aplicable a tu actividad." : "Guidance for ES invoices. Confirm the rate for your activity."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
