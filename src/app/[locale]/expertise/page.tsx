import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityOverlap } from "@/components/home/CapabilityOverlap";
import { ecosystems } from "@/content/expertise";
import { alternateLanguages, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.expertise.title,
    description: dict.expertise.blurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/expertise`,
      languages: alternateLanguages("/expertise"),
    },
  };
}

export default async function ExpertisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-16 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber">{dict.expertise.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{dict.expertise.title}</h1>
        <p className="mt-4 max-w-2xl text-bone-dim">{dict.expertise.blurb}</p>
      </div>
      <CapabilityOverlap />
      <div className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">{dict.expertise.ecosystems}</p>
        <ul className="mt-6 divide-y divide-white/10">
          {ecosystems.map((e) => (
            <li key={e.slug} className="py-6">
              <Link
                href={lp(`/expertise/${e.slug}`)}
                className="group flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between"
              >
                <span
                  className="font-display text-2xl font-semibold group-hover:text-phosphor"
                  style={{ color: e.accent }}
                >
                  {e.name}
                </span>
                <span className="max-w-md text-sm text-bone-dim">{e.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
