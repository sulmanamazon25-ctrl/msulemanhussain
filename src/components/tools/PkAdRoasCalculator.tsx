"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, moneyFx, parseNum } from "./tool-ui";

export function PkAdRoasCalculator({ locale }: { locale: "en" | "es" }) {
  const [budget, setBudget] = useState("50000");
  const [period, setPeriod] = useState<"daily" | "monthly">("monthly");
  const [roas, setRoas] = useState("3");
  const [aov, setAov] = useState("3500");
  const [marginPct, setMarginPct] = useState("35");
  const es = locale === "es";

  const result = useMemo(() => {
    const spend = parseNum(budget);
    const targetRoas = parseNum(roas);
    const orderValue = parseNum(aov);
    const margin = parseNum(marginPct) / 100;
    if (![spend, targetRoas, orderValue, margin].every(Number.isFinite) || spend < 0 || targetRoas <= 0 || orderValue <= 0)
      return null;
    const monthlySpend = period === "daily" ? spend * 30 : spend;
    const revenueNeeded = monthlySpend * targetRoas;
    const ordersNeeded = revenueNeeded / orderValue;
    const breakEvenRoas = margin > 0 ? 1 / margin : Infinity;
    const contribution = revenueNeeded * margin - monthlySpend;
    const maxCpa = margin > 0 ? orderValue * margin : 0;

    return { monthlySpend, revenueNeeded, ordersNeeded, breakEvenRoas, contribution, maxCpa };
  }, [budget, period, roas, aov, marginPct]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={es ? "Presupuesto (PKR)" : "Ad budget (PKR)"}>
          <input type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Periodo" : "Period"}>
          <select value={period} onChange={(e) => setPeriod(e.target.value as "daily" | "monthly")} className={inputClass}>
            <option value="daily">{es ? "Diario" : "Daily"}</option>
            <option value="monthly">{es ? "Mensual" : "Monthly"}</option>
          </select>
        </Field>
        <Field label={es ? "ROAS objetivo (x)" : "Target ROAS (x)"}>
          <input type="number" min={0} step="0.1" value={roas} onChange={(e) => setRoas(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Ticket medio / AOV (PKR)" : "Avg order value (PKR)"}>
          <input type="number" min={0} value={aov} onChange={(e) => setAov(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Margen contribución %" : "Contribution margin %"}>
          <input type="number" min={0} max={100} step="0.1" value={marginPct} onChange={(e) => setMarginPct(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "PLAN MENSUAL" : "MONTHLY PLAN"} title={moneyFx(result.revenueNeeded, "PKR")}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Gasto mensual" : "Monthly spend"}: <span className="text-bone">{moneyFx(result.monthlySpend, "PKR")}</span>
            </li>
            <li>
              {es ? "Pedidos necesarios" : "Orders needed"}:{" "}
              <span className="text-bone">{result.ordersNeeded.toFixed(1)}</span>
            </li>
            <li>
              {es ? "ROAS de equilibrio" : "Break-even ROAS"}:{" "}
              <span className="text-bone">
                {Number.isFinite(result.breakEvenRoas) ? `${result.breakEvenRoas.toFixed(2)}x` : "—"}
              </span>
            </li>
            <li>
              {es ? "CPA máx. (margen)" : "Max CPA (at margin)"}:{" "}
              <span className="text-bone">{moneyFx(result.maxCpa, "PKR")}</span>
            </li>
            <li>
              {es ? "Contribución tras ads" : "Contribution after ads"}:{" "}
              <span className="text-bone">{moneyFx(result.contribution, "PKR")}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Para Meta Ads / TikTok Ads en PKR. No incluye fees de payment gateway."
              : "For Meta Ads / TikTok Ads in PKR. Excludes payment-gateway fees."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
