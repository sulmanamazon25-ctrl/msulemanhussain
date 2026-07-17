import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
