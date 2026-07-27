"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

export function BillSplitCalculator({ locale }: { locale: "en" | "es" }) {
  const [bill, setBill] = useState("86");
  const [people, setPeople] = useState("4");
  const [tipPct, setTipPct] = useState("5");
  const es = locale === "es";

  const result = useMemo(() => {
    const total = parseNum(bill);
    const n = Math.max(1, Math.floor(parseNum(people) || 1));
    const tip = parseNum(tipPct);
    if (![total, tip].every((x) => Number.isFinite(x) && x >= 0)) return null;
    const tipAmount = total * (tip / 100);
    const grand = total + tipAmount;
    return { tipAmount, grand, each: grand / n, n };
  }, [bill, people, tipPct]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={es ? "Cuenta (€)" : "Bill (€)"}>
          <input type="number" min={0} step="0.01" value={bill} onChange={(e) => setBill(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Personas" : "People"}>
          <input type="number" min={1} value={people} onChange={(e) => setPeople(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Propina %" : "Tip %"}>
          <input type="number" min={0} step="0.5" value={tipPct} onChange={(e) => setTipPct(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "POR PERSONA" : "PER PERSON"} title={money(result.each, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Propina" : "Tip"}: <span className="text-bone">{money(result.tipAmount, locale)}</span>
            </li>
            <li>
              {es ? "Total" : "Grand total"}: <span className="text-bone">{money(result.grand, locale)}</span> · {result.n}×
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es ? "En España la propina es opcional — ajusta el %." : "Tipping in Spain is optional — tune the %."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
