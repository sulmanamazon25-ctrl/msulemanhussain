import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-white/5 bg-ink-2/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-dim">
            Founder building software, AI products, and digital businesses.
          </p>
        </div>
        <div>
          <p className="mb-3 text-[10px] tracking-[0.22em] text-phosphor">EXPLORE</p>
          <ul className="space-y-2 text-sm text-bone-dim">
            <li>
              <Link href="/products" className="hover:text-bone">
                Products
              </Link>
            </li>
            <li>
              <Link href="/build-log" className="hover:text-bone">
                Build Log
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-bone">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-bone">
                Insights
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] tracking-[0.22em] text-cobalt">CAPABILITIES</p>
          <ul className="space-y-2 text-sm text-bone-dim">
            <li>
              <Link href="/expertise/product-software" className="hover:text-bone">
                Software
              </Link>
            </li>
            <li>
              <Link href="/expertise/ai-automation" className="hover:text-bone">
                AI & Automation
              </Link>
            </li>
            <li>
              <Link href="/expertise/growth-digital" className="hover:text-bone">
                Growth
              </Link>
            </li>
            <li>
              <Link href="/expertise/product-business" className="hover:text-bone">
                Product
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] tracking-[0.22em] text-signal">CONNECT</p>
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
              <Link href="/contact" className="hover:text-bone">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-5 text-xs text-bone-faint md:flex md:justify-between md:px-6">
        <p>© 2026 Suleman Hussain</p>
        <p className="mt-2 space-x-4 md:mt-0">
          <Link href="/privacy" className="hover:text-bone">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-bone">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
