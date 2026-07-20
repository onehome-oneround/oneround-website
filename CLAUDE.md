@AGENTS.md

<!--
  The line above imports AGENTS.md, so every project note lives there and is
  already in context. This pointer exists only so the blocker is visible to
  anyone who opens this file directly rather than following the import.
-->

## Before shipping to production, read AGENTS.md

There is an open **LAUNCH BLOCKER** in `AGENTS.md`: GA4 and the Meta Pixel are
installed and fire in production, but the privacy policy at
`app/privacy/page.tsx` has not been updated to disclose them. The exposure is
Australian consumer law (ACL s18 misleading conduct), not GDPR, and both
vendors' terms require the disclosure regardless. Needs a lawyer's review
before public launch. Full detail, precedents and suggested wording are in
AGENTS.md — do not duplicate them here.
