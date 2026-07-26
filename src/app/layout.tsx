import type { Metadata } from "next";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  verification: {
    google: "IE8ur8NHlqZrlCnp8ixUpx2qcBkUN4Y43MvD84pdXJI",
    other: {
      "msvalidate.01": "51279CD460663940E70C5BA9FFFB392A",
    },
  },
};

/** Pass-through root — html/body live in [locale]/layout. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
