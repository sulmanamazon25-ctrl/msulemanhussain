"use client";

import { useMemo, useState } from "react";
import { externalProductUrls } from "@/content/growth-links";

const TITLE_SOFT = 100;
const DESC_SOFT = 500;

function tone(len: number, soft: number) {
  if (len <= soft * 0.85) return "text-phosphor";
  if (len <= soft) return "text-amber";
  return "text-signal";
}

export function PinterestPinCopyLength({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleLen = title.length;
  const descLen = description.length;

  const titleStatus = useMemo(() => {
    if (titleLen === 0) return es ? "Vacío" : "Empty";
    if (titleLen <= TITLE_SOFT) return es ? "Dentro del rango blando" : "Within soft range";
    return es ? "Por encima del objetivo blando" : "Over soft target";
  }, [es, titleLen]);

  const descStatus = useMemo(() => {
    if (descLen === 0) return es ? "Vacío" : "Empty";
    if (descLen <= DESC_SOFT) return es ? "Dentro del rango blando" : "Within soft range";
    return es ? "Por encima del objetivo blando" : "Over soft target";
  }, [descLen, es]);

  return (
    <div className="space-y-4">
      <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
        <label className="block text-sm text-bone-dim">
          {es ? "Título del pin" : "Pin title"}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
            placeholder={es ? "Ej. Guía de ratios para pines 2:3" : "e.g. 2:3 pin ratio guide for creators"}
          />
        </label>
        <p className={`mt-2 font-mono text-xs ${tone(titleLen, TITLE_SOFT)}`}>
          {titleLen} / {TITLE_SOFT} · {titleStatus}
        </p>

        <label className="mt-5 block text-sm text-bone-dim">
          {es ? "Descripción" : "Description"}
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full resize-y border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor"
            placeholder={es ? "Pega la descripción del pin…" : "Paste your pin description…"}
          />
        </label>
        <p className={`mt-2 font-mono text-xs ${tone(descLen, DESC_SOFT)}`}>
          {descLen} / {DESC_SOFT} · {descStatus}
        </p>

        <p className="mt-4 text-xs text-bone-faint">
          {es
            ? "Límites blandos para legibilidad — no son máximos duros de Pinterest."
            : "Soft limits for readability — not hard Pinterest maxima."}
        </p>
      </div>

      <aside className="border border-[#e60023]/35 bg-[#e60023]/10 p-5 md:p-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#e60023]">PINQUILL</p>
        <p className="mt-2 text-sm text-bone-dim">
          {es
            ? "Cuando el copy esté listo, compón y publica más rápido con PinQuill."
            : "When the copy is ready, compose and publish faster with PinQuill."}
        </p>
        <a
          href={externalProductUrls.pinquill}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-[#e60023] px-4 py-2.5 text-sm font-semibold text-bone hover:brightness-110"
        >
          {es ? "Abrir PinQuill →" : "Open PinQuill →"}
        </a>
      </aside>
    </div>
  );
}
