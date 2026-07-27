"use client";

import Script from "next/script";
import PageViewTracker from "./PageViewTracker";
import { useConsent } from "./ConsentProvider";

/*
  Google Analytics 4 + Meta Pixel.

  COMMERCIAL DEPENDENCY: any future paid advertising depends on these being live
  and collecting. Meta ad delivery optimisation, custom audiences and retargeting
  all need Pixel history before a campaign starts — a pixel installed the week
  you launch ads has nothing to optimise against. GA4 is what attributes those
  campaigns to signups. Treat breaking either as a revenue bug, not a tidy-up:
  if this component stops rendering, ad spend degrades silently and the gap in
  the data cannot be backfilled.

  Rendering is guarded THREE ways, all of which must pass:
  - Consent must be "accepted" (see ConsentProvider / ConsentGate). Until the
    visitor accepts, nothing loads and no tracking call fires. This is why the
    component is a client component now — consent is a client-only value.
  - NODE_ENV must be "production", so localhost and dev builds never emit the
    tags and never pollute reporting with developer traffic.
  - The relevant ID must be non-empty, so a missing var disables that one
    tracker instead of shipping a script that inits against "undefined".
  Each tracker is independent — one ID present and the other blank is fine.

  Both use strategy="afterInteractive": they load client-side after hydration
  begins. Analytics is not needed before paint, and this keeps it off the
  critical path so it cannot affect LCP or introduce layout shift.

  Audiences are deliberately NOT distinguished here. Consumer and venue visitors
  are tracked identically; see PageViewTracker for why the ?view= param is
  dropped from page_path.
*/

// GA4 + Meta Pixel — both hardcoded to the correct properties so they can't
// drift from a stale Vercel env var. These IDs are public (they ship in the
// client bundle either way), so there's no reason to keep them in env vars they
// can silently disagree with. These values WIN over any NEXT_PUBLIC_GA_ID /
// NEXT_PUBLIC_META_PIXEL_ID in Vercel, which can be removed there.
//
// GA4 was previously env-driven and resolved to G-JFXWF3G989 (a different
// property), which is why the intended property showed "Data collection isn't
// active" — the site was sending to the wrong measurement ID.
const GA_ID = "G-JJHG3QRX7L";
const META_PIXEL_ID = "1695580208228754";

const isProduction = process.env.NODE_ENV === "production";

export default function Analytics() {
  const { consent } = useConsent();
  const consented = consent === "accepted";

  const gaEnabled = consented && isProduction && !!GA_ID;
  const metaEnabled = consented && isProduction && !!META_PIXEL_ID;

  if (!gaEnabled && !metaEnabled) return null;

  return (
    <>
      {gaEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {metaEnabled && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
          {/* Fallback for visitors with JavaScript disabled. Must be a raw <img>:
              next/image renders a client-hydrated component, which by definition
              cannot run inside <noscript>. */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      <PageViewTracker />
    </>
  );
}
