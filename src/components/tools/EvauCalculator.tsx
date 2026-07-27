"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, parseNum } from "./tool-ui";

export function EvauCalculator({ locale }: { locale: "en" | "es" }) {
  const [bach, setBach] = useState("8.2");
  const [faseObl, setFaseObl] = useState("7.5");
  const [esp1, setEsp1] = useState("8");
  const [peso1, setPeso1] = useState("0.2");
  const [esp2, setEsp2] = useState("7");
  const [peso2, setPeso2] = useState("0.2");
  const es = locale === "es";

  const result = useMemo(() => {
    const nBach = parseNum(bach);
    const nObl = parseNum(faseObl);
    const e1 = parseNum(esp1);
    const p1 = parseNum(peso1);
    const e2 = parseNum(esp2);
    const p2 = parseNum(peso2);
    if (![nBach, nObl, e1, p1, e2, p2].every(Number.isFinite)) return null;
    if ([nBach, nObl, e1, e2].some((n) => n < 0 || n > 10)) return null;
    // Access grade = 0.6 * Bach + 0.4 * EvAU general + specific weights
    const acceso = 0.6 * nBach + 0.4 * nObl;
    const especifica = Math.max(0, e1) * Math.max(0, p1) + Math.max(0, e2) * Math.max(0, p2);
    const admision = acceso + especifica;
    return { acceso, especifica, admision: Math.min(14, admision) };
  }, [bach, faseObl, esp1, peso1, esp2, peso2]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Nota media Bachillerato (0–10)" : "Bachillerato average (0–10)"}>
          <input type="number" min={0} max={10} step="0.01" value={bach} onChange={(e) => setBach(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Fase obligatoria EvAU (0–10)" : "EvAU general phase (0–10)"}>
          <input type="number" min={0} max={10} step="0.01" value={faseObl} onChange={(e) => setFaseObl(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Específica 1 (nota)" : "Specific subject 1 (grade)"}>
          <input type="number" min={0} max={10} step="0.01" value={esp1} onChange={(e) => setEsp1(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Ponderación 1 (0.1 / 0.2)" : "Weight 1 (0.1 / 0.2)"}>
          <input type="number" min={0} max={0.2} step="0.1" value={peso1} onChange={(e) => setPeso1(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Específica 2 (nota)" : "Specific subject 2 (grade)"}>
          <input type="number" min={0} max={10} step="0.01" value={esp2} onChange={(e) => setEsp2(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Ponderación 2 (0.1 / 0.2)" : "Weight 2 (0.1 / 0.2)"}>
          <input type="number" min={0} max={0.2} step="0.1" value={peso2} onChange={(e) => setPeso2(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "NOTA DE ADMISIÓN 2026" : "2026 ADMISSION SCORE"} title={result.admision.toFixed(3)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Nota de acceso" : "Access grade"}: <span className="text-bone">{result.acceso.toFixed(3)}</span> / 10
            </li>
            <li>
              {es ? "Fase específica" : "Specific phase"}: +<span className="text-bone">{result.especifica.toFixed(3)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Fórmula estándar: 0,6×Bach + 0,4×obligatoria + ponderaciones. Confirma pesos en tu universidad."
              : "Standard formula: 0.6×Bach + 0.4×general + weights. Confirm weights with your target university."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Notas entre 0 y 10." : "Grades must be 0–10."}</p>
      )}
    </ToolShell>
  );
}
