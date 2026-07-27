"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleProvider";

type Source = { title: string; url: string; snippet: string; score: number };

const API_BASE = process.env.NEXT_PUBLIC_AI_SEARCH_URL || "/ai-api";
const WIDGET_KEY = process.env.NEXT_PUBLIC_AI_WIDGET_KEY || "portfolio-public-key";
const TENANT = "portfolio";

function sessionKey(locale: string) {
  return `ai-search-session:${locale}`;
}

export function AiSearchWidget() {
  const { locale, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(sessionKey(locale));
      if (existing) setSessionId(existing);
      else {
        const id = crypto.randomUUID().replace(/-/g, "");
        localStorage.setItem(sessionKey(locale), id);
        setSessionId(id);
      }
    } catch {
      setSessionId(crypto.randomUUID().replace(/-/g, ""));
    }
  }, [locale]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answer, sources, loading]);

  const ask = useCallback(
    async (message: string) => {
      const q = message.trim();
      if (!q || loading) return;
      setLoading(true);
      setError(null);
      setAnswer("");
      setSources([]);
      setFollowUps([]);
      setInput("");

      try {
        const res = await fetch(`${API_BASE}/v1/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Tenant-Id": TENANT,
            "X-Widget-Key": WIDGET_KEY,
          },
          body: JSON.stringify({
            message: q,
            locale,
            session_id: sessionId || undefined,
            history: [],
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || `HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data.session_id) {
          setSessionId(data.session_id);
          try {
            localStorage.setItem(sessionKey(locale), data.session_id);
          } catch {
            /* ignore */
          }
        }
        setAnswer(data.answer || "");
        setSources(data.sources || []);
        setFollowUps(data.follow_ups || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : dict.aiSearch.error);
      } finally {
        setLoading(false);
      }
    },
    [dict.aiSearch.error, loading, locale, sessionId],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 bg-signal px-4 py-3 text-sm font-semibold text-ink shadow-lg hover:bg-signal-hot md:bottom-8 md:right-8"
        aria-expanded={open}
        aria-controls="ai-search-panel"
      >
        {open ? dict.aiSearch.close : dict.aiSearch.open}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="ai-search-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 flex h-[min(70vh,560px)] w-[min(100vw-2rem,380px)] flex-col border border-white/15 bg-ink-2/95 shadow-2xl backdrop-blur-xl md:bottom-24 md:right-8"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-phosphor">{dict.aiSearch.eyebrow}</p>
              <p className="mt-1 font-display text-lg font-semibold">{dict.aiSearch.title}</p>
              <p className="mt-1 text-xs text-bone-dim">{dict.aiSearch.blurb}</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {!answer && !loading && !error ? (
                <p className="text-bone-dim">{dict.aiSearch.placeholder}</p>
              ) : null}
              {loading ? <p className="animate-pulse text-phosphor">{dict.aiSearch.thinking}</p> : null}
              {error ? <p className="text-signal">{error}</p> : null}
              {answer ? (
                <div className="whitespace-pre-wrap text-bone">{answer}</div>
              ) : null}
              {sources.length ? (
                <div className="space-y-2 border-t border-white/10 pt-3">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-bone-faint">
                    {dict.aiSearch.sources}
                  </p>
                  {sources.map((s) => (
                    <a
                      key={`${s.url}-${s.title}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-phosphor hover:underline"
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              ) : null}
              {followUps.length ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {followUps.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => ask(f)}
                      className="border border-white/15 px-2 py-1 text-[11px] text-bone-dim hover:border-phosphor hover:text-phosphor"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>

            <form
              className="flex gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void ask(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={dict.aiSearch.inputPlaceholder}
                className="min-w-0 flex-1 border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-phosphor"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-signal px-3 py-2 text-sm font-semibold text-ink disabled:opacity-40"
              >
                {dict.aiSearch.send}
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
