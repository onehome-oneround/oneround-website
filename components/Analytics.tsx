import Script from "next/script";
import PageViewTracker from "./PageViewTracker";

/*
  Google Analytics 4 + Meta Pixel.

  COMMERCIAL DEPENDENCY: any future paid advertising depends on these being live
  and collecting. Meta ad delivery optimisation, custom audiences and retargeting
  all need Pixel history before a campaign starts — a pixel installed the week
  you launch ads has nothing to optimise against. GA4 is what attributes those
  campaigns to signups. Treat breaking either as a revenue bug, not a tidy-up:
  if this component stops rendering, ad spend degrades silently and the gap in
  the data cannot be backfilled.

  Rendering is guarded twice:
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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const isProduction = process.env.NODE_ENV === "production";
const gaEnabled = isProduction && !!GA_ID;
const metaEnabled = isProduction && !!META_PIXEL_ID;

export default function Analytics() {
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
