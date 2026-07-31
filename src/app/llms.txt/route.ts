import { liveProducts } from "@/content/products";
import { site } from "@/content/site";
import { tools, toolCopy } from "@/content/tools";
import { comparisonCopy, listComparisons } from "@/lib/comparisons";

export const dynamic = "force-static";

function buildLlmsMarkdown() {
  const base = site.url;
  const live = liveProducts();
  const comparisons = listComparisons();

  const lines: string[] = [
    `# ${site.name} | Founder, Builder & Systems Engineer`,
    `> ${site.support} Content and tools in English (EN) and Spanish (ES).`,
    "",
    `Site: ${base}`,
    `Sitemap: ${base}/sitemap.xml`,
    "",
    "## Core Ecosystem & Live Products",
  ];

  for (const p of live) {
    lines.push(
      `- [${p.name} (EN)](${base}/en/products/${p.slug}): ${p.tagline}`,
      `- [${p.name} (ES)](${base}/es/products/${p.slug}): ${p.tagline}`,
    );
    if (p.liveUrl) {
      lines.push(`  - Live product: ${p.liveUrl}`);
    }
  }

  lines.push("", "## Free Micro-Utilities & Tools");
  for (const t of tools) {
    const en = toolCopy(t, "en");
    const es = toolCopy(t, "es");
    lines.push(
      `- [${en.name} (EN)](${base}/en/tools/${t.slug}): ${en.benefit}`,
      `- [${es.name} (ES)](${base}/es/tools/${t.slug}): ${es.benefit}`,
    );
  }

  lines.push("", "## Product Comparisons & Teardowns (/vs/)");
  for (const c of comparisons) {
    const en = comparisonCopy(c, "en");
    lines.push(
      `- [${c.our.name} vs ${c.competitor.name} (EN)](${base}/en/vs/${c.slug}): ${en.description}`,
      `- [${c.our.name} vs ${c.competitor.name} (ES)](${base}/es/vs/${c.slug}): ${comparisonCopy(c, "es").description}`,
    );
  }

  lines.push(
    "",
    "## Hubs",
    `- [Products EN](${base}/en/products) · [Products ES](${base}/es/products)`,
    `- [Tools EN](${base}/en/tools) · [Tools ES](${base}/es/tools)`,
    `- [Comparisons EN](${base}/en/vs) · [Comparisons ES](${base}/es/vs)`,
    `- [About EN](${base}/en/about) · [About ES](${base}/es/about)`,
    "",
    "## Official Links & Profiles",
    `- [GitHub](${site.social.github})`,
    `- [LinkedIn](${site.social.linkedin})`,
    `- [X / Twitter](${site.social.x})`,
    `- [YouTube](${site.social.youtube})`,
    "",
    "## Contact",
    `- General: ${site.emails.hello}`,
    `- Support (tools / products): ${site.emails.support}`,
    `- [Contact form EN](${base}/en/contact) · [Contact form ES](${base}/es/contact)`,
    "",
  );

  return lines.join("\n");
}

export async function GET() {
  return new Response(buildLlmsMarkdown(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
