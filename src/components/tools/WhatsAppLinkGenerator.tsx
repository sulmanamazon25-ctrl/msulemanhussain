"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

const COUNTRY_CODES = [
  { code: "1", label: "US/CA +1" },
  { code: "34", label: "ES +34" },
  { code: "44", label: "UK +44" },
  { code: "49", label: "DE +49" },
  { code: "33", label: "FR +33" },
  { code: "39", label: "IT +39" },
  { code: "351", label: "PT +351" },
  { code: "52", label: "MX +52" },
  { code: "57", label: "CO +57" },
  { code: "54", label: "AR +54" },
  { code: "55", label: "BR +55" },
  { code: "91", label: "IN +91" },
  { code: "971", label: "AE +971" },
  { code: "61", label: "AU +61" },
] as const;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function WhatsAppLinkGenerator({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const [country, setCountry] = useState("34");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    es ? "Hola — te escribo desde tu enlace de WhatsApp." : "Hi — reaching you via your WhatsApp link.",
  );
  const [copied, setCopied] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const e164 = useMemo(() => {
    const local = digitsOnly(phone);
    if (!local) return "";
    return `${digitsOnly(country)}${local}`;
  }, [country, phone]);

  const link = useMemo(() => {
    if (!e164) return "";
    const base = `https://wa.me/${e164}`;
    const trimmed = message.trim();
    if (!trimmed) return base;
    return `${base}?text=${encodeURIComponent(trimmed)}`;
  }, [e164, message]);

  const copyLink = useCallback(async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [link]);

  const downloadPng = useCallback(() => {
    const canvas = canvasWrapRef.current?.querySelector("canvas");
    if (!canvas || !link) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-qr-${e164 || "link"}.png`;
    a.click();
  }, [e164, link]);

  const downloadSvg = useCallback(() => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg || !link) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-qr-${e164 || "link"}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [e164, link]);

  return (
    <div className="space-y-4">
      <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-bone-dim">
            {es ? "Código de país" : "Country code"}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-bone-dim">
            {es ? "Número (sin código de país)" : "Phone number (no country code)"}
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={es ? "612345678" : "612345678"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
            />
          </label>
        </div>

        <label className="mt-4 block text-sm text-bone-dim">
          {es ? "Mensaje precargado (opcional)" : "Pre-filled message (optional)"}
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full resize-y border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
          />
        </label>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
            {es ? "ENLACE WA.ME" : "WA.ME LINK"}
          </p>
          {link ? (
            <>
              <p className="mt-2 break-all font-mono text-sm text-phosphor">{link}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyLink}
                  className="bg-signal px-4 py-2.5 text-sm font-semibold hover:bg-signal-hot"
                >
                  {copied
                    ? es
                      ? "¡Copiado!"
                      : "Copied!"
                    : es
                      ? "Copiar enlace"
                      : "Copy link"}
                </button>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-phosphor hover:text-phosphor"
                >
                  {es ? "Abrir chat" : "Open chat"}
                </a>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-amber">
              {es ? "Introduce un número válido para generar el enlace." : "Enter a valid number to generate the link."}
            </p>
          )}
        </div>

        {link ? (
          <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-[auto_1fr] sm:items-start">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
                {es ? "CÓDIGO QR" : "QR CODE"}
              </p>
              <div
                ref={canvasWrapRef}
                className="mt-3 inline-block border border-white/10 bg-white p-3"
              >
                <QRCodeCanvas value={link} size={180} level="M" includeMargin={false} />
              </div>
              <div ref={svgRef} className="sr-only" aria-hidden>
                <QRCodeSVG value={link} size={180} level="M" includeMargin={false} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={downloadPng}
                  className="border border-white/20 px-3 py-2 text-xs font-semibold hover:border-phosphor hover:text-phosphor"
                >
                  {es ? "Descargar PNG" : "Download PNG"}
                </button>
                <button
                  type="button"
                  onClick={downloadSvg}
                  className="border border-white/20 px-3 py-2 text-xs font-semibold hover:border-phosphor hover:text-phosphor"
                >
                  {es ? "Descargar SVG" : "Download SVG"}
                </button>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-bone-dim">
              {es
                ? "El QR apunta al mismo enlace wa.me. Todo se genera en tu navegador — no enviamos el número a ningún servidor."
                : "The QR encodes the same wa.me link. Everything runs in your browser — we never send the number to a server."}
            </p>
          </div>
        ) : null}
      </div>

      <aside className="border border-[#25d366]/35 bg-[#25d366]/10 p-5 md:p-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#25d366]">WASUP</p>
        <p className="mt-2 font-display text-lg font-semibold text-bone md:text-xl">
          {es
            ? "¿Gestionas leads de WhatsApp a escala? Instala Wasup — tu copiloto de WhatsApp con IA."
            : "Managing incoming WhatsApp leads at scale? Install Wasup — your AI WhatsApp Copilot."}
        </p>
        <p className="mt-2 text-sm text-bone-dim">
          {es
            ? "Borradores locales con aprobación humana y BYOK. Ideal cuando el enlace solo es el primer paso."
            : "Local drafts with human approval and BYOK. Built for when the link is only step one."}
        </p>
        <a
          href="https://wasup.app/es"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-ink hover:brightness-110"
        >
          {es ? "Abrir Wasup →" : "Open Wasup →"}
        </a>
      </aside>
    </div>
  );
}
