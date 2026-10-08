@AGENTS.md

<!--
  The line above imports AGENTS.md, so every project note lives there and is
  already in context. This pointer exists only so the blocker is visible to
  anyone who opens this file directly rather than following the import.
-->

## Before shipping to production, read AGENTS.md

The privacy policy at `app/privacy/page.tsx` now discloses GA4, the Meta Pixel
and Google Tag Manager, the consent gate that holds all three back until the
visitor accepts, overseas transfer, and the venue-form collection. The original
**LAUNCH BLOCKER** in `AGENTS.md` is therefore CLOSED as an engineering task.

Two things still stand: a lawyer's review before public launch, and the
governance point that GTM is a container, so the marketing agency can add tags
off-repo that no file here will show. Full context and precedents are in
AGENTS.md — do not duplicate them here.
