"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

function payment(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function MortgageCalculator({ locale }: { locale: "en" | "es" }) {
  const [price, setPrice] = useState("250000");
  const [down, setDown] = useState("50000");
  const [years, setYears] = useState("25");
  const [rate, setRate] = useState("3.2");
  const [type, setType] = useState<"fixed" | "variable">("fixed");
  const [euribor, setEuribor] = useState("2.1");
  const [spread, setSpread] = useState("0.9");
  const es = locale === "es";

  const result = useMemo(() => {
    const p = parseNum(price);
    const d = parseNum(down);
    const y = parseNum(years);
    const fixed = parseNum(rate);
    const e = parseNum(euribor);
    const s = parseNum(spread);
    if (![p, d, y].every((n) => Number.isFinite(n) && n >= 0) || y <= 0 || d >= p) return null;
    const principal = p - d;
    const annual = type === "fixed" ? fixed : e + s;
    if (!Number.isFinite(annual) || annual < 0) return null;
    const monthly = payment(principal, annual, y);
    const total = monthly * y * 12;
    const interest = total - principal;
    return { principal, annual, monthly, total, interest, ltv: (principal / p) * 100 };
  }, [price, down, years, rate, type, euribor, spread]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Precio vivienda (€)" : "Home price (€)"}>
          <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Entrada (€)" : "Down payment (€)"}>
          <input type="number" min={0} value={down} onChange={(e) => setDown(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Plazo (años)" : "Term (years)"}>
          <input type="number" min={1} max={40} value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Tipo" : "Rate type"}>
          <select value={type} onChange={(e) => setType(e.target.value as "fixed" | "variable")} className={inputClass}>
            <option value="fixed">{es ? "Fijo" : "Fixed"}</option>
            <option value="variable">{es ? "Variable (Euribor + diferencial)" : "Variable (Euribor + spread)"}</option>
          </select>
        </Field>
        {type === "fixed" ? (
          <Field label={es ? "Interés anual (%)" : "Annual interest (%)"}>
            <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} />
          </Field>
        ) : (
          <>
            <Field label="Euribor (%)">
              <input type="number" step="0.01" value={euribor} onChange={(e) => setEuribor(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Diferencial (%)" : "Spread (%)"}>
              <input type="number" step="0.01" value={spread} onChange={(e) => setSpread(e.target.value)} className={inputClass} />
            </Field>
          </>
        )}
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "CUOTA MENSUAL" : "MONTHLY PAYMENT"} title={money(result.monthly, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Capital prestado" : "Loan principal"}: <span className="text-bone">{money(result.principal, locale)}</span> (LTV {result.ltv.toFixed(1)}%)
            </li>
            <li>
              {es ? "Tipo efectivo" : "Effective rate"}: <span className="text-bone">{result.annual.toFixed(2)}%</span>
            </li>
            <li>
              {es ? "Intereses totales" : "Total interest"}: <span className="text-bone">{money(result.interest, locale)}</span>
            </li>
            <li>
              {es ? "Total pagado" : "Total paid"}: <span className="text-bone">{money(result.total, locale)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "No incluye seguros, comisiones ni impuestos de compraventa. Orientativo."
              : "Excludes insurance, fees, and purchase taxes. Guidance only."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Revisa precio, entrada y plazo." : "Check price, down payment, and term."}</p>
      )}
    </ToolShell>
  );
}
