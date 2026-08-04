import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["postgres", "drizzle-orm", "nodemailer", "stripe"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // One-hop to locale URLs (avoid /blog → /insights → /en/insights).
    return [
      { source: "/works", destination: "/en/projects", permanent: true },
      { source: "/works/", destination: "/en/projects", permanent: true },
      { source: "/service", destination: "/en/expertise", permanent: true },
      { source: "/service/", destination: "/en/expertise", permanent: true },
      { source: "/blog", destination: "/en/insights", permanent: true },
      { source: "/blog/", destination: "/en/insights", permanent: true },
      { source: "/credentials", destination: "/en/about", permanent: true },
      { source: "/credentials/", destination: "/en/about", permanent: true },
    ];
  },
};

export default nextConfig;
