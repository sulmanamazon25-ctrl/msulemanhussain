import type { CapabilityGroup } from "./site";

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "build",
    name: "BUILD",
    accent: "#3d8bff",
    skills: [
      "Full-stack development",
      "SaaS",
      "Desktop apps",
      "Software architecture",
      "APIs",
      "Databases",
      "Cloud systems",
    ],
    relatedProductSlugs: ["downitx", "pinquill", "wasup"],
  },
  {
    id: "ai",
    name: "AI",
    accent: "#e85dff",
    skills: [
      "AI products",
      "AI integrations",
      "BYOK / BYOA",
      "Voice AI",
      "AI automation",
      "Workflow automation",
    ],
    relatedProductSlugs: ["wasup", "pinquill", "downitx"],
  },
  {
    id: "grow",
    name: "GROW",
    accent: "#5dff9a",
    skills: [
      "SEO",
      "Digital marketing",
      "Content systems",
      "Conversion optimization",
      "Multilingual growth",
    ],
    relatedProductSlugs: ["pickleball-deutsch", "pinquill"],
  },
  {
    id: "product",
    name: "PRODUCT",
    accent: "#ffb020",
    skills: [
      "Product strategy",
      "MVP development",
      "Startup building",
      "SaaS operations",
      "Desktop licensing",
    ],
    relatedProductSlugs: ["downitx", "wasup", "pinquill", "bokily"],
  },
  {
    id: "design",
    name: "DESIGN",
    accent: "#ff3d1f",
    skills: ["UI/UX", "Product design", "Landing pages", "Interactive experiences"],
    relatedProductSlugs: ["pinquill", "wasup", "pickleball-deutsch", "bokily"],
  },
];
