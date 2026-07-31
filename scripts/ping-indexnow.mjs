/**
 * Ping IndexNow with priority money URLs (hubs + products + vs + calling agents).
 * Usage: INDEXNOW_KEY=... node scripts/ping-indexnow.mjs
 * Or: SITE_URL=https://msulemanhussain.com node scripts/ping-indexnow.mjs
 */
const key = process.env.INDEXNOW_KEY?.trim();
const siteUrl = (process.env.SITE_URL || "https://msulemanhussain.com").replace(/\/$/, "");

const urlList = [
  `${siteUrl}/en`,
  `${siteUrl}/es`,
  `${siteUrl}/en/products`,
  `${siteUrl}/es/products`,
  `${siteUrl}/en/products/downitx`,
  `${siteUrl}/en/products/wasup`,
  `${siteUrl}/en/products/pinquill`,
  `${siteUrl}/en/products/bokily`,
  `${siteUrl}/en/products/spain-eats`,
  `${siteUrl}/en/products/pickleball-deutsch`,
  `${siteUrl}/en/tools`,
  `${siteUrl}/es/tools`,
  `${siteUrl}/en/tools/whatsapp-link-generator`,
  `${siteUrl}/en/tools/tiktok-reels-safe-zone`,
  `${siteUrl}/en/tools/pinterest-23-canvas`,
  `${siteUrl}/en/tools/calculadora-iva`,
  `${siteUrl}/es/tools/calculadora-iva`,
  `${siteUrl}/en/vs`,
  `${siteUrl}/es/vs`,
  `${siteUrl}/en/vs/wasup-vs-manychat`,
  `${siteUrl}/es/vs/wasup-vs-manychat`,
  `${siteUrl}/en/vs/downitx-vs-4kdownloader`,
  `${siteUrl}/es/vs/downitx-vs-4kdownloader`,
  `${siteUrl}/en/expertise`,
  `${siteUrl}/en/expertise/ai-calling-agents`,
  `${siteUrl}/es/expertise/ai-calling-agents`,
  `${siteUrl}/en/about`,
  `${siteUrl}/en/contact`,
  `${siteUrl}/llms.txt`,
  `${siteUrl}/sitemap.xml`,
];

async function pingDirect() {
  if (!key) {
    console.log("[indexnow:ping] No INDEXNOW_KEY — posting to live API instead.");
    const res = await fetch(`${siteUrl}/api/indexnow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urlList }),
    });
    const json = await res.json();
    console.log("[indexnow:ping] API response", res.status, json);
    process.exit(res.ok ? 0 : 1);
  }

  const host = new URL(siteUrl).host;
  const payload = {
    host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  console.log("[indexnow:ping]", res.status, text || "(empty body)");
  console.log(`[indexnow:ping] Submitted ${urlList.length} URLs. Key file must exist at ${payload.keyLocation}`);
  process.exit(res.ok || res.status === 202 ? 0 : 1);
}

pingDirect().catch((err) => {
  console.error(err);
  process.exit(1);
});
