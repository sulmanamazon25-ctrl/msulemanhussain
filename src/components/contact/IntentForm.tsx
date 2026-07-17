"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

export function IntentForm() {
  const [intent, setIntent] = useState<Intent>("Build a Product");
  const [sent, setSent] = useState(false);

  return (
    <div className="border border-white/10 bg-ink-3 p-6 md:p-8">
      <p className="text-sm text-bone-dim">What brings you here?</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {intents.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setIntent(item)}
            className="border px-3 py-2 text-xs transition md:text-sm"
            style={{
              borderColor: intent === item ? "var(--signal)" : "rgba(255,255,255,0.12)",
              color: intent === item ? "var(--signal)" : "var(--bone-dim)",
              background: intent === item ? "rgba(255,61,31,0.1)" : "transparent",
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
            setSent(true);
          }}
        >
          {fieldsByIntent[intent].map((field) => (
            <label key={field} className="grid gap-2 text-sm text-bone-dim">
              {field}
              {field.toLowerCase().includes("idea") ||
              field.toLowerCase().includes("message") ||
              field.toLowerCase().includes("challenge") ||
              field.toLowerCase().includes("building") ? (
                <textarea
                  required
                  rows={4}
                  className="border border-white/10 bg-ink px-3 py-2 text-bone outline-none focus:border-phosphor/50"
                />
              ) : (
                <input
                  required
                  type={field === "Email" ? "email" : "text"}
                  className="border border-white/10 bg-ink px-3 py-2 text-bone outline-none focus:border-phosphor/50"
                />
              )}
            </label>
          ))}
          <button
            type="submit"
            className="mt-2 bg-signal px-5 py-3 text-sm font-semibold text-bone hover:bg-signal-hot"
          >
            Send — let's build
          </button>
          {sent && (
            <p className="text-sm text-phosphor">
              Thanks — intent captured. Wire Resend/Formspree on Coolify for production delivery.
            </p>
          )}
        </motion.form>
      </AnimatePresence>
    </div>
  );
}
