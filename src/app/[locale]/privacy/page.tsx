import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl font-bold">Privacy</h1>
      <p className="mt-6 text-bone-dim">
        This site collects only information you voluntarily submit through contact forms or when you email us
        directly. Messages are used to respond to your inquiry. No sale of personal data.
      </p>
      <p className="mt-4 text-bone-dim">
        Contact:{" "}
        <a href={`mailto:${site.emails.hello}`} className="text-phosphor hover:underline">
          {site.emails.hello}
        </a>{" "}
        (general) ·{" "}
        <a href={`mailto:${site.emails.support}`} className="text-phosphor hover:underline">
          {site.emails.support}
        </a>{" "}
        (tools &amp; products). Automated mail may come from {site.emails.noreply}; that address is not monitored
        for replies.
      </p>
    </div>
  );
}
