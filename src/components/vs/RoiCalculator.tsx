"use client";

import { useState } from "react";
import type { RoiConfig } from "@/types/comparison";

type Props = {
  roi: RoiConfig;
  ourName: string;
  competitorName: string;
  accent: string;
};

function money(n: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function RoiCalculator({ roi, ourName, competitorName, accent }: Props) {
  const [value, setValue] = useState(roi.defaultValue);
  const competitorTotal = value * roi.competitorCostPerUnit;
  const ourTotal = value * roi.ourCostPerUnit;
  const savings = Math.max(0, competitorTotal - ourTotal);

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <label htmlFor="roi-input" className="block font-mono text-[11px] tracking-[0.2em] text-phosphor">
        {roi.inputLabel}
      </label>
      <div className="mt-4 flex flex-wrap items-end gap-4">
        <input
          id="roi-input"
          type="range"
          min={roi.min}
          max={roi.max}
          step={roi.step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="h-2 w-full max-w-md cursor-pointer accent-[var(--roi-accent)]"
          style={{ ["--roi-accent" as string]: accent }}
        />
        <p className="font-display text-2xl font-bold tabular-nums" style={{ color: accent }}>
          {value.toLocaleString()}{" "}
          <span className="text-sm font-normal text-bone-dim">{roi.inputUnit}</span>
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 p-4">
          <p className="text-xs text-bone-dim">{competitorName}</p>
          <p className="mt-2 font-display text-xl font-bold tabular-nums">
            {money(competitorTotal, roi.currency)}
          </p>
        </div>
        <div className="border border-white/10 p-4" style={{ borderColor: `${accent}55` }}>
          <p className="text-xs" style={{ color: accent }}>
            {ourName}
          </p>
          <p className="mt-2 font-display text-xl font-bold tabular-nums" style={{ color: accent }}>
            {money(ourTotal, roi.currency)}
          </p>
        </div>
        <div className="border border-phosphor/30 bg-phosphor/5 p-4">
          <p className="text-xs text-phosphor">{roi.resultLabel}</p>
          <p className="mt-2 font-display text-xl font-bold tabular-nums text-phosphor">
            {money(savings, roi.currency)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-bone-dim">{roi.note}</p>
    </div>
  );
}
