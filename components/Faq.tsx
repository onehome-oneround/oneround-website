"use client";

import FaqAccordion from "./FaqAccordion";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";
import { consumerFaqs, venueFaqs } from "./faqData";

/*
  FAQ — white slab, on the home page (no separate route). Editorial: index tag,
  a giant Fraunces head, then the questions as hairline-ruled accordion rows.
  id="faq" so nav/footer links anchor straight here.

  Content swaps with the audience, the same way Contact does: useAudience()
  rather than usePathname(), because there is no separate venue route to key
  off — /partners 307s to /?view=venue, so both audiences are served by the same
  page. That means this inherits the known post-hydration content swap in
  AGENTS.md rather than adding a new mechanism, and a returning venue visitor
  landing on / sees the consumer set until the audience resolves. Deferred, not
  new.

  Layout, markup, hairlines, spacing and the eyebrow are unchanged from the
  single-set version; only the copy and the array selection differ.
*/

export default function Faq() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const items = isVenue ? venueFaqs : consumerFaqs;
  const intro = isVenue
    ? "Everything about listing your venue, redemptions, and getting set up with OneRound."
    : "Everything about Roundies, Deals, and getting out with OneRound.";

  return (
    <section id="faq" className="scroll-mt-16 bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="08" label="Good to know" className="accent-text" />
            <h2 className="display-section mt-6 text-ink">
              Questions<span className="italic accent-text">?</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-soft lg:col-span-4 lg:pb-3">
            {intro} Still stuck?{" "}
            <a href="mailto:hello@oneround.au" className="accent-text font-semibold underline-offset-4 hover:underline">
              Email us
            </a>
            .
          </p>
        </div>

        <div className="mt-10">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
