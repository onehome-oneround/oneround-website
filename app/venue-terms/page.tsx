import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Venue Terms and Conditions",
  description:
    "The terms and conditions for venues participating in OneRound, operated by OneRound Pty Ltd.",
  alternates: { canonical: "https://oneround.au/venue-terms" },
};

export default function VenueTermsPage() {
  return (
    <LegalPage title="Terms and conditions - venues">
      <h2>About us and what we do</h2>
      <p>
        OneRound is an online platform and mobile application that provides
        members with information about hospitality offers and discounts,
        including identifying the venues around you that will shout you a drink
        in return for a Roundie.
      </p>
      <p>
        To the extent that information presented to members may be regarded as
        advertising, the presentation of that information is not undertaken by or
        on behalf of any participating venue, and participating venues have no
        authority to either prevent, compel or allow OneRound to provide
        information to members.
      </p>
      <p>
        For the avoidance of doubt, OneRound does not act as agent for, is not in
        partnership with and does not contract with participating venues. We do
        not take or receive or place orders for liquor. We represent you, our
        members, and research and present information to you about participating
        venues and their services and offers.
      </p>

      <h3>Definitions</h3>
      <p>In these terms and conditions:</p>
      <p>“Member” means a paid-up subscriber to the Service;</p>
      <p>
        “OneRound”, “we”, “us” or “our” means OneRound Pty Ltd ACN 691 600 263;
      </p>
      <p>
        “Offer” means any discount, deal, promotion or benefit on food and/or
        beverages that may be available at a participating venue;
      </p>
      <p>
        “Roundie” means a token created by the Service that may be exchanged for
        a food or beverage item at a participating venue;
      </p>
      <p>
        “Service” and “services” means the OneRound app and website, and all
        related services provided by OneRound;
      </p>
      <p>
        “you”, “your” and “the venue” means the participating venue for the
        Service.
      </p>

      <h3>General</h3>
      <p>
        A venue may participate by creating a venue account on the OneRound
        Service. By creating an account and using the Service the proprietors of
        the venue agree to be bound by these Terms and Conditions. If you do not
        agree, you should not and are not permitted to use the Service.
      </p>
      <p>
        Venue participation is free of charge, but venues agree to accept
        Roundies in exchange for a food or beverage item of the venues choosing
        subject to the understanding that the food or beverage item should carry
        a retail value roughly equivalent to a schooner of tap beer.
      </p>
      <p>
        OneRound will list and identify the participating venue on the Service
        and will promote the venue to OneRound members using the various devices
        contained within the mobile app.
      </p>
      <p>
        The venue must have either a point-of-sale system that is compatible with
        the OneRound Service or an equivalent stand-alone redemption terminal
        approved by us. We may alternatively approve the use of a manual
        redemption system.
      </p>

      <h3>Roundies</h3>
      <p>
        The kind of food or beverage item for which a Roundie can be exchanged
        will be at the discretion of the participating venue and may change from
        time to time.
      </p>
      <p>
        The member will present the OneRound app to venue staff. The app will
        show that the subscriber has a valid Roundie. The venue will scan the
        Roundie and provide the subscriber with the product selected by the
        subscriber from the range of products made available by the venue.
      </p>
      <p>
        By agreeing to accept Roundies the venue does not in any way waive the
        right or obligation to refuse service for any reason including as part of
        the venue’s RSA obligations.
      </p>
      <p>
        Only one (1) Roundie may be used/accepted during any 12 hour period. The
        OneRound app is designed to ensure compliance with this requirement.
      </p>
      <p>
        Venues are required to offer a minimum of 25 Roundies per open day. This
        is the venue&rsquo;s daily capacity commitment to the OneRound member
        network. Venues may offer more Roundies on any given day at their
        discretion, but must not fall below this daily minimum without prior
        arrangement with OneRound.
      </p>

      <h3>Information gathering and venue dashboard</h3>
      <p>
        OneRound may gather information about a participating venue, including but
        not limited to that venue’s products, services, facilities, pricing,
        marketing, offers, trading hours and customer reviews for the benefit of
        our members. OneRound may seek such information direct from the venue, or
        may gather it through other published material, such as the venue’s
        website or social media accounts.
      </p>
      <p>
        A participating venue may also be provided with an account with access to
        venue dashboard functions on the OneRound website and mobile app. If this
        occurs, the venue may post any information on its account on the
        dashboard, including without limitation information about the venue, food
        and beverage offers, events, services and other facilities (“content”).
      </p>
      <p>
        OneRound does not warrant that any content or any form or version of any
        content posted via the dashboard by any venue will be reproduced.
        OneRound will or will not make use of that content in its absolute
        discretion, and participating venues have no authority to either prevent,
        compel or allow OneRound to provide information to members.
      </p>
      <p>
        For the avoidance of doubt, to the extent that information provided to
        members may be regarded as advertising, the provision of that information
        is not undertaken by or on behalf of any participating venue, and
        participating venues have no authority to allow or not allow OneRound to
        provide information to members.
      </p>
      <p>
        For content uploaded by you, or otherwise given to us by you, for use at
        our discretion (including without limitation reviews, ratings,
        photographs, and comments), you grant us a non-exclusive, transferable,
        sub-licensable, royalty-free, perpetual worldwide licence for its use.
      </p>
      <p>You represent and warrant that:</p>
      <p>
        you have obtained all necessary rights, releases and permissions to
        provide the content and to grant the rights granted to us in these Terms
        and Conditions; and
      </p>
      <p>the content and its submission and use as you authorise will not violate:</p>
      <ol className="roman">
        <li>any applicable laws;</li>
        <li>
          any third-party intellectual property, privacy, publicity or other
          rights; or
        </li>
        <li>any of your or third-party policies or terms governing the Content.</li>
      </ol>
      <p>
        OneRound assumes no responsibility or liability for any content provided
        by you. You are solely responsible for the content and the consequences
        of providing it to us.
      </p>
    </LegalPage>
  );
}
