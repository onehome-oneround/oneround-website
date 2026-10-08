"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

/*
  Google Tag Manager container GTM-KNJS4FTW, requested by the marketing agency.

  GTM is a CONTAINER, not a tracker. Once this is live, whoever holds the GTM
  account can add and remove tags — further pixels, remarketing, anything — from
  the GTM UI, with no change to this repo and no review here. That is the point
  of it, but it means this file is not the full picture of what runs on the site.
  Read the privacy-policy LAUNCH BLOCKER in AGENTS.md before promoting it.

  Gated the SAME THREE WAYS as components/Analytics.tsx, deliberately:
  - Consent must be "accepted". The site offers the visitor a Decline button; if
    GTM loaded regardless, that button would be decorative, and the "policy as a
    representation" exposure described in AGENTS.md would get materially worse,
    because a container can load trackers the policy has never heard of.
  - NODE_ENV must be "production", so local development never pollutes the
    agency's reporting.
  - The container ID must be non-empty.

  The agency's note asks for this "as high in the <head> as possible". That is
  advice for a static HTML page and cannot be followed literally here: the only
  strategy that reaches the initial <head> is beforeInteractive, which is
  injected into server-rendered HTML and therefore cannot depend on consent, a
  value that exists only in the browser. afterInteractive matches the existing
  trackers and keeps GTM off the critical path; the container still loads within
  a few hundred milliseconds of paint.

  The ID is hardcoded rather than env-driven, mirroring GA_ID in Analytics.tsx:
  a container ID is public (it ships to every browser), and an unset Vercel var
  would disable this silently.

  NOTE ON DOUBLE COUNTING: Analytics.tsx already loads GA4 property
  G-JJHG3QRX7L directly. If a GA4 tag for that same property is also added
  inside this container, every page view is counted twice. Only one of the two
  should own GA4.
*/

const GTM_ID = "GTM-KNJS4FTW";

const isProduction = process.env.NODE_ENV === "production";

export default function GoogleTagManager() {
  const { consent } = useConsent();

  if (consent !== "accepted" || !isProduction || !GTM_ID) return null;

  return (
    <>
      {/* The agency's snippet, verbatim apart from the container ID being
          interpolated from the constant above. */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* The agency's no-JavaScript fallback. It is inert while the consent gate
          is in place, and is kept only so the install matches what GTM expects:
          this component renders only after a visitor accepts, and accepting
          requires the consent card, which is itself JavaScript — so a visitor
          with JS disabled never reaches it. The Meta Pixel's <noscript> in
          Analytics.tsx sits behind the same gate for the same reason. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
