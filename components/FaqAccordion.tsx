"use client";

import { Fragment, useEffect } from "react";
import Link from "next/link";
import { faqAnchorId, type Faq } from "./faqData";

/*
  Accordion on native <details>/<summary> — accessible, CSS-first. Editorial
  hairline rows: a mono index + a big Fraunces question, with a "+" that rotates
  to "×" when open. Answer in clean grotesque body.

  Each row carries a stable id (faqAnchorId), so a link elsewhere — the pricing
  card's "Entry into Weekly Wins" — can open a specific question by URL hash. The
  small effect below is the only JS: it opens (and scrolls to) the matching row
  on load and on hash change; without it the browser would scroll to a closed
  row and leave it collapsed.
*/

/* Render an answer, turning each occurrence of `link.text` into a link to
   `link.href`. Plain string when the item has no link. */
function Answer({ item }: { item: Faq }) {
  if (!item.link) return <>{item.a}</>;
  const { text, href } = item.link;
  const parts = item.a.split(text);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <Link
              href={href}
              className="accent-text font-medium underline decoration-1 underline-offset-2 transition-opacity hover:opacity-80"
            >
              {text}
            </Link>
          )}
        </Fragment>
      ))}
    </>
  );
}

function openFromHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const el = document.getElementById(id);
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function FaqAccordion({ items }: { items: Faq[] }) {
  useEffect(() => {
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="border-t border-[color:var(--rule)]">
      {items.map((item, i) => (
        <details
          key={item.q}
          id={faqAnchorId(item.q)}
          className="group scroll-mt-24 border-b border-[color:var(--rule)]"
        >
          <summary className="flex cursor-pointer list-none items-center gap-5 py-7 text-left [&::-webkit-details-marker]:hidden">
            <span className="kicker w-10 shrink-0 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 font-display text-2xl font-medium leading-tight text-ink transition-colors group-hover:text-[color:var(--accent)] sm:text-3xl">
              {item.q}
            </span>
            <span className="accent-text flex h-9 w-9 shrink-0 items-center justify-center border accent-border transition-transform duration-300 group-open:rotate-45">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-8 pl-[3.75rem] text-base leading-relaxed text-ink-soft">
            <Answer item={item} />
          </p>
        </details>
      ))}
    </div>
  );
}
