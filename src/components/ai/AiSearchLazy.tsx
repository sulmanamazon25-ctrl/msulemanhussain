"use client";

import dynamic from "next/dynamic";

const AiSearchWidget = dynamic(
  () => import("@/components/ai/AiSearchWidget").then((m) => m.AiSearchWidget),
  { ssr: false },
);

export function AiSearchLazy() {
  return <AiSearchWidget />;
}
