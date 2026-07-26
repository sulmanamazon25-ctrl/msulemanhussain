"use client";

import { useMemo, useState } from "react";

export function MenuDelDiaCalculator({ locale }: { locale: "en" | "es" }) {
  const [menuPrice, setMenuPrice] = useState("14.50");
  const [starter, setStarter] = useState("6");
  const [main, setMain] = useState("12");
  const [drink, setDrink] = useState("2.50");
  const [dessert, setDessert] = useState("4");
  const es = locale === "es";

  const result = useMemo(() => {
    const parse = (v: string) => Number.parseFloat(v.replace(",", "."));
    const menu = parse(menuPrice);
    const aLaCarte = parse(starter) + parse(main) + parse(drink) + parse(dessert);
    if (![menu, aLaCarte].every((n) => Number.isFinite(n) && n >= 0)) return null;
    const saved = aLaCarte - menu;
    const pct = aLaCarte > 0 ? (saved / aLaCarte) * 100 : 0;
    return { menu, aLaCarte, saved, pct };
  }, [menuPrice, starter, main, drink, dessert]);

  const field = (label: string, value: string, onChange: (v: string) => void) => (
    <label className="block text-sm text-bone-dim">
      {label}
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
      />
    </label>
  );

  return (
    <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field(es ? "Precio menú del día (€)" : "Menú del día price (€)", menuPrice, setMenuPrice)}
        {field(es ? "Entrante a la carta (€)" : "Starter à la carte (€)", starter, setStarter)}
        {field(es ? "Principal a la carta (€)" : "Main à la carte (€)", main, setMain)}
        {field(es ? "Bebida a la carta (€)" : "Drink à la carte (€)", drink, setDrink)}
        {field(es ? "Postre a la carta (€)" : "Dessert à la carte (€)", dessert, setDessert)}
      </div>

      {result ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
            {es ? "COMPARACIÓN" : "COMPARISON"}
          </p>
          <p className="mt-2 text-sm text-bone-dim">
            {es ? "A la carta estimado" : "À la carte estimate"}: €{result.aLaCarte.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-bone-dim">
            {es ? "Menú del día" : "Menú del día"}: €{result.menu.toFixed(2)}
          </p>
          <p
            className={`mt-3 font-display text-3xl font-bold ${result.saved >= 0 ? "text-phosphor" : "text-signal"}`}
          >
            {result.saved >= 0 ? "+" : ""}€{result.saved.toFixed(2)}{" "}
            <span className="text-lg text-bone-dim">({result.pct.toFixed(0)}%)</span>
          </p>
          <p className="mt-2 text-sm text-bone-dim">
            {result.saved >= 0
              ? es
                ? "Ahorras con el menú del día."
                : "You save with the menú del día."
              : es
                ? "A la carta sale más barato con estos números."
                : "À la carte is cheaper with these numbers."}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce importes válidos." : "Enter valid amounts."}</p>
      )}
    </div>
  );
}
