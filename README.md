# OneRound — launch website

The real launch website for **OneRound** (legal entity **ONEROUND PTY LTD**), a
social nightlife app launching in Brisbane. Next.js (App Router) + Tailwind CSS
v4, **light/white**, mobile-first, deploy-ready for Vercel.

Structure & feel follow uniworker.com (airy white space, big bold headlines, one
idea per section, pill components) executed entirely in OneRound's own brand.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Audience model (signature interaction)

A full-screen **entry splash** ("Users" → consumer home / "Run a venue?" →
/partners) and a **persistent pill toggle** in the nav switch sides at any time:

- **Users** → **blue** accent (consumer) — nightlife photos + copy
- **For Venues** → **navy** accent (partner) — venue photos + copy

State lives in `components/AudienceProvider.tsx` (persisted to localStorage) and
flips the `--accent` CSS variable via a `data-audience` attribute. The toggle
swaps sides **instantly in place** on the home page; from any other page it
returns home to that view (the logo also always links home — no dead-ends).
Toggle-aware sections read `useAudience()` to swap copy + imagery + accent: Hero,
Social Layer spotlight, How It Works, What to Expect, The Good Stuff.

**Venue model:** venues are **free to join**, with an optional paid "Feature your
venue" upgrade for more visibility — there is no pay-for-performance wording.

## Structure

```
app/
  page.tsx           Home (order): Splash → Hero → Three things → Social Layer
                     → Out the Door (3-step) → What to Expect → The Good Stuff
                     → FAQ → Contact → Closing CTA → Footer
  partners/page.tsx  /partners (venue credibility, navy accent locked)
  how-roundies-work/ /how-roundies-work (Roundie claim explainer; links back home)
  privacy, terms/    Real, finished legal copy (not stubs)
  globals.css        Design system: brand vars, --accent theming, reveals
  layout.tsx         Fonts + metadata + AudienceProvider
components/          AudienceProvider, AudienceToggle, Splash, Nav, Hero,
                     Features (Three things), FeatureSpotlight (Social Layer),
                     HowItWorks, WhatToExpect, GoodStuff, Faq/FaqAccordion
                     (+faqData), Contact, ClosingCTA, Footer, DownloadButtons,
                     PillButton, PhoneMockup, ImagePlaceholder, Logo, ScrollReveal
public/              oneround-logo-navy.png (light site), oneround-logo-white.png (dark sections)

Colour rhythm: white hero → off-white "Three things" → white Social Layer →
dark "Out the Door" photo → white "What to Expect" → navy "Good Stuff" → FAQ →
contact → blue closing band. FAQ is on the home page (id="faq"); there is no
separate /faq route.
```

## Brand

- **Light site.** White / off-white (`#f6f7fb`) base, navy `#020031` text, blue
  `#1e88f3` accent — all CSS variables. One section (The Good Stuff) and a couple
  of bands deliberately invert to navy.
- **Fonts**: Montserrat everywhere; the brush-script accent appears on single
  words only.
- **Logos**: navy logo on the light site; white logo on dark sections / splash.

## ⚠️ Two things to finish before launch

1. **Brush-script font is a placeholder.** The brand accent face **Monarda** is a
   paid Monotype font and is **not bundled**. **Pacifico** (free) stands in for
   it behind the `--font-accent` CSS variable. To go live: add the licensed
   self-hosted webfont via `@font-face` and point `--font-accent` at it (drop the
   Pacifico import in `app/layout.tsx`).

2. **App store links + badge artwork.** Download buttons are OS-aware (iOS shows
   the App Store first, Android Google Play, desktop both) and point at `href="#"`.
   In `components/DownloadButtons.tsx` (body badges) **and** `components/NavStore.tsx`
   (nav "Get the App" icons): set the real store URLs, and swap the hand-built
   badges/icons for the official Apple / Google artwork. Every download CTA uses
   store badges/icons — there are no generic "Download" pill buttons.

## Images

The Users hero uses a real photo background under a translucent blue wash:
`public/images/hero-placeholder.jpg` is a **temporary generated stand-in** — drop
the licensed hero photo in at that path to replace it.

Every other photo/app-screen is an **obvious labelled placeholder** (e.g.
`hero-packed-venue`, `app-social-layer`, `app-roundie-claim`, `partner-dashboard-ui`,
`splash-night-out-crowd`). The label is the intended filename — drop the real
asset in and swap `<ImagePlaceholder/>` for `<Image/>`. Social-proof venue-logo
slots and any venue names stay generic until each venue confirms publicly.

## Deploy (Vercel)

Push to a Git repo, import into Vercel (framework auto-detected). No environment
variables required. Canonical domain: **oneround.au**.
