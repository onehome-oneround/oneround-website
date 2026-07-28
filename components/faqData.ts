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

export type Faq = {
  q: string;
  a: string;
  /* Optional inline link: the first occurrence of `text` within `a` is rendered
     as a link to `href` (see FaqAccordion). */
  link?: { text: string; href: string };
};

/* Stable anchor id for a FAQ row, so a question can be linked to (and opened) by
   URL hash — e.g. the pricing card's "Entry into Weekly Wins" link. Kept here so
   the accordion (which stamps the id) and the linker (which builds the href)
   derive it the same way. */
export function faqAnchorId(question: string): string {
  return (
    "faq-" +
    question
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  );
}

/* The pricing card links straight to this row. */
export const WEEKLY_WINS_ANCHOR = faqAnchorId("What are Weekly Wins?");

export const consumerFaqs: Faq[] = [
  {
    q: "What's a Roundie?",
    a: "A Roundie is one item on us at a partnered venue — a drink, a snack, entry, whatever the venue's put on the menu. Some are standalone, some are paired with a small purchase. Members get five a month, one per outing.",
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
    q: "What are Weekly Wins?",
    a: "Every week, five members win $100 each in a random draw. You earn an entry every time you tap 'going' to a venue in the app before 6pm and actually turn up — plus one entry for every friend you refer who subscribes. Some venues offer 2× entries. The more entries you have, the better your chances. See our Weekly Wins Terms for the full rules.",
    link: { text: "Weekly Wins Terms", href: "/weekly-wins-terms" },
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
    a: "Nothing. No setup fee, no monthly fee, no commission, no revenue share. Hardware, listing and promotion are all free. Your only cost is the item itself — and only when a Roundie is actually redeemed.",
  },
  {
    q: "Who chooses which items are Roundies?",
    a: "You do. Pick any item — a drink, a snack, entry, whatever fits your venue. Set them as standalone or paired with a purchase. Change the mix anytime from the venue portal.",
  },
  {
    q: "Can we cap how many redeem per day?",
    a: "Yes. Set your daily cap (minimum 25 per open day) and offer more on the nights you want to fill, fewer on the ones you don't. Once the cap's hit, Roundies reset the next day. You stay in control of your covers.",
  },
  {
    q: "What equipment do we need and how does redemption work?",
    a: "We provide the kit — a scanner and small kiosk screen for your bar. No POS integration or till changes needed. To redeem: the member pulls up their Roundie in the app, your staff scans the QR code from their phone with the OneRound scanner, item's handed over. Almost no training required — you get a one-page brief and support whenever you need it.",
  },
  {
    q: "What analytics do we get?",
    a: "For your first three months, your OneRound partner sends you a personalised monthly report — Roundies redeemed, unique vs repeat members, top items, best times. The self-serve dashboard rolls out later in the year.",
  },
  {
    q: "What if a member behaves badly at our venue?",
    a: "Flag them from the venue portal. Repeat issues result in membership suspension. Your staff are protected the same as anywhere else — refuse service as normal.",
  },
  {
    q: "Is this legal?",
    a: "Yes. OneRound was built with a liquor licensing lawyer and raised directly with OLGR. They can't endorse any program, but raised no issues with ours. Because members pay a subscription, a Roundie is a reward they've already bought — not alcohol promoted to the public. RSA obligations are unchanged, and one Roundie per member per day means nobody stacks free drinks.",
  },
  {
    q: "How does OneRound bring me new customers?",
    a: "Members open the app to see which venues have Roundies and Deals worth checking out that night. They also see where their friends and the wider OneRound crowd are heading — and that pulls whole groups your way. You get discovery, momentum, and social proof without any ad spend.",
  },
];
