import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ecosystems, getEcosystem } from "@/content/expertise";
import { enOnlyAlternates, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return ecosystems.map((e) => ({ ecosystem: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; ecosystem: string }>;
}): Promise<Metadata> {
  const { locale: raw, ecosystem } = await params;
  const item = getEcosystem(ecosystem);
  if (!item || !isLocale(raw)) return {};
  return {
    title: item.name,
    description: item.blurb,
    // Doorway-thin skill lists — noindex until real pillar copy ships.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://msulemanhussain.com/en/expertise/${ecosystem}`,
      languages: enOnlyAlternates(`/expertise/${ecosystem}`),
    },
  };
}

export default async function EcosystemPage({
  params,
}: {
  params: Promise<{ locale: string; ecosystem: string }>;
}) {
  const { locale: raw, ecosystem } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const item = getEcosystem(ecosystem);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Link href={localePath(locale, "/expertise")} className="text-sm text-bone-dim hover:text-phosphor">
        ← {dict.expertise.eyebrow}
      </Link>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl" style={{ color: item.accent }}>
        {item.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-bone-dim">{item.blurb}</p>
      <p className="mt-6 max-w-2xl text-sm text-bone-faint">
        {locale === "es" ? (
          <>
            Página de resumen. Profundiza en{" "}
            <Link href={localePath(locale, "/expertise/ai-calling-agents")} className="text-phosphor hover:underline">
              AI Calling Agents
            </Link>{" "}
            o en el{" "}
            <Link href={localePath(locale, "/expertise")} className="text-phosphor hover:underline">
              hub de expertise
            </Link>
            .
          </>
        ) : (
          <>
            Summary page. Go deeper on{" "}
            <Link href={localePath(locale, "/expertise/ai-calling-agents")} className="text-phosphor hover:underline">
              AI Calling Agents
            </Link>{" "}
            or the{" "}
            <Link href={localePath(locale, "/expertise")} className="text-phosphor hover:underline">
              expertise hub
            </Link>
            .
          </>
        )}
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {item.skills.map((skill) => (
          <li
            key={skill}
            className="border border-white/10 bg-ink-3 px-4 py-4 text-bone"
            style={{ borderLeftColor: item.accent, borderLeftWidth: 3 }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
