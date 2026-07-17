import type { Metadata } from "next";
import { IntentForm } from "@/components/contact/IntentForm";

export const metadata: Metadata = {
  title: "Let's Build",
  description:
    "Intent-based contact — build a product, partnership, acquire a SaaS, consulting, collaboration, or say hello.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-signal">CONTACT</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Let&apos;s build</h1>
      <p className="mt-4 text-bone-dim">
        Tell me why you&apos;re here. The form adapts — so the conversation starts in the right place.
      </p>
      <div className="mt-10">
        <IntentForm />
      </div>
    </div>
  );
}
