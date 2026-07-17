import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AudienceProvider } from "@/components/AudienceProvider";

/*
  Typography — "After Dark broadsheet" editorial system. Three families:
  - Fraunces (--font-display): a high-contrast display serif with real character
    (opsz/soft/wonk). Carries the headlines at magazine scale; the italic is the
    signature accent treatment. Distinctive, premium, expressive.
  - Hanken Grotesk (--font-sans): clean grotesque for body / UI. Quiet, modern,
    legible — the foil that lets the serif sing.
  - Space Mono (--font-mono): listings-style metadata — kickers, captions, index
    labels, fine print. Ticket-stub / culture-paper energy.

  Brand's licensed "Monarda" is not used; the editorial italic replaces it and
  can be reintroduced later via --font-accent without structural change.
*/

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://oneround.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneRound",
    template: "%s · OneRound",
  },
  description:
    "OneRound gives you five complimentary items every month at Brisbane's best venues, plus exclusive deals and a live look at where everyone is going.",
  applicationName: "OneRound",
  keywords: [
    "OneRound",
    "Brisbane going out",
    "bars Brisbane",
    "venue deals",
    "things to do Brisbane",
  ],
  authors: [{ name: "ONEROUND PTY LTD" }],
  creator: "ONEROUND PTY LTD",
  publisher: "ONEROUND PTY LTD",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OneRound",
    title: "OneRound",
    description:
      "OneRound gives you five complimentary items every month at Brisbane's best venues, plus exclusive deals and a live look at where everyone is going.",
    locale: "en_AU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OneRound",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneRound",
    description:
      "OneRound gives you five complimentary items every month at Brisbane's best venues, plus exclusive deals and a live look at where everyone is going.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${hanken.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <AudienceProvider>{children}</AudienceProvider>
      </body>
    </html>
  );
}
