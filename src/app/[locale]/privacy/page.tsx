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
    title: es ? "Privacidad" : "Privacy Policy",
    description: es
      ? "Cómo tratamos los datos en msulemanhussain.com: formularios, herramientas locales y correo."
      : "How msulemanhussain.com handles data from contact forms, on-device tools, and email.",
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/privacy`,
      languages: alternateLanguages("/privacy"),
    },
    openGraph: {
      title: es ? "Privacidad · Suleman Hussain" : "Privacy Policy · Suleman Hussain",
      url: `https://msulemanhussain.com/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const es = raw === "es";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl font-bold">{es ? "Privacidad" : "Privacy Policy"}</h1>
      {es ? (
        <>
          <p className="mt-6 text-bone-dim">
            Este sitio solo recoge información que envías voluntariamente por el formulario de contacto o por correo.
            Usamos esos mensajes para responderte. No vendemos datos personales.
          </p>
          <p className="mt-4 text-bone-dim">
            Las herramientas gratuitas (calculadoras, validadores, generadores) se ejecutan en tu navegador. Los valores
            que introduces no se suben a nuestros servidores salvo que una herramienta lo indique explícitamente.
          </p>
          <p className="mt-4 text-bone-dim">
            Contacto:{" "}
            <a href={`mailto:${site.emails.hello}`} className="text-phosphor hover:underline">
              {site.emails.hello}
            </a>{" "}
            (general) ·{" "}
            <a href={`mailto:${site.emails.support}`} className="text-phosphor hover:underline">
              {site.emails.support}
            </a>{" "}
            (herramientas y productos). El correo automatizado puede salir de {site.emails.noreply}; esa dirección no se
            monitoriza.
          </p>
        </>
      ) : (
        <>
          <p className="mt-6 text-bone-dim">
            This site collects only information you voluntarily submit through contact forms or when you email us
            directly. Messages are used to respond to your inquiry. We do not sell personal data.
          </p>
          <p className="mt-4 text-bone-dim">
            Free tools (calculators, validators, generators) run in your browser. Values you enter are not uploaded to
            our servers unless a tool explicitly says otherwise.
          </p>
          <p className="mt-4 text-bone-dim">
            Contact:{" "}
            <a href={`mailto:${site.emails.hello}`} className="text-phosphor hover:underline">
              {site.emails.hello}
            </a>{" "}
            (general) ·{" "}
            <a href={`mailto:${site.emails.support}`} className="text-phosphor hover:underline">
              {site.emails.support}
            </a>{" "}
            (tools &amp; products). Automated mail may come from {site.emails.noreply}; that address is not monitored
            for replies.
          </p>
        </>
      )}
    </div>
  );
}
