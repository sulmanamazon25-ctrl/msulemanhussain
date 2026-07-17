import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/works", destination: "/projects", permanent: true },
      { source: "/works/", destination: "/projects", permanent: true },
      { source: "/service", destination: "/expertise", permanent: true },
      { source: "/service/", destination: "/expertise", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/", destination: "/insights", permanent: true },
      { source: "/credentials", destination: "/about", permanent: true },
      { source: "/credentials/", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
