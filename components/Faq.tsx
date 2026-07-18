import FaqAccordion from "./FaqAccordion";
import EditorialTag from "./EditorialTag";
import { faqs } from "./faqData";

/*
  FAQ — white slab, on the home page (no separate route). Editorial: index tag,
  a giant Fraunces head, then the questions as hairline-ruled accordion rows.
  id="faq" so nav/footer links anchor straight here. Content unchanged.
*/

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-[color:var(--paper)] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="08" label="Good to know" className="accent-text" />
            <h2 className="display-section mt-8 text-ink">
              Questions<span className="italic accent-text">?</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-soft lg:col-span-4 lg:pb-3">
            Everything about Roundies, Deals, and getting out with OneRound. Still stuck?{" "}
            <a href="mailto:hello@oneround.au" className="accent-text font-semibold underline-offset-4 hover:underline">
              Email us
            </a>
            .
          </p>
        </div>

        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
