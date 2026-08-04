"use client";

import { useState } from "react";
import { BuyButton } from "@/components/shop/BuyButton";
import { SESSION_TOPICS } from "@/lib/shop/utils";

type Pack = {
  slug: string;
  name: string;
  blurb: string;
  durationMinutes: number;
  priceLabel: string;
};

export function BookPackages({
  locale,
  packages,
  buyLabel,
  topicLabel,
}: {
  locale: string;
  packages: Pack[];
  buyLabel: string;
  topicLabel: string;
}) {
  const [topic, setTopic] = useState<string>(SESSION_TOPICS[0]);

  return (
    <div className="mt-10">
      <label className="block max-w-md text-sm text-bone-dim">
        {topicLabel}
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
        >
          {SESSION_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {packages.map((p) => (
          <li key={p.slug} className="flex flex-col border border-white/10 bg-ink-2/50 p-5">
            <p className="font-mono text-[10px] tracking-[0.2em] text-phosphor">{p.durationMinutes} MIN</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{p.name}</h2>
            <p className="mt-3 flex-1 text-sm text-bone-dim">{p.blurb}</p>
            <p className="mt-4 font-display text-xl text-bone">{p.priceLabel}</p>
            <div className="mt-5">
              <BuyButton
                kind="session"
                slug={p.slug}
                locale={locale}
                topic={topic}
                label={buyLabel}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
