import FaqAccordion from "./FaqAccordion";
import { faqs } from "./faqData";

/*
  FAQ — on the home page (no separate route). Centred heading, soft rounded
  container with all questions as a "+" accordion. id="faq" so the nav/footer
  "FAQ" links anchor straight to it.
*/

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="on-scroll text-center">
          <p className="kicker accent-text mb-4">Good to know</p>
          <h2 className="text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl">
            Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Everything about Roundies, Deals, and getting out with OneRound. Still
            stuck?{" "}
            <a
              href="mailto:hello@oneround.au"
              className="font-semibold accent-text hover:underline"
            >
              Email us
            </a>
            .
          </p>
        </div>

        <div className="on-scroll mt-10 rounded-3xl border border-[color:var(--line)] bg-offwhite px-6 py-2 sm:px-10">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
