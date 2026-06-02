/* Shared FAQ content — verbatim from the brief. Used by the home FAQ section.
   Pricing ($12/month) appears here only, never in the hero or feature sections. */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is OneRound?",
    a: "OneRound is a social going-out app that shows you where everyone's headed and rewards you for getting out. See where your friends and the crowd are going in real time, claim a free item every day at participating venues with Roundies, and unlock exclusive Deals.",
  },
  {
    q: "Is OneRound free?",
    a: "The app is free to download, and the social side — seeing where everyone's headed — is always free. Roundies and Deals are part of OneRound membership, which is $12/month, with monthly and annual options. Keep an eye out for our one-month-free codes to try everything at no cost.",
  },
  {
    q: "What's a Roundie?",
    a: "A Roundie is one free food or drink item you can claim each day at a participating venue. It's your daily reason to head out and discover somewhere new — an actual item on us, not a discount.",
  },
  {
    q: "How do I claim a Roundie?",
    a: "Check the venue's Roundie menu in the app, scan your unique Roundie code, tell the venue what you'd like from the menu, and enjoy your complimentary item.",
  },
  {
    q: "Do I need to be 18+?",
    a: "Yes. OneRound is for over-18s, and we support the responsible service and consumption of alcohol.",
  },
];
