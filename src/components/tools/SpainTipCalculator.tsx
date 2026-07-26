"use client";

import { useMemo, useState } from "react";

type Venue = "cafe" | "restaurant" | "fine" | "taxi" | "hotel";

const RATES: Record<Venue, { min: number; max: number; labelEn: string; labelEs: string }> = {
  cafe: { min: 0.02, max: 0.05, labelEn: "Café / bar", labelEs: "Café / bar" },
  restaurant: { min: 0.05, max: 0.1, labelEn: "Restaurant", labelEs: "Restaurante" },
  fine: { min: 0.08, max: 0.12, labelEn: "Fine dining", labelEs: "Alta cocina" },
  taxi: { min: 0.05, max: 0.1, labelEn: "Taxi", labelEs: "Taxi" },
  hotel: { min: 0.05, max: 0.1, labelEn: "Hotel", labelEs: "Hotel" },
};

export function SpainTipCalculator({ locale }: { locale: "en" | "es" }) {
  const [bill, setBill] = useState("45");
  const [venue, setVenue] = useState<Venue>("restaurant");
  const es = locale === "es";

  const result = useMemo(() => {
    const amount = Number.parseFloat(bill.replace(",", "."));
    if (!Number.isFinite(amount) || amount < 0) return null;
    const rate = RATES[venue];
    const minTip = amount * rate.min;
    const maxTip = amount * rate.max;
    return {
      minTip,
      maxTip,
      minTotal: amount + minTip,
      maxTotal: amount + maxTip,
      minPct: rate.min * 100,
      maxPct: rate.max * 100,
    };
  }, [bill, venue]);

  return (
    <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-bone-dim">
          {es ? "Importe de la cuenta (€)" : "Bill amount (€)"}
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          />
        </label>
        <label className="block text-sm text-bone-dim">
          {es ? "Tipo de local" : "Venue type"}
          <select
            value={venue}
            onChange={(e) => setVenue(e.target.value as Venue)}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          >
            {(Object.keys(RATES) as Venue[]).map((key) => (
              <option key={key} value={key}>
                {es ? RATES[key].labelEs : RATES[key].labelEn}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
            {es ? "PROPINA SUGERIDA" : "SUGGESTED TIP"}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-phosphor">
            €{result.minTip.toFixed(2)} – €{result.maxTip.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-bone-dim">
            {result.minPct.toFixed(0)}–{result.maxPct.toFixed(0)}% ·{" "}
            {es ? "Total a pagar" : "Total to pay"}: €{result.minTotal.toFixed(2)} – €
            {result.maxTotal.toFixed(2)}
          </p>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Orientativo. En España la propina es opcional; ajusta según el servicio."
              : "Guidance only. Tipping in Spain is optional — adjust for service quality."}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-amber">{es ? "Introduce un importe válido." : "Enter a valid amount."}</p>
      )}
    </div>
  );
}
