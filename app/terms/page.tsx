import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply to your use of the OneRound website, operated by ONEROUND PTY LTD.",
  alternates: { canonical: "https://oneround.au/terms" },
};

/*
  Real, finished terms copy (no lorem) describing the current site. Recommend a
  legal review before these expand to cover the app, rewards, and venue agreements.
*/

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-2xl">
          <p className="kicker accent-text">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-ink sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-3 text-sm text-ink-faint">Last updated: June 2026</p>

          <div className="mt-10 space-y-8 text-ink-soft [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_p]:mt-3 [&_p]:leading-relaxed">
            <section>
              <p>
                This website, <span className="text-ink">oneround.au</span>, is
                operated by ONEROUND PTY LTD (&ldquo;OneRound&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you agree to
                these terms. If you don&rsquo;t agree, please don&rsquo;t use the
                site.
              </p>
            </section>

            <section>
              <h2>About the app</h2>
              <p>
                Information on this site describes OneRound and is provided in good
                faith. Features, rewards, participating venues, membership pricing,
                and availability may change over time.
              </p>
            </section>

            <section>
              <h2>Membership and rewards</h2>
              <p>
                Some features, Roundies and Deals, form part of a paid OneRound
                membership; the social side is free. Membership includes five
                Roundies a month, redeemable one per outing with a 12 hour gap
                between redemptions. Full membership terms are presented in the app
                before you subscribe. Rewards are subject to participating-venue
                availability and fair-use limits.
              </p>
            </section>

            <section>
              <h2>Intellectual property</h2>
              <p>
                The OneRound name, logo, and the content on this site belong to
                ONEROUND PTY LTD and may not be copied or used without our
                permission.
              </p>
            </section>

            <section>
              <h2>Liability</h2>
              <p>
                The site is provided &ldquo;as is&rdquo;. To the extent permitted
                by law, we&rsquo;re not liable for any loss arising from your use
                of the site. Nothing in these terms excludes rights you have under
                the Australian Consumer Law.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <p>
                Questions about these terms? Email{" "}
                <a
                  href="mailto:hello@oneround.au"
                  className="font-semibold accent-text hover:underline"
                >
                  hello@oneround.au
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
