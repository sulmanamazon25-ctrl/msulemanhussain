"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

export function SeveranceCalculator({ locale }: { locale: "en" | "es" }) {
  const [salary, setSalary] = useState("1800");
  const [years, setYears] = useState("4");
  const [months, setMonths] = useState("3");
  const [vacation, setVacation] = useState("8");
  const [extras, setExtras] = useState("300");
  const [type, setType] = useState<"improcedente" | "objetivo" | "fin_contrato">("improcedente");
  const es = locale === "es";

  const result = useMemo(() => {
    const monthly = parseNum(salary);
    const y = parseNum(years);
    const m = parseNum(months);
    const vacDays = parseNum(vacation);
    const extra = parseNum(extras);
    if (![monthly, y, m, vacDays, extra].every((n) => Number.isFinite(n) && n >= 0)) return null;
    const daily = (monthly * 12) / 365;
    const tenureYears = y + m / 12;
    const daysPerYear = type === "improcedente" ? 33 : type === "objetivo" ? 20 : 0;
    const capDays = type === "improcedente" ? 720 : type === "objetivo" ? 360 : 0;
    const indemnityDays = Math.min(tenureYears * daysPerYear, capDays);
    const indemnity = indemnityDays * daily;
    const vacationPay = vacDays * daily;
    const total = indemnity + vacationPay + extra;
    return { daily, indemnityDays, indemnity, vacationPay, total, tenureYears };
  }, [salary, years, months, vacation, extras, type]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Salario mensual bruto (€)" : "Gross monthly salary (€)"}>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Tipo de finiquito" : "Exit type"}>
          <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className={inputClass}>
            <option value="improcedente">{es ? "Despido improcedente (33 días)" : "Unfair dismissal (33 days/yr)"}</option>
            <option value="objetivo">{es ? "Despido objetivo (20 días)" : "Objective dismissal (20 days/yr)"}</option>
            <option value="fin_contrato">{es ? "Fin de contrato (sin indemnización tipificada)" : "Contract end (no statutory severance)"}</option>
          </select>
        </Field>
        <Field label={es ? "Años trabajados" : "Years worked"}>
          <input type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Meses adicionales" : "Extra months"}>
          <input type="number" min={0} max={11} value={months} onChange={(e) => setMonths(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Días de vacaciones pendientes" : "Unused vacation days"}>
          <input type="number" min={0} value={vacation} onChange={(e) => setVacation(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Pagas / prorratas pendientes (€)" : "Pending extras / proration (€)"}>
          <input type="number" min={0} value={extras} onChange={(e) => setExtras(e.target.value)} className={inputClass} />
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "ESTIMACIÓN FINIQUITO" : "SEVERANCE ESTIMATE"} title={money(result.total, locale)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Indemnización" : "Severance"}: <span className="text-bone">{money(result.indemnity, locale)}</span> ({result.indemnityDays.toFixed(1)} {es ? "días" : "days"})
            </li>
            <li>
              {es ? "Vacaciones" : "Vacation"}: <span className="text-bone">{money(result.vacationPay, locale)}</span>
            </li>
            <li>
              {es ? "Antigüedad" : "Tenure"}: <span className="text-bone">{result.tenureYears.toFixed(2)} {es ? "años" : "years"}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Estimación educativa. Consulta un laboralista o tu convenio — caps y bases varían."
              : "Educational estimate. Check a labour lawyer or your convenio — caps and bases vary."}
          </p>
        </ResultBlock>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce valores válidos." : "Enter valid values."}</p>
      )}
    </ToolShell>
  );
}
