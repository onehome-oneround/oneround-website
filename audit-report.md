# OneRound — Pre-launch audit

Audit only. Nothing was changed in this pass.

**Date:** 20 July 2026 · **Branch:** `complimentary-copy-and-store-badges` · **Launch target:** 10 Aug 2026 00:00 AEST
**Package manager:** npm (`package-lock.json`; no pnpm/yarn lockfile present)

## Summary

| Severity | Count |
|---|---|
| Blocker | 4 |
| High | 5 |
| Medium | 7 |
| Low | 4 |
| Info | 5 |

**The four blockers, in the order they'll hurt:**

1. **`/og-image.png` does not exist** — every social share of every URL is broken today.
2. **Venue signup delivers nowhere** — the form promises a reply in 24 hours and writes to stdout.
3. **No consent gate** while GA4 + Meta Pixel fire on load.
4. **Privacy policy doesn't describe analytics or the form**, yet the form links to it as if it does.

Blockers 3 and 4 are one legal problem with two halves and should be fixed together.

---

## 1. Build health

Build passes. `npx next build` → compiled in 14.7s, TypeScript checked in 9.0s, 13/13 static pages generated, exit 0.

Routes: 12 static (`○`), 1 dynamic (`ƒ /api/venue-signup`). The dynamic route is correct — a Route Handler cannot be prerendered. **No page has lost static generation.**

- **INFO** — `next build` output
  **WHAT** Next 16 + Turbopack prints no per-route First Load JS column, so bundle sizes can't be read from build output.
  **WHY** You asked for largest-route sizes; the toolchain doesn't emit them in this format.
  **FIX** Run `ANALYZE=true` with `@next/bundle-analyzer` if you want real numbers before launch.

- **MEDIUM** — `components/AudienceProvider.tsx:48` and `components/Splash.tsx:31`
  **WHAT** `react-hooks/set-state-in-effect`: setState called synchronously inside an effect body.
  **WHY** Causes a cascading double render on every page load. Both sit on the critical path — `AudienceProvider` wraps the entire tree.
  **FIX** Move both reads into `useSyncExternalStore` (the pattern already used in `LaunchCountdown.tsx`).

- **LOW** — `components/Contact.tsx:31` (×2), `:51`
  **WHAT** `react/no-unescaped-entities` on three apostrophes.
  **WHY** Cosmetic lint noise; it masks real errors appearing in the same run.
  **FIX** Replace `'` with `&rsquo;` on those three lines.

Total: **5 errors, 0 warnings.** All five pre-date this audit.

---

## 2. Copy consistency

- **PASS** — lowercase `roundie` as product name: **zero instances**.
- **PASS** — `24/7`: **zero instances**.
- **PASS** — social-proof numbers (`20,000+` etc.): **zero instances**. Nothing to create a misleading-conduct exposure pre-launch.
- **PASS** — bare digit `5` in prose: **zero**. Every match was an SVG path or a Tailwind class.

- **HIGH** — 12 sites, listed below
  **WHAT** `complimentary` is still the site-wide term for a Roundie; Tim's direction is "on us".
  **WHY** This is the pre-Tim phrasing you flagged. It appears in the Hero headline, the `<title>`/OG/Twitter descriptions, and three page metas — i.e. in search results and link previews, not just on-page.
  **FIX** Decide once, then sweep: `app/layout.tsx:50,69,84` · `components/Hero.tsx:81` · `components/Marquee.tsx:15` · `components/Features.tsx:31` · `app/how-roundies-work/page.tsx:14,75,108` · `app/partnered-venues/page.tsx:14,65`.

- **PASS (with one caveat)** — `free` attached to drinks: **zero live instances.**
  Every surviving `free` is about the service, not a consumable: "Free to join" / "Become a partner for free" (venue signup — `Hero.tsx:72,118,128`, `Features.tsx:85`, `GoodStuff.tsx:25`, `Marquee.tsx:24`), "free of charge" (`venue-terms`), "always free" for the social feature (`how-social-works/page.tsx:81`).

- **LOW** — `components/ClosingCTA.tsx:21,38`
  **WHAT** "Download / Free / iOS + Android" and "Free to download" live in a component that is **not rendered** (commented out at `app/page.tsx:15,37`).
  **WHY** Not a live OLGR issue, but it re-enters the site the moment the launch guard lifts, and refers to the app rather than a drink so it may be fine either way.
  **FIX** Decide the wording now so it isn't reviewed under launch-day pressure.

