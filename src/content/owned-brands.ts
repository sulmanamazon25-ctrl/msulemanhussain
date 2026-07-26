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
    url: "https://pinquill.com/",
    portfolioPath: "/products/pinquill",
  },
  {
    name: "Wasup",
    url: "https://wasup.app/",
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

export function productPageJsonLd(product: {
  name: string;
  slug: string;
  tagline: string;
  liveUrl?: string;
  logo?: string;
  status?: string;
  category?: string;
  stack?: string[];
}) {
  const personId = `${site.url}/#person`;
  const portfolioUrl = `${site.url}/products/${product.slug}`;
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
        description: product.tagline,
        logo: product.logo ? `${site.url}${product.logo}` : undefined,
        founder: { "@id": personId },
        sameAs: [portfolioUrl, site.url],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${orgUrl}/#software`,
        name: product.name,
        description: product.tagline,
        applicationCategory: appCategory,
        operatingSystem: product.stack?.some((s) => /windows|desktop/i.test(s))
          ? "Windows, Web"
          : "Web",
        url: product.liveUrl ?? portfolioUrl,
        image: product.logo ? `${site.url}${product.logo}` : undefined,
        author: { "@id": personId },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${portfolioUrl}#webpage`,
        url: portfolioUrl,
        name: `${product.name} · ${site.name}`,
        description: product.tagline,
        about: { "@id": `${orgUrl}/#organization` },
        author: { "@id": personId },
        isPartOf: { "@id": `${site.url}/#website` },
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
  const url = `${site.url}/${post.pathPrefix}/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
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
