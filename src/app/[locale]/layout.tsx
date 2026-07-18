import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { personEntityJsonLd } from "@/content/owned-brands";
import { site } from "@/content/site";
import { alternateLanguages, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dm = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jet = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
    title: {
      default: dict.meta.title,
      template: `%s · ${site.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `https://msulemanhussain.com/${locale}`,
      languages: alternateLanguages(""),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://msulemanhussain.com/${locale}`,
      siteName: site.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      type: "website",
      images: [{ url: "/brand/mark.png", width: 1024, height: 1024, alt: site.name }],
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/brand/mark.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.png", type: "image/png" },
        { url: "/brand/mark.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/brand/mark.png" }],
      shortcut: ["/favicon.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const jsonLd = personEntityJsonLd();

  return (
    <html lang={locale} className={`${syne.variable} ${dm.variable} ${jet.variable} h-full antialiased`}>
      <body className="foundry-bg flex min-h-full flex-col font-sans text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleProvider locale={locale} dict={dict}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