- **INFO** — `/images/menu-round.png`
  **WHAT** The phone mockup on `/how-roundies-work` displays "Free Entry" alongside "Any Tap Beer" / "Any House Wine".
  **WHY** Baked into the image; not reachable by code search or a copy pass.
  **FIX** Re-export the mockup if Tim wants it gone. Entry isn't a drink, so this may be acceptable as-is.

---

## 3. Hero

**Current headline, verbatim** (`components/Hero.tsx:79-88`, consumer):

> **Five complimentary items,**
> **every month.** ← "every month" set in accent italic

Venue side (`:63-77`): **"More customers through your door. Free to join."**

- **HIGH** — `components/Hero.tsx:81`
  **WHAT** The consumer headline leads on "complimentary items" and does not reflect Tim's direction ("One round on us", "Members pay. You don't.").
  **WHY** This is the single most-read line on the site and it seeds the term used everywhere else. Changing it later means re-sweeping metadata, OG copy and the marquee.
  **FIX** Rewrite to the "on us" framing and sweep the 12 `complimentary` sites in §2 in the same pass.

- **MEDIUM** — `components/Hero.tsx:81` + `app/how-roundies-work`
  **WHAT** "Five complimentary items, every month" states no purchase condition, but paired Roundies require one.
  **WHY** ACL s18 exposure — the headline claim is unqualified while the mechanic isn't. `ACCC v Google` turned on exactly this gap. The "you'll always see the condition before you redeem" assurance was removed from the site in commit `b7bb3ed`, so nothing now discloses *when* a member learns of a pairing.
  **FIX** Either qualify the headline or restore the assurance as an FAQ entry.

---

## 4. Launch guard coverage

**PASS — no store link renders today.** Every `DownloadButtons` call site is commented out, and both host components are themselves unrendered.

Verified guarded: `app/page.tsx:14,35` · `components/Hero.tsx:4,122` · `components/HowItWorks.tsx:3,78` · `components/GoodStuff.tsx:5,104` · `components/Nav.tsx:8,66` · `app/how-roundies-work/page.tsx:6,223` · `app/how-deals-work/page.tsx:6,148` · `app/how-social-works/page.tsx:6,154`.

- **INFO** — `components/ClosingCTA.tsx:3,36` and `components/NavStore.tsx`
  **WHAT** Both import/render `DownloadButtons` unguarded internally, but neither component is mounted (`app/page.tsx:15,37`, `components/Nav.tsx:8,66`).
  **WHY** Safe now; they are one uncomment away from live.
  **FIX** No action. Note that un-commenting either also exposes the item below.

- **HIGH** — `components/NavStore.tsx:8-9`
  **WHAT** `APP_STORE_URL = "#"` and `GOOGLE_PLAY_URL = "#"` are placeholders. `components/DownloadButtons.tsx:22-23` documents the real URLs as still unknown.
  **WHY** If the guard lifts before these are filled, both store buttons become dead `#` links on the primary conversion path.
  **FIX** Fill both before removing any guard; treat as part of the launch checklist, not a code task.

---

## 5. Countdown

**PASS on all three checks.** `components/LaunchCountdown.tsx`

- `:42` — `const TARGET_MS = Date.UTC(2026, 7, 9, 14, 0, 0)` — **exactly as specified.** Verified this resolves to `10/08/2026, 12:00:00 am` Australia/Brisbane.
- `:50,114` — `LAUNCHED_AT_BUILD` returns `null` at module scope, so a post-launch build ships no markup and reserves no space.
- `:134` — runtime check returns `null` once the target passes, covering clock skew and a stale pre-launch build.

No layout hole in either path: the component returns `null` outright rather than rendering an empty container.

---

## 6. FAQ audience swap

Both sets exist — `components/faqData.ts`: `consumerFaqs` (11 questions, `:21`) and `venueFaqs` (9 questions, `:73`). `components/Faq.tsx:32` selects via `useAudience()`. Verified rendering: 11 questions consumer, 9 venue, eyebrow `08 / Good to know` on both.

- **INFO** — audit brief assumption
  **WHAT** The brief asks to confirm rendering on `/` **and `/venues`**. There is no `/venues` route.
  **WHY** Routes are `/`, `/partners` (307 → `/?view=venue`), `/partnered-venues`, `/how-*`, `/privacy`, `/terms`, `/venue-terms`. Both audiences are served by `/`.
  **FIX** None — the swap is audience-based, not path-based. Worth correcting in any shared launch doc.

**`[CONFIRM: …]` markers — 5 to fill:**

