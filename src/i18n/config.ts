export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `/${locale}${clean}`;
}

/** Build hreflang map. Pass `locales: ["en"]` when ES body is not a real translation. */
export function alternateLanguages(path = "", opts?: { locales?: readonly Locale[] }) {
  const clean = path === "/" ? "" : path;
  const wanted = opts?.locales ?? locales;
  const languages: Record<string, string> = {};
  if (wanted.includes("en")) languages.en = `https://msulemanhussain.com/en${clean}`;
  if (wanted.includes("es")) languages.es = `https://msulemanhussain.com/es${clean}`;
  languages["x-default"] = `https://msulemanhussain.com/en${clean}`;
  return languages;
}

/** EN-only alternates — use until a page has a real Spanish body. */
export function enOnlyAlternates(path = "") {
  return alternateLanguages(path, { locales: ["en"] });
}
