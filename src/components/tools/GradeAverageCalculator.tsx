"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, parseNum } from "./tool-ui";

export function GradeAverageCalculator({ locale }: { locale: "en" | "es" }) {
  const [raw, setRaw] = useState("7.5, 8, 6.5, 9");
  const [weights, setWeights] = useState("");
  const es = locale === "es";

  const result = useMemo(() => {
    const grades = raw
      .split(/[,;\s]+/)
      .map((s) => parseNum(s))
      .filter((n) => Number.isFinite(n));
    if (!grades.length) return null;
    const wParts = weights
      .split(/[,;\s]+/)
      .map((s) => parseNum(s))
      .filter((n) => Number.isFinite(n));
    const useW = wParts.length === grades.length && wParts.every((w) => w > 0);
    if (useW) {
      const sumW = wParts.reduce((a, b) => a + b, 0);
      const avg = grades.reduce((acc, g, i) => acc + g * wParts[i], 0) / sumW;
      return { avg, count: grades.length, weighted: true };
    }
    const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
    return { avg, count: grades.length, weighted: false };
  }, [raw, weights]);

  return (
    <ToolShell>
      <Field label={es ? "Notas (separadas por coma)" : "Grades (comma-separated)"}>
        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={3} className={inputClass} />
      </Field>
      <Field label={es ? "Pesos opcionales (misma cantidad)" : "Optional weights (same count)"}>
        <input value={weights} onChange={(e) => setWeights(e.target.value)} placeholder="1, 1, 2, 1" className={inputClass} />
      </Field>
      {result ? (
        <ResultBlock
          eyebrow={result.weighted ? (es ? "MEDIA PONDERADA" : "WEIGHTED AVERAGE") : es ? "MEDIA ARITMÉTICA" : "SIMPLE AVERAGE"}
          title={result.avg.toFixed(3)}
        >
          <p className="mt-2 text-sm text-bone-dim">
            {result.count} {es ? "asignaturas" : "subjects"}
          </p>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Útil para ESO, Bachillerato, FP o universidad. No sustituye el expediente oficial."
              : "Useful for ESO, Bachillerato, FP, or university. Does not replace official transcripts."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce al menos una nota." : "Enter at least one grade."}</p>
      )}
    </ToolShell>
  );
}
