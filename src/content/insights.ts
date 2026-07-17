import type { Post } from "./site";

export const insights: Post[] = [
  {
    slug: "saas-from-idea-to-users",
    title: "From idea to real users: a founder’s SaaS checklist",
    excerpt: "The minimum architecture and growth loops that turn prototypes into products.",
    category: "SaaS",
    date: "2026-05-02",
    body: `An idea is not a product. A product has users, feedback loops, and operational truth.

Start with a sharp problem, ship a thin vertical slice, instrument activation, then automate the painful manual edges. AI can accelerate generation — it cannot replace judgment about what to build next.`,
  },
  {
    slug: "ai-that-ships",
    title: "AI that ships: integrations over demos",
    excerpt: "How to embed models into workflows that survive production.",
    category: "AI",
    date: "2026-04-18",
    body: `Demos impress. Production systems persist.

Treat models as unreliable subordinates: validate outputs, budget latency, log prompts/versions, and give humans an escape hatch. The winners are teams who productize the boring reliability layer.`,
  },
  {
    slug: "seo-for-builders",
    title: "SEO for builders who hate fluff",
    excerpt: "Technical clarity, intent pages, and internal linking that compounds.",
    category: "SEO",
    date: "2026-03-09",
    body: `SEO is not keyword stuffing. It is making the right page the best answer for a real query — then connecting those pages so crawlers and humans can navigate your thinking.

Ship original build logs. Structure expertise. Link products to problems to insights.`,
  },
];

export function getInsight(slug: string) {
  return insights.find((p) => p.slug === slug);
}
