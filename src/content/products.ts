import type { Product } from "./site";

export const products: Product[] = [
  {
    slug: "downitx",
    name: "DownitX",
    tagline: "Out-publish. Out-convert. Rule your niche.",
    category: "Creator SaaS",
    status: "LIVE",
    year: 2025,
    multilingual: true,
    locales: ["EN", "ES", "DE"],
    liveUrl: "https://downitx.com/",
    logo: "/products/downitx-logo.svg",
    previewImage: "/products/downitx-hero.png",
    stack: ["Windows App", "Node", "FFmpeg", "BYOA AI"],
    accent: "#3d8bff",
    accentSoft: "rgba(61, 139, 255, 0.15)",
    problem:
      "Creators juggle downloaders, clip tools, and scripts — none of which scale into a real publishing pipeline.",
    solution:
      "DownitX is a Windows creator app: paste-link downloads across YouTube, TikTok, Facebook, X & Shorts, plus channel bulk and Long → Short clips with burned captions.",
    whyExists:
      "High-volume creators need local control and flat licensing — not per-minute cloud tax or brittle terminal scripts.",
    happeningNow: "Live at downitx.com — free single downloads, Pro licensing for bulk + clip studio.",
    howItWorks: ["Paste link", "Queue locally", "Bulk / channels", "Long → Short", "Publish-ready clips"],
    details: {
      frontend: "Windows desktop app + web marketing and billing",
      backend: "License keys, accounts, download history",
      ai: "Optional BYOA highlights and caption burn-in",
      infrastructure: "Local file saves on the creator’s PC",
      apis: "Trend radar + platform download pipeline",
      architecture: "Desktop-first pipeline with web licensing",
    },
    metrics: [
      { label: "Platforms", value: "5" },
      { label: "Model", value: "Desktop + SaaS" },
      { label: "Status", value: "Live" },
    ],
    relatedProjectSlugs: ["ops-automation"],
    featured: true,
  },
  {
    slug: "pinquill",
    name: "PinQuill",
    tagline: "The Pinterest tool that doesn't tax your creativity.",
    category: "Pinterest SaaS",
    status: "LIVE",
    year: 2026,
    multilingual: true,
    locales: ["EN", "ES", "DE"],
    liveUrl: "https://pinquill.com/en",
    logo: "/products/pinquill-mark.svg",
    previewImage: "/products/pinquill-mark.svg",
    stack: ["Desktop App", "BYOK", "Local-first", "Pinterest"],
    accent: "#e11d48",
    accentSoft: "rgba(225, 29, 72, 0.14)",
    problem:
      "Bloggers pay for Canva + AI copy + a scheduler — three tools, three bills, endless export loops.",
    solution:
      "PinQuill runs locally with your API keys: blog URL → SEO pins → staging tray, sitemap bulk, trends, and decay tracking — no cloud lock-in.",
    whyExists:
      "Pinterest growth should compound from your content, not from someone else's inference markup.",
    happeningNow: "Live multilingual product — free trial with 15 BYOK pins, Windows desktop app shipping.",
    howItWorks: ["Paste post / sitemap", "Generate pins + SEO", "Brand presets", "Stage locally", "Track decay"],
    details: {
      frontend: "Desktop studio for create, trends, brand, library, schedule",
      backend: "Local storage + optional account for licensing",
      ai: "BYOK generation — no inference markup",
      infrastructure: "Runs on the creator’s machine",
      apis: "Sitemap scan, trend board, pin generation",
      architecture: "Local-first Pinterest operating system",
    },
    metrics: [
      { label: "Trial", value: "15 BYOK" },
      { label: "Mode", value: "Local-first" },
      { label: "Status", value: "Live" },
    ],
    relatedProjectSlugs: ["growth-sites"],
    featured: true,
  },
  {
    slug: "wasup",
    name: "Wasup",
    tagline: "WhatsApp copiloto — not another chatbot platform.",
    category: "WhatsApp AI",
    status: "LIVE",
    year: 2026,
    multilingual: true,
    locales: ["ES", "EN"],
    liveUrl: "https://wasup.app/es",
    logo: "/products/wasup-icon.svg",
    previewImage: "/products/wasup-og.png",
    stack: ["Windows App", "OpenRouter BYOK", "Human-in-the-loop"],
    accent: "#25d366",
    accentSoft: "rgba(37, 211, 102, 0.14)",
    problem:
      "Cloud WhatsApp bots either auto-send risky replies or lock teams into expensive multi-agent SaaS.",
    solution:
      "Wasup is a desktop WhatsApp assistant: AI drafts from your FAQs, you approve before send. Sessions stay on your PC; BYOK via OpenRouter.",
    whyExists:
      "Operators need speed with human control and privacy — draft queue, not autonomous spam.",
    happeningNow: "Live multilingual site (ES/EN) — free installer + Pro licensing.",
    howItWorks: ["Install Windows app", "Connect WhatsApp", "Train FAQs", "Draft queue", "Approve & send"],
    details: {
      frontend: "Windows NSIS installer + multilingual marketing site",
      backend: "License email + metadata only",
      ai: "OpenRouter chat + STT for voice notes",
      infrastructure: "Local WhatsApp session data on device",
      apis: "OpenRouter BYOK for chat and transcription",
      architecture: "Human-in-the-loop desktop copiloto",
    },
    metrics: [
      { label: "Loop", value: "Human approve" },
      { label: "AI", value: "BYOK" },
      { label: "Status", value: "Live" },
    ],
    relatedProjectSlugs: ["voice-agent-lab"],
    featured: true,
  },
  {
    slug: "pickleball-deutsch",
    name: "Pickleball Deutsch",
    tagline: "Germany’s #1 pickleball knowledge hub.",
    category: "Content Platform",
    status: "LIVE",
    year: 2023,
    multilingual: true,
    locales: ["DE", "EN"],
    liveUrl: "https://pickleballdeutch.com/",
    logo: "/products/pickleball-512b.png",
    previewImage: "/products/pickleball-512b.png",
    stack: ["WordPress", "SEO", "Content systems", "Local guides"],
    accent: "#ffb020",
    accentSoft: "rgba(255, 176, 32, 0.14)",
    problem:
      "German players lack a trusted, expert-reviewed home for rules, gear, courses, and local courts.",
    solution:
      "Pickleball Deutsch is a live multilingual content platform — guides, equipment tests, courses, city guides, and rankings built for Germany since 2023.",
    whyExists:
      "Sports growth needs authoritative local content systems — not generic translated blogs.",
    happeningNow: "Live at pickleballdeutch.com — 30+ city guides, expert editorial pipeline.",
    howItWorks: ["Research", "Expert writing", "Peer review", "Publish", "Update yearly"],
    details: {
      frontend: "Content hub with topic silos and city guides",
      backend: "Editorial CMS + SEO architecture",
      ai: "Assists research workflows — experts remain the authors",
      infrastructure: "Hosted production site with ongoing SEO",
      apis: "Lead magnets / newsletter capture",
      architecture: "Authority content system for a niche market",
    },
    metrics: [
      { label: "Since", value: "2023" },
      { label: "Guides", value: "30+ cities" },
      { label: "Status", value: "Live" },
    ],
    relatedProjectSlugs: ["client-growth"],
    featured: true,
  },
  {
    slug: "reelerx",
    name: "ReelerX",
    tagline: "AI-powered short-form video creation.",
    category: "AI Video",
    status: "COMING SOON",
    year: 2026,
    stack: ["Next.js", "Python", "FFmpeg", "LLM APIs"],
    accent: "#ff3d1f",
    accentSoft: "rgba(255, 61, 31, 0.15)",
    problem: "Creators burn hours scripting, cutting, and captioning short-form video.",
    solution: "Multi-model pipeline for idea → platform-ready reels.",
    whyExists: "Short-form needs product speed, not one-off demos.",
    happeningNow: "Coming soon — in the workshop.",
    howItWorks: ["Idea", "AI Engine", "Processing", "Automation", "Output"],
    details: {
      frontend: "Editor + timeline",
      backend: "Job queues",
      ai: "Multi-model pipeline",
      infrastructure: "Workers + storage",
      apis: "Render jobs",
      architecture: "Async media pipeline",
    },
    metrics: [
      { label: "Status", value: "Soon" },
      { label: "Focus", value: "Video AI" },
      { label: "Stage", value: "Workshop" },
    ],
  },
  {
    slug: "brandpilot",
    name: "BrandPilot",
    tagline: "Brand systems and growth content on rails.",
    category: "Growth SaaS",
    status: "COMING SOON",
    year: 2026,
    stack: ["Next.js", "Postgres", "AI Agents"],
    accent: "#5dff9a",
    accentSoft: "rgba(93, 255, 154, 0.12)",
    problem: "Founders lose brand consistency across channels.",
    solution: "Voice-locked brand kits and automated growth content.",
    whyExists: "Growth without a brand system creates noise.",
    happeningNow: "Coming soon — brand OS in progress.",
    howItWorks: ["Brand kit", "Generate", "Schedule", "Measure"],
    details: {
      frontend: "Brand workspace",
      backend: "Multi-tenant SaaS",
      ai: "Voice-locked generation",
      infrastructure: "Postgres + jobs",
      apis: "Content generate",
      architecture: "Brand → content pipeline",
    },
    metrics: [
      { label: "Status", value: "Soon" },
      { label: "Focus", value: "Brand" },
      { label: "Stage", value: "Workshop" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function liveProducts() {
  return products.filter((p) => p.status === "LIVE");
}

export function activeProducts() {
  return products.filter((p) => p.status === "LIVE" || p.status === "BUILDING" || p.status === "EXPERIMENT");
}

export function buildingNow() {
  return liveProducts();
}

export function statusClass(status: Product["status"]) {
  switch (status) {
    case "LIVE":
    case "SHIPPED":
      return "status-live";
    case "BUILDING":
    case "COMING SOON":
      return "status-building";
    case "FOR SALE":
      return "status-sale";
    case "EXPERIMENT":
      return "status-experiment";
    case "PAUSED":
      return "status-paused";
  }
}
