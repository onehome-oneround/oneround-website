"use client";

import { useEffect } from "react";

/*
  Scroll reveal. Adds `.is-visible` to any `.on-scroll` / `.on-scroll-card`
  element once it has scrolled into the lower viewport. Uses a rAF-throttled
  scroll/resize check (robust across programmatic jumps and sticky ancestors,
  where a per-element IntersectionObserver proved unreliable). CSS handles the
  transition (see globals.css). Honours prefers-reduced-motion.
*/

export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".on-scroll, .on-scroll-card"),
    );
    if (!els.length) return;

    const reveal = (el: HTMLElement) => el.classList.add("is-visible");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(reveal);
      return;
    }

    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (let i = els.length - 1; i >= 0; i--) {
        const el = els[i];
        const r = el.getBoundingClientRect();
        // Reveal once the element's top enters the lower ~12% of the viewport
        // (and it isn't fully below the fold).
        if (r.top < vh * 0.88 && r.bottom > 0) {
          reveal(el);
          els.splice(i, 1);
        }
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };

    check(); // reveal anything already in view on load
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
