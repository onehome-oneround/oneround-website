import { NextResponse, type NextRequest } from "next/server";

/*
  Deep-link entry point for a venue. iOS Universal Links and Android App Links
  (verified via /.well-known/apple-app-site-association and assetlinks.json) mean
  that when the OneRound app is installed, tapping a https://oneround.au/venue/<id>
  link opens the app directly — this handler never runs.

  When the app is NOT installed, the OS falls back to the browser and hits this
  route, which sends the visitor to the right store: App Store on iOS, Play Store
  everywhere else.
*/

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  const url = isIOS
    ? "https://apps.apple.com/in/app/oneround/id6761165688"
    : "https://play.google.com/store/apps/details?id=com.oneround";

  return NextResponse.redirect(url, 302);
}
