"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";

const intents = [
  "Build a Product",
  "Partnership",
  "Acquire a SaaS",
  "Consulting",
  "Collaboration",
  "Just Say Hello",
] as const;

type Intent = (typeof intents)[number];

const fieldsByIntent: Record<Intent, string[]> = {
  "Build a Product": ["Name", "Email", "Product idea", "Timeline"],
  Partnership: ["Name", "Email", "Company", "Partnership idea"],
  "Acquire a SaaS": ["Name", "Email", "Product interest", "Budget range"],
  Consulting: ["Name", "Email", "Challenge", "Preferred start"],
  Collaboration: ["Name", "Email", "What you're building", "How we collaborate"],
  "Just Say Hello": ["Name", "Email", "Message"],
};

function fieldKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

export function IntentForm() {
  const [intent, setIntent] = useState<Intent>("Build a Product");
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-ink-3 p-6 md:p-8">
      <p className="text-sm text-bone-dim">What brings you here?</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {intents.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setIntent(item);
              setSent(false);
            }}
            className="rounded-md border px-3 py-2 text-xs transition md:text-sm"
            style={{
              borderColor: intent === item ? "var(--phosphor)" : "rgba(255,255,255,0.12)",
              color: intent === item ? "var(--phosphor)" : "var(--bone-dim)",
              background: intent === item ? "rgba(184, 255, 61, 0.08)" : "transparent",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={intent}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-8 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const lines = [`Intent: ${intent}`, ""];
            for (const label of fieldsByIntent[intent]) {
              const value = String(data.get(fieldKey(label)) ?? "").trim();
              lines.push(`${label}: ${value}`);
            }
            const subject = encodeURIComponent(`[${intent}] from ${String(data.get("name") ?? "site").trim()}`);
            const body = encodeURIComponent(lines.join("\n"));
            window.location.href = `mailto:${site.emails.hello}?subject=${subject}&body=${body}`;
            setSent(true);
          }}
        >
          {fieldsByIntent[intent].map((field) => {
            const name = fieldKey(field);
            const isLong =
              field.toLowerCase().includes("idea") ||
              field.toLowerCase().includes("message") ||
              field.toLowerCase().includes("challenge") ||
              field.toLowerCase().includes("building");
            return (
              <label key={field} className="grid gap-2 text-sm text-bone-dim">
                {field}
                {isLong ? (
                  <textarea
                    name={name}
                    required
                    rows={4}
                    className="rounded-md border border-white/10 bg-ink px-3 py-2 text-bone outline-none focus:border-phosphor/50"
                  />
                ) : (
                  <input
                    name={name}
                    required
                    type={field === "Email" ? "email" : "text"}
                    className="rounded-md border border-white/10 bg-ink px-3 py-2 text-bone outline-none focus:border-phosphor/50"
                  />
                )}
              </label>
            );
          })}
          <button
            type="submit"
            className="mt-2 rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink hover:bg-signal-hot"
          >
            Send — let&apos;s build
          </button>
          {sent ? (
            <p className="text-sm text-phosphor">
              Your mail app should open to {site.emails.hello}. If it didn&apos;t, email that address directly.
            </p>
          ) : null}
        </motion.form>
      </AnimatePresence>
    </div>
  );
}
