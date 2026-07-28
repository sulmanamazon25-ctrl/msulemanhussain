"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, moneyFx, parseNum } from "./tool-ui";

const CATEGORIES = [
  { id: "fashion", rate: 0.12, en: "Fashion / apparel (~12%)", es: "Moda / ropa (~12%)" },
  { id: "electronics", rate: 0.08, en: "Electronics (~8%)", es: "Electrónica (~8%)" },
  { id: "beauty", rate: 0.15, en: "Beauty (~15%)", es: "Belleza (~15%)" },
  { id: "home", rate: 0.1, en: "Home & living (~10%)", es: "Hogar (~10%)" },
  { id: "custom", rate: 0.1, en: "Custom %", es: "% personalizado" },
] as const;

const COURIERS = [
  { id: "tcs", fee: 180, en: "TCS-style (~Rs 180)", es: "Estilo TCS (~Rs 180)" },
  { id: "leopard", fee: 160, en: "Leopard-style (~Rs 160)", es: "Estilo Leopard (~Rs 160)" },
  { id: "trax", fee: 170, en: "Trax-style (~Rs 170)", es: "Estilo Trax (~Rs 170)" },
  { id: "custom", fee: 0, en: "Custom courier fee", es: "Courier personalizado" },
] as const;

export function DarazProfitCalculator({ locale }: { locale: "en" | "es" }) {
  const [price, setPrice] = useState("2499");
  const [cogs, setCogs] = useState("1100");
  const [pack, setPack] = useState("40");
  const [cat, setCat] = useState("fashion");
  const [customRate, setCustomRate] = useState("10");
  const [courier, setCourier] = useState("tcs");
  const [customCourier, setCustomCourier] = useState("200");
  const [sellerPaysShip, setSellerPaysShip] = useState(true);
  const es = locale === "es";

  const result = useMemo(() => {
    const selling = parseNum(price);
    const cost = parseNum(cogs);
    const packaging = parseNum(pack);
    if (![selling, cost, packaging].every(Number.isFinite) || selling < 0) return null;
    const catRow = CATEGORIES.find((c) => c.id === cat) ?? CATEGORIES[0];
    const commissionRate = cat === "custom" ? (parseNum(customRate) || 0) / 100 : catRow.rate;
    const commission = selling * commissionRate;
    const courierRow = COURIERS.find((c) => c.id === courier) ?? COURIERS[0];
    const ship = courier === "custom" ? parseNum(customCourier) || 0 : courierRow.fee;
    const shipCost = sellerPaysShip ? ship : 0;
    const net = selling - cost - packaging - commission - shipCost;
    const margin = selling > 0 ? net / selling : 0;
    return { selling, cost, packaging, commission, commissionRate, shipCost, net, margin };
  }, [price, cogs, pack, cat, customRate, courier, customCourier, sellerPaysShip]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={es ? "Precio de venta (PKR)" : "Selling price (PKR)"}>
          <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Coste producto (PKR)" : "Product cost / COGS (PKR)"}>
          <input type="number" min={0} value={cogs} onChange={(e) => setCogs(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Embalaje (PKR)" : "Packaging (PKR)"}>
          <input type="number" min={0} value={pack} onChange={(e) => setPack(e.target.value)} className={inputClass} />
        </Field>
        <Field label={es ? "Categoría / comisión" : "Category / commission"}>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {es ? c.es : c.en}
              </option>
            ))}
          </select>
        </Field>
        {cat === "custom" ? (
          <Field label={es ? "Comisión %" : "Commission %"}>
            <input type="number" min={0} max={100} step="0.1" value={customRate} onChange={(e) => setCustomRate(e.target.value)} className={inputClass} />
          </Field>
        ) : null}
        <Field label={es ? "Courier" : "Courier"}>
          <select value={courier} onChange={(e) => setCourier(e.target.value)} className={inputClass}>
            {COURIERS.map((c) => (
              <option key={c.id} value={c.id}>
                {es ? c.es : c.en}
              </option>
            ))}
          </select>
        </Field>
        {courier === "custom" ? (
          <Field label={es ? "Fee courier (PKR)" : "Courier fee (PKR)"}>
            <input type="number" min={0} value={customCourier} onChange={(e) => setCustomCourier(e.target.value)} className={inputClass} />
          </Field>
        ) : null}
        <Field label={es ? "¿Quién paga envío?" : "Who pays shipping?"}>
          <select
            value={sellerPaysShip ? "seller" : "buyer"}
            onChange={(e) => setSellerPaysShip(e.target.value === "seller")}
            className={inputClass}
          >
            <option value="seller">{es ? "Seller (resta del margen)" : "Seller (hits your margin)"}</option>
            <option value="buyer">{es ? "Buyer / incluido en precio" : "Buyer / baked into price"}</option>
          </select>
        </Field>
      </div>
      {result ? (
        <ResultBlock eyebrow={es ? "MARGEN NETO" : "NET MARGIN"} title={moneyFx(result.net, "PKR")}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Comisión" : "Commission"} ({(result.commissionRate * 100).toFixed(1)}%):{" "}
              <span className="text-bone">−{moneyFx(result.commission, "PKR")}</span>
            </li>
            <li>
              {es ? "Courier cargado" : "Courier charged"}:{" "}
              <span className="text-bone">−{moneyFx(result.shipCost, "PKR")}</span>
            </li>
            <li>
              {es ? "Margen %" : "Margin %"}: <span className="text-bone">{(result.margin * 100).toFixed(1)}%</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? "Antes de anuncios, devoluciones e impuestos. Confirma tasas en Seller Center."
              : "Before ads, returns, and tax. Confirm rates in Seller Center."}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}
