"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import AudienceToggle from "./AudienceToggle";
// HIDDEN until launch - re-enable: app store links (nav "Get the app" + store icons)
// import NavStore from "./NavStore";

/*
  Sticky nav — modelled on UniWorker's masthead, in OneRound's brand:
  LEFT: logo + the audience toggle, grouped together.
  RIGHT: title-case links + "Get the app" + circular store icons.
  Generous empty space between, a tall bar with real presence, and a frosted
  translucent white surface so content subtly shows through on scroll.
*/

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  // HIDDEN until launch - re-enable: venue partners
  // { label: "Partnered venues", href: "/partnered-venues" },
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
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--rule)] shadow-[0_8px_40px_-28px_rgba(2,0,49,0.45)]"
      style={{
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }}
    >
      <nav className="mx-auto flex h-20 max-w-[96rem] items-center justify-between px-5 sm:h-[5.5rem] sm:px-8">
        {/* LEFT — logo + toggle */}
        <div className="flex items-center gap-5 xl:gap-7">
          <Logo variant="navy" height={28} priority />
          <div className="hidden lg:block">
            <AudienceToggle />
          </div>
        </div>

        {/* RIGHT — links + store */}
        <div className="flex items-center gap-7 xl:gap-9">
          <div className="hidden items-center gap-7 lg:flex xl:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
          {/* HIDDEN until launch - re-enable: app store links (nav "Get the app" + store icons) */}
          {/* <NavStore /> */}

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="tactile flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--rule)] bg-white/60 text-ink transition hover:border-ink/30 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-t border-[color:var(--rule)] bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-5 py-6">
          <AudienceToggle className="mb-3 self-start" />
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-offwhite hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
