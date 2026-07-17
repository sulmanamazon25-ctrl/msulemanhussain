import type { Ecosystem } from "./site";

export const ecosystems: Ecosystem[] = [
  {
    slug: "product-software",
    name: "Product & Software",
    blurb: "Ship durable SaaS and web systems with clean architecture.",
    accent: "#3d8bff",
    skills: [
      "SaaS Development",
      "Full-Stack Development",
      "Web Applications",
      "Software Architecture",
      "APIs",
      "Database Systems",
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    blurb: "Wire models into real product workflows — not demos.",
    accent: "#e85dff",
    skills: [
      "AI Product Development",
      "AI Integrations",
      "AI Automation",
      "Workflow Systems",
      "Voice AI",
      "Generative AI",
    ],
  },
  {
    slug: "growth-digital",
    name: "Growth & Digital",
    blurb: "Acquire users and convert attention into revenue.",
    accent: "#5dff9a",
    skills: [
      "SEO",
      "Digital Marketing",
      "Content Systems",
      "Conversion Optimization",
      "Growth Strategy",
    ],
  },
  {
    slug: "product-business",
    name: "Product & Business",
    blurb: "Founder judgment across MVP, ops, and strategy.",
    accent: "#ffb020",
    skills: [
      "Product Strategy",
      "Startup Building",
      "MVP Development",
      "Digital Products",
      "SaaS Operations",
      "Tech Strategy",
    ],
  },
  {
    slug: "design-experience",
    name: "Design & Experience",
    blurb: "Interfaces that feel intentional and convert.",
    accent: "#ff3d1f",
    skills: [
      "UI/UX",
      "Product Design",
      "Interactive Experiences",
      "Landing Pages",
      "Conversion Design",
    ],
  },
];

export function getEcosystem(slug: string) {
  return ecosystems.find((e) => e.slug === slug);
}
