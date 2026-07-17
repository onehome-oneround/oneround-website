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
