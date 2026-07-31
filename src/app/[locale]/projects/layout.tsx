import type { Metadata } from "next";
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
  const es = locale === "es";
  return {
    title: es ? "Proyectos" : "Projects by Suleman Hussain",
    description:
      dict.footer.projects === "Projects"
        ? "SaaS, AI, web, automation, experiments, client work, and tools by Suleman Hussain."
        : "SaaS, IA, web, automatización, experimentos, clientes y herramientas de Suleman Hussain.",
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}/projects`,
      languages: alternateLanguages("/projects"),
    },
    openGraph: {
      title: es ? "Proyectos · Suleman Hussain" : "Projects · Suleman Hussain",
      url: `https://msulemanhussain.com/${locale}/projects`,
    },
  };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
