"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

function swapLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (locales.includes(parts[1] as Locale)) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher() {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="flex items-center gap-1" role="group" aria-label={dict.lang.label}>
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={swapLocale(pathname, loc)}
            hrefLang={loc}
            className={`px-2 py-1 font-mono text-[10px] tracking-[0.16em] transition ${
              active ? "bg-white/10 text-phosphor" : "text-bone-faint hover:text-bone"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {dict.lang[loc]}
          </Link>
        );
      })}
    </div>
  );
}
