"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Fires a page-view on client-side route changes.

  Both trackers send an initial page-view when their script first loads (GA via
  gtag('config'), Meta via fbq('track','PageView')). That covers the first paint
  of a hard navigation but not App Router soft navigations, which swap the tree
  without a document load — so without this, moving between routes in-session
  would be invisible to both.

  Deliberately keyed on pathname only, NOT useSearchParams:

  1. The only query string this site uses is ?view=venue, and sending it would
     split the audiences into separate page paths in reporting. Consumer and
     venue are meant to be one funnel, so the query is dropped on purpose.
  2. useSearchParams forces the calling tree up to the nearest Suspense boundary
     to be client-rendered, and a static route that calls it without a boundary
     FAILS the production build outright. It works fine in dev, so the failure
     would only surface at build time. Not worth it for a param we discard.

  Nothing else in the app navigates by query anyway — AudienceToggle keeps the
  audience in storage and pushes "/" rather than a ?view= URL.

  Both globals are optional-called: in development, and whenever an ID is
  missing, the scripts never render, so gtag/fbq are simply undefined.
*/

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    window.gtag?.("event", "page_view", { page_path: pathname });
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
