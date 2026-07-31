import { NextRequest, NextResponse } from "next/server";
import { site } from "@/content/site";

type Body = {
  urlList?: string[];
};

/**
 * POST /api/indexnow
 * Body: { urlList?: string[] } — defaults to priority discovery URLs.
 * Requires INDEXNOW_KEY env (Coolify secret). Returns 503 if unset.
 */
export async function POST(request: NextRequest) {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_KEY is not configured" },
      { status: 503 },
    );
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  const host = new URL(site.url).host;
  const urlList =
    body.urlList && body.urlList.length > 0
      ? body.urlList
      : [
          `${site.url}/en`,
          `${site.url}/es`,
          `${site.url}/en/products`,
          `${site.url}/en/products/downitx`,
          `${site.url}/en/products/wasup`,
          `${site.url}/en/products/pinquill`,
          `${site.url}/en/tools`,
          `${site.url}/es/tools`,
          `${site.url}/en/vs`,
          `${site.url}/en/vs/wasup-vs-manychat`,
          `${site.url}/en/vs/downitx-vs-4kdownloader`,
          `${site.url}/en/expertise/ai-calling-agents`,
          `${site.url}/es/expertise/ai-calling-agents`,
          `${site.url}/en/expertise/spain-money-guides`,
          `${site.url}/es/expertise/spain-money-guides`,
          `${site.url}/llms.txt`,
          `${site.url}/sitemap.xml`,
        ];

  const payload = {
    host,
    key,
    keyLocation: `${site.url}/${key}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  return NextResponse.json(
    {
      ok: res.ok,
      status: res.status,
      submitted: urlList.length,
      keyLocation: payload.keyLocation,
      upstream: text || null,
    },
    { status: res.ok ? 200 : 502 },
  );
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST URL lists to IndexNow. Set INDEXNOW_KEY and host public/{key}.txt (or run npm run indexnow:key).",
    hasKey: Boolean(process.env.INDEXNOW_KEY?.trim()),
  });
}
