/* Shared FAQ content. Used by the home FAQ section.

   Pricing ($11.99/month) also appears in the Pricing section directly above the
   FAQ on the home page. It is still kept out of the hero and the feature
   sections. If the price changes, change it in BOTH places — components/Pricing.tsx
   renders it too, and the two sit within a screen of each other. */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is OneRound?",
    a: "OneRound is a social going-out app that shows you where everyone's headed and rewards you for getting out. See where your friends and the crowd are going in real time, claim complimentary items at participating venues with Roundies, and unlock exclusive Deals.",
  },
  {
    q: "What do I get for $11.99/month?",
    a: "OneRound membership is $11.99/month. It gives you five Roundies a month: five complimentary items at participating venues. You can redeem one Roundie per outing, and once you redeem one there is a 12 hour gap before you can redeem again, up to five a month. Membership also unlocks exclusive Deals you won't find anywhere else, plus entry into Weekly Wins. The app itself is free to download, and seeing where your friends and the crowd are heading, browsing venues on the map, and general app access are always free.",
  },
  {
    q: "Is OneRound free?",
    a: "The app is free to download, and seeing where your friends and the crowd are heading, browsing venues on the map, and general app access are always free. Roundies, Deals, and entry into Weekly Wins are part of OneRound membership, which is $11.99/month. Keep an eye out for our one month free codes to try everything at no cost.",
  },
  {
    q: "What's a Roundie?",
    a: "A Roundie is a complimentary item at a participating venue. Your membership includes five Roundies a month: an actual item on us, not a discount. You can redeem one per outing.",
  },
  {
    q: "How do I claim a Roundie?",
    a: "Check the venue's Roundie menu in the app, scan your unique Roundie code, tell the venue what you'd like from the menu, and enjoy your complimentary item. You can redeem one per outing, with a 12 hour gap between redemptions, up to five a month.",
  },
  {
    q: "Do I need to be 18+?",
    a: "Yes. OneRound is for over-18s, and we support the responsible service and consumption of alcohol.",
  },
];