| File:line | Marker |
|---|---|
| `components/faqData.ts:51` | `[CONFIRM: X]` partnered venues in Brisbane |
| `components/faqData.ts:55` | `[CONFIRM: X]` Brisbane venues at launch |
| `components/faqData.ts:86` | `[CONFIRM: No minimum term, no exclusivity…]` (entire answer) |
| `components/faqData.ts:94` | `[CONFIRM: Weekly reports on redemptions…]` (entire answer) |
| `components/faqData.ts:102` | `[CONFIRM: exact marketing commitments to venues]` |

- **HIGH** — `components/faqData.ts:86,94`
  **WHAT** Two venue answers are *entirely* placeholder — the whole answer is inside the marker.
  **WHY** These are contractual claims (minimum term, exclusivity, analytics deliverables). Shipping them verbatim would publish bracketed placeholder text as a commitment to venues.
  **FIX** Fill or remove both questions before launch; they cannot ship as-is.

---

## 7. Audience content swap limitation

**The AGENTS.md limitation is still accurate.** A returning venue visitor landing on `/` sees consumer content until the audience resolves post-hydration. Nothing in this audit found a new mechanism — every branch still goes through `useAudience()`.

- **MEDIUM** — `AGENTS.md` "Known issue: audience content swap on load"
  **WHAT** The note lists the affected components as "Contact swaps its entire subtree, HowItWorks and GoodStuff add a CTA block". Two more have since been added: `components/Faq.tsx` (swaps an 11-item list for a 9-item one) and `components/Pricing.tsx` (returns `null` entirely on venue).
  **WHY** `Faq` is now the largest single reflow on the page — an 11→9 item accordion swap — and `Pricing` removing an ~861px section is the largest height delta. Anyone reading the note will under-estimate the scale.
  **FIX** Add `Faq` and `Pricing` to the component list in that AGENTS.md section.

---

## 8. Legal / trust surfaces

Footer (`components/Footer.tsx`) is largely complete: Privacy `:77`, Terms `:80`, Venue Terms `:83`, `hello@oneround.au` `:18`, `© 2026 ONEROUND PTY LTD` `:124`.

- **BLOCKER** — site-wide; no file
  **WHAT** No cookie/consent banner exists. GA4 and Meta Pixel fire on page load with no gate.
  **WHY** Meta's Business Tools Terms and Google's Analytics terms both require notice and consent independently of any statute — breach risks pixel/account disablement, which would break the ad campaigns the install exists to serve. Separately, the Pixel sends browsing behaviour to a party that can re-identify the visitor.
  **FIX** Add a consent gate that defers both scripts until accepted, or take a documented legal decision not to.

- **BLOCKER** — `app/privacy/page.tsx` (whole file)
  **WHAT** The policy is generic boilerplate: no mention of analytics, cookies, third parties, or the venue signup form. It affirmatively promises purposes are identified "before or at the time of collecting personal information" and that collection happens "with the knowledge or consent of the individual concerned".
  **WHY** Both promises are contradicted by the Pixel and by a form collecting name/email/phone. In Australia the regulator's tool for this has been the ACL, not the Privacy Act (`ACCC v Google` $60M; `ACCC v HealthEngine` $2.9M — both misleading conduct).
  **FIX** Add an "Analytics and advertising" section naming GA4 and the Meta Pixel, plus a data-collection section covering the form. Lawyer review before launch. Full detail already in AGENTS.md.

- **MEDIUM** — `components/VenueSignupForm.tsx:403`
  **WHAT** The form links "Privacy Policy" under the submit button, pointing at a policy that does not describe this collection.
  **WHY** Worse than staying silent — it's an explicit representation that the linked policy governs the submission.
  **FIX** Ships only after the blocker above is resolved.

- **MEDIUM** — `components/Footer.tsx:124`
  **WHAT** No ABN displayed.
  **WHY** Not strictly mandatory on a website, but expected on an Australian commercial site and on anything a venue treats as a contracting party. Venue Terms name OneRound Pty Ltd without an ABN.
  **FIX** Add ABN to the footer sign-off line.

---

## 9. Meta / social

- **BLOCKER** — `app/layout.tsx:73` and `:85`
  **WHAT** OpenGraph and Twitter both reference `/og-image.png`. **That file does not exist.** `public/` contains only `file.svg`, `globe.svg`, `images/`, `next.svg`, `oneround-logo-navy.png`, `oneround-logo-white.png`, `vercel.svg`, `window.svg`.
  **WHY** Every share of every OneRound URL — Instagram DM, WhatsApp, LinkedIn, Slack, iMessage — renders with a broken or blank preview. Declared as 1200×630, so consumers reserve that space and show nothing.
  **FIX** Produce `public/og-image.png` at 1200×630 before any link is shared publicly.

