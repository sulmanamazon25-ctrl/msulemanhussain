"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLocale } from "@/i18n/LocaleProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { dict, href } = useLocale();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nav = [
    { href: href("/#now"), label: dict.nav.now },
    { href: href("/products"), label: dict.nav.products },
    { href: href("/tools"), label: dict.nav.tools },
    { href: href("/vs"), label: dict.nav.vs },
    { href: href("/build-log"), label: dict.nav.buildLog },
    { href: href("/expertise"), label: dict.nav.expertise },
    { href: href("/about"), label: dict.nav.about },
  ];

  const sheet =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink text-bone 2xl:hidden"
            style={{
              paddingTop: "max(1.5rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
              paddingRight: "max(1.5rem, env(safe-area-inset-right))",
            }}
          >
            <div className="mb-10 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src="/brand/mark.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 border border-white/15 object-cover"
                />
                <span className="truncate font-display text-sm font-bold tracking-[0.14em] text-bone">
                  SULEMAN HUSSAIN
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 border border-white/20 px-3 py-2 text-xs font-semibold tracking-[0.16em] text-phosphor hover:border-phosphor"
              >
                {dict.nav.close}
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 font-display text-2xl font-semibold sm:text-3xl md:text-4xl">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/15 py-4 text-bone transition hover:text-phosphor"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex justify-center border border-white/10 px-3 py-3">
                <LanguageSwitcher />
              </div>
              <Link
                href={href("/contact")}
                onClick={() => setOpen(false)}
                className="bg-signal py-4 text-center text-sm font-semibold tracking-[0.14em] text-bone transition hover:bg-signal-hot"
              >
                {dict.nav.letsBuild}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.25rem] max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href={href("/")} className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
            <Image
              src="/brand/mark.png"
              alt="Suleman Hussain"
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 border border-white/10 object-cover"
              priority
            />
            <span className="hidden font-display text-sm font-bold tracking-[0.12em] text-bone sm:inline">
              <span className="2xl:hidden">SULEMAN</span>
              <span className="hidden 2xl:inline">SULEMAN HUSSAIN</span>
            </span>
          </Link>

          {/* Full nav only when there is guaranteed room for the longer ES labels too — same breakpoint for every locale. */}
          <nav className="hidden min-w-0 flex-1 items-center justify-end 2xl:flex">
            <ul className="flex flex-nowrap items-center justify-end gap-x-4">
              {nav.map((item) => (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className="inline-block whitespace-nowrap px-1 py-2 text-xs font-medium tracking-[0.1em] text-bone-dim transition hover:text-phosphor"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-6 flex shrink-0 items-center gap-4 border-l border-white/15 pl-6">
              <LanguageSwitcher />
              <Link
                href={href("/contact")}
                className="whitespace-nowrap bg-signal px-4 py-2.5 text-xs font-semibold tracking-[0.1em] text-bone transition hover:bg-signal-hot"
              >
                {dict.nav.letsBuild}
              </Link>
            </div>
          </nav>

          {/* Below 2xl every locale gets the same portal menu — no partial/wrapped nav rows. */}
          <div className="flex items-center gap-3 2xl:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="border border-white/20 px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-phosphor transition hover:border-phosphor"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menu}
              aria-expanded={open}
            >
              {dict.nav.menu}
            </button>
          </div>
        </div>
      </header>
      {sheet}
    </>
  );
}
