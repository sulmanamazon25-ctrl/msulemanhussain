import type { CapabilityGroup } from "./site";

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "build",
    name: "BUILD",
    accent: "#3d8bff",
    skills: [
      "Full-stack development",
      "SaaS",
      "Software architecture",
      "Web applications",
      "APIs",
      "Databases",
      "Cloud systems",
    ],
    relatedProductSlugs: ["reelerx", "downitx", "launchpad"],
  },
  {
    id: "ai",
    name: "AI",
    accent: "#e85dff",
    skills: [
      "AI products",
      "AI integrations",
      "Generative AI",
      "Voice AI",
      "AI automation",
      "Workflow automation",
    ],
    relatedProductSlugs: ["reelerx", "voxi", "brandpilot", "flowforge"],
  },
  {
    id: "grow",
    name: "GROW",
    accent: "#5dff9a",
    skills: [
      "SEO",
      "Digital marketing",
      "Conversion optimization",
      "Content systems",
      "Growth strategy",
    ],
    relatedProductSlugs: ["brandpilot"],
  },
  {
    id: "product",
    name: "PRODUCT",
    accent: "#ffb020",
    skills: [
      "Product strategy",
      "MVP development",
      "Startup building",
      "Product operations",
      "Digital products",
    ],
    relatedProductSlugs: ["launchpad", "brandpilot", "reelerx"],
  },
  {
    id: "design",
    name: "DESIGN",
    accent: "#ff3d1f",
    skills: ["UI/UX", "Product design", "Web design", "Interactive experiences"],
    relatedProductSlugs: ["brandpilot", "reelerx", "launchpad"],
  },
];
