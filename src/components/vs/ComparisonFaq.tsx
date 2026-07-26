"use client";

import { useState } from "react";
import type { ComparisonFaq as FaqItem } from "@/types/comparison";

type Props = {
  items: FaqItem[];
  title: string;
};

export function ComparisonFaq({ items, title }: Props) {
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
      <ul className="mt-6 divide-y divide-white/10 border border-white/10">
        {items.map((item) => {
          const isOpen = open === item.q;
          return (
            <li key={item.q}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left hover:bg-white/[0.03] md:px-5"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.q)}
              >
                <span className="text-sm font-semibold text-bone md:text-base">{item.q}</span>
                <span className="font-mono text-phosphor" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? (
                <p className="px-4 pb-4 text-sm leading-relaxed text-bone-dim md:px-5">{item.a}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
