import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { ecosystems } from "@/content/expertise";
import { buildLog } from "@/content/build-log";
import { insights } from "@/content/insights";
import { tools } from "@/content/tools";
import { listComparisons } from "@/lib/comparisons";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = [
    "",
    "/products",
    "/tools",
    "/vs",
    "/projects",
    "/expertise",
    "/expertise/ai-calling-agents",
    "/build-log",
    "/insights",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority:
        path === ""
          ? 1
          : path === "/tools" || path === "/vs" || path === "/expertise/ai-calling-agents"
            ? 0.85
            : 0.7,
      alternates: {
        languages: {
          en: `${base}/en${path}`,
          es: `${base}/es${path}`,
          "x-default": `${base}/en${path}`,
        },
      },
    })),
  );

  const dynamic = locales.flatMap((locale) => [
    ...products
      .filter((p) => p.status !== "COMING SOON")
      .map((p) => ({
        url: `${base}/${locale}/products/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${base}/en/products/${p.slug}`,
            es: `${base}/es/products/${p.slug}`,
            "x-default": `${base}/en/products/${p.slug}`,
          },
        },
      })),
    ...tools.map((t) => ({
      url: `${base}/${locale}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${base}/en/tools/${t.slug}`,
          es: `${base}/es/tools/${t.slug}`,
          "x-default": `${base}/en/tools/${t.slug}`,
        },
      },
    })),
    ...listComparisons().map((c) => ({
      url: `${base}/${locale}/vs/${c.slug}`,
      lastModified: new Date(),
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
    ...ecosystems.map((e) => ({
      url: `${base}/${locale}/expertise/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${base}/en/expertise/${e.slug}`,
          es: `${base}/es/expertise/${e.slug}`,
          "x-default": `${base}/en/expertise/${e.slug}`,
        },
      },
    })),
    ...buildLog.map((p) => ({
      url: `${base}/${locale}/build-log/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${base}/en/build-log/${p.slug}`,
          es: `${base}/es/build-log/${p.slug}`,
          "x-default": `${base}/en/build-log/${p.slug}`,
        },
      },
    })),
    ...insights.map((p) => ({
      url: `${base}/${locale}/insights/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${base}/en/insights/${p.slug}`,
          es: `${base}/es/insights/${p.slug}`,
          "x-default": `${base}/en/insights/${p.slug}`,
        },
      },
    })),
  ]);

  return [...staticRoutes, ...dynamic];
}
