"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, type MouseEvent } from "react";
import { useAudience } from "./AudienceProvider";

/*
  Shared click handler for the "Become a partner" / "Partner with us" CTAs.
  Switches the audience to venue and lands the visitor on the venue Contact
  section ("Want OneRound in your venue?", id="contact") — from any page and any
  starting audience.

  Why a handler and not just a Link to /?view=venue#contact: AudienceProvider
  reads the ?view param once, on first load, and caches it, so a client-side
  navigation to that URL does NOT switch a consumer to venue. setAudience() does.
  The paired href="/?view=venue#contact" on the button stays as the no-JS /
  new-tab fallback and keeps the URL shareable.

  On the home page it scrolls in place, on the next frame so #contact is measured
  against the committed venue layout (Pricing drops out, Contact swaps) rather
  than the pre-switch one. Elsewhere it routes home to /?view=venue#contact,
  where the param sets the audience and the hash scrolls on load.
*/
export function useVenueContact() {
  const { setAudience } = useAudience();
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (event?: MouseEvent<HTMLAnchorElement>) => {
      // Let modified clicks (open in new tab, etc.) follow the href untouched.
      if (event && (event.metaKey || event.ctrlKey || event.shiftKey)) return;
      event?.preventDefault();

      setAudience("venue");

      if (pathname === "/") {
        // A macrotask, not rAF: it fires after React commits the audience swap
        // (so #contact is measured against the venue layout) AND still runs when
        // the tab isn't foreground, which rAF does not.
        window.setTimeout(() => {
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      } else {
        router.push("/?view=venue#contact");
      }
    },
    [setAudience, router, pathname],
  );
}
