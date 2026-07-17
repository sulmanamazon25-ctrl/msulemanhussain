export const site = {
  name: "Suleman Hussain",
  title: "Suleman Hussain — Founder World · Always Building",
  description:
    "Enter Founder World — software, AI products, SaaS systems, and digital businesses from a founder who is always building something.",
  url: "https://msulemanhussain.com",
  email: "hello@msulemanhussain.com",
  social: {
    linkedin: "https://www.linkedin.com/in/msulemanhussain/",
    youtube: "https://www.youtube.com/@msulemanhussain",
    tiktok: "https://www.tiktok.com/@msulemanhussain",
    instagram: "https://www.instagram.com/msulemanhussain/",
    x: "https://x.com/msulemanhussain",
    github: "https://github.com/msulemanhussain",
  },
  tagline: "I am always building something.",
  support: "Software, AI products, SaaS systems, automation, and digital businesses.",
  role: "FOUNDER / BUILDER / EXPERIMENTER",
} as const;

export type ProductStatus =
  | "LIVE"
  | "BUILDING"
  | "FOR SALE"
  | "EXPERIMENT"
  | "SHIPPED"
  | "PAUSED"
  | "COMING SOON";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: ProductStatus;
  stack: string[];
  accent: string;
  accentSoft: string;
  problem: string;
  solution: string;
  whyExists: string;
  happeningNow: string;
  year?: number;
  howItWorks: string[];
  details: {
    frontend: string;
    backend: string;
    ai: string;
    infrastructure: string;
    apis: string;
    architecture: string;
  };
  metrics: { label: string; value: string }[];
  relatedProjectSlugs?: string[];
  liveUrl?: string;
  featured?: boolean;
  multilingual?: boolean;
  locales?: string[];
  logo?: string;
  previewImage?: string;
};

export type ProjectStatus = "LIVE" | "SHIPPED" | "BUILDING" | "EXPERIMENT" | "ACQUIRED" | "ARCHIVED";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  role: string;
  tech: string[];
  result: string;
  category: "SAAS" | "AI" | "WEB" | "AUTOMATION" | "EXPERIMENTS" | "CLIENT" | "TOOLS";
  status: ProjectStatus;
  year?: number;
};

export type Ecosystem = {
  slug: string;
  name: string;
  blurb: string;
  accent: string;
  skills: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  updated?: string;
  body: string;
};

export type JourneyStage = {
  id: string;
  label: string;
  statement: string;
  example: string;
  productSlug?: string;
  accent: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  body: string;
};

export type NextUpItem = {
  title: string;
  note: string;
  accent: string;
};

export type CapabilityGroup = {
  id: string;
  name: string;
  accent: string;
  skills: string[];
  relatedProductSlugs: string[];
};
