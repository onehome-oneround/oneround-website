import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OneRound Pty Ltd collects, uses and handles personal information.",
  alternates: { canonical: "https://oneround.au/privacy" },
};

/*
  Privacy Policy — the finalised policy, rendered as editorial React rather than
  raw markdown. It uses a bespoke header (mono eyebrow, Fraunces display title,
  mono effective/updated dates) over a --paper ground, then the shared
  `legal-prose` system (see globals.css) for body, headings, lists, the provider
  table, and the hairline section separators that stand in for the source's ---.

  Audience-agnostic: the content is identical for members and venues. Only the
  accent on links flips with the audience toggle, like every other legal page.
*/

const PROVIDERS = [
  {
    provider: "Vercel Inc.",
    purpose: "Website and application hosting",
    location: "United States",
  },
  {
    provider: "Google LLC",
    purpose:
      "Website analytics (subject to your consent) and Google Play billing on Android",
    location: "United States",
  },
  {
    provider: "Meta Platforms, Inc.",
    purpose: "Advertising and pixel tracking (subject to your consent)",
    location: "United States",
  },
  {
    provider: "Resend",
    purpose: "Transactional email delivery",
    location: "United States",
  },
  {
    provider: "Apple Inc.",
    purpose: "App Store In-App Purchase, Apple Pay, and iOS distribution",
    location: "United States",
  },
  {
    provider: "Twilio, Inc.",
    purpose: "SMS notifications and verification codes",
    location: "United States",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-[color:var(--paper)] px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-[44rem]">
          <header>
            <p className="kicker text-ink-faint">Legal / Privacy Policy</p>
            <h1 className="display-section mt-4 text-ink">Privacy Policy</h1>
            <div className="mt-5 space-y-1 font-mono text-[0.8125rem] tracking-[0.02em] text-ink-faint">
              <p>Effective date: 10 August 2026</p>
              <p>Last updated: 20 July 2026</p>
            </div>
          </header>

          <div className="legal-prose mt-10">
            <p>
              Your privacy is very important to us. Accordingly, we have
              developed this Policy in order for you to understand how we
              collect, use, communicate and disclose and make use of personal
              information. The following outlines our privacy policy.
            </p>
            <ul>
              <li>
                Before or at the time of collecting personal information, we
                will identify the purposes for which information is being
                collected.
              </li>
              <li>
                We will collect and use of personal information solely with the
                objective of fulfilling those purposes specified by us and for
                other compatible purposes, unless consent of the individual
                concerned is obtained or use of the information is required by
                law.
              </li>
              <li>
                We will only retain personal information as long as necessary
                for the fulfillment of those purposes.
              </li>
              <li>
                We will collect personal information by lawful and fair means
                and, where appropriate, with the knowledge or consent of the
                individual concerned.
              </li>
              <li>
                Personal data should be relevant to the purposes for which it is
                to be used, and, to the extent necessary for those purposes,
                should be accurate, complete, and up-to-date.
              </li>
              <li>
                We will protect personal information by reasonable security
                safeguards against loss or theft, as well as unauthorized
                access, disclosure, copying, use or modification.
              </li>
              <li>
                We will make readily available to customers information about
                our policies and practices relating to the management of
                personal information.
              </li>
              <li>
                We are committed to conducting our business in accordance with
                these principles in order to ensure that the confidentiality of
                personal information is protected and maintained.
              </li>
            </ul>

            <hr />
            <h2>Who we are</h2>
            <p>
              OneRound is operated by <strong>ONEROUND PTY LTD</strong> (ABN 53
              691 600 263), an Australian proprietary limited company. Where this
              policy refers to “OneRound”, “we”, “us”, or “our”, it means
              ONEROUND PTY LTD. You can contact us at{" "}
              <a href="mailto:hello@oneround.au">hello@oneround.au</a>.
            </p>
            <p>
              We are bound by the <em>Privacy Act 1988</em> (Cth) and the
              Australian Privacy Principles (APPs).
            </p>

            <hr />
            <h2>What personal information we collect</h2>
            <p>
              <strong>
                When you sign up as a member (in the OneRound app):
              </strong>{" "}
              your name, email address, mobile phone number, date of birth (for
              age verification), payment details, and any profile information you
              choose to provide.
            </p>
            <p>
              <strong>
                When you sign up as a venue partner (via our website or admin
                portal):
              </strong>{" "}
              venue name, contact person, email address, phone number, venue
              type, and any message you send us.
            </p>
            <p>
              <strong>When you contact us:</strong> the contents of your email,
              message, or call.
            </p>
            <p>
              <strong>When you visit our website (oneround.au):</strong> IP
              address, device type, browser type, operating system, referring
              URL, pages viewed, time spent on pages, and cookies (see “Cookies,
              analytics, and advertising” below).
            </p>
            <p>
              <strong>When you use the OneRound app:</strong> device
              identifiers, app version, crash and diagnostic logs, and (if you
              enable it) your approximate location when you redeem a Roundie or
              view the map.
            </p>
            <p>
              <strong>When you redeem a Roundie:</strong> the venue, the item
              redeemed, the date and time, and any related transaction data such
              as a paired purchase confirmation from the venue.
            </p>
            <p>
              <strong>What we don’t collect:</strong> we do not collect sensitive
              information (as defined in the Privacy Act) such as health
              information, racial or ethnic origin, political opinions, religious
              beliefs, sexual orientation, or criminal history. We do not sell
              your personal information to any third party.
            </p>

            <hr />
            <h2>Why we collect it</h2>
            <p>
              We collect and use your personal information for the following
              purposes:
            </p>
            <ul>
              <li>
                To provide the OneRound service — account creation, age
                verification, subscription management, and Roundie redemption
              </li>
              <li>
                To confirm you are 18 or over, which is a legal requirement given
                OneRound involves partnered alcohol venues
              </li>
              <li>
                To communicate with you about your membership, Roundies, and
                service updates
              </li>
              <li>
                To operate our marketing website and understand how it is used,
                so we can improve it
              </li>
              <li>
                To advertise OneRound to potential members through platforms such
                as Meta and Google (subject to your consent)
              </li>
              <li>To respond to your questions and support requests</li>
              <li>
                To detect, prevent, and address fraud, misuse, and security
                incidents
              </li>
              <li>
                To comply with our legal obligations, including under the{" "}
                <em>Australian Consumer Law</em> and Queensland liquor licensing
                rules
              </li>
              <li>To enforce our Terms of Service and Venue Terms</li>
            </ul>
            <p>
              We do not use your personal information for any other purpose
              without your consent, unless required or permitted by law.
            </p>

            <hr />
            <h2>Cookies, analytics, and advertising</h2>
            <p>
              Cookies are small text files stored on your device by your browser.
              Websites use them to remember information about your visit and to
              measure how the site is used.
            </p>
            <p>
              We use the following tools on <strong>oneround.au</strong>:
            </p>
            <ul>
              <li>
                <strong>Google Analytics 4</strong> — measures how our website is
                used. Sends aggregated data (page views, session duration, device
                type, approximate geographic location) to Google.
              </li>
              <li>
                <strong>Meta Pixel</strong> — helps us advertise OneRound to
                relevant audiences on Facebook and Instagram, and measure whether
                those ads are working. Sends browsing data to Meta Platforms, Inc.
              </li>
            </ul>
            <p>
              Both tools set cookies on your device and transfer data to servers
              outside Australia.
            </p>
            <p>
              <strong>Your consent.</strong> On your first visit, we ask for your
              consent before loading Google Analytics or the Meta Pixel. If you
              decline, neither tool loads and no analytics or advertising cookies
              are set. You can change your mind at any time by clicking “
              <strong>Cookie preferences</strong>” in our website footer, or by
              blocking cookies at the browser level.
            </p>
            <p>
              We also store a small preference in your browser to remember your
              consent choice, so we do not ask you again.
            </p>

            <hr />
            <h2>Who we share it with</h2>
            <p>
              We share personal information only with the following categories of
              recipients, and only when necessary.
            </p>
            <p>
              <strong>Service providers.</strong> We use third-party providers to
              help operate OneRound. They handle personal information on our
              behalf under contractual privacy obligations:
            </p>
            <div className="legal-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Provider</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {PROVIDERS.map((row) => (
                    <tr key={row.provider}>
                      <td>{row.provider}</td>
                      <td>{row.purpose}</td>
                      <td>{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <strong>Partnered venues.</strong> When you redeem a Roundie at a
              partnered venue, we share the fact that you are a valid member, the
              specific Roundie you are redeeming, and any relevant conditions such
              as a paired purchase requirement. We do not share your full name,
              contact details, or payment information with venues.
            </p>
            <p>
              <strong>Law enforcement, regulators, and courts.</strong> We may
              disclose personal information if required or permitted by law,
              including in response to a valid subpoena, court order, or
              regulatory request from a body such as the Australian Competition
              and Consumer Commission (ACCC), the Office of the Australian
              Information Commissioner (OAIC), or the Queensland Office of Liquor
              and Gaming Regulation (OLGR).
            </p>
            <p>
              <strong>Business transfers.</strong> If OneRound is acquired,
              merged, or restructured, personal information may be transferred to
              the new entity, subject to the same protections in this policy.
            </p>
            <p>
              <strong>With your consent.</strong> We may share personal
              information with other parties if you consent to that sharing at the
              time.
            </p>

            <hr />
            <h2>Overseas data transfer</h2>
            <p>
              Several of our service providers are located outside Australia —
              primarily in the United States. When we send your personal
              information to them, we take reasonable steps to ensure they handle
              it in accordance with the Australian Privacy Principles.
            </p>
            <p>
              By using OneRound, you consent to the transfer of your personal
              information overseas as described in this policy.
            </p>

            <hr />
            <h2>How long we keep your information</h2>
            <p>
              We only keep personal information for as long as we need it to
              fulfil the purpose it was collected for, or for as long as we are
              legally required to.
            </p>
            <ul>
              <li>
                <strong>Member account data:</strong> for as long as your
                OneRound membership is active. When you delete your account, we
                retain your data for a <strong>15-day grace period</strong> during
                which you can reactivate. After 15 days, we permanently delete
                your personal account data.
              </li>
              <li>
                <strong>Financial records</strong> (such as subscription payment
                records for tax and accounting purposes): 7 years, in line with
                Australian Taxation Office requirements.
              </li>
              <li>
                <strong>Venue signup form submissions:</strong> 24 months from
                submission.
              </li>
              <li>
                <strong>Website analytics data:</strong> aggregated and retained
                per Google Analytics’ default retention (currently 14 months for
                event-level data).
              </li>
            </ul>
            <p>
              When we no longer need your personal information, we take reasonable
              steps to destroy or de-identify it.
            </p>

            <hr />
            <h2>Age restriction — 18 and over</h2>
            <p>
              OneRound is available only to individuals{" "}
              <strong>18 years of age or older</strong>. We verify your age at
              signup, and partnered venues will check ID at the point of service,
              in line with Queensland liquor licensing law.
            </p>
            <p>
              We do not knowingly collect personal information from anyone under
              18. If we become aware that we have collected personal information
              from a person under 18, we will delete it as soon as reasonably
              practicable.
            </p>
            <p>
              If you believe a minor has provided personal information to us,
              please contact us at{" "}
              <a href="mailto:hello@oneround.au">hello@oneround.au</a>.
            </p>

            <hr />
            <h2>Your rights</h2>
            <p>
              Under the Australian Privacy Principles, you have the right to:
            </p>
            <ul>
              <li>
                <strong>Access</strong> your personal information — request a copy
                of what we hold about you
              </li>
              <li>
                <strong>Correct</strong> your personal information — if any of it
                is inaccurate, out of date, or incomplete
              </li>
              <li>
                <strong>Withdraw consent</strong> for cookies, analytics, and
                advertising, at any time via the Cookie preferences link in our
                website footer
              </li>
              <li>
                <strong>Cancel your account</strong> through the app in two taps,
                or by emailing us
              </li>
              <li>
                <strong>
                  Delete your account and associated personal information
                </strong>
                , subject to a 15-day reactivation window and any legal retention
                requirements
              </li>
              <li>
                <strong>Complain</strong> — to us in the first instance, and if
                you are not satisfied, to the Office of the Australian Information
                Commissioner (OAIC)
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:hello@oneround.au">hello@oneround.au</a>. We aim to
              respond within 30 days.
            </p>

            <hr />
            <h2>Complaints</h2>
            <p>
              If you believe we have breached the Australian Privacy Principles or
              otherwise mishandled your personal information, please contact us
              first at{" "}
              <a href="mailto:hello@oneround.au">hello@oneround.au</a> with the
              details of your complaint. We take complaints seriously and aim to
              resolve them within 30 days.
            </p>
            <p>
              If you are not satisfied with our response, you can lodge a
              complaint with the Office of the Australian Information Commissioner
              (OAIC):
            </p>
            <ul>
              <li>
                Website:{" "}
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  oaic.gov.au
                </a>
              </li>
              <li>
                Phone: <a href="tel:1300363992">1300 363 992</a>
              </li>
            </ul>

            <hr />
            <h2>Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will notify you by displaying a notice on our
              website, emailing you if we hold your email address, and updating
              the “Last updated” date at the top of this policy.
            </p>
            <p>
              Continued use of OneRound after we update this policy indicates your
              acceptance of the updated terms. If you do not accept the changes,
              you can cancel your account at any time.
            </p>

            <hr />
            <h2>Contact us</h2>
            <p>
              If you have any questions, complaints, or requests about your
              personal information or this Privacy Policy:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@oneround.au">hello@oneround.au</a>
              <br />
              <strong>Registered entity:</strong> ONEROUND PTY LTD
              <br />
              <strong>ABN:</strong> 53 691 600 263
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
