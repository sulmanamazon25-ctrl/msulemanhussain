import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { tools } from "@/content/tools";
import { listComparisons } from "@/lib/comparisons";
import { locales } from "@/i18n/config";

/** Prefer content dates when present; fall back to a stable deploy marker. */
const SITE_UPDATED = new Date("2026-08-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  // Indexable hubs only — thin insights/build-log posts & ecosystems are noindex.
  const staticPaths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
    { path: "/vs", priority: 0.85, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.6, changeFrequency: "monthly" },
    { path: "/expertise", priority: 0.8, changeFrequency: "weekly" },
    { path: "/expertise/ai-calling-agents", priority: 0.9, changeFrequency: "weekly" },
    { path: "/expertise/spain-money-guides", priority: 0.9, changeFrequency: "weekly" },
    { path: "/build-log", priority: 0.5, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.5, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: SITE_UPDATED,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${base}/en${path}`,
          es: `${base}/es${path}`,
          "x-default": `${base}/en${path}`,
        },
      },
    })),
  );

  // Products: EN only until Spanish body ships (ES pages are noindex).
  const productRoutes = products
    .filter((p) => p.status !== "COMING SOON")
    .map((p) => ({
      url: `${base}/en/products/${p.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${base}/en/products/${p.slug}`,
          "x-default": `${base}/en/products/${p.slug}`,
        },
      },
    }));

  const toolPriority = (slug: string) => {
    const money = [
      "whatsapp-link-generator",
      "tiktok-reels-safe-zone",
      "vertical-aspect-guide",
      "pinterest-23-canvas",
      "spain-tip-calculator",
      "calculadora-evau-2026",
      "calculadora-iva",
      "calculadora-de-salario",
      "calculadora-de-finiquito",
      "cuota-de-autonomos",
      "calculadora-irpf-retencion",
      "upwork-fiverr-payout-calculator-pakistan",
    ];
    return money.includes(slug) ? 0.8 : 0.55;
  };

  const toolRoutes = locales.flatMap((locale) =>
    tools.map((t) => ({
      url: `${base}/${locale}/tools/${t.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: toolPriority(t.slug),
      alternates: {
        languages: {
          en: `${base}/en/tools/${t.slug}`,
          es: `${base}/es/tools/${t.slug}`,
          "x-default": `${base}/en/tools/${t.slug}`,
        },
      },
    })),
  );

  const vsRoutes = locales.flatMap((locale) =>
    listComparisons().map((c) => ({
      url: `${base}/${locale}/vs/${c.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${base}/en/vs/${c.slug}`,
          es: `${base}/es/vs/${c.slug}`,
          "x-default": `${base}/en/vs/${c.slug}`,
        },
      },
    })),
  );

  return [...staticRoutes, ...productRoutes, ...toolRoutes, ...vsRoutes];
}
