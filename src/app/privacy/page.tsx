import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl font-bold">Privacy</h1>
      <p className="mt-6 text-bone-dim">
        This site collects only information you voluntarily submit through contact forms. Messages are used to respond
        to your inquiry. No sale of personal data. Update this page when a production email provider is connected.
      </p>
    </div>
  );
}
