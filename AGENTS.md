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
copy and for whole blocks (`Contact` swaps its entire subtree, `HowItWorks` and
`GoodStuff` add a CTA block), so when the state flips, everything below reflows.

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

## LAUNCH BLOCKER: privacy policy vs. analytics

GA4 and the Meta Pixel are installed and will fire the moment anything runs
with `NODE_ENV=production` and the IDs set (`components/Analytics.tsx`). The
privacy policy at `app/privacy/page.tsx` has not been updated to match. **Do
not put the site in front of real user traffic until it is.** This is a legal
and contractual gap, not a tidy-up.

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
