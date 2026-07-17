import type { Metadata } from "next";
import { ProductWorld } from "@/components/home/ProductWorld";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the Product World — SaaS, AI systems, and digital tools built by Suleman Hussain. Live, building, experiments, and available for acquisition.",
};

export default function ProductsPage() {
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-signal">PRODUCTS</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Product World</h1>
        <p className="mt-4 max-w-2xl text-bone-dim">
          Destinations inside Founder World. Select a product to explore identity, status, and build context — then
          enter the full experience.
        </p>
      </div>
      <ProductWorld showHeading={false} />
    </div>
  );
}
