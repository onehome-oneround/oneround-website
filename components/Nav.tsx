"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import AudienceToggle from "./AudienceToggle";
import NavStore from "./NavStore";

/*
  Sticky nav (all pages), light theme. Navy logo · persistent audience toggle ·
  links (How it works · FAQ · For Venues) · "Get the App" + store icons (always
  visible). Transparent over the white hero, gains a white blur + hairline on
  scroll. Mobile collapses links + toggle into a hamburger panel; store stays.
*/

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "For Venues", href: "/partners" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // Always a solid light strip so the two-tone logo + links pop on any section.
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--line)] bg-[#f4f5fc]/90 shadow-[0_6px_24px_-18px_rgba(2,0,49,0.35)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo variant="navy" height={26} priority />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:block">
            <AudienceToggle />
          </div>
          <NavStore />

          {/* Hamburger (mobile/tablet) */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-ink transition hover:border-ink/30 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-[color:var(--line)] bg-white/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          <AudienceToggle className="mb-2 self-start" />
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-semibold text-ink/85 transition hover:bg-offwhite hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
