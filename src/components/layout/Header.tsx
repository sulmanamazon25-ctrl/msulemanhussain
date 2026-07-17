"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const nav = [
  { href: "/#now", label: "NOW" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/build-log", label: "BUILD LOG" },
  { href: "/expertise", label: "EXPERTISE" },
  { href: "/about", label: "ABOUT" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/mark.png"
            alt="Suleman Hussain"
            width={36}
            height={36}
            className="h-9 w-9 border border-white/10 object-cover"
            priority
          />
          <span className="font-display text-sm font-bold tracking-[0.2em] text-bone">
            SULEMAN HUSSAIN
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-[0.16em] text-bone-dim transition hover:text-phosphor"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-signal px-4 py-2 text-xs font-semibold tracking-[0.14em] text-bone transition hover:bg-signal-hot"
          >
            LET&apos;S BUILD
          </Link>
        </nav>

        <button
          type="button"
          className="border border-white/15 px-3 py-1.5 text-[11px] tracking-[0.2em] text-phosphor lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          MENU
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-6 lg:hidden"
          >
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/brand/mark.png" alt="" width={32} height={32} className="h-8 w-8 object-cover" />
                <span className="font-display text-sm tracking-[0.2em]">SULEMAN HUSSAIN</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-sm tracking-widest text-signal">
                CLOSE
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-6 font-display text-4xl font-semibold">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 pb-4 hover:text-phosphor"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 bg-signal py-4 text-center text-sm font-semibold tracking-[0.18em]"
            >
              LET&apos;S BUILD
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
