"use client";

import { useState } from "react";

export function ScheduleForm({
  sessionId,
  submitLabel,
  timesLabel,
  notesLabel,
  successMessage,
}: {
  sessionId: string;
  submitLabel: string;
  timesLabel: string;
  notesLabel: string;
  successMessage: string;
}) {
  const [preferredTimes, setPreferredTimes] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, preferredTimes, notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return <p className="mt-6 text-phosphor">{successMessage}</p>;
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-xl space-y-4">
      <label className="block text-sm text-bone-dim">
        {timesLabel}
        <textarea
          required
          minLength={10}
          rows={4}
          value={preferredTimes}
          onChange={(e) => setPreferredTimes(e.target.value)}
          className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
          placeholder="e.g. Tue 10–12 CEST, Wed after 18:00, Fri morning…"
        />
      </label>
      <label className="block text-sm text-bone-dim">
        {notesLabel}
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
        />
      </label>
      {error ? <p className="text-sm text-ember">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="border border-phosphor bg-phosphor/10 px-5 py-3 text-sm font-semibold tracking-[0.14em] text-phosphor disabled:opacity-50"
      >
        {busy ? "…" : submitLabel}
      </button>
    </form>
  );
}
