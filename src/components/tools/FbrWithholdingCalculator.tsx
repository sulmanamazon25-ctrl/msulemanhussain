"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, moneyFx, parseNum } from "./tool-ui";

/** Simplified progressive slabs for orientation (not official IRIS). Annual taxable income PKR. */
function taxOnAnnual(income: number) {
  const bands: { upTo: number; rate: number }[] = [
    { upTo: 600_000, rate: 0 },
    { upTo: 1_200_000, rate: 0.05 },
    { upTo: 2_400_000, rate: 0.1 },
    { upTo: 3_600_000, rate: 0.15 },
    { upTo: 6_000_000, rate: 0.2 },
    { upTo: Infinity, rate: 0.25 },
  ];
  let tax = 0;
  let prev = 0;
  for (const b of bands) {
    if (income <= prev) break;
    const taxable = Math.min(income, b.upTo) - prev;
    tax += taxable * b.rate;
    prev = b.upTo;
    if (income <= b.upTo) break;
  }
  return tax;
}

export function FbrWithholdingCalculator({ locale }: { locale: "en" | "es" }) {
  const [annual, setAnnual] = useState("1800000");
  const [invoice, setInvoice] = useState("150000");
  const [withholdPct, setWithholdPct] = useState("10");
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [usdRate, setUsdRate] = useState("278.5");
  const es = locale === "es";

  const result = useMemo(() => {
    let annualPkr = parseNum(annual);
    let invoicePkr = parseNum(invoice);
    const rate = parseNum(usdRate);
    const wh = parseNum(withholdPct) / 100;
    if (![annualPkr, invoicePkr, rate, wh].every(Number.isFinite) || rate <= 0) return null;
    if (currency === "USD") {
      annualPkr *= rate;
      invoicePkr *= rate;
    }
    const annualTax = taxOnAnnual(Math.max(0, annualPkr));
    const effective = annualPkr > 0 ? annualTax / annualPkr : 0;
    const monthlyTax = annualTax / 12;
    const withholding = Math.max(0, invoicePkr) * Math.max(0, wh);
    const netInvoice = Math.max(0, invoicePkr - withholding);

    return { annualPkr, annualTax, effective, monthlyTax, withholding, netInvoice, invoicePkr };
  }, [annual, invoice, withholdPct, currency, usdRate]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={es ? "Moneda de entrada" : "Input currency"}>
          <select value={currency} onChange={(e) => setCurrency(e.target.value as "PKR" | "USD")} className={inputClass}>
            <option value="PKR">PKR</option>
            <option value="USD">USD</option>
          </select>
        </Field>
        {currency === "USD" ? (
          <Field label="USD/PKR">
            <input type="number" min={0} step="0.01" value={usdRate} onChange={(e) => setUsdRate(e.target.value)} className={inputClass} />
          </Field>
        ) : null}
        <Field label={es ? `Ingreso anual estimado (${currency})` : `Estimated annual income (${currency})`}>
          <input type="number" min={0} value={annual} onChange={(e) => setAnnual(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? `Factura / cobro (${currency})` : `Invoice / payout (${currency})`}>
          <input type="number" min={0} value={invoice} onChange={(e) => setInvoice(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Retención en fuente (%)" : "Withholding on invoice (%)"}>
          <input type="number" min={0} max={100} step="0.1" value={withholdPct} onChange={(e) => setWithholdPct(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "ORIENTACIÓN FISCAL" : "TAX ORIENTATION"} title={moneyFx(result.annualTax, "PKR")}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Base anual (PKR)" : "Annual base (PKR)"}: <span className="text-bone">{moneyFx(result.annualPkr, "PKR")}</span>
            </li>
            <li>
              {es ? "Tipo efectivo aprox." : "Approx. effective rate"}:{" "}
              <span className="text-bone">{(result.effective * 100).toFixed(1)}%</span>
            </li>
            <li>
              {es ? "Reserva mensual sugerida" : "Suggested monthly reserve"}:{" "}
              <span className="text-bone">{moneyFx(result.monthlyTax, "PKR")}</span>
            </li>
            <li>
              {es ? "Retención en esta factura" : "Withholding on this invoice"}:{" "}
              <span className="text-bone">{moneyFx(result.withholding, "PKR")}</span>
            </li>
            <li>
              {es ? "Neto tras retención" : "Net after withholding"}:{" "}
              <span className="text-bone">{moneyFx(result.netInvoice, "PKR")}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "No es una declaración FBR/IRIS. Tramos simplificados — confirma con un CA."
              : "Not an FBR/IRIS filing. Simplified slabs — confirm with a CA."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
