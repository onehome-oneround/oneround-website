import type { Faq } from "./faqData";

/*
  Accordion built on native <details>/<summary> — accessible, CSS-first, no JS.
  Each row has a circular "+" toggle that rotates to "×" when open; hairline
  dividers between rows. Used by the home FAQ section.
*/

export default function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-[color:var(--line)]">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-bold tracking-[-0.01em] text-ink sm:text-xl">
              {item.q}
            </span>
            <span className="accent-text flex h-8 w-8 shrink-0 items-center justify-center rounded-full border accent-border transition-transform group-open:rotate-45">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-base leading-relaxed text-ink-soft">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
