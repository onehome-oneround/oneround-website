import Splash from "@/components/Splash";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Marquee from "@/components/Marquee";
import FeatureSpotlight from "@/components/FeatureSpotlight";
import HowItWorks from "@/components/HowItWorks";
import WhatToExpect from "@/components/WhatToExpect";
import VenueLogos from "@/components/VenueLogos";
import GoodStuff from "@/components/GoodStuff";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import ClosingCTA from "@/components/ClosingCTA";
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
        <VenueLogos />
        <GoodStuff />
        <Faq />
        <Contact />
        <ClosingCTA />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
