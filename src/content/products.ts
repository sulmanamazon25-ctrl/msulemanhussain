import type { Product } from "./site";

export const products: Product[] = [
  {
    slug: "reelerx",
    name: "ReelerX",
    tagline: "AI-powered short-form video creation.",
    category: "AI Video",
    status: "LIVE",
    year: 2025,
    stack: ["Next.js", "Python", "FFmpeg", "LLM APIs"],
    accent: "#ff3d1f",
    accentSoft: "rgba(255, 61, 31, 0.15)",
    problem:
      "Creators burn hours scripting, cutting, and captioning short-form video for every platform.",
    solution:
      "ReelerX turns an idea into platform-ready reels with AI scripting, scene assembly, and automated captions.",
    whyExists:
      "Short-form is the distribution layer of the modern internet — the tool should match the speed of the idea.",
    happeningNow: "Improving multi-model render reliability and brand-kit consistency.",
    howItWorks: ["Idea", "AI Engine", "Processing", "Automation", "Final Output"],
    details: {
      frontend: "Interactive editor, timeline preview, brand kits",
      backend: "Job queues, media processing workers, asset storage",
      ai: "Multi-model pipeline for script, voice, and scene suggestions",
      infrastructure: "Containerized workers, object storage, CDN delivery",
      apis: "Render jobs, template library, webhook callbacks",
      architecture: "Async pipeline with status events and retry-safe jobs",
    },
    metrics: [
      { label: "Pipeline", value: "Multi-model" },
      { label: "Output", value: "Short-form" },
      { label: "Status", value: "Live" },
    ],
    relatedProjectSlugs: ["reelerx-saas"],
    featured: true,
  },
  {
    slug: "downitx",
    name: "DownitX",
    tagline: "Fast media download and transform workflows.",
    category: "Utilities",
    status: "LIVE",
    year: 2024,
    stack: ["Node", "FFmpeg", "Redis", "React"],
    accent: "#3d8bff",
    accentSoft: "rgba(61, 139, 255, 0.15)",
    problem: "Teams need reliable download + convert flows without brittle scripts.",
    solution:
      "DownitX packages fetch, convert, and deliver into a clean product surface with automation hooks.",
    whyExists: "Glue scripts break. A productized transform layer does not.",
    happeningNow: "Hardening batch queues and signed delivery URLs.",
    howItWorks: ["Source", "Fetch", "Transform", "Queue", "Deliver"],
    details: {
      frontend: "Job dashboard, format presets, progress UI",
      backend: "Worker pool with rate limits and caching",
      ai: "Optional smart format detection",
      infrastructure: "Redis queues, ephemeral compute",
      apis: "REST job create/status + signed download URLs",
      architecture: "Stateless API + durable job store",
    },
    metrics: [
      { label: "Focus", value: "Speed" },
      { label: "Mode", value: "Batch" },
      { label: "Status", value: "Live" },
    ],
    featured: true,
  },
  {
    slug: "brandpilot",
    name: "BrandPilot",
    tagline: "Brand systems and growth content on rails.",
    category: "Growth SaaS",
    status: "BUILDING",
    year: 2026,
    stack: ["Next.js", "Postgres", "AI Agents", "Stripe"],
    accent: "#5dff9a",
    accentSoft: "rgba(93, 255, 154, 0.12)",
    problem: "Founders lose consistency across messaging, assets, and channel content.",
    solution:
      "BrandPilot keeps voice, visuals, and growth content aligned — then ships campaigns with automation.",
    whyExists: "Growth without a brand system creates noise. This product locks the system first.",
    happeningNow: "Building voice-locked generation and the content calendar core.",
    howItWorks: ["Brand Kit", "Strategy", "Generate", "Schedule", "Measure"],
    details: {
      frontend: "Brand workspace, content calendar, preview kits",
      backend: "Multi-tenant SaaS with role access",
      ai: "Voice-locked generation and campaign drafts",
      infrastructure: "Postgres, object storage, background jobs",
      apis: "Content generate, publish adapters",
      architecture: "Workspace → brand kit → content pipeline",
    },
    metrics: [
      { label: "Stage", value: "Building" },
      { label: "ICP", value: "Founders" },
      { label: "Model", value: "SaaS" },
    ],
    relatedProjectSlugs: ["growth-sites"],
    featured: true,
  },
  {
    slug: "voxi",
    name: "Voxi",
    tagline: "Voice AI agents for product and support flows.",
    category: "Voice AI",
    status: "EXPERIMENT",
    year: 2026,
    stack: ["Realtime Voice", "LLM", "WebRTC", "Node"],
    accent: "#e85dff",
    accentSoft: "rgba(232, 93, 255, 0.12)",
    problem: "Text-only agents miss the speed and clarity of spoken product interactions.",
    solution:
      "Voxi explores low-latency voice agents that can guide users through product and support journeys.",
    whyExists: "Some product moments are faster when spoken — this lab tests that bet.",
    happeningNow: "Measuring realtime latency and tool-call reliability in lab sessions.",
    howItWorks: ["Intent", "Listen", "Reason", "Speak", "Act"],
    details: {
      frontend: "Call console, transcript, tool traces",
      backend: "Session orchestration and tool calling",
      ai: "Streaming STT/TTS + reasoning models",
      infrastructure: "Realtime edge sessions",
      apis: "Session start, tool webhooks",
      architecture: "Event-driven voice loop with guardrails",
    },
    metrics: [
      { label: "Mode", value: "Realtime" },
      { label: "Status", value: "Experiment" },
      { label: "Focus", value: "Latency" },
    ],
    relatedProjectSlugs: ["voice-agent-lab"],
    featured: true,
  },
  {
    slug: "flowforge",
    name: "FlowForge",
    tagline: "Automation fabric for ops and growth systems.",
    category: "Automation",
    status: "FOR SALE",
    year: 2025,
    stack: ["n8n-style flows", "Webhooks", "Postgres", "Workers"],
    accent: "#ffb020",
    accentSoft: "rgba(255, 176, 32, 0.12)",
    problem: "Manual ops and growth tasks steal product time from founders.",
    solution:
      "FlowForge connects triggers, AI steps, and destinations into maintainable automation fabric.",
    whyExists: "Automation should be an owned system, not a pile of brittle zap stacks.",
    happeningNow: "Packaged for acquisition conversations — durable runs + observability.",
    howItWorks: ["Trigger", "Route", "AI Step", "Action", "Log"],
    details: {
      frontend: "Visual flow canvas and run history",
      backend: "Durable executions with retries",
      ai: "Pluggable model nodes",
      infrastructure: "Workers + webhook ingress",
      apis: "Flow CRUD, run API",
      architecture: "Graph of nodes with observability",
    },
    metrics: [
      { label: "Status", value: "For sale" },
      { label: "Type", value: "Automation" },
      { label: "Fit", value: "Ops teams" },
    ],
    relatedProjectSlugs: ["ops-automation"],
    featured: true,
  },
  {
    slug: "launchpad",
    name: "LaunchPad OS",
    tagline: "MVP scaffolding for idea → first users.",
    category: "Founder Tools",
    status: "BUILDING",
    year: 2026,
    stack: ["Next.js", "Auth", "Billing", "Analytics"],
    accent: "#3d8bff",
    accentSoft: "rgba(61, 139, 255, 0.12)",
    problem: "Founders rebuild the same auth, billing, and landing stack for every idea.",
    solution:
      "LaunchPad OS is a product starter kit wired for shipping MVPs without losing architectural quality.",
    whyExists: "Speed to first users should not mean throwing away architecture.",
    happeningNow: "Wiring auth, billing, and feature-flag seams into the starter kit.",
    howItWorks: ["Idea", "Scaffold", "Configure", "Ship", "Learn"],
    details: {
      frontend: "Marketing + app shells",
      backend: "Auth, billing, feature flags",
      ai: "Optional onboarding agents",
      infrastructure: "Deploy-ready Coolify/Vercel templates",
      apis: "User, billing, events",
      architecture: "Modular starter with clear seams",
    },
    metrics: [
      { label: "Goal", value: "Speed" },
      { label: "Status", value: "Building" },
      { label: "Audience", value: "Builders" },
    ],
    relatedProjectSlugs: ["mvp-kit"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function activeProducts() {
  return products.filter((p) => p.status === "BUILDING" || p.status === "EXPERIMENT" || p.status === "LIVE");
}

export function buildingNow() {
  return products.filter((p) => p.status === "BUILDING" || p.status === "EXPERIMENT");
}

export function statusClass(status: Product["status"]) {
  switch (status) {
    case "LIVE":
    case "SHIPPED":
      return "status-live";
    case "BUILDING":
      return "status-building";
    case "FOR SALE":
      return "status-sale";
    case "EXPERIMENT":
      return "status-experiment";
    case "PAUSED":
      return "status-paused";
  }
}
