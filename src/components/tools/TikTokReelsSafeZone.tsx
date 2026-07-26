"use client";

import { useCallback, useState } from "react";
import { externalProductUrls } from "@/content/growth-links";

type Platform = "tiktok" | "reels";

export function TikTokReelsSafeZone({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [preview, setPreview] = useState<string | null>(null);

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
        <div className="flex flex-wrap gap-2">
          {(["tiktok", "reels"] as Platform[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={
                platform === p
                  ? "bg-[#3d8bff] px-4 py-2 text-sm font-semibold text-ink"
                  : "border border-white/20 px-4 py-2 text-sm font-semibold hover:border-phosphor"
              }
            >
              {p === "tiktok" ? "TikTok" : "Instagram Reels"}
            </button>
          ))}
        </div>

        <label className="mt-4 block text-sm text-bone-dim">
          {es ? "Imagen opcional (frame / póster)" : "Optional image (frame / poster)"}
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full text-sm text-bone file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-bone"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="mt-6 flex justify-center">
          <div
            className="relative w-[220px] overflow-hidden border border-white/15 bg-ink sm:w-[260px]"
            style={{ aspectRatio: "9 / 16" }}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink-2 to-ink-4 px-4 text-center text-xs text-bone-faint">
                {es ? "Sube un frame o deja el escenario vacío" : "Upload a frame or keep the blank stage"}
              </div>
            )}

            {/* Top chrome */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-black/45" />
            <div className="pointer-events-none absolute left-2 top-2 font-mono text-[8px] text-white/80">
              {es ? "barra superior" : "top chrome"}
            </div>

            {/* Bottom caption / CTA */}
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 bg-black/50 ${
                platform === "tiktok" ? "h-[22%]" : "h-[20%]"
              }`}
            />
            <div className="pointer-events-none absolute bottom-3 left-2 right-14 space-y-1">
              <div className="h-2 w-3/4 rounded-sm bg-white/35" />
              <div className="h-2 w-1/2 rounded-sm bg-white/25" />
              <p className="font-mono text-[8px] text-white/70">
                {es ? "zona caption / CTA" : "caption / CTA zone"}
              </p>
            </div>

            {/* Side action rail */}
            <div
              className={`pointer-events-none absolute bottom-[24%] flex w-9 flex-col items-center gap-2 ${
                platform === "tiktok" ? "right-1.5" : "right-1"
              }`}
            >
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="h-6 w-6 rounded-full bg-white/30" />
              ))}
              <p className="rotate-180 font-mono text-[7px] text-white/60 [writing-mode:vertical-rl]">
                {es ? "acciones" : "actions"}
              </p>
            </div>

            {/* Center safe hint */}
            <div className="pointer-events-none absolute inset-x-[12%] top-[18%] bottom-[28%] border border-dashed border-phosphor/50" />
            <p className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 font-mono text-[9px] text-phosphor">
              {es ? "zona segura" : "safe zone"}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-bone-faint">
          {es
            ? "Overlays orientativos — verifica siempre en el dispositivo real."
            : "Approximate overlays — always spot-check on a real device."}
        </p>
      </div>

      <aside className="border border-[#3d8bff]/35 bg-[#3d8bff]/10 p-5 md:p-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#3d8bff]">DOWNITX</p>
        <p className="mt-2 font-display text-lg font-semibold text-bone md:text-xl">
          {es
            ? "¿Cortas Long→Short a escala? DownitX añade colas bulk y clips con subtítulos."
            : "Cutting Long→Short at scale? DownitX adds bulk queues and captioned clips."}
        </p>
        <a
          href={externalProductUrls.downitx}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-[#3d8bff] px-4 py-2.5 text-sm font-semibold text-ink hover:brightness-110"
        >
          {es ? "Abrir DownitX →" : "Open DownitX →"}
        </a>
      </aside>
    </div>
  );
}
