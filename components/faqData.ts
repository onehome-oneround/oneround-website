/* FAQ content, split by audience.

   Two sets: consumerFaqs answers "what do I get", venueFaqs answers "what does
   this cost me and how does it work in service". components/Faq.tsx picks
   between them with useAudience(), the same way Contact.tsx swaps its subtree —
   so both inherit the post-hydration content swap documented in AGENTS.md
   rather than introducing a new mechanism.

   Pricing ($11.99/month) also appears in the Pricing section directly above the
   FAQ on the home page. If the price changes, change it in BOTH places —
   components/Pricing.tsx renders it too, and the two sit within a screen of
   each other. */

export type Faq = { q: string; a: string };

export const consumerFaqs: Faq[] = [
  {
    q: "What's a Roundie?",
    a: "A Roundie is one complimentary item at a partnered venue — a drink, a snack, entry, whatever the venue's put on the menu. Some are standalone, some are paired with a small purchase. Members get five a month, one per outing.",
  },
  {
    q: "How is a Roundie different from a Deal?",
    a: "A Roundie is one item on us. A Deal is a member-only offer — sometimes a discount on your usual, sometimes a live push during a quiet night, sometimes a recurring perk like a Tuesday steak night or Sunday sessions. Your membership gets you both.",
  },
  {
    q: "How much does OneRound cost?",
    a: "$11.99 a month. A single outing with a Roundie will return more than your membership, the rest of the month is upside.",
  },
  {
    q: "How do I redeem a Roundie?",
    a: "Open the app at the venue. Tap the 'Redeem Roundie' button on the home screen — or head to the venue's Roundies menu and pick the one you want. A QR code shows on your phone, the venue's staff scans it, and the item's yours.",
  },
  {
    q: "Can I use more than one Roundie in a day?",
    a: "One Roundie per member per day, across all venues. Keeps things fair for members and venues.",
  },
  {
    q: "What if I don't use all five in a month?",
    a: "Roundies reset at the start of each month — they don't roll over.",
  },
  {
    q: "Can I see where my friends are going out?",
    a: "Yes. Members mark where they're heading before they head out. Open the app to see where your friends and the wider OneRound crowd are landing that night — no more group-chat scramble.",
  },
  {
    q: "Do I need to be 18+ to use OneRound?",
    a: "Yes. Membership is 18+, and we verify your age at signup. Venues will check ID at service, same as anywhere else. Not every Roundie is a drink — plenty are food, entry, or non-alcoholic — but the membership itself is over-18 only.",
  },
  {
    q: "Which venues are on OneRound?",
    a: "A growing list of Brisbane venues at launch, with more added every week. See the full list on our partnered venues page.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No lock-in, no minimum term. Cancel from the app in two taps.",
  },
  {
    q: "When does OneRound launch?",
    a: "Early August 2026 in Brisbane. Sign up now to be first in.",
  },
];

export const venueFaqs: Faq[] = [
  {
    q: "What does it cost my venue to be on OneRound?",
    a: "Nothing. No listing fee, no monthly fee, no percentage on non-member sales. You get paid for every Roundie redeemed and every Deal claimed.",
  },
  {
    q: "Who chooses which items are Roundies?",
    a: "You do. You set which items are eligible, whether they're standalone or paired, and you can change the mix anytime from the venue dashboard.",
  },
  {
    q: "Can we cap how many redeem per day?",
    a: "Yes. Set daily caps, time-of-day windows, or day-of-week rules. You stay in control of your covers.",
  },
  {
    q: "Do we need new equipment or POS integration?",
    a: "No. Redemption happens through the OneRound app — staff verify the redemption on-screen. No new hardware, no POS integration required.",
  },
  {
    q: "How does redemption work — how do our staff know it's legit?",
    a: "The member shows a live redemption screen in the app with a countdown timer and your venue name. Screenshots don't work. Staff verify with one tap.",
  },
  {
    q: "What analytics do we get?",
    a: "Your venue dashboard shows Roundie data, Deals data, foot traffic data, and network data.",
  },
  {
    q: "What if a member behaves badly at our venue?",
    a: "Flag them from the venue dashboard. Repeat issues result in membership suspension. Your staff are protected the same as anywhere else.",
  },
  {
    q: "How does OneRound bring me new customers?",
    a: "Members actively seek partnered venues — they check the app before deciding where to go. You get visibility from members seeking Roundies and exclusive deals.",
  },
];
