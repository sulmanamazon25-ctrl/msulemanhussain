"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, parseNum } from "./tool-ui";

function bmrMifflin(sex: "m" | "f", kg: number, cm: number, age: number) {
  return sex === "m" ? 10 * kg + 6.25 * cm - 5 * age + 5 : 10 * kg + 6.25 * cm - 5 * age - 161;
}

const ACTIVITY: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

export function DietPlanner({ locale }: { locale: "en" | "es" }) {
  const [sex, setSex] = useState<"m" | "f">("m");
  const [age, setAge] = useState("30");
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("75");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const es = locale === "es";

  const result = useMemo(() => {
    const a = parseNum(age);
    const h = parseNum(cm);
    const w = parseNum(kg);
    if (![a, h, w].every((n) => Number.isFinite(n) && n > 0)) return null;
    const bmr = bmrMifflin(sex, w, h, a);
    const tdee = bmr * (ACTIVITY[activity] ?? 1.55);
    const target = goal === "lose" ? tdee - 400 : goal === "gain" ? tdee + 300 : tdee;
    const protein = w * (goal === "lose" ? 1.8 : 1.6);
    const fat = (target * 0.25) / 9;
    const carbs = (target - protein * 4 - fat * 9) / 4;
    const bmi = w / ((h / 100) ** 2);
    const water = w * 0.035;
    return { bmr, tdee, target, protein, fat, carbs, bmi, water };
  }, [sex, age, cm, kg, activity, goal]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={es ? "Sexo" : "Sex"}>
          <select value={sex} onChange={(e) => setSex(e.target.value as "m" | "f")} className={inputClass}>
            <option value="m">{es ? "Hombre" : "Male"}</option>
            <option value="f">{es ? "Mujer" : "Female"}</option>
          </select>
        </Field>
        <Field label={es ? "Edad" : "Age"}>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Altura (cm)" : "Height (cm)"}>
          <input type="number" value={cm} onChange={(e) => setCm(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Peso (kg)" : "Weight (kg)"}>
          <input type="number" value={kg} onChange={(e) => setKg(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Actividad" : "Activity"}>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className={inputClass}>
            <option value="sedentary">{es ? "Sedentario" : "Sedentary"}</option>
            <option value="light">{es ? "Ligera" : "Light"}</option>
            <option value="moderate">{es ? "Moderada" : "Moderate"}</option>
            <option value="active">{es ? "Alta" : "Active"}</option>
            <option value="athlete">{es ? "Atleta" : "Athlete"}</option>
          </select>
        </Field>
        <Field label={es ? "Objetivo" : "Goal"}>
          <select value={goal} onChange={(e) => setGoal(e.target.value as typeof goal)} className={inputClass}>
            <option value="lose">{es ? "Perder grasa" : "Lose fat"}</option>
            <option value="maintain">{es ? "Mantener" : "Maintain"}</option>
            <option value="gain">{es ? "Ganar músculo" : "Gain muscle"}</option>
          </select>
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "CALORÍAS OBJETIVO" : "TARGET CALORIES"} title={`${Math.round(result.target)} kcal`}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              BMR: <span className="text-bone">{Math.round(result.bmr)}</span> · TDEE: <span className="text-bone">{Math.round(result.tdee)}</span>
            </li>
            <li>
              {es ? "Macros" : "Macros"}: P {Math.round(result.protein)}g · F {Math.round(result.fat)}g · C {Math.round(result.carbs)}g
            </li>
            <li>
              BMI: <span className="text-bone">{result.bmi.toFixed(1)}</span> · {es ? "Agua" : "Water"} ≈ {result.water.toFixed(1)} L
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Mifflin-St Jeor orientativo. No es consejo médico."
              : "Mifflin–St Jeor guidance. Not medical advice."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
