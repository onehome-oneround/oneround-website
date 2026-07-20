<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- Keep project notes below this line: the block above is generated and may be
     overwritten when the Next.js agent rules are regenerated. -->

## Known issue: audience content swap on load (post-launch fix)

A returning "venue" visitor sees consumer content render first and then reflow
into venue content. This is known and deliberately deferred — don't treat it as
a fresh bug, and don't try to fix it with another pre-paint script.

**Why it happens.** The audience lives in `localStorage`, which the server can't
read, so `AudienceProvider` renders `"consumer"` during SSR and only learns the
real value in an effect — after hydration. Components branch on `isVenue` for
copy and for whole blocks (`Contact` swaps its entire subtree, `Pricing` returns
null entirely on the venue side, `Faq` reflows from 11 to 8 items, and
`HowItWorks` and `GoodStuff` add a CTA block), so when the state flips,
everything below reflows.

**What is already handled.** The accent flash and the splash flash are fixed: a
parse-blocking inline script in `app/layout.tsx` resolves both from storage and
stamps `data-audience` / `data-splash-seen` on `<html>` before first paint, and
CSS keys off those attributes. That approach fundamentally cannot fix the
content swap — the SSR HTML is already generated with consumer content by the
time any script runs. Adding more to that script will not help.

**What the real fix requires.** Move the audience into a cookie so the server
can read it per request, and render the page per-request rather than statically.
That trades away static generation and full-page CDN caching, which is why it's
a deliberate decision rather than a quick patch — take it up before doing it.

Note this is invisible to Lighthouse and other lab tools: they run a fresh
profile with empty storage, so they always see the consumer path and report
CLS 0. Reproduce it by setting `localStorage['oneround-audience'] = 'venue'`
and reloading.

## LAUNCH BLOCKER: privacy policy vs. analytics and the venue form

GA4 and the Meta Pixel are installed and will fire the moment anything runs
with `NODE_ENV=production` and the IDs set (`components/Analytics.tsx`). The
venue signup form now collects **name, email and phone directly** and posts them
to `/api/venue-signup`. The privacy policy at `app/privacy/page.tsx` has not been
updated to cover either. **Do not put the site in front of real user traffic
until it is.** This is a legal and contractual gap, not a tidy-up.

**The form makes this sharper than analytics alone.** Trackers collect
behavioural data a visitor might not notice; a form is the visitor deliberately
handing over contact details, which is unambiguously personal information under
anyone's reading. The form carries a "By submitting, you agree to our Privacy
Policy" line linking to `/privacy` — and that line currently points at a
document which does not describe this collection, or the analytics, at all.
Pointing users at a policy that does not cover what you are doing is worse than
staying silent: it is an explicit representation that the policy governs the
submission, which makes the ACL misleading-conduct exposure below more direct,
not less. Either the policy describes the form or that line should not ship.

**The problem is the policy's own wording.** It is generic boilerplate that
mentions no analytics, cookies, third parties or tracking, while making
affirmative promises the trackers contradict — that purposes will be
identified "before or at the time of collecting personal information", and
that collection happens "by lawful and fair means and, where appropriate, with
the knowledge or consent of the individual concerned". The Meta Pixel fires on
page load and sends browsing behaviour to a third party who can re-identify the
visitor against their account. No purpose is identified and no knowledge is
given.

**The real exposure is Australian consumer law, not GDPR.** GDPR turns on
targeting (Art 3(2)); a Brisbane-only venue app does not target the EEA, so
incidental European visitors almost certainly do not trigger it. Do not let
that reasoning conclude "no exposure". In Australia the regulator's tool of
choice for data practices has been the ACL, where a published privacy policy
is a representation to consumers and ACL s18 prohibits misleading or deceptive
conduct. Both leading cases were run as consumer law, not privacy law:

  - ACCC v Google LLC (2021-22, $60M) — location data.
  - ACCC v HealthEngine (2020, $2.9M) — sharing user data with third parties
    without adequate disclosure.

A policy promising purpose-identification while silently running ad-tech is
the shape of conduct that line of cases targets.

