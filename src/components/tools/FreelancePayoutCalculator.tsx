"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, moneyFx, parseNum } from "./tool-ui";

type Platform = "upwork_flat" | "upwork_tiered" | "fiverr";
type Withdrawal = "payoneer" | "wire" | "wise";

export function FreelancePayoutCalculator({ locale }: { locale: "en" | "es" }) {
  const [amount, setAmount] = useState("500");
  const [platform, setPlatform] = useState<Platform>("upwork_flat");
  const [lifetime, setLifetime] = useState("0");
  const [usdToPkr, setUsdToPkr] = useState("278.5");
  const [spread, setSpread] = useState("2.5");
  const [withdrawal, setWithdrawal] = useState<Withdrawal>("payoneer");
  const es = locale === "es";

  const result = useMemo(() => {
    const gross = parseNum(amount);
    const rate = parseNum(usdToPkr);
    const bankSpread = parseNum(spread);
    const billed = parseNum(lifetime);
    if (![gross, rate, bankSpread].every(Number.isFinite) || gross < 0 || rate <= 0) return null;

    let feeRate = 0.1;
    if (platform === "fiverr") feeRate = 0.2;
    else if (platform === "upwork_tiered") {
      const next = billed + gross;
      if (billed >= 10000) feeRate = 0.05;
      else if (next <= 500) feeRate = 0.2;
      else if (billed >= 500) feeRate = 0.1;
      else {
        // Blend first $500 at 20%, rest at 10% within this invoice
        const at20 = Math.max(0, 500 - billed);
        const at10 = Math.max(0, gross - at20);
        const fee = at20 * 0.2 + at10 * 0.1;
        feeRate = gross > 0 ? fee / gross : 0.1;
      }
    }

    const platformFee = gross * feeRate;
    const afterPlatform = gross - platformFee;
    const withdrawFee = withdrawal === "payoneer" ? 2 : withdrawal === "wire" ? 0.99 : 1.5;
    const netUsd = Math.max(0, afterPlatform - withdrawFee);
    const effective = Math.max(0, rate - bankSpread);
    const netPkr = netUsd * effective;

    return { feeRate, platformFee, afterPlatform, withdrawFee, netUsd, effective, netPkr, gross };
  }, [amount, platform, lifetime, usdToPkr, spread, withdrawal]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={es ? "Importe del proyecto (USD)" : "Project amount (USD)"}>
          <input type="number" min={0} step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Plataforma / fee" : "Platform / fee model"}>
          <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className={inputClass}>
            <option value="upwork_flat">{es ? "Upwork ~10% fijo" : "Upwork ~10% flat"}</option>
            <option value="upwork_tiered">{es ? "Upwork tramos 20/10/5%" : "Upwork tiered 20/10/5%"}</option>
            <option value="fiverr">{es ? "Fiverr 20%" : "Fiverr 20%"}</option>
          </select>
        </Field>
        {platform === "upwork_tiered" ? (
          <Field label={es ? "Facturado previo con cliente (USD)" : "Prior billings with client (USD)"}>
            <input type="number" min={0} step="1" value={lifetime} onChange={(e) => setLifetime(e.target.value)} className={inputClass} />
          </Field>
        ) : null}
        <Field label={es ? "Tipo interbancario USD/PKR" : "Interbank USD/PKR rate"}>
          <input type="number" min={0} step="0.01" value={usdToPkr} onChange={(e) => setUsdToPkr(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Spread banco / wallet (PKR)" : "Bank / wallet spread (PKR)"}>
          <input type="number" min={0} step="0.1" value={spread} onChange={(e) => setSpread(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Ruta de retiro" : "Withdrawal route"}>
          <select value={withdrawal} onChange={(e) => setWithdrawal(e.target.value as Withdrawal)} className={inputClass}>
            <option value="payoneer">Payoneer (~$2)</option>
            <option value="wire">{es ? "Wire a banco PK (~$0.99)" : "Wire to PK bank (~$0.99)"}</option>
            <option value="wise">Wise / other (~$1.50)</option>
          </select>
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "DEPÓSITO ESTIMADO" : "ESTIMATED DEPOSIT"} title={moneyFx(result.netPkr, "PKR")}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Bruto" : "Gross"}: <span className="text-bone">{moneyFx(result.gross, "USD")}</span>
            </li>
            <li>
              {es ? "Fee plataforma" : "Platform fee"} ({(result.feeRate * 100).toFixed(1)}%):{" "}
              <span className="text-bone">−{moneyFx(result.platformFee, "USD")}</span>
            </li>
            <li>
              {es ? "Retiro" : "Withdrawal"}: <span className="text-bone">−{moneyFx(result.withdrawFee, "USD")}</span>
            </li>
            <li>
              {es ? "Neto USD" : "Net USD"}: <span className="text-bone">{moneyFx(result.netUsd, "USD")}</span>
            </li>
            <li>
              {es ? "Tipo efectivo" : "Effective rate"}:{" "}
              <span className="text-bone">Rs. {result.effective.toFixed(2)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Orientativo. Fees reales de Upwork/Fiverr y FX bancario pueden diferir."
              : "Orientative. Real Upwork/Fiverr fees and bank FX can differ."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
