import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productPageJsonLd } from "@/content/owned-brands";
import { getProduct, products, statusClass } from "@/content/products";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.previewImage ? [product.previewImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = (product.relatedProjectSlugs ?? [])
    .map((s) => getProject(s))
    .filter(Boolean);

  const jsonLd = productPageJsonLd(product);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className="px-4 py-16 md:px-6 md:py-24"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 80% 0%, ${product.accentSoft}, transparent 55%)`,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <Link href="/products" className="text-sm text-bone-dim hover:text-phosphor">
            ← Product World
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {product.logo ? (
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <span className={cn("border px-2 py-0.5 text-[10px] tracking-wider", statusClass(product.status))}>
                  {product.status}
                </span>
                {product.multilingual ? (
                  <span className="border border-phosphor/40 px-2 py-0.5 text-[10px] tracking-wider text-phosphor">
                    MULTILINGUAL{product.locales ? ` · ${product.locales.join(" / ")}` : ""}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl" style={{ color: product.accent }}>
                {product.name}
              </h1>
              <p className="mt-4 text-xl text-bone-dim">{product.tagline}</p>
              <p className="mt-2 text-sm text-bone-faint">
                {product.category}
                {product.year ? ` · ${product.year}` : ""}
              </p>
              <p className="mt-4 text-sm text-bone-dim">
                Founded by{" "}
                <Link href="/about" className="text-phosphor hover:underline">
                  {site.name}
                </Link>
              </p>
              {product.status === "COMING SOON" ? (
                <p className="mt-6 inline-block border border-amber/40 bg-amber/10 px-4 py-2 text-sm tracking-wide text-amber">
                  COMING SOON FROM THE WORKSHOP
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot"
                  >
                    Explore live product
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot"
                  >
                    Talk about this product
                  </Link>
                )}
              </div>
            </div>
            <div
              className="relative min-h-64 overflow-hidden border border-white/10 bg-ink-3/80"
              style={{ boxShadow: `0 0 80px ${product.accentSoft}` }}
            >
              {product.previewImage ? (
                <Image
                  src={product.previewImage}
                  alt={`${product.name} preview`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div
                  className="flex h-full min-h-64 items-center justify-center p-8"
                  style={{ background: product.accentSoft }}
                >
                  <p className="font-display text-3xl font-bold" style={{ color: product.accent }}>
                    {product.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-signal">Problem</h2>
          <p className="mt-3 text-bone-dim">{product.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-phosphor">Why it exists</h2>
          <p className="mt-3 text-bone-dim">{product.whyExists}</p>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-cobalt">What was built</h2>
          <p className="mt-3 max-w-3xl text-bone-dim">{product.solution}</p>
          <p className="mt-4 text-sm text-bone-faint">
            <span className="text-phosphor">Happening now: </span>
            {product.happeningNow}
          </p>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-2/40 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold">How it works</h2>
          <ol className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            {product.howItWorks.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span
                  className="px-4 py-3 font-mono text-sm"
                  style={{ outline: `1px solid ${product.accent}`, color: product.accent }}
                >
                  {step}
                </span>
                {i < product.howItWorks.length - 1 ? (
                  <span className="hidden text-bone-faint md:inline">→</span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="font-display text-2xl font-semibold">Technology / build details</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(product.details).map(([key, value]) => (
            <div key={key}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone-faint">{key}</p>
              <p className="mt-2 text-sm text-bone-dim">{value}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 p-6"
          style={{ background: product.accentSoft, outline: `1px solid ${product.accent}44` }}
        >
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">CURRENT STATUS</p>
          <p className="mt-2 font-display text-2xl font-semibold" style={{ color: product.accent }}>
            {product.status === "LIVE" ? "Live · multilingual product" : product.status}
          </p>
          {product.liveUrl ? (
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm hover:underline"
              style={{ color: product.accent }}
            >
              {product.liveUrl} →
            </a>
          ) : null}
        </div>

        {related.length > 0 ? (
          <div className="mt-14">
            <h2 className="font-display text-xl font-semibold">Related projects</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) =>
                r ? (
                  <li key={r.slug} className="border-t border-white/10 pt-3">
                    <Link href="/projects" className="font-medium hover:text-phosphor">
                      {r.title}
                    </Link>
                    <p className="text-sm text-bone-dim">{r.summary}</p>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        ) : null}
      </section>
    </article>
  );
}
