"use client";

import { useMemo, useRef, useState } from "react";
import { Field, ToolShell, inputClass, moneyFx, parseNum } from "./tool-ui";

type Currency = "PKR" | "USD" | "AED";

type Line = { desc: string; qty: string; rate: string };

export function PakistanInvoiceGenerator({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const printRef = useRef<HTMLDivElement>(null);
  const [fromName, setFromName] = useState(es ? "Tu Nombre / Agencia" : "Your Name / Agency");
  const [fromEmail, setFromEmail] = useState("you@email.com");
  const [fromPhone, setFromPhone] = useState("+92 300 0000000");
  const [bank, setBank] = useState("Meezan Bank · IBAN PK00… · JazzCash 03xx…");
  const [toName, setToName] = useState(es ? "Cliente / Empresa" : "Client / Company");
  const [toEmail, setToEmail] = useState("client@email.com");
  const [invoiceNo, setInvoiceNo] = useState(`INV-${new Date().getFullYear()}-001`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState<Currency>("USD");
  const [notes, setNotes] = useState(
    es ? "Pago en 7 días. Gracias por tu negocio." : "Payment due in 7 days. Thank you for your business.",
  );
  const [lines, setLines] = useState<Line[]>([
    { desc: es ? "Servicios freelance" : "Freelance services", qty: "1", rate: "500" },
  ]);

  const totals = useMemo(() => {
    const rows = lines.map((l) => {
      const qty = parseNum(l.qty) || 0;
      const rate = parseNum(l.rate) || 0;
      return { ...l, qty, rate, amount: qty * rate };
    });
    const subtotal = rows.reduce((s, r) => s + r.amount, 0);
    return { rows, subtotal };
  }, [lines]);

  function updateLine(i: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }

  function printPdf() {
    const node = printRef.current;
    if (!node) return;
    const w = window.open("", "_blank", "noopener,noreferrer,width=800,height=900");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>${invoiceNo}</title>
      <style>
        body{font-family:system-ui,sans-serif;color:#111;padding:32px;max-width:720px;margin:0 auto}
        h1{font-size:22px;margin:0 0 4px} .muted{color:#555;font-size:13px}
        table{width:100%;border-collapse:collapse;margin-top:24px}
        th,td{border-bottom:1px solid #ddd;padding:8px;text-align:left;font-size:13px}
        th{background:#f5f5f5} .right{text-align:right} .total{font-size:18px;font-weight:700;margin-top:16px}
        @media print{body{padding:0}}
      </style></head><body>${node.innerHTML}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  }

  return (
    <ToolShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={es ? "De (tú)" : "From (you)"}>
              <input value={fromName} onChange={(e) => setFromName(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Email" : "Email"}>
              <input value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Teléfono" : "Phone"}>
              <input value={fromPhone} onChange={(e) => setFromPhone(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Banco / JazzCash / IBAN" : "Bank / JazzCash / IBAN"}>
              <input value={bank} onChange={(e) => setBank(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Cliente" : "Bill to"}>
              <input value={toName} onChange={(e) => setToName(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Email cliente" : "Client email"}>
              <input value={toEmail} onChange={(e) => setToEmail(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Nº factura" : "Invoice #"}>
              <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Fecha" : "Date"}>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Moneda" : "Currency"}>
              <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className={inputClass}>
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="AED">AED</option>
              </select>
            </Field>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-bone-dim">{es ? "Líneas" : "Line items"}</p>
            {lines.map((l, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <input
                  className={`${inputClass} col-span-6`}
                  value={l.desc}
                  onChange={(e) => updateLine(i, { desc: e.target.value })}
                  placeholder={es ? "Descripción" : "Description"}
                />
                <input
                  className={`${inputClass} col-span-2`}
                  value={l.qty}
                  onChange={(e) => updateLine(i, { qty: e.target.value })}
                  placeholder="Qty"
                />
                <input
                  className={`${inputClass} col-span-3`}
                  value={l.rate}
                  onChange={(e) => updateLine(i, { rate: e.target.value })}
                  placeholder={es ? "Precio" : "Rate"}
                />
                <button
                  type="button"
                  className="col-span-1 border border-white/20 text-xs text-bone-dim hover:text-signal"
                  onClick={() => setLines((p) => p.filter((_, idx) => idx !== i))}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="border border-white/20 px-3 py-2 text-xs font-semibold tracking-wide hover:border-phosphor hover:text-phosphor"
              onClick={() => setLines((p) => [...p, { desc: "", qty: "1", rate: "0" }])}
            >
              {es ? "+ Añadir línea" : "+ Add line"}
            </button>
          </div>
          <Field label={es ? "Notas" : "Notes"}>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={inputClass} />
          </Field>
          <button
            type="button"
            onClick={printPdf}
            className="bg-signal px-4 py-2.5 text-sm font-semibold text-bone hover:bg-signal-hot"
          >
            {es ? "Imprimir / Guardar PDF" : "Print / Save as PDF"}
          </button>
        </div>

        <div className="border border-white/10 bg-bone p-5 text-ink">
          <div ref={printRef}>
            <h1>{es ? "FACTURA" : "INVOICE"}</h1>
            <p className="muted">
              {invoiceNo} · {date}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
              <div>
                <strong>{es ? "De" : "From"}</strong>
                <div>{fromName}</div>
                <div className="muted">{fromEmail}</div>
                <div className="muted">{fromPhone}</div>
                <div className="muted" style={{ marginTop: 8 }}>
                  {bank}
                </div>
              </div>
              <div>
                <strong>{es ? "Para" : "Bill to"}</strong>
                <div>{toName}</div>
                <div className="muted">{toEmail}</div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>{es ? "Descripción" : "Description"}</th>
                  <th className="right">Qty</th>
                  <th className="right">{es ? "Precio" : "Rate"}</th>
                  <th className="right">{es ? "Importe" : "Amount"}</th>
                </tr>
              </thead>
              <tbody>
                {totals.rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.desc || "—"}</td>
                    <td className="right">{r.qty}</td>
                    <td className="right">{moneyFx(r.rate, currency)}</td>
                    <td className="right">{moneyFx(r.amount, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">
              {es ? "Total" : "Total"}: {moneyFx(totals.subtotal, currency)}
            </p>
            <p className="muted" style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
              {notes}
            </p>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
