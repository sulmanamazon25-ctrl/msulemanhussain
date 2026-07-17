import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, statusClass } from "@/content/products";
import { getProject } from "@/content/projects";
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
    openGraph: { title: product.name, description: product.tagline },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = (product.relatedProjectSlugs ?? [])
    .map((s) => getProject(s))
    .filter(Boolean);

  return (
    <article>
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
              <span className={cn("border px-2 py-0.5 text-[10px] tracking-wider", statusClass(product.status))}>
                {product.status}
              </span>
              <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl" style={{ color: product.accent }}>
                {product.name}
              </h1>
              <p className="mt-4 text-xl text-bone-dim">{product.tagline}</p>
              <p className="mt-2 text-sm text-bone-faint">
                {product.category}
                {product.year ? ` · ${product.year}` : ""}
              </p>
              {product.status === "FOR SALE" && (
                <p className="mt-6 inline-block border border-signal/50 bg-signal/10 px-4 py-2 text-sm tracking-wide text-signal">
                  AVAILABLE FOR ACQUISITION
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    className="bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot"
                  >
                    Explore live product
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot"
                  >
                    {product.status === "FOR SALE" ? "Talk acquisition" : "Talk about this product"}
                  </Link>
                )}
              </div>
            </div>
            <div
              className="min-h-64 border border-white/10 bg-ink-3/80 p-4"
              style={{ boxShadow: `0 0 80px ${product.accentSoft}` }}
            >
              <div className="flex h-full flex-col border border-dashed border-white/15 p-4">
                <div className="flex gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: product.accent }} />
                  <span className="h-2 w-2 rounded-full bg-amber" />
                  <span className="h-2 w-2 rounded-full bg-phosphor" />
                </div>
                <div className="mt-6 grid flex-1 grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="border border-white/10"
                      style={{ background: n % 2 ? product.accentSoft : "rgba(0,0,0,0.3)" }}
                    />
                  ))}
                </div>
                <p className="mt-4 font-mono text-[10px] text-bone-faint">Product experience · preview surface</p>
              </div>
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
                {i < product.howItWorks.length - 1 && (
                  <span className="hidden text-bone-faint md:inline">→</span>
                )}
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

        <div className="mt-12 p-6" style={{ background: product.accentSoft, outline: `1px solid ${product.accent}44` }}>
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">CURRENT STATUS</p>
          <p className="mt-2 font-display text-2xl font-semibold" style={{ color: product.accent }}>
            {product.status === "FOR SALE" ? "Available for acquisition" : product.status}
          </p>
        </div>

        {related.length > 0 && (
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
        )}
      </section>
    </article>
  );
}
