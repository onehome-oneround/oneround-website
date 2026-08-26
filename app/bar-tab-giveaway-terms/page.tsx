import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bar Tab Giveaway Terms and Conditions",
  description:
    "Terms and conditions for the OneRound Bar Tab Giveaway promotions, operated by OneRound Pty Ltd.",
  alternates: { canonical: "https://oneround.au/bar-tab-giveaway-terms" },
};

export default function BarTabGiveawayTermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-[color:var(--paper)] px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-[44rem]">
          <header>
            <p className="kicker text-ink-faint">Legal / Bar Tab Giveaway Terms</p>
            <h1 className="display-section mt-4 text-ink">
              OneRound Bar Tab Giveaway - Terms and Conditions
            </h1>
            <div className="mt-5 space-y-1 font-mono text-[0.8125rem] tracking-[0.02em] text-ink-faint">
              <p>Last updated: 26 August 2026</p>
            </div>
          </header>

          <div className="legal-prose mt-10">
            <hr />
            <h2>1. The Promoter</h2>
            <p>
              The promoter is ONEROUND PTY LTD (ACN 691 600 263) of 46 Culmstock
              Place, Fig Tree Pocket QLD 4069 (&quot;OneRound&quot;, &quot;we&quot;, &quot;us&quot;).
            </p>

            <hr />
            <h2>2. Agreement to these terms</h2>
            <p>Information on how to enter forms part of these terms. By entering, you agree to be bound by these terms.</p>
            <p>Entry is free and no purchase is necessary.</p>

            <hr />
            <h2>3. The promotions</h2>
            <p>
              This document covers four separate promotions, each run in conjunction
              with a participating venue. Each promotion has its own entry period,
              draw and prize. Entering one promotion does not enter you into any other.
            </p>
            <div className="legal-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Promotion</th>
                    <th>Venue</th>
                    <th>Prize night</th>
                    <th>Entries close</th>
                    <th>Draw</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>A</td><td>The Normanby</td><td>Friday 28 August 2026</td><td>4:59pm Fri 28 Aug</td><td>5:00pm Fri 28 Aug</td></tr>
                  <tr><td>B</td><td>Sugar Nightclub</td><td>Friday 28 August 2026</td><td>4:59pm Fri 28 Aug</td><td>5:00pm Fri 28 Aug</td></tr>
                  <tr><td>C</td><td>The Magee</td><td>Saturday 29 August 2026</td><td>4:59pm Sat 29 Aug</td><td>5:00pm Sat 29 Aug</td></tr>
                  <tr><td>D</td><td>Pawn &amp; Co.</td><td>Saturday 29 August 2026</td><td>4:59pm Sat 29 Aug</td><td>5:00pm Sat 29 Aug</td></tr>
                </tbody>
              </table>
            </div>
            <p>All times are Australian Eastern Standard Time (AEST).</p>
            <p>Entries for all four promotions open at 12:00pm AEST on Wednesday 26 August 2026. Entries received outside a promotion&apos;s entry period are invalid for that promotion.</p>

            <hr />
            <h2>4. Eligibility</h2>
            <p>4.1 Entry is open to residents of Queensland aged 18 years or over at the time of entry.</p>
            <p>4.2 The following people are not eligible to enter: directors, officers, employees, contractors and ambassadors of OneRound; employees, contractors and management of any participating venue; and the immediate families of any of the above.</p>
            <p>4.3 You must hold a OneRound account and an Instagram account in your own name. Entries made from bulk, automated, duplicate or fake accounts will be disqualified.</p>
            <p>4.4 You may enter more than one promotion, but you may win only one prize across all four promotions. If you are drawn for a second prize, that prize will be redrawn.</p>

            <hr />
            <h2>5. How to enter</h2>
            <p>5.1 To enter a promotion, during that promotion&apos;s entry period you must:</p>
            <ol className="alpha">
              <li>follow @oneroundapp on Instagram; and</li>
              <li>open the OneRound app and mark yourself as &quot;going&quot; to the relevant venue for that promotion&apos;s prize night.</li>
            </ol>
            <p><strong>5.2 Bonus entry.</strong> You may receive one additional entry per promotion by tagging three friends in a comment on that promotion&apos;s Instagram post. One bonus entry per person per promotion, regardless of how many comments you leave. Tagged accounts must be real, separate accounts. To have a bonus entry credited, the Instagram account used to comment must be reasonably identifiable as belonging to the entrant&apos;s OneRound account.</p>
            <p>5.3 Maximum two entries per person per promotion.</p>
            <p>5.4 Marking yourself as &quot;going&quot; is the only action that places you in the draw. Commenting alone does not enter you.</p>
            <p>5.5 Entry is free. Creating a OneRound account and marking yourself as &quot;going&quot; does not require a paid OneRound subscription.</p>

            <hr />
            <h2>6. The prize</h2>
            <p>6.1 Each promotion has one prize: a bar tab to the value of AUD $100 at that promotion&apos;s venue, for the winner and one guest.</p>
            <p>6.2 The total prize pool across all four promotions is AUD $400.</p>
            <p>6.3 Each bar tab is valid only at that promotion&apos;s venue, on that promotion&apos;s prize night, during that venue&apos;s trading hours on that date. It cannot be used on any other date or at any other venue.</p>
            <p>6.4 The winner and their guest must be aged 18 or over and must present valid photo identification. Entry to the venue remains subject to the venue&apos;s normal entry conditions, dress code and capacity, and to the discretion of venue management and security.</p>
            <p>6.5 The bar tab is subject to the responsible service of alcohol. Venue staff may refuse service at any time and are required to do so where a person is unduly intoxicated. Nothing in this promotion entitles any person to be served alcohol.</p>
            <p>6.6 Any unused balance is forfeited. The tab has no cash value, is not transferable, and cannot be exchanged for cash or any other product.</p>
            <p>6.7 Prizes are provided in conjunction with the participating venues. If a venue does not trade on its nominated prize night for any reason, OneRound may substitute a prize of equal or greater value, or reschedule that prize to another night at that venue.</p>

            <hr />
            <h2>7. The draw</h2>
            <p>7.1 Each winner is drawn at random from all valid entries for that promotion at 5:00pm AEST on that promotion&apos;s prize night, at OneRound&apos;s Brisbane office.</p>
            <p>7.2 Each draw is a game of chance. Skill plays no part in determining the winner.</p>
            <p>7.3 Winners are announced on the relevant Instagram post and notified by Instagram direct message shortly after the draw.</p>

            <hr />
            <h2>8. Claiming the prize</h2>
            <p>8.1 The prize is claimed in person at the venue on the prize night. The winner must attend the venue, identify themselves to venue staff or a OneRound representative as the winner, and present valid photo identification matching their OneRound account.</p>
            <p>8.2 The prize must be claimed before the venue closes trade on the prize night. A prize not claimed by that time is forfeited and the winner has no further entitlement to it.</p>
            <p>8.3 The prize cannot be claimed by any other person on the winner&apos;s behalf.</p>
            <p><strong>8.4 Unclaimed prizes.</strong> If a prize is not claimed in accordance with clause 8.2, OneRound may carry that prize over to a further promotion at the same venue in the following week. Any carried over prize will be the subject of a fresh draw. Entrants in the original promotion are not automatically entered into any carried over promotion and must enter again in accordance with the terms published for it.</p>
            <p>8.5 If a drawn winner is found to be ineligible, declines the prize, or cannot be contacted, OneRound may redraw at any time before the prize night ends.</p>

            <hr />
            <h2>9. General</h2>
            <p>9.1 OneRound may disqualify any entrant it reasonably believes has breached these terms, tampered with the entry process, or engaged in fraudulent or misleading conduct.</p>
            <p>9.2 To the extent permitted by law, OneRound and the participating venues are not liable for any loss, damage or injury arising from participation in a promotion or from acceptance or use of a prize. Nothing in these terms limits any rights under the Australian Consumer Law that cannot be excluded.</p>
            <p>9.3 OneRound&apos;s decisions in relation to these promotions are final and no correspondence will be entered into.</p>
            <p>9.4 Personal information collected in connection with these promotions is handled in accordance with the OneRound Privacy Policy at oneround.au/privacy. Entrants consent to their first name and Instagram handle being published if they win.</p>
            <p>9.5 These promotions are in no way sponsored, endorsed, administered by, or associated with Instagram or Meta Platforms, Inc. Entrants release Instagram and Meta from all liability in connection with these promotions.</p>
            <p>9.6 These terms are governed by the laws of Queensland.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
