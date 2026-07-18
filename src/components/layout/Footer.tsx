"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { useLocale } from "@/i18n/LocaleProvider";

export function Footer() {
  const { dict, href } = useLocale();

  return (
    <footer className="mt-8 border-t border-white/5 bg-ink-2/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mark.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 border border-white/10 object-cover"
            />
            <p className="font-display text-lg font-semibold">{site.name}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-dim">{dict.footer.blurb}</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] tracking-[0.22em] text-phosphor">{dict.footer.explore}</p>
          <ul className="space-y-2 text-sm text-bone-dim">
            <li>
              <Link href={href("/products")} className="hover:text-bone">
                {dict.footer.products}
              </Link>
            </li>
            <li>
              <Link href={href("/build-log")} className="hover:text-bone">
                {dict.footer.buildLog}
              </Link>
            </li>
            <li>
              <Link href={href("/projects")} className="hover:text-bone">
                {dict.footer.projects}
              </Link>
            </li>
            <li>
              <Link href={href("/insights")} className="hover:text-bone">
                {dict.footer.insights}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] tracking-[0.22em] text-cobalt">{dict.footer.capabilities}</p>
          <ul className="space-y-2 text-sm text-bone-dim">
            <li>
              <Link href={href("/expertise/product-software")} className="hover:text-bone">
                {dict.footer.software}
              </Link>
            </li>
            <li>
              <Link href={href("/expertise/ai-automation")} className="hover:text-bone">
                {dict.footer.ai}
              </Link>
            </li>
            <li>
              <Link href={href("/expertise/growth-digital")} className="hover:text-bone">
                {dict.footer.growth}
              </Link>
            </li>
            <li>
              <Link href={href("/expertise/product-business")} className="hover:text-bone">
                {dict.footer.product}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] tracking-[0.22em] text-signal">{dict.footer.connect}</p>
          <ul className="space-y-2 text-sm text-bone-dim">
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:text-bone">
                YouTube
              </a>
            </li>
            <li>
              <a href={site.social.tiktok} target="_blank" rel="noreferrer" className="hover:text-bone">
                TikTok
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-bone">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.x} target="_blank" rel="noreferrer" className="hover:text-bone">
                X
              </a>
            </li>
            <li>
              <a href={site.social.github} target="_blank" rel="noreferrer" className="hover:text-bone">
                GitHub
              </a>
            </li>
            <li>
              <Link href={href("/contact")} className="hover:text-bone">
                {dict.footer.contact}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-5 text-xs text-bone-faint md:flex md:justify-between md:px-6">
        <p>© 2026 Suleman Hussain</p>
        <p className="mt-2 space-x-4 md:mt-0">
          <Link href={href("/privacy")} className="hover:text-bone">
            {dict.footer.privacy}
          </Link>
          <Link href={href("/terms")} className="hover:text-bone">
            {dict.footer.terms}
          </Link>
        </p>
      </div>
    </footer>
  );
}
