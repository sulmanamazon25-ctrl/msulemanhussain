import type { Metadata } from "next";
import { IntentForm } from "@/components/contact/IntentForm";
import { alternateLanguages, isLocale, type Locale } from "@/i18n/config";
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
    title: dict.contact.title,
    description: dict.contact.blurb,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/contact`,
      languages: alternateLanguages("/contact"),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const dict = getDictionary(raw as Locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-signal">{dict.contact.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.contact.title}</h1>
      <p className="mt-4 text-bone-dim">{dict.contact.blurb}</p>
      <div className="mt-10">
        <IntentForm />
      </div>
    </div>
  );
}
