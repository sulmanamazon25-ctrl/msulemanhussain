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
}) {
  const personId = `${site.url}/#person`;
  const portfolioUrl = `${site.url}/products/${product.slug}`;
  const orgUrl = product.liveUrl?.replace(/\/$/, "") ?? portfolioUrl;
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
