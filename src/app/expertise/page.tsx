import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityOverlap } from "@/components/home/CapabilityOverlap";
import { ecosystems } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Technology + AI + Product + Growth overlap — the unfair advantage behind Founder World.",
};

export default function ExpertisePage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-16 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber">EXPERTISE</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">
          Not a skill dump. An overlap system.
        </h1>
        <p className="mt-4 max-w-2xl text-bone-dim">
          Capabilities that connect — so the journey from problem to product to growth stays in one head.
        </p>
      </div>
      <CapabilityOverlap />
      <div className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">ECOSYSTEMS</p>
        <ul className="mt-6 divide-y divide-white/10">
          {ecosystems.map((e) => (
            <li key={e.slug} className="py-6">
              <Link href={`/expertise/${e.slug}`} className="group flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <span className="font-display text-2xl font-semibold group-hover:text-phosphor" style={{ color: e.accent }}>
                  {e.name}
                </span>
                <span className="max-w-md text-sm text-bone-dim">{e.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
