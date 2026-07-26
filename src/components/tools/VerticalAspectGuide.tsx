"use client";

import { useMemo, useState } from "react";
import { externalProductUrls } from "@/content/growth-links";

type FormatId = "tiktok" | "reels" | "shorts" | "feed45" | "square";

const FORMATS: Record<
  FormatId,
  { ratio: string; w: number; h: number; labelEn: string; labelEs: string; noteEn: string; noteEs: string }
> = {
  tiktok: {
    ratio: "9:16",
    w: 9,
    h: 16,
    labelEn: "TikTok",
    labelEs: "TikTok",
    noteEn: "Full-screen short-form. Export vertical.",
    noteEs: "Short-form a pantalla completa. Exporta vertical.",
  },
  reels: {
    ratio: "9:16",
    w: 9,
    h: 16,
    labelEn: "Instagram Reels",
    labelEs: "Instagram Reels",
    noteEn: "Same vertical canvas as TikTok for full-bleed Reels.",
    noteEs: "Mismo canvas vertical que TikTok para Reels a pantalla completa.",
  },
  shorts: {
    ratio: "9:16",
    w: 9,
    h: 16,
    labelEn: "YouTube Shorts",
    labelEs: "YouTube Shorts",
    noteEn: "Vertical Shorts — keep UI chrome in mind for captions.",
    noteEs: "Shorts verticales — ten en cuenta el chrome para subtítulos.",
  },
  feed45: {
    ratio: "4:5",
    w: 4,
    h: 5,
    labelEn: "Instagram feed 4:5",
    labelEs: "Feed Instagram 4:5",
    noteEn: "Often stronger than 1:1 in feed for portraits.",
    noteEs: "Suele rendir mejor que 1:1 en feed para retratos.",
  },
  square: {
    ratio: "1:1",
    w: 1,
    h: 1,
    labelEn: "Square 1:1",
    labelEs: "Cuadrado 1:1",
    noteEn: "Legacy feed / carousels. Fine for product grids.",
    noteEs: "Feed legacy / carruseles. Vale para grids de producto.",
  },
};

export function VerticalAspectGuide({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const [format, setFormat] = useState<FormatId>("tiktok");
  const f = FORMATS[format];

  const boxStyle = useMemo(() => {
    const maxW = 220;
    const maxH = 320;
    const scale = Math.min(maxW / f.w, maxH / f.h);
    return { width: Math.round(f.w * scale), height: Math.round(f.h * scale) };
  }, [f.h, f.w]);

  return (
    <div className="space-y-4">
      <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">
        <p className="text-sm text-bone-dim">{es ? "Formato destino" : "Target format"}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(FORMATS) as FormatId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFormat(id)}
              className={
                format === id
                  ? "bg-[#3d8bff] px-3 py-2 text-xs font-semibold text-ink sm:text-sm"
                  : "border border-white/20 px-3 py-2 text-xs font-semibold hover:border-phosphor sm:text-sm"
              }
            >
              {es ? FORMATS[id].labelEs : FORMATS[id].labelEn}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div
            className="flex items-center justify-center border border-[#3d8bff]/50 bg-[#3d8bff]/10"
            style={boxStyle}
          >
            <span className="font-mono text-sm font-semibold text-[#3d8bff]">{f.ratio}</span>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">
              {es ? "RATIO" : "RATIO"}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-bone">{f.ratio}</p>
            <p className="mt-3 max-w-sm text-sm text-bone-dim">{es ? f.noteEs : f.noteEn}</p>
            <p className="mt-4 font-mono text-xs text-phosphor">
              {es ? FORMATS[format].labelEs : FORMATS[format].labelEn}
            </p>
          </div>
        </div>
      </div>

      <aside className="border border-[#3d8bff]/35 bg-[#3d8bff]/10 p-5 md:p-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#3d8bff]">DOWNITX</p>
        <p className="mt-2 text-sm text-bone-dim">
          {es
            ? "Exporta al ratio correcto, luego escala con bulk + Long→Short en DownitX."
            : "Export the right ratio, then scale with bulk + Long→Short in DownitX."}
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
