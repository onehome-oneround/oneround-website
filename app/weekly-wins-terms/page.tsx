import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Weekly Wins Terms",
  description: "Terms and conditions for OneRound Weekly Wins.",
  alternates: { canonical: "https://oneround.au/weekly-wins-terms" },
};

/*
  Weekly Wins Terms — the finalised trade-promotion terms, rendered as editorial
  React (not raw markdown), matching /privacy, /terms and /venue-terms: a mono
  eyebrow, Fraunces display title, mono effective/updated dates over a --paper
  ground, then the shared `legal-prose` system (see globals.css) for body,
  headings, lists, links and the hairline `<hr />` separators that stand in for
  the source's ---.

  Audience-agnostic: identical for members and venues; only the link accent flips
  with the audience toggle, like every other legal page.
*/

export default function WeeklyWinsTermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-[color:var(--paper)] px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-[44rem]">
          <header>
            <p className="kicker text-ink-faint">Legal / Weekly Wins Terms</p>
            <h1 className="display-section mt-4 text-ink">Weekly Wins Terms</h1>
            <div className="mt-5 space-y-1 font-mono text-[0.8125rem] tracking-[0.02em] text-ink-faint">
              <p>Effective date: 10 August 2026</p>
              <p>Last updated: 28 July 2026</p>
            </div>
          </header>

          <div className="legal-prose mt-10">
            <p>
              <strong>Promotion Name:</strong> OneRound Weekly Wins
            </p>

            <hr />
            <h2>Conditions of Entry</h2>
            <p>
              Information about the prizes and how to enter forms part of these
              Conditions of Entry. Entry into this promotion is deemed acceptance
              of these Terms and Conditions of Entry by each entrant.
            </p>
            <p>
              Entry is free and open to residents of Australia aged 18 and over
              who are subscribers to the OneRound mobile phone application
              (&ldquo;Eligible Entrant&rdquo;), who enter the promotion in the
              required manner.
            </p>
            <p>
              Executive officers and employees of the Promoter and their
              immediate families are not permitted to enter.
            </p>

            <hr />
            <h2>Duration of the Promotion</h2>
            <p>
              The promotion commences at 10:00am on Monday 10 August 2026 with
              entries for each weekly draw accruing from 10:00am each Monday until
              12 midnight the following Sunday (&ldquo;the weekly prize
              period&rdquo;).
            </p>
            <p>
              Unless it is extended, which may occur at the sole discretion of the
              Promoter, the promotion will conclude at 12 midnight on 31 December
              2026. The period during which the promotion is conducted is referred
              to in these conditions as &ldquo;the Promotional Period&rdquo;.
            </p>

            <hr />
            <h2>How to Enter</h2>
            <p>
              Eligible Entrants will accumulate entries into the promotion by
              EITHER:
            </p>
            <ul>
              <li>
                Nominating one or more participating venues before 6:00pm on a day
                during the weekly prize period using the OneRound mobile phone
                application (&ldquo;the OneRound App&rdquo;) and then attending the
                nominated venue on that same day; OR
              </li>
              <li>Referring a new paid subscriber to the OneRound App.</li>
            </ul>
            <p>Entries will be accrued in the following manner:</p>
            <ul>
              <li>
                One (1) entry for each attendance at a nominated venue, accruing
                at not more than one (1) entry in any 24 hour period;
              </li>
              <li>
                One (1) additional entry for each attendance at a nominated venue
                flagged as a &ldquo;2x entry venue&rdquo; by the Promoter in the
                OneRound App, accruing at not more than (1) additional entry in any
                24 hour period;
              </li>
              <li>
                One (1) entry for each new paid subscriber referred by the eligible
                entrant who subscribes and pays for the OneRound app during the
                weekly prize period.
              </li>
            </ul>
            <p>
              The OneRound App will automatically record attendance at a nominated
              venue using geofencing and device location.
            </p>
            <p>
              For each weekly prize period, the number of entries accrued by each
              Eligible Entrant will be the sum of the entries created in accordance
              with subclauses above during each weekly prize period.
            </p>
            <p>
              For the avoidance of doubt, the Promoter will flag a venue as a
              &ldquo;2x entry venue&rdquo; at its complete discretion, and may
              change which venues are 2x entry venues from time to time at its
              complete discretion. Entry requirements associated with 2x entry
              venues are identical to other nominated venues, with nomination
              required prior to 6:00pm on a day during the weekly prize period and
              attendance at the venue on that same day.
            </p>
            <p>
              Each Eligible Entrant is only entitled to win one (1) prize in each
              weekly prize draw. If an Eligible Entrant&rsquo;s name is drawn, they
              will be excluded from the remaining draws for that prize draw. Past
              prize winners remain eligible for subsequent weekly prize periods.
            </p>
            <p>
              For the avoidance of doubt, entries that accrue during any weekly
              prize period do not carry forward into any subsequent weekly prize
              period.
            </p>
            <p>
              The Promoter accepts no responsibility for late, lost or misdirected
              entries.
            </p>
            <p>
              Any costs associated with accessing the OneRound App or any related
              website remain the responsibility of each entrant and are dependent
              on the Internet Service Provider used.
            </p>
            <p>
              By entering the Promotion the winner(s) consents to the use of their
              name, state of residence and image for promotional and marketing
              purposes.
            </p>

            <hr />
            <h2>Details of Prizes</h2>
            <p>
              There will be five (5) prize winners for each weekly prize period.
            </p>
            <p>
              Each prize consists of $100, with a total prize value of $500 each
              week.
            </p>

            <hr />
            <h2>Prize Draw</h2>
            <p>
              Winners will be selected by barrel draw. The names of each Eligible
              Entrant will be placed in a barrel. The barrel will be sealed and
              rotated, and names will be drawn at random.
            </p>
            <p>
              The prize draw will take place at the offices of the Promoter, and
              will be captured on video and audio recording.
            </p>
            <p>
              The prize draw will take place at 11:00am on each Monday during the
              Promotional Period.
            </p>

            <hr />
            <h2>Notification of Winner and Claiming Prizes</h2>
            <p>
              The prize winners will be announced by Instagram post, and winners
              will be notified by email and phone using the information provided
              when subscribing.
            </p>
            <p>
              Prize winners must claim their prize by responding to either the
              email or phone notification referred to in the preceding clause.
            </p>
            <p>
              The video and audio recording of each weekly prize draw will be
              posted on Instagram and TikTok at Midday on the Tuesday immediately
              following the weekly prize draw.
            </p>

            <hr />
            <h2>Unclaimed Prize Draw</h2>
            <p>
              If any prize has not been claimed by its winner by 5:00pm AEST on the
              day before the weekly draw held two weeks after that draw
              (&ldquo;the unclaimed prizes&rdquo;), the unclaimed prize will be
              added to the prize pool for that later weekly draw and drawn among
              the eligible entrants for that draw.
            </p>
            <p>
              The unclaimed prize draw will be undertaken in the manner described
              in the Prize Draw section. The winner(s) will be notified by email
              and phone as soon as practicable after the draw.
            </p>

            <hr />
            <h2>No Liability</h2>
            <p>
              To the extent permitted by law, the Promoter is not responsible or
              liable for:
            </p>
            <ul>
              <li>inaccurate/incorrect transcription of entry information;</li>
              <li>
                purported entries that are not received for any reason, including
                because they are lost, misdirected or stolen, or that are received,
                but are late, illegible, incomplete, sent with insufficient postage
                (where entry is by post), or sent other than as directed in the
                entry instructions;
              </li>
              <li>
                any problems or technical failures of any kind, including
                malfunction of any telephone network or lines, computer online
                systems or network, servers or providers, computer equipment, or
                software;
              </li>
              <li>
                the unavailability or inaccessibility of any service whether or not
                caused by traffic congestion on the Internet or at any website;
              </li>
              <li>
                unauthorized human intervention in any part of the competition;
              </li>
              <li>
                electronic or human error which may occur in the administration of
                the competition;
              </li>
              <li>
                any loss suffered or sustained, to person or property and
                including, but not limited to, consequential (including economic)
                loss by reason of any act or omission, deliberate or negligent, by
                the Promoter, or its servants or agents, in connection with the
                arrangement for supply, or the supply, of any goods or services by
                any person to a prize winner and, where applicable, to any
                family/persons accompanying a winner; or
              </li>
              <li>
                any injury or damage to persons or property, including to the
                participant&rsquo;s or any other person&rsquo;s computer related
                to, or resulting from, participation or downloading any materials
                in this competition.
              </li>
            </ul>
            <p>
              The Promoter will not be liable for personal injury suffered as a
              consequence of any prize winnings. The winner, and any other relevant
              person identified for the purpose by the promoter, must sign and
              return any liability release and indemnity provided by the Promoter
              and/or its contractors as a condition of a prize being awarded.
              Failure to return the signed releases and indemnities will result in
              the entitlement to the prize being forfeited and the selection of
              another winner. This condition does not affect, and is not intended
              to affect, any rights a consumer might have, which cannot be excluded
              under applicable consumer protection laws. To the fullest extent
              permitted by law, any liability of the Promoter or its servant or
              agents for breach of any such rights is limited to the payment of the
              cost of having the prize supplied again.
            </p>

            <hr />
            <h2>RSA</h2>
            <p>
              The Promoter will not permit the delivery of the prize unless
              satisfied the person accepting delivery is 18 years of age or older
              including requiring appropriate proof of age to be produced to any
              person making the delivery, and unless the person delivering the
              prize is satisfied that the person accepting delivery is not unduly
              intoxicated.
            </p>

            <hr />
            <h2>General</h2>
            <p>
              The Promoter is <strong>ONEROUND PTY LTD</strong> (ABN 53 691 600
              263) of 46 Culmstock Place, Fig Tree Pocket QLD 4069.
            </p>
            <p>
              The personal information of entrants may be collected to enable the
              Promoter to administer and promote this competition and its winners
              and may be used to market its services to the entrant. The personal
              information of the entrants will be held and used in accordance with
              the Promoter&rsquo;s privacy policy which is available at{" "}
              <a href="https://www.oneround.au">www.oneround.au</a>.
            </p>
            <p>
              The personal information of winners may be provided to others
              assisting, including prize suppliers and deliverers, and to
              authorities that regulate this competition. In the event that
              entrants decide to opt out of receiving information on promotions,
              services and market research provided by the Promoter they can do so
              by emailing{" "}
              <a href="mailto:hello@oneround.au?subject=Weekly%20Wins%20enquiry">
                hello@oneround.au
              </a>{" "}
              or by contacting the Promoter on telephone{" "}
              <a href="tel:+61410567374">0410 567 374</a>. If an entrant does not
              truthfully provide all requested personal information, the Promoter
              may determine that they are not eligible to win the prize.
            </p>
            <p>
              This promotion is conducted under the laws of the State of
              Queensland, Australia.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
