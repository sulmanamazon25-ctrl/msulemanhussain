import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl font-bold">Terms</h1>
      <p className="mt-6 text-bone-dim">
        Content on this site is for informational purposes. Product status (live, building, experiment, for sale) may
        change. Acquisition and consulting engagements are governed by separate written agreements.
      </p>
    </div>
  );
}
