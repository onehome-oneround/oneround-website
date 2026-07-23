"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import AudienceToggle from "./AudienceToggle";
// HIDDEN until launch - re-enable: app store links (nav "Get the app" + store icons)
// import NavStore from "./NavStore";

/*
  Sticky nav — modelled on UniWorker's masthead, in OneRound's brand.
  Desktop (lg+): LEFT logo + audience toggle grouped together, RIGHT title-case
  links (+ "Get the app" store icons, behind the launch guard).
  Mobile (<lg): a three-part bar — logo left, the audience toggle centre (it is
  the primary control, so it stays visible rather than hiding in the menu), and a
  hamburger right holding only the secondary links. A tall bar with real presence
  on a frosted translucent white surface so content shows through on scroll.
*/

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Partnered venues", href: "/partnered-venues" },
  { label: "About", href: "/about" },
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
      className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--rule)] shadow-[0_8px_40px_-28px_rgba(var(--navy-rgb),0.45)]"
      style={{
        backgroundColor: "rgba(var(--white-rgb),0.82)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }}
    >
      <nav className="mx-auto flex h-20 max-w-[96rem] items-center justify-between gap-2 px-4 sm:h-[5.5rem] sm:px-8">
        {/* LEFT — logo (+ toggle, desktop only) */}
        <div className="flex items-center gap-5 xl:gap-7">
          {/* Logo shrinks a touch on mobile so the centre toggle + hamburger all
              fit a 375px bar; the header height is unchanged. */}
          <Logo variant="navy" height={28} priority className="!h-5 lg:!h-full" />
          <div className="hidden lg:block">
            <AudienceToggle />
          </div>
        </div>

        {/* CENTRE — audience toggle, always visible on mobile (the primary
            control belongs in the header, not two taps deep in the menu).
            Hidden at lg+, where the desktop toggle above takes over. */}
        <div className="lg:hidden">
          <AudienceToggle />
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
        {/* Secondary nav only — the audience toggle now lives in the header.
            Every item closes the menu on tap (which also restores body scroll
            via the effect above), so the page isn't stuck behind an open panel. */}
        <div className="flex flex-col gap-2 px-5 py-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-offwhite hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
