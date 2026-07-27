"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

export function BudgetPlanner({ locale }: { locale: "en" | "es" }) {
  const [income, setIncome] = useState("2200");
  const [housing, setHousing] = useState("750");
  const [food, setFood] = useState("350");
  const [transport, setTransport] = useState("120");
  const [subs, setSubs] = useState("80");
  const [other, setOther] = useState("200");
  const es = locale === "es";

  const result = useMemo(() => {
    const vals = [income, housing, food, transport, subs, other].map(parseNum);
    if (!vals.every((n) => Number.isFinite(n) && n >= 0)) return null;
    const [inc, h, f, t, s, o] = vals;
    const expenses = h + f + t + s + o;
    const leftover = inc - expenses;
    const rate = inc > 0 ? (leftover / inc) * 100 : 0;
    return { inc, expenses, leftover, rate, breakdown: { h, f, t, s, o } };
  }, [income, housing, food, transport, subs, other]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Ingresos netos / mes (€)" : "Net income / month (€)"}>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Vivienda" : "Housing"}>
          <input type="number" value={housing} onChange={(e) => setHousing(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Comida" : "Food"}>
          <input type="number" value={food} onChange={(e) => setFood(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Transporte" : "Transport"}>
          <input type="number" value={transport} onChange={(e) => setTransport(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Suscripciones" : "Subscriptions"}>
          <input type="number" value={subs} onChange={(e) => setSubs(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Otros" : "Other"}>
          <input type="number" value={other} onChange={(e) => setOther(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock
          eyebrow={es ? "TASA DE AHORRO" : "SAVINGS RATE"}
          title={`${result.rate.toFixed(1)}%`}
        >
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Gastos" : "Expenses"}: <span className="text-bone">{money(result.expenses, locale)}</span>
            </li>
            <li>
              {es ? "Sobrante" : "Leftover"}:{" "}
              <span className={result.leftover >= 0 ? "text-phosphor" : "text-amber"}>{money(result.leftover, locale)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Objetivo sano típico: ahorrar ≥20% si puedes. Ajusta categorías a tu realidad."
              : "A healthy target is often ≥20% savings when possible. Tune categories to your life."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
