"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass } from "./tool-ui";

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function formatDate(d: Date, locale: "en" | "es") {
  return d.toLocaleDateString(locale === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DueDateCalculator({ locale }: { locale: "en" | "es" }) {
  const [lmp, setLmp] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 80);
    return d.toISOString().slice(0, 10);
  });
  const es = locale === "es";

  const result = useMemo(() => {
    const start = new Date(lmp + "T12:00:00");
    if (Number.isNaN(start.getTime())) return null;
    const due = addDays(start, 280); // Naegele ~280 days from LMP
    const today = new Date();
    const elapsed = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const week = Math.max(0, Math.floor(elapsed / 7));
    const day = ((elapsed % 7) + 7) % 7;
    const remaining = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const milestones = [
      { labelEn: "End of first trimester", labelEs: "Fin primer trimestre", at: addDays(start, 97) },
      { labelEn: "Anatomy scan window (~20w)", labelEs: "Ecografía morfológica (~20 sem)", at: addDays(start, 140) },
      { labelEn: "Third trimester starts", labelEs: "Inicio tercer trimestre", at: addDays(start, 196) },
      { labelEn: "Full term (37w)", labelEs: "A término (37 sem)", at: addDays(start, 259) },
    ];
    return { due, week, day, remaining, milestones };
  }, [lmp]);

  return (
    <ToolShell>
      <Field label={es ? "Fecha de última menstruación (FUM)" : "Last menstrual period (LMP)"}>
        <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className={inputClass} />
      </Field>
      {result ? (
        <ResultBlock eyebrow={es ? "FECHA PROBABLE DE PARTO" : "ESTIMATED DUE DATE"} title={formatDate(result.due, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Semana actual" : "Current week"}:{" "}
              <span className="text-bone">
                {result.week}{es ? " sem + " : "w + "}
                {result.day}{es ? " d" : "d"}
              </span>
            </li>
            <li>
              {es ? "Días restantes (aprox.)" : "Days remaining (approx.)"}:{" "}
              <span className="text-bone">{result.remaining}</span>
            </li>
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-bone-dim">
            {result.milestones.map((m) => (
              <li key={m.labelEn}>
                <span className="text-bone">{es ? m.labelEs : m.labelEn}</span>: {formatDate(m.at, locale)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Regla de Naegele orientativa. Confirma siempre con tu matrona o ginecólogo."
              : "Naegele’s rule guidance only. Always confirm with your midwife or OB-GYN."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Fecha inválida." : "Invalid date."}</p>
      )}
    </ToolShell>
  );
}
