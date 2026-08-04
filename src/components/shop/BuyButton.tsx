"use client";

import { useState } from "react";

type Props = {
  kind: "digital" | "session";
  slug: string;
  locale: string;
  label: string;
  topic?: string;
  className?: string;
};

export function BuyButton({ kind, slug, locale, label, topic, className }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, slug, locale, topic }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void startCheckout()}
        disabled={busy}
        className={
          className ||
          "border border-phosphor bg-phosphor/10 px-5 py-3 text-sm font-semibold tracking-[0.14em] text-phosphor hover:bg-phosphor/20 disabled:opacity-50"
        }
      >
        {busy ? "…" : label}
      </button>
      {error ? <p className="mt-2 text-sm text-ember">{error}</p> : null}
    </div>
  );
}
