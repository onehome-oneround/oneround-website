import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ONEROUND PTY LTD collects and handles personal information on the OneRound website.",
  alternates: { canonical: "https://oneround.au/privacy" },
};

/*
  Real, finished privacy copy (no lorem), describing the current site. Recommend
  a legal review before data handling expands with the app.
*/

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-2xl">
          <p className="kicker accent-text">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ink-faint">Last updated: June 2026</p>

          <div className="mt-10 space-y-8 text-ink-soft [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_p]:mt-3 [&_p]:leading-relaxed">
            <section>
              <p>
                This policy explains how ONEROUND PTY LTD (&ldquo;OneRound&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and handles personal
                information through this website,{" "}
                <span className="text-ink">oneround.au</span>. We handle personal
                information in line with the Australian Privacy Principles under
                the Privacy Act 1988 (Cth).
              </p>
            </section>

            <section>
              <h2>What we collect</h2>
              <p>
                When you contact us by email we collect the details you choose to
                send, such as your name and email address. We also collect basic,
                non-identifying analytics about how the site is used (such as page
                views and general device type).
              </p>
            </section>

            <section>
              <h2>How we use it</h2>
              <p>
                We use your details to respond to your enquiry and to operate and
                improve the site. We don&rsquo;t sell your information, and we
                won&rsquo;t send you unrelated marketing.
              </p>
            </section>

            <section>
              <h2>Who we share it with</h2>
              <p>
                We use trusted service providers to run the site (for example,
                hosting and analytics). They only access your information to
                provide those services to us. We may disclose information if
                required by law.
              </p>
            </section>

            <section>
              <h2>Your choices</h2>
              <p>
                You can ask us to access, correct, or delete the information we
                hold about you at any time by emailing us.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <p>
                For any privacy question or request, email us at{" "}
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