- **PASS** — favicon: `app/icon.png` (33 KB) is a real OneRound icon via Next's file convention, not the framework default. Confirmed emitted as route `/icon.png`.

**Per-route titles** (template `%s · OneRound`, default `OneRound` — `app/layout.tsx:45-48`):

| Route | Title |
|---|---|
| `/` | `OneRound` (layout default) |
| `/how-roundies-work` | How Roundies work |
| `/how-deals-work` | How Deals work |
| `/how-social-works` | How Social works |
| `/partnered-venues` | Partnered venues |
| `/privacy` | Privacy Policy |
| `/terms` | Terms and Conditions |
| `/venue-terms` | Venue Terms and Conditions |
| `/partners` | — (redirect route, no metadata) |

**Per-route descriptions:** all present except `/` (inherits layout) and `/partners` (redirect). No default/placeholder values found.

- **LOW** — `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
  **WHAT** Next.js starter assets still shipping.
  **WHY** Dead weight served from the origin; `vercel.svg`/`next.svg` on a branded domain look unfinished if anyone finds them.
  **FIX** Delete all five.

---

## 10. Accessibility

- **HIGH** — `app/globals.css:58` (`--accent: var(--blue)`), applied via `.accent-text` on `.kicker`
  **WHAT** `--blue #1e88f3` on `--paper #e9edf7` computes to **3.05:1**. On `--white` it is **3.58:1**. The `.kicker` is 11px/700 (`globals.css:192-198`) — **not** WCAG large text, so it requires **4.5:1**. Both fail.
  **WHY** Systemic, not isolated: every `EditorialTag` eyebrow using `accent-text` on a light ground fails — `Features.tsx:100`, `WhatToExpect.tsx:36`, `Contact.tsx:26,46`, `Faq.tsx:41`, and the `PAIRED`/`STANDALONE` labels on `/how-roundies-work`. The same defect was already fixed once in `HowItWorks.tsx:55` by switching that kicker to navy — the fix just wasn't generalised.
  **FIX** Use `text-navy` for `.kicker` on light grounds (navy on paper = **17.1:1**), keeping blue for large text only.

- **PASS** — `--navy` on `--paper` = **17.1:1**, comfortably AA/AAA.
- **PASS** — venue signup form: every input has `htmlFor`/`id` (`VenueSignupForm.tsx:248,264,280,296,312,336,354`), plus `aria-invalid`, `aria-describedby`, `aria-live="polite"` error slots, `role="status"` success that takes focus, and focus moved to the first invalid field.
- **PASS** — focus states: global `:focus-visible` (`globals.css:123`) with dark-ground overrides (`:135-136`).
- **PASS** — alt text: every `Image`/`img` has `alt`; decorative ones correctly use `alt=""` (`GoodStuff.tsx:52`, `Splash.tsx:81,121`, `Analytics.tsx:82`). All decorative SVGs are `aria-hidden`.
- **PASS** — audience toggle: real `<button type="button">` with `aria-pressed` and a `role="group"` + `aria-label` wrapper (`AudienceToggle.tsx:27,46,56`). Fully keyboard reachable and operable.

- **MEDIUM** — `app/layout.tsx:126`
  **WHAT** No skip-to-content link.
  **WHY** Keyboard and screen-reader users traverse the full nav — including the audience toggle — on every page.
  **FIX** Add a visually-hidden, focus-visible skip link as the first child of `<body>`, targeting `<main>`.

---

## 11. Mobile

- **PASS** — Pricing decorative marks are all handled: `Rays` and `Squiggle` are `hidden … sm:block` (`Pricing.tsx:96-97`), `Badge` is `hidden … lg:block` and absolutely positioned so it can never affect grid height (`:119-120`). Grid is `grid-cols-1 … lg:grid-cols-12` (`:100`). The glasses mark sits in normal flow at a locked 200×120 and does not crowd at narrow widths.
- **PASS** — partnered venues grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (`page.tsx:73`). After the description removal the cards are shorter but stacking is intact and the trailing callout still spans correctly.
- **PASS** — FAQ audience state through mobile nav: audience lives in React context backed by `localStorage`, not component state, so it survives route transitions and menu toggles. No component-local state to lose.
- **PASS** — all section components define a mobile-first single-column base before any `sm:`/`lg:` variant. No fixed pixel widths that would overflow; every decorative SVG has locked `width`/`height`.