**Vendor terms require the disclosure independently of any law.** Meta's
Business Tools Terms require the business to give notice and obtain any
necessary consents for the pixel; Google's Analytics terms require a policy
disclosing cookie and analytics use. Even at zero legal risk, breaching these
risks pixel or account disablement — which would break exactly the paid
campaigns the install exists to enable.

**What to add.** An "Analytics and advertising" section that names Google
Analytics 4 and the Meta Pixel, describes what each collects (page views,
device and browser information, IP address, and for Meta an identifier that
can be matched to a Facebook account), states the purpose (measuring site
usage and supporting advertising), and links the opt-outs:

  - GA:   https://tools.google.com/dlpage/gaoptout
  - Meta: https://www.facebook.com/settings?tab=ads

**Have a lawyer review it before public launch.** The above is engineering
context on where the risk sits, not legal advice, and the small-business
turnover exemption under Privacy Act s6D is genuinely unsettled here — s6D(4)(c)
may bite where personal information is disclosed for a benefit, and the 2023
Privacy Act Review response agreed in principle to remove the exemption.

## Pattern: features that depend on wall-clock time

`components/LaunchCountdown.tsx` is the reference implementation. Anything else
that keys off the current time — a countdown, a launch gate, a "new until"
badge, scheduled copy — should follow the same three rules rather than
reinventing them.

**1. Target as a fixed UTC epoch, never local-timezone math.** Store the moment
as `Date.UTC(...)` and compare against `Date.now()` in absolute milliseconds.
The visitor's timezone is irrelevant to "how long until this instant", and
`new Date("2026-08-10T00:00")` is parsed as *local* time, which silently gives
every visitor a different target. Brisbane is UTC+10 year-round with no daylight
saving, so an AEST wall-clock time converts to UTC once, by hand, in a comment
next to the constant — no runtime offset logic, no timezone library.

**2. Never server-render a time-derived value.** Every page here is statically
prerendered, so server HTML is baked at BUILD time, not request time. A rendered
clock value is stale by however long sits between deploy and visit, and will
visibly snap to the truth on hydration. Render *structure only* on the server —
labels, and slots sized to their final width and height — then populate on the
client. Reserve the space so populating shifts nothing: the site holds CLS 0 and
that is worth protecting.

**3. Gate at build time as well as runtime.** A module-scope constant
(`LAUNCHED_AT_BUILD`) lets a build that happens after the moment ship no markup
at all, while a runtime check still handles a skewed client clock and a stale
build served after the date. Neither check alone is sufficient.

Prefer `useSyncExternalStore` over `useState` + `useEffect` for the ticking
itself: the clock is an external mutable source, the server snapshot is explicit
rather than implied, and it avoids the synchronous setState-in-effect that this
repo's lint config rejects. Keep the snapshot at second granularity — returning
raw `Date.now()` changes on every render and never settles.

Do NOT reach for the parse-blocking pre-paint script in `app/layout.tsx` to
solve the first-paint problem. That script is on the critical path of every page
load forever; a temporary launch feature does not justify taxing it. A slot that
populates a few hundred milliseconds after paint is the correct trade.

## LAUNCH BLOCKER: venue signup goes nowhere

`app/api/venue-signup/route.ts` validates a submission, logs it to the server
console, and returns 200. **There is no delivery.** The visitor is told "we'll
be in touch within 24 hours" and nothing reaches anyone.

**Wire real email to hello@oneround.au before pointing any venue at the form** —
Resend, Postmark or similar. This is a blocker the moment the venue path is
promoted anywhere, not a post-launch nicety, because:

  - Console logs on most hosts roll off within days and are not searchable.
    A lead missed is gone with no record that it existed.
  - The success message is a promise. Shipping it while submissions evaporate
    is the failure mode most likely to cost an actual partner.

The route is deliberately shaped for this: validation, spam gates and the
success contract are all in place, so adding delivery is a single call at the
point marked `TODO (LAUNCH BLOCKER)` just before the `console.log`. Send to
hello@oneround.au, and consider a copy to the submitter as confirmation.

Until it is wired, treat any venue traffic to `/?view=venue#contact` as
lead loss. The previous implementation was a `mailto:` form, which failed
just as silently for anyone on webmail — do not go back to that.
