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

export function alternateLanguages(path = "") {
  const clean = path === "/" ? "" : path;
  return {
    en: `https://msulemanhussain.com/en${clean}`,
    es: `https://msulemanhussain.com/es${clean}`,
    "x-default": `https://msulemanhussain.com/en${clean}`,
  };
}
