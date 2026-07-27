"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, parseNum } from "./tool-ui";

/** Mexico 16% IVA add/extract */
export function MexicoIvaCalculator({ locale }: { locale: "en" | "es" }) {
  const [mode, setMode] = useState<"add" | "extract">("add");
  const [amount, setAmount] = useState("1000");
  const es = locale === "es";
  const rate = 0.16;

  const result = useMemo(() => {
    const n = parseNum(amount);
    if (!Number.isFinite(n) || n < 0) return null;
    if (mode === "add") {
      const iva = n * rate;
      return { base: n, iva, total: n + iva };
    }
    const base = n / (1 + rate);
    return { base, iva: n - base, total: n };
  }, [amount, mode]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Modo" : "Mode"}>
          <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} className={inputClass}>
            <option value="add">{es ? "Añadir IVA 16%" : "Add 16% VAT"}</option>
            <option value="extract">{es ? "Extraer IVA 16%" : "Extract 16% VAT"}</option>
          </select>
        </Field>
        <Field label={es ? "Importe" : "Amount"}>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow="IVA 16%" title={result.total.toFixed(2)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Base" : "Base"}: <span className="text-bone">{result.base.toFixed(2)}</span>
            </li>
            <li>
              IVA: <span className="text-bone">{result.iva.toFixed(2)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es ? "Importes en la moneda que introduzcas (típicamente MXN)." : "Amounts in whatever currency you enter (typically MXN)."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