- **MEDIUM** — verification gap, not a code defect
  **WHAT** Mobile findings above are from source review and container simulation. I could **not** verify at a real mobile viewport — the browser tooling's `resize_window` reported success but never resized the OS window, across repeated attempts this session.
  **WHY** Container-width simulation cannot exercise Tailwind's viewport-based `sm:`/`lg:` variants, so mobile-only classes were never actually exercised. Earlier in this session that exact gap hid a real overflow bug in the countdown until it was caught by other means.
  **FIX** One manual pass on a real device or devtools device mode before launch, focused on the Pricing section and the countdown row.

---

## 12. Analytics

- **PASS** — both load via `next/script` with `strategy="afterInteractive"` (`Analytics.tsx:47,49,60`), off the critical path.
- **PASS** — gated twice: `NODE_ENV === "production"` **and** non-empty ID (`Analytics.tsx:34-36`). Verified at runtime that with real IDs present in `.env.local`, dev renders zero tracker markup and `gtag`/`fbq` are both `undefined`.
- **PASS** — no hardcoded IDs anywhere. Both read from `NEXT_PUBLIC_*` (`Analytics.tsx:31-32`).
- **PASS** — SPA route changes **are** tracked. `PageViewTracker.tsx:44-45` fires `gtag('event','page_view')` and `fbq('track','PageView')` on pathname change — App Router does not do this automatically, and it is handled.

- **MEDIUM** — `components/Analytics.tsx:70`, `components/VenueSignupForm.tsx:165`
  **WHAT** Meta Pixel fires `PageView` only. No custom events anywhere — notably no `Lead`/`CompleteRegistration` on venue signup success.
  **WHY** The venue signup form is the site's primary conversion. Without a conversion event, Meta cannot optimise ad delivery toward it and you cannot measure cost-per-lead. Meta also needs event history *before* a campaign starts.
  **FIX** Fire `fbq('track','Lead')` and a GA4 `generate_lead` event in the form's success branch.

- **LOW** — `components/PageViewTracker.tsx:44`
  **WHAT** `page_path` deliberately excludes the query string, so `?view=venue` is not distinguished.
  **WHY** Intentional (consumer and venue are one funnel) and documented — but it means you cannot segment venue vs consumer traffic in GA at all.
  **FIX** If venue-path volume matters, send it as a custom dimension rather than re-introducing it into `page_path`.

---

## 13. Venue signup form

*(The audit brief was truncated mid-item at "Confirm timing trap" — covering the full spam/validation surface.)*

- **PASS** — honeypot: `HONEYPOT_FIELD = "company_website"` (`VenueSignupForm.tsx:29`), rendered off-screen, `tabIndex={-1}`, `aria-hidden`, and rejected server-side (`route.ts:82`).
- **PASS** — timing trap: `renderedAt` set post-mount (`VenueSignupForm.tsx:128-131`), submissions under `MIN_FILL_MS = 3000` rejected (`route.ts:88-92`). Verified rejecting.
- **PASS** — both traps return `200` with the success shape, so a bot learns nothing about which gate caught it.
- **PASS** — CSRF: Origin vs Host/X-Forwarded-Host (`route.ts:47-57`), POST-only, `application/json` required. Verified 403/403/415/405/400 across the negative cases.
- **PASS** — server-side validation mirrors the client and is authoritative; verified it rejects a `venueType` the dropdown cannot produce.

- **BLOCKER** — `app/api/venue-signup/route.ts:130-148`
  **WHAT** A valid submission is `console.log`-ed and returns 200. **There is no delivery.**
  **WHY** The user is told "we'll be in touch within 24 hours" and nothing reaches anyone. Host logs roll off within days and aren't searchable, so a missed lead leaves no record it existed.
  **FIX** Wire Resend/Postmark to `hello@oneround.au` at the `TODO (LAUNCH BLOCKER)` marker before any venue is pointed at the form.

- **LOW** — no rate limiting
  **WHAT** Deliberate omission — in-memory counters don't survive serverless instance boundaries.
  **WHY** Documented reasoning, not an oversight. Honeypot + timing + origin cover naive abuse.
  **FIX** Add shared-state limiting (Upstash/Vercel KV) only if abuse appears.

---

## Recommended order

1. `og-image.png` — one asset, unblocks all sharing.
2. Venue signup email delivery — the form is live and lying.
3. Privacy policy + consent gate — one legal workstream, needs a lawyer, so start early.
4. Fill the 5 `[CONFIRM:]` markers; the two whole-answer ones cannot ship.
5. Hero/`complimentary` copy decision — sweeps 12 files, do before anyone links the site.
6. Kicker contrast fix — one-line change per site, ~6 sites.
7. Store URLs, ABN, skip link, Meta conversion event, `AGENTS.md` refresh, delete starter SVGs.
