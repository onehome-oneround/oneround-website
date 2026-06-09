import type { Faq } from "./faqData";

/*
  Accordion on native <details>/<summary> — accessible, CSS-first, no JS. Editorial
  hairline rows: a mono index + a big Fraunces question, with a "+" that rotates
  to "×" when open. Answer in clean grotesque body.
*/

export default function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-[color:var(--rule)]">
      {items.map((item, i) => (
        <details key={item.q} className="group border-b border-[color:var(--rule)]">
          <summary className="flex cursor-pointer list-none items-center gap-5 py-7 text-left [&::-webkit-details-marker]:hidden">
            <span className="kicker w-10 shrink-0 text-ink-faint">0{i + 1}</span>
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
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
