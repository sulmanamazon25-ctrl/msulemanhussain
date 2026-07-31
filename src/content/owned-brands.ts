import { site } from "./site";

/** Live brands founded by Suleman Hussain — used for Person ↔ Organization SEO. */
export const ownedBrands = [
  {
    name: "DownitX",
    url: "https://downitx.com/",
    portfolioPath: "/products/downitx",
  },
  {
    name: "PinQuill",
    url: "https://pinquill.com/en",
    portfolioPath: "/products/pinquill",
  },
  {
    name: "Wasup",
    url: "https://wasup.app/es",
    portfolioPath: "/products/wasup",
  },
  {
    name: "Pickleball Deutsch",
    url: "https://pickleballdeutch.com/",
    portfolioPath: "/products/pickleball-deutsch",
  },
  {
    name: "Spain Eats",
    url: "https://spaineats.info/",
    portfolioPath: "/products/spain-eats",
  },
  {
    name: "Bokily",
    url: "https://www.bokily.com/",
    portfolioPath: "/products/bokily",
  },
] as const;

export function personEntityJsonLd() {
  const personId = `${site.url}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        email: site.email,
        image: `${site.url}/brand/mark.png`,
        jobTitle: site.role,
        description: site.description,
        sameAs: [
          site.social.linkedin,
          site.social.youtube,
          site.social.tiktok,
          site.social.instagram,
          site.social.x,
          site.social.github,
          ...ownedBrands.map((b) => b.url),
        ],
        founderOf: ownedBrands.map((b) => ({
          "@type": "Organization",
          "@id": `${b.url.replace(/\/$/, "")}/#organization`,
          name: b.name,
          url: b.url,
        })),
      },
      ...ownedBrands.map((b) => ({
        "@type": "Organization",
        "@id": `${b.url.replace(/\/$/, "")}/#organization`,
        name: b.name,
        url: b.url,
        founder: { "@id": personId },
        sameAs: [`${site.url}${b.portfolioPath}`],
      })),
    ],
  };
}

export function productPageJsonLd(
  product: {
    name: string;
    slug: string;
    tagline: string;
    liveUrl?: string;
    logo?: string;
    status?: string;
    category?: string;
    stack?: string[];
    seoDescription?: string;
  },
  locale: "en" | "es" = "en",
) {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;
  const portfolioUrl = `${site.url}/${locale}/products/${product.slug}`;
  const orgUrl = product.liveUrl?.replace(/\/$/, "") ?? portfolioUrl;
  const appCategory =
    product.category?.toLowerCase().includes("video")
      ? "MultimediaApplication"
      : product.category?.toLowerCase().includes("whatsapp")
        ? "BusinessApplication"
        : "WebApplication";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
      },
      {
        "@type": "Organization",
        "@id": `${orgUrl}/#organization`,
        name: product.name,
        url: product.liveUrl ?? portfolioUrl,
        description: product.seoDescription ?? product.tagline,
        logo: product.logo ? `${site.url}${product.logo}` : undefined,
        founder: { "@id": personId },
        sameAs: [portfolioUrl, site.url],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${orgUrl}/#software`,
        name: product.name,
        description: product.seoDescription ?? product.tagline,
        applicationCategory: appCategory,
        operatingSystem: product.stack?.some((s) => /windows|desktop/i.test(s))
          ? "Windows, Web"
          : "Web",
        url: product.liveUrl ?? portfolioUrl,
        image: product.logo ? `${site.url}${product.logo}` : undefined,
        inLanguage: ["en", "es"],
        author: { "@id": personId },
        // Free trial / freemium portfolio pages — avoid fake "price 0" as sole Offer.
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: product.liveUrl ?? portfolioUrl,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${portfolioUrl}#webpage`,
        url: portfolioUrl,
        name: `${product.name} · ${site.name}`,
        description: product.seoDescription ?? product.tagline,
        about: { "@id": `${orgUrl}/#organization` },
        author: { "@id": personId },
        isPartOf: { "@id": websiteId },
        inLanguage: locale,
      },
    ],
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  pathPrefix: "build-log" | "insights";
}) {
  const personId = `${site.url}/#person`;
  const url = `${site.url}/en/${post.pathPrefix}/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      "@id": personId,
      name: site.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

export function aboutPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: `${site.url}/en`,
    jobTitle: "Founder & Product Builder",
    sameAs: [
      site.social.linkedin,
      site.social.youtube,
      site.social.x,
      site.social.github,
      site.social.instagram,
      site.social.tiktok,
    ],
  };
}
