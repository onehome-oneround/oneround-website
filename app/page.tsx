import Splash from "@/components/Splash";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Marquee from "@/components/Marquee";
import FeatureSpotlight from "@/components/FeatureSpotlight";
import HowItWorks from "@/components/HowItWorks";
import WhatToExpect from "@/components/WhatToExpect";
// HIDDEN until launch - re-enable: venue partners (logo slider + "See partnered venues")
// import VenueLogos from "@/components/VenueLogos";
import GoodStuff from "@/components/GoodStuff";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
// HIDDEN until launch - re-enable: app store links (closing CTA is a download-only section)
// import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Splash />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Features />
        <Marquee tone="blue" />
        <FeatureSpotlight />
        <HowItWorks />
        <WhatToExpect />
        {/* HIDDEN until launch - re-enable: venue partners (logo slider + "See partnered venues") */}
        {/* <VenueLogos /> */}
        <GoodStuff />
        <Faq />
        <Contact />
        {/* HIDDEN until launch - re-enable: app store links (closing CTA is a download-only
            section; the Footer sign-off below already carries the same headline) */}
        {/* <ClosingCTA /> */}
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
