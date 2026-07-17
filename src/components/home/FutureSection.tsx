import Link from "next/link";
import { nextUp } from "@/content/next-up";

export function FutureSection() {
  return (
    <section className="px-4 pb-24 pt-8 md:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-14 md:px-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/20 via-transparent to-cobalt/15" />
        <div className="pointer-events-none absolute inset-0 foundry-grid opacity-50" />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">WHAT&apos;S NEXT</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">
            What I&apos;m building next is the interesting part.
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {nextUp.map((item) => (
              <li key={item.title} className="border-l-2 pl-4" style={{ borderColor: item.accent }}>
                <p className="font-display text-lg font-semibold" style={{ color: item.accent }}>
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-bone-dim">{item.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/build-log" className="border border-phosphor/40 px-5 py-3 text-sm font-semibold text-phosphor hover:bg-phosphor/10">
              Follow the build
            </Link>
            <Link href="/contact" className="bg-signal px-5 py-3 text-sm font-semibold hover:bg-signal-hot">
              Let&apos;s build something
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
