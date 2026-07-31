import type { Metadata } from "next";
import { IntentForm } from "@/components/contact/IntentForm";
import { site } from "@/content/site";
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
  const es = raw === "es";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">{dict.contact.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{dict.contact.title}</h1>
      <p className="mt-4 text-bone-dim">{dict.contact.blurb}</p>

      <div className="mt-8 grid gap-3 rounded-xl border border-white/10 bg-ink-3/60 p-5 sm:grid-cols-2">
        <a href={`mailto:${site.emails.hello}`} className="group block">
          <p className="font-mono text-[10px] tracking-[0.18em] text-bone-faint">
            {es ? "GENERAL / NEGOCIOS" : "GENERAL / BUSINESS"}
          </p>
          <p className="mt-1 font-medium text-phosphor group-hover:underline">{site.emails.hello}</p>
          <p className="mt-1 text-xs text-bone-dim">
            {es
              ? "Productos, partnerships, consulting y hola."
              : "Builds, partnerships, consulting, and hellos."}
          </p>
        </a>
        <a href={`mailto:${site.emails.support}`} className="group block">
          <p className="font-mono text-[10px] tracking-[0.18em] text-bone-faint">
            {es ? "SOPORTE / HERRAMIENTAS" : "SUPPORT / TOOLS"}
          </p>
          <p className="mt-1 font-medium text-phosphor group-hover:underline">{site.emails.support}</p>
          <p className="mt-1 text-xs text-bone-dim">
            {es
              ? "Ayuda con herramientas, productos live y bugs."
              : "Help with free tools, live products, and bugs."}
          </p>
        </a>
      </div>

      <div className="mt-10">
        <IntentForm />
      </div>
    </div>
  );
}
