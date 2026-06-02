"use client";

import { useEffect } from "react";

/*
  Lightweight scroll reveal. Adds `.is-visible` to any `.on-scroll` or
  `.on-scroll-card` element when it enters the viewport. CSS handles the
  transition (see globals.css). Respects prefers-reduced-motion.
*/

export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".on-scroll, .on-scroll-card"),
    );
    if (!els.length) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
