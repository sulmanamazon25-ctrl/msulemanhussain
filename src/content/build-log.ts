import type { Post } from "./site";

export const buildLog: Post[] = [
  {
    slug: "ai-video-pipeline",
    title: "How I built an AI video generation pipeline using multiple models",
    excerpt:
      "A practical look at chaining script, scene, and render models into a product-grade queue.",
    category: "AI",
    date: "2026-06-12",
    body: `Shipping AI video is less about one magic model and more about durable pipelines.

I split the system into stages: idea intake, script generation, scene planning, media assembly, and delivery. Each stage is a job with retries, observability, and clear failure modes.

The product lesson: users do not care which model won a benchmark. They care that a reel finishes, looks on-brand, and ships on time.`,
  },
  {
    slug: "founder-os-reposition",
    title: "Repositioning a personal site into a Founder OS",
    excerpt:
      "Why a digital-marketer brochure was the wrong surface for a product builder.",
    category: "Business",
    date: "2026-07-15",
    body: `A personal site should answer five questions fast: who you are, what you build, what you have shipped, how you think, and how to reach you.

I moved from a service brochure to an interactive Founder OS — product universe first, skills organized as ecosystems, and acquisition-ready product pages without turning the whole brand into a marketplace.`,
  },
  {
    slug: "coolify-wordpress-to-next",
    title: "Migrating msulemanhussain.com from WordPress to Next.js on Coolify",
    excerpt: "Backup, rebuild, cutover — without losing the domain or SEO paths.",
    category: "Infrastructure",
    date: "2026-07-17",
    body: `Phase 0 is always backup: database + wp-content. Then ship the new App Router site, map redirects for valuable URLs, and cut DNS only after smoke tests.

Coolify makes the deploy boring — which is exactly what you want when the brand story is changing.`,
  },
];

export function getBuildLogPost(slug: string) {
  return buildLog.find((p) => p.slug === slug);
}
