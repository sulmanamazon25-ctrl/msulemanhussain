"use client";

import { useCallback, useState } from "react";
import { externalProductUrls } from "@/content/growth-links";

type Fit = "contain" | "cover";

export function Pinterest23Canvas({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const [preview, setPreview] = useState<string | null>(null);
  const [fit, setFit] = useState<Fit>("contain");
  const [showSafe, setShowSafe] = useState(true);

  const onFile = useCallback((file: File | null) => {
    if (!file || !file.type.startsWith("image/")) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="space-y-4">
      <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
        <label className="block text-sm text-bone-dim">
          {es ? "Imagen del pin" : "Pin image"}
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full text-sm text-bone file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-bone"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["contain", "cover"] as Fit[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFit(mode)}
              className={
                fit === mode
                  ? "bg-[#e60023] px-4 py-2 text-sm font-semibold text-bone"
                  : "border border-white/20 px-4 py-2 text-sm font-semibold hover:border-phosphor"
              }
            >
              {mode === "contain" ? (es ? "Contain" : "Contain") : es ? "Cover" : "Cover"}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowSafe((v) => !v)}
            className="border border-white/20 px-4 py-2 text-sm font-semibold hover:border-phosphor"
          >
            {showSafe
              ? es
                ? "Ocultar guía título"
                : "Hide title guide"
              : es
                ? "Mostrar guía título"
                : "Show title guide"}
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <div
            className="relative w-[220px] overflow-hidden border border-white/15 bg-ink sm:w-[280px]"
            style={{ aspectRatio: "2 / 3" }}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink-2 to-ink-4 px-4 text-center text-xs text-bone-faint">
                {es ? "Sube un pin para previsualizar 2:3" : "Upload a pin to preview 2:3"}
              </div>
            )}
            {showSafe ? (
              <>
                <div className="pointer-events-none absolute inset-x-[8%] top-[10%] bottom-[12%] border border-dashed border-phosphor/55" />
                <p className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 font-mono text-[9px] text-phosphor">
                  {es ? "título seguro" : "title-safe"}
                </p>
              </>
            ) : null}
          </div>
        </div>
        <p className="mt-4 text-xs text-bone-faint">
          {es ? "Ratio estándar Pinterest: 2:3 (p. ej. 1000×1500)." : "Pinterest standard ratio: 2:3 (e.g. 1000×1500)."}
        </p>
      </div>

      <aside className="border border-[#e60023]/35 bg-[#e60023]/10 p-5 md:p-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#e60023]">PINQUILL</p>
        <p className="mt-2 font-display text-lg font-semibold text-bone md:text-xl">
          {es
            ? "¿Publicas pines a escala? PinQuill ayuda a componer y publicar más rápido."
            : "Publishing pins at scale? PinQuill helps you compose and ship faster."}
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
