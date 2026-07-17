import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ecosystems, getEcosystem } from "@/content/expertise";

export function generateStaticParams() {
  return ecosystems.map((e) => ({ ecosystem: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ecosystem: string }>;
}): Promise<Metadata> {
  const { ecosystem } = await params;
  const item = getEcosystem(ecosystem);
  if (!item) return {};
  return { title: item.name, description: item.blurb };
}

export default async function EcosystemPage({
  params,
}: {
  params: Promise<{ ecosystem: string }>;
}) {
  const { ecosystem } = await params;
  const item = getEcosystem(ecosystem);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Link href="/expertise" className="text-sm text-bone-dim hover:text-phosphor">
        ← Expertise
      </Link>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl" style={{ color: item.accent }}>
        {item.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-bone-dim">{item.blurb}</p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {item.skills.map((skill) => (
          <li
            key={skill}
            className="border border-white/10 bg-ink-3 px-4 py-4 text-bone"
            style={{ borderLeftColor: item.accent, borderLeftWidth: 3 }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
