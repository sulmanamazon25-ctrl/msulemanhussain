import type { Metadata } from "next";
import { site } from "@/content/site";
import { alternateLanguages, isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const es = locale === "es";
  return {
    title: es ? "Términos" : "Terms of Use",
    description: es
      ? "Términos de uso de msulemanhussain.com: contenido informativo, estado de productos y herramientas."
      : "Terms of use for msulemanhussain.com: informational content, product status, and free tools.",
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/terms`,
      languages: alternateLanguages("/terms"),
    },
    openGraph: {
      title: es ? "Términos · Suleman Hussain" : "Terms of Use · Suleman Hussain",
      url: `https://msulemanhussain.com/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const es = raw === "es";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl font-bold">{es ? "Términos de uso" : "Terms of Use"}</h1>
      {es ? (
        <>
          <p className="mt-6 text-bone-dim">
            El contenido de este sitio es informativo. El estado de productos (live, building, experiment, for sale)
            puede cambiar. Las herramientas gratuitas son orientativas y no sustituyen asesoría fiscal, legal o
            profesional.
          </p>
          <p className="mt-4 text-bone-dim">
            Adquisiciones, consulting y desarrollos a medida se rigen por acuerdos escritos separados.
          </p>
          <p className="mt-4 text-bone-dim">
            Preguntas:{" "}
            <a href={`mailto:${site.emails.hello}`} className="text-phosphor hover:underline">
              {site.emails.hello}
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <p className="mt-6 text-bone-dim">
            Content on this site is for informational purposes. Product status (live, building, experiment, for sale)
            may change. Free tools are orientation aids and do not replace tax, legal, or professional advice.
          </p>
          <p className="mt-4 text-bone-dim">
            Acquisition, consulting, and custom build engagements are governed by separate written agreements.
          </p>
          <p className="mt-4 text-bone-dim">
            Questions:{" "}
            <a href={`mailto:${site.emails.hello}`} className="text-phosphor hover:underline">
              {site.emails.hello}
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
