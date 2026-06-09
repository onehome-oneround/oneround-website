import { redirect } from "next/navigation";

/*
  The venue experience is now the toggle-driven venue view on the home page (a
  single venue experience, reached via the Users/Venues toggle). This legacy
  route redirects there so any existing links still land in the right place.
*/

export default function PartnersRedirect() {
  redirect("/?view=venue");
}
