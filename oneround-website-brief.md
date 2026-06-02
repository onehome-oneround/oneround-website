# OneRound — Website Build Brief v3 (for Claude Code)

Use the **frontend-design skill**. This must NOT look like generic AI/dark-SaaS output. Commit fully to the direction below and execute with precision.

> **This is a v3 rewrite.** The site direction has changed in two big ways since the last build: (1) it is the **real launch website**, not a pre-launch email-capture page; (2) it is now a **LIGHT / white** site, not dark navy. Re-read this whole file and reconcile the existing build to it — repaint dark sections light, and restructure per the section plan below.

> **v3.5 — current active batch:**
>
> **S. Bring back a hero image (BOTH sides) to fill the empty gap** below the hero text. A contained UniWorker-style hero visual sitting in the hero area (NOT a full-background photo wash — that looked muddy). Use a clearly-labelled placeholder for now; real venue photo later. This fills the dead white space under the headline/badges.
>
> **T. "going" accent word colour = OPPOSITE of the hero band** (for contrast):
>   - Users side (light-blue band) → "going" in **navy #020031**.
>   - Venues side (navy band) → "going" in **light blue #1e88f3**.
>
> **U. Remove the pale blue section background** behind the "What you get / One app. Every outing." features — it looks cheap. Instead, wrap the three feature cards in ONE clean **soft off-white rounded container panel** (a barely-there warm grey-white, like UniWorker's panel — NOT periwinkle blue, NOT a saturated colour). Lighten the feature cards inside a touch so the section doesn't read as heavy dark boxes. Goal: looks premium and structured, not cheap.
>
> **V. Add "Introducing OneRound"** as a heading ABOVE the existing "What you get" / "One app. Every outing." heading (keep that heading too — "Introducing OneRound" sits above it), like UniWorker's "Introducing Uniworker".
>
> **W. Social Layer section ("Follow the action, live.") → full-bleed background photo.** Make its background a real photo stretching edge-to-edge across the ENTIRE screen width (remove the current contained grey rounded box). Apply a **dark overlay/scrim** over the photo and turn the text **white** so "Follow the action, live." + the paragraph stay readable; the phone mockup sits on top. Use a clearly-labelled placeholder image for now. (The Social Layer is the section that gets the full-bleed PHOTO banner; "Out the door" item M is a gradient block, not a photo — so only this one section uses a photo banner.)


> **v3.4 — TWO-SIDES MODEL (supersedes earlier "make the sides different structurally" instructions) + hero/nav fixes:**
>> **P. The two audience sides are IDENTICAL in layout/structure — differentiated ONLY by colour + copy.** Do not make them structurally different. Same sections, same design, same components on both. The toggle swaps:
>   - **Accent colour:** Users = **light blue #1e88f3**; Venues = **navy #020031**.
>   - **Hero band:** Users = light-blue band fading to white; Venues = navy band fading to white. Same gradient treatment, different colour.
>   - **Copy:** venue-appropriate wording on the Venues side (free to join, optional "Feature your venue", "more customers through your door", etc.) vs consumer wording on Users. Same layout holds the different words.
>   - (This replaces v3.1 item 2 "make the two sides clearly different" — they should look the SAME except colour + words.)
>
> **Q. Hero:** restore the EARLIER bright-blue-fading-to-white hero (the lighter, richer gradient), NOT the dark flat navy-blue version. Do NOT add a background photo to the hero for now.
>
> **R. Nav bar:** make it a solid LIGHT strip across the top at all times — a very pale near-white / soft lavender-white header bar — so the two-tone OneRound logo and nav links always pop (the logo's blue "Round" was disappearing on the blue hero). Subtle shadow / bottom border so it reads as a deliberate header. Sticky. Same light nav bar on BOTH sides (Users and Venues).


> **v3.3 USERS-SIDE VISUAL POLISH (still apply):**
>
> **L. (Hero band — SUPERSEDED by item Q above; follow Q: bright-blue-fade hero, no photo.)**
>
> **M. "Out the door in three steps" → confident navy→blue gradient block.** The current washed-out grey-purple gradient looks cheap — replace it with a **bold, fully-saturated gradient using the two brand colours: navy #020031 → blue #1e88f3** (top-to-bottom or diagonal, Claude Code's call on direction). White frosted step cards on top. NOT a photo here (the photo banner lives on the Social Layer section, item W) — keep this as a solid confident gradient block for good. No muddy/grey/purple in-between tones.
>
> **N. Move the "How Roundies work" button.** Remove it from the Social Layer section. Place it instead **with the Roundies content** in the "One app. Every outing." section (on/with the Roundies card). It still links to /how-roundies-work.
>
> **O. Build out the /how-roundies-work page properly** (make it look good, with a clear way back home). Three steps:
>   1. **Select from the Roundie menu** — a screen showing the venue's Roundie menu. (User will supply a Roundie-menu UI screenshot; use a clearly-labelled placeholder slot for now: `app-roundie-menu`.)
>   2. **Scan** — the scan/redeem screen. (Placeholder slot: `app-roundie-scan`.)
>   3. **Enjoy** — a real photo of people enjoying themselves. (Placeholder slot: `people-enjoying`.)
>   Lay it out cleanly with the same brand/pill language as the rest of the site; not a bare list.


> **v3.2 USERS-SIDE FIXES (still apply):**
>
> **A. Broaden ALL "night" copy to all-day / any-occasion.** OneRound is NOT night-only (venues span clubs, bars, pubs now → restaurants, cafés later). Remove "night/tonight" framing everywhere and make it any-time/any-outing, while keeping the fun social energy. Specific known instances:
>   - Closing CTA band "Your night, one app." → broaden (e.g. "However you go out, `[one app.]`") — keep the Monarda accent on the last 1–2 words.
>   - Social Layer "See the night unfold" / "where the crowd are headed tonight" → de-night.
>   - Hero / any "the night" lines → broaden.
>   - Footer "your night, one app" → broaden.
>   - The Good Stuff benefit lines "...headed tonight" and "Your whole night in one app" → broaden.
>
> **B. Download CTAs — GLOBAL RULE:** every download call-to-action uses real store badges. Big black **App Store + Google Play badges** in body sections (hero, "The Good Stuff", closing band). In the **nav**, use "Get the App" + two small **circular store icons** (Apple + Google Play in black circles) — NOT a text "Download" button. NO generic "Download the app" pill buttons anywhere. (The "+" pill style is only for non-download buttons like "How Roundies work".)
>
> **C. Nav toggle is rendering broken** — the active "Users" pill overlaps the "For Venues" label. Fix sizing/spacing so it's a clean two-segment pill (active segment filled, inactive clear), like UniWorker's toggle.
>
> **D. Colour blocks too weak + flat.** The biggest colour change is barely visible (white → near-identical off-white). Make the coloured sections BOLD and saturated (real navy block, real blue block — full commitment like UniWorker). Add **soft gradient/blur fade transitions** between sections (like UniWorker's section seams). And use at least one or two **full-bleed background-photo sections** where the photo stretches edge-to-edge across the whole width with content overlaid (not a photo inside a contained card).
>
> **E. "Three things" section:** rename heading to **"One app. Every outing."** (was "Three things. One app."). Make the three cards less boring — animate/stagger them in on scroll with a subtle rotation (mobile-friendly; no hover-tilt).
>
> **F. "How Roundies work" button:** there's a blue button that currently says "How it works", is broken, and clashes with the nav "How it works" link. Rename it to **"How Roundies work"** and link it to a NEW dedicated **/how-roundies-work** page (build that page; way back home). **Placement: see item N — it goes with the Roundies card, NOT the Social Layer section.**
>
> **G. "Out the door in three steps" — REPLACE the steps** (keep the heading). New 3 steps:
>   1. **See what's on** — check which venues have the best Roundies and Deals, and which are planned to pop off.
>   2. **Pick your spot** — select where you're heading to show your friends and the OneRound community.
>   3. **Go & enjoy** — head to the venue, redeem, and enjoy.
>
> **H. "What to expect" section:** heading → **"A venue for any occasion."** Chips → only **Clubs · Bars · Pubs** (remove Restaurants, Cafés, "and more"). Reword the body to not be night-only (e.g. "From a big one out to an easy catch-up, OneRound works across the places you already go — with more venues added all the time.").
>
> **I. FAQ — cut to 5 questions** (remove the rest): What is OneRound? · Is OneRound free? · What's a Roundie? · How do I claim a Roundie? · Do I need to be 18+?
>
> **J. Contact section leaks venue copy on the Users side.** "want OneRound in your venue?" must NOT show on the Users side. Make the contact section audience-aware: Users = "Questions, press, or just want to say hi? We'd love to hear from you." / Venues = "Want OneRound in your venue? Let's talk." Both → Email hello@oneround.au. (General principle: EVERY audience-specific bit of copy must swap with the toggle — not just some sections.)
>
> **K. Remove the "Brisbane · Launching now" badge/pill** wherever it appears.


> **v3.1 REVISION (still applies):**
> 1. **"Going out" → "Users"** everywhere (the consumer side is called Users).
> 2. **(Two sides — SUPERSEDED by item P above.** The sides are IDENTICAL in layout, differentiated only by accent colour (Users light blue / Venues navy) + venue-vs-user copy. Do NOT make them structurally different.)
> 3. **Venues are FREE to join** — NOT pay-for-performance. Remove "pay only when it works" / "performance-based" / "only pay on results". The model: free to join, with an optional paid **"Feature your venue"** upgrade for more visibility.
> 4. **Too white** — add full-colour sections to break it up (navy "Good Stuff" block, blue closing band, an off-white mid-section). UniWorker is mostly white but punctuated with colour blocks — match that.
> 5. **Home section order changed** — see the new ordered list below (Hero → Three things → Social Layer → Out the Door 3-step → What to Expect → The Good Stuff → FAQ → Closing → Footer).
> 6. **FAQ goes on the HOME page** (accordion), not a separate /faq page.
> 7. **Back navigation** — logo always returns home; no view should dead-end without a way back.
> 8. The nav toggle should switch sides **in place**, instantly (no exit/reload needed).

---

## What we're building

The real, permanent **launch website** for **OneRound**, a social going-out app launching in Brisbane (clubs, bars and pubs at launch; not night-only — restaurants and cafés to follow). Goes live with the app. Two audiences, weighted equally:
1. **Consumers** — get them to download the app.
2. **Venue partners + investors** — establish credibility and trust.

**Stack:** Next.js (App Router) + Tailwind CSS, deploy-ready for Vercel. Responsive, fast, accessible.

**Reference for STRUCTURE & LAYOUT:** uniworker.com. **Follow its layout, section flow, and simplicity closely** — the airy white space, big bold headlines, one idea per section, clean pill-based components. Replicate the *structure and feel* faithfully, but execute entirely in OneRound's own brand (colours, fonts, voice) with **real venue photos in place of UniWorker's illustrations**. Do NOT copy UniWorker's actual illustrations, copy text, or literal visual identity — the result should read as a sibling, not a clone.

**Audience model (exactly like UniWorker):** full-screen "choose your path" splash on entry, then a **persistent pill toggle in the nav** to switch between sides at any time. Most sections exist on BOTH sides with swapped content/visual/accent (hero subhead, feature spotlight, How It Works steps, What to Expect, The Good Stuff). The FAQ, contact, and footer are shared.

---

## Brand & visual direction

**LIGHT site.** White / very-light backgrounds, dark text, clean and airy — the site should feel like the app, which is light. Lots of whitespace, calm, confident, premium. Not busy, not dark.

### Colour (exact brand values)
- **White / near-white** (#FFFFFF and a soft off-white like #F6F7FB) — dominant backgrounds.
- **Navy #020031** — primary dark: headlines, text, the "For Venues" theme accent, the navy logo.
- **Blue #1e88f3** — bright accent: primary CTAs, links, highlights, the "Users" theme accent.
- Wire all into CSS variables. Mostly white canvas, with navy text and blue as the energetic accent. A section or two may invert to a navy background with white text for contrast (e.g. a benefits block) — used sparingly.

### Audience toggle theming (signature interaction)
A pill toggle in the nav — **"Users"** (consumer) and **"For Venues"** (partner) — flips the page's content and accent in place (UniWorker-style), but BOTH stay on the light/white base:
- **Users = BLUE accent** (#1e88f3) — brighter, more energetic, nightlife.
- **For Venues = NAVY accent** (#020031) — more premium/serious, business tone.
- Toggling swaps the hero subhead, the spotlight section content/visual, and the accent colour. Same white canvas, same layout, different accent + content per side.

### Logos
- Use the supplied files. **Navy logo on the light site** (default). White logo only on any dark/navy-background section. Place the real logo image; never typeset "OneRound" as text.

### Typography
- **Montserrat** (Google Fonts) for everything — Black/ExtraBold for big headlines, Regular/Medium for body. Big, bold, confident headlines like UniWorker's.
- **Monarda** (paid Monotype brush script) for sparing accent only — a single word in a headline, max 2–3 words, large. Never on buttons/nav/body/small text. Not on Google Fonts: self-host licensed webfont; until licensed, use a free brush-script placeholder (e.g. Pacifico) behind a `--font-accent` variable and flag it.

### Motion
- Light and performant. One clean staggered reveal on hero load; gentle scroll reveals. Nothing that stutters on mobile. CSS-first.

### Consistent design language (from UniWorker, in our brand)
- **Pill shapes everywhere:** the nav toggle, category chips, and buttons all share a rounded-pill family.
- **Pill buttons with a circular "+" icon** as a signature (in blue/navy, not orange).
- **Rounded container cards** for feature sections.
- **Tilted / angled phone mockups** showing real app UI, with small **floating UI chips/cards** overlapping them (e.g. a "Roundie claimed" toast, a little venue card) to make the app feel alive — like UniWorker's phone mockups.

---

## Mobile-first (primary constraint)
Most visitors are consumers on phones. Build mobile-first, scale up to desktop. Clean vertical flow, thumb-reachable CTAs, fast load on mobile data, legible text, easily tappable buttons.

---

## Imagery direction — REAL LIFE FIRST
Real photos of packed venues over illustrations/stock. App UI shown in phone mockups, in context. Use clearly-labelled placeholders so real assets drop in:
- `hero-packed-venue`, `how-it-works-packed-venue` (real venue/crowd photos)
- `app-social-layer`, `app-roundie-claim` (real app screenshots — user to supply; placeholder phone frame until then)
- Roundies imagery rule: whenever Roundies appears, show it **in a packed venue context**, never a sterile UI shot.
- No fake testimonials, ratings, or venue names until real.

---

## PAGE & SECTION PLAN

### 0. Entry splash — "Choose your path" (full-screen)
First thing on first visit: a full-viewport split (stacks vertically on mobile):
- **"Users"** side (blue accent) → enters the consumer home.
- **"Run a venue?"** side (navy accent) → goes to /partners.
Each side: large "I'm..." style label + a real photo (night-out crowd vs venue interior) + clear tap target. After choosing, the visitor lands on the relevant experience. (Consider a cookie/localStorage-free way to not force it every visit — but keep it simple; OK to show each visit.)

### Home (light, two audience sides)

**Sticky nav (all pages):** navy logo left (always links to home) · **audience pill toggle (Users / For Venues)** · links: How it works · FAQ · For Venues · **Download button (blue, always visible)** right. Mobile: hamburger, Download stays visible.

**The two sides are IDENTICAL in layout — differentiated ONLY by accent colour + copy** (see item P at top):
- **Users side** = **light blue (#1e88f3)** accent + hero band; consumer copy.
- **Venues side** = **navy (#020031)** accent + hero band; venue copy (free to join, "Feature your venue", "more customers through your door").
- Same sections, same structure, same components on both — only the colour and the words change.
- The nav toggle switches sides **instantly in place** (no reload / no exit). Light nav bar on both.

**Less stark white — break it up with full-colour sections** (like UniWorker, which is mostly white but punctuated with coloured blocks). I (Claude Code) should give the page rhythm: keep most sections white/off-white, but render **"The Good Stuff" on a navy block (white text)** and the **closing CTA band in blue (white text)**, and use a soft off-white tint on at least one mid-section so it isn't all stark white. Don't leave the whole page flat white.

**HOME SECTION ORDER (use exactly this):**
1. **Hero** — clean, centred, generous space. Big bold headline, short subhead (per side), OS-aware App Store + Google Play badges (placeholder `#` + TODO). NO price. Real photo.
2. **One app. Every outing.** — the three features (Roundies, Deals, Social Layer). Cards animate/stagger in on scroll with a subtle rotation (mobile-friendly, no hover-tilt). The **"How Roundies work"** button (→ /how-roundies-work) lives here, with the Roundies card. (Contextual imagery; Roundies-in-venue rule.)
3. **Social Layer** — its own spotlight section (the always-free social feature). Phone mockup of the map/feed UI with floating chips. (No "How Roundies work" button here — it moved to the Roundies card.)
4. **Out the door in three steps** — over a confident **navy #020031 → blue #1e88f3 gradient** block (NOT a photo, NOT washed-out grey/purple), frosted white step cards:
   1. **See what's on** — check which venues have the best Roundies and Deals, and which are planned to pop off.
   2. **Pick your spot** — select where you're heading to show your friends and the OneRound community.
   3. **Go & enjoy** — head to the venue, redeem, and enjoy.
5. **A venue for any occasion** — heading "A venue for any occasion."; body broadened off night-only (e.g. "From a big one out to an easy catch-up, OneRound works across the places you already go — with more venues added all the time."); pill chips: **Clubs · Bars · Pubs** (launch set only — no Restaurants/Cafés/"and more" yet). Visual alongside.
6. **The Good Stuff** (benefits) — **navy background, white text** rounded block; tilted phone mockup + benefit lines with hairline rules + blue "+" pill button. Benefits (reward/discovery framing, never "save money"): a free Roundie every day · exclusive Deals you won't find elsewhere · see where your friends and the crowd are headed tonight · discover new venues across Brisbane · your whole night in one app.
7. **FAQ accordion** — ON THE HOME PAGE. Centred heading, soft rounded container, each question a row with a circular "+" toggle that expands the answer, hairline dividers. **Use only these 5** (drop the rest): What is OneRound? · Is OneRound free? · What's a Roundie? · How do I claim a Roundie? · Do I need to be 18+? No separate /faq route.
8. **Contact** (audience-aware — must swap with toggle) — heading "Get in touch." + a sub-line that changes per side: Users = "Questions, press, or just want to say hi? We'd love to hear from you." / Venues = "Want OneRound in your venue? Let's talk." Both → **`hello@oneround.au` email CTA** (mailto). NO form. NO venue copy on the Users side.
9. **Closing CTA band** — full-width **blue** section, repeated headline + "Download the app today" + store badges. Bookend.
10. **Footer.**

**Navigation/back:** the logo always returns to the home page from anywhere. Any sub-view or expanded "how it works" detail must have a clear way back to the main page (back link or just the always-present nav/logo). No dead-ends where the user is stuck.

### /partners (For Venues — navy accent)
Reachable from splash, nav toggle, and "Run a venue?" links. Venue + investor credibility:
- Hero: "More feet through the door. Free to join." + subhead.
- Why venues join: **free to join** — no cost to be on OneRound; Roundies and Deals drive real foot traffic and new customers; the social layer puts your venue in front of people deciding where to go. **Optional paid upgrade: "Feature your venue"** for boosted visibility/promotion (the upsell, not a cost of entry). Do NOT say "pay only when it works" or "performance-based" anywhere — that's wrong.
- How partnering works (3 steps): get set up (hardware + onboarding) → go live (your venue appears with its Roundie + deals) → optionally feature your venue for extra reach.
- Partner CTA: "Want OneRound in your venue?" → email hello@oneround.au.

### FAQ copy (use in the home-page FAQ accordion — NOT a separate page)
- **What is OneRound?** OneRound is a social nightlife app that shows you where the night's headed and rewards you for getting out. See where your friends and the crowd are going in real time, claim a free item every day at participating venues with Roundies, and unlock exclusive Deals.
- **Is OneRound free?** The app is free to download, and the social side — seeing where everyone's headed — is always free. Roundies and Deals are part of OneRound membership, which is $12/month, with monthly and annual options. Keep an eye out for our one-month-free codes to try everything at no cost.
- **What's a Roundie?** A Roundie is one free food or drink item you can claim each day at a participating venue. It's your daily reason to head out and discover somewhere new — an actual item on us, not a discount.
- **How do I claim a Roundie?** Check the venue's Roundie menu in the app, scan your unique Roundie code, tell the venue what you'd like from the menu, and enjoy your complimentary item.
- **How often can I claim?** One Roundie per day.
- **What are Deals?** Exclusive offers you'll only find through OneRound — on top of your daily Roundie.
- **How does the social side work?** A live feed and map showing where your friends and the wider crowd are heading tonight, so you can decide where to go and meet up. This part's always free.
- **Which venues can I use?** OneRound is launching with venues across Brisbane, and we're adding more all the time.
- **Do I need to book?** No — just head to a participating venue and claim through the app.
- **Do I need to be 18+?** Yes. OneRound is for over-18s, and we support the responsible service and consumption of alcohol.
- **Where is OneRound available?** Launching in Brisbane, with more cities to come.

### /privacy and /terms — keep existing real copy.

---

## Home copy (verbatim)

**Hero**
- Headline: See where the night's `[accent: going]`. (Monarda accent on "going" only.)
- Subhead (Users): A free item every day at Brisbane's best venues, deals you won't find anywhere else, and a live look at where everyone's headed. Your whole night, one app.
- Subhead (For Venues): More customers through your door — free to join, with the option to feature your venue for more reach.
- CTA: App Store + Google Play badges (OS-aware, placeholder).

**Three things. One app.**
- Roundies — Heading: Roundies / Sub: One on us, every day. / Body: Claim a free food or drink item each day at a participating venue. Your daily reason to get out and find somewhere new.
- Deals — Heading: Deals / Sub: Offers you won't find anywhere else. / Body: Exclusive deals at venues across the city, only through OneRound.
- Social Layer — Heading: See the night unfold / Sub: Know where everyone's headed. / Body: A live feed and map showing where your friends and the crowd are going tonight. Always free.

**Launch / social proof**
- Heading: Launching across Brisbane.
- Body: We're live at some of the city's best venues — with more being added all the time.
- [Structure for real venue names/logos later. Generic for now.]

**Closing CTA**
- Heading: Your night, one app. / Download the app today + badges.

### Footer
- Short line: OneRound — your night, one app.
- Social: Instagram + TikTok → @oneroundapp
- Contact: hello@oneround.au
- 18+ line: 18+. We support the responsible service and consumption of alcohol.
- Legal: © 2026 ONEROUND PTY LTD. All rights reserved.
- Links: Privacy · Terms · FAQ (anchors to the FAQ section on home) · For Venues

---

## Credibility must-fixes (non-negotiable)
- **No "LoyalVenue" anywhere** — copy, metadata, footer, alt text, filenames. Only ONEROUND PTY LTD (legal) / OneRound (display).
- Real working Instagram + TikTok links (@oneroundapp).
- Zero placeholder/lorem copy. (Image placeholders are fine and expected.)
- Canonical domain: oneround.au.

## Build values (fill/confirm)
- Colours: white base, navy #020031, blue #1e88f3 — set.
- Fonts: Montserrat + Monarda (placeholder Pacifico until licensed) — set.
- Logos: navy logo on light site; white logo for any dark section — files in folder.
- App store links: not live; OS-aware buttons → placeholder `#` + TODO. Official Apple/Google badge artwork to be added before launch.

## Reminder
Light, clean, airy, premium — like the app. Big bold Montserrat headlines, generous white space, pill language throughout, real venue photography, navy/blue accents on white. Distinctive but simple. Don't over-design; don't fall back on a generic template.
