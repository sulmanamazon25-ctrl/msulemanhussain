"use client";

import { useMemo, useState } from "react";
import { Field, ToolShell, inputClass } from "./tool-ui";

const DEALS = [
  { id: "amazon", name: "Amazon", tags: ["tech", "home", "codes"], url: "https://www.amazon.es/", en: "Marketplace deals & Lightning offers", es: "Ofertas y Lightning Deals" },
  { id: "pccomponentes", name: "PcComponentes", tags: ["tech"], url: "https://www.pccomponentes.com/", en: "ES tech promos & outlet", es: "Promos tech y outlet ES" },
  { id: "mediamarkt", name: "MediaMarkt", tags: ["tech", "home"], url: "https://www.mediamarkt.es/", en: "Electronics weekly offers", es: "Ofertas semanales electrónica" },
  { id: "elcorteingles", name: "El Corte Inglés", tags: ["fashion", "home", "codes"], url: "https://www.elcorteingles.es/", en: "Department store campaigns", es: "Campañas de grandes almacenes" },
  { id: "carrefour", name: "Carrefour", tags: ["food", "home"], url: "https://www.carrefour.es/", en: "Grocery + non-food promos", es: "Súper y no alimentación" },
  { id: "aliexpress", name: "AliExpress", tags: ["tech", "codes"], url: "https://es.aliexpress.com/", en: "Coupon events & choice deals", es: "Cupones y Choice" },
  { id: "booking", name: "Booking", tags: ["travel", "codes"], url: "https://www.booking.com/", en: "Genius discounts on stays", es: "Descuentos Genius en estancias" },
  { id: "renfe", name: "Renfe", tags: ["travel"], url: "https://www.renfe.com/", en: "Train promos & AVLO", es: "Promos tren y AVLO" },
  { id: "decathlon", name: "Decathlon", tags: ["sport"], url: "https://www.decathlon.es/", en: "Sport gear sales", es: "Rebajas material deportivo" },
  { id: "ikea", name: "IKEA", tags: ["home"], url: "https://www.ikea.com/es/es/", en: "Home furnishing offers", es: "Ofertas hogar" },
];

export function SmartDealFinder({ locale }: { locale: "en" | "es" }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const es = locale === "es";

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DEALS.filter((d) => {
      const tagOk = tag === "all" || d.tags.includes(tag);
      const text = `${d.name} ${d.en} ${d.es} ${d.tags.join(" ")}`.toLowerCase();
      return tagOk && (!query || text.includes(query));
    });
  }, [q, tag]);

  return (
    <ToolShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={es ? "Buscar tienda o categoría" : "Search store or category"}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={es ? "tech, travel, cupones…" : "tech, travel, codes…"} className={inputClass} />
        </Field>
        <Field label={es ? "Filtro" : "Filter"}>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className={inputClass}>
            <option value="all">{es ? "Todas" : "All"}</option>
            <option value="tech">Tech</option>
            <option value="home">{es ? "Hogar" : "Home"}</option>
            <option value="fashion">{es ? "Moda" : "Fashion"}</option>
            <option value="food">{es ? "Comida" : "Food"}</option>
            <option value="travel">{es ? "Viajes" : "Travel"}</option>
            <option value="sport">{es ? "Deporte" : "Sport"}</option>
            <option value="codes">{es ? "Cupones" : "Promo codes"}</option>
          </select>
        </Field>
      </div>
      <ul className="mt-6 divide-y divide-white/10 border border-white/10">
        {list.map((d) => (
          <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="font-semibold text-bone">{d.name}</p>
              <p className="text-sm text-bone-dim">{es ? d.es : d.en}</p>
            </div>
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-phosphor/40 px-3 py-1.5 text-xs font-semibold text-phosphor hover:bg-phosphor/10"
            >
              {es ? "Abrir →" : "Open →"}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-bone-faint">
        {es
          ? "Directorio gratuito de sitios con ofertas frecuentes. No scrapea precios en vivo ni cupones garantizados."
          : "Free directory of stores with frequent deals. Does not scrape live prices or guarantee coupons."}
      </p>
    </ToolShell>
  );
}
