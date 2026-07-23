/*
  Same-page hash navigation for the nav + footer index links.

  Next's <Link> treats a click whose href resolves to the CURRENT url — same
  pathname AND same hash — as a no-op: it neither pushes history nor re-scrolls.
  That silently breaks the "How it works" / "FAQ" links after the audience
  toggle. The toggle scrolls to the top of the fresh view but leaves the stale
  fragment (e.g. #faq) in the url, so the matching nav link now equals the
  current url and clicking it does nothing.

  On the home page we therefore scroll ourselves, on every click, regardless of
  the current hash — so the links work in both audiences and after a toggle.
  Off the home page the caller lets the <Link> navigate to "/#…" as usual (the
  browser resolves the fragment on arrival).
*/

/** "/#faq" | "#faq" -> "faq"; a real route ("/about", "/") -> null. */
export function hashTarget(href: string): string | null {
  const m = href.match(/^\/?#(.+)$/);
  return m ? m[1] : null;
}

/**
 * Smooth-scroll to the element with `id` and sync the url fragment without
 * going through Next's router (replaceState avoids the same-url no-op and adds
 * no history entry). `scroll-margin-top` on the target keeps it clear of the
 * sticky header. Returns false if the id isn't on the page.
 */
export function scrollToHashId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}
