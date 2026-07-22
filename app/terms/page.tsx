import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions for OneRound members, operated by OneRound Pty Ltd.",
  alternates: { canonical: "https://oneround.au/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      meta={
        <>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
            MEMBERS
          </p>
          <p>OneRound Pty Ltd  •  ACN 691 600 263</p>
          <p>Effective Date: 8 July 2026</p>
        </>
      }
    >
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

      <h2>Terms and conditions</h2>

      <h3>Definitions</h3>
      <p>In these terms and conditions:</p>
      <p>
        “OneRound”, “we”, “us” or “our” means OneRound Pty Ltd ACN 691 600 263;
      </p>
      <p>
        “Offer” means any discount, deal, promotion or benefit on food and/or
        beverages available through the Service;
      </p>
      <p>
        “Roundie” means a token created by the Service that may be exchanged for
        a food or beverage item at a participating venue;
      </p>
      <p>
        “Service” and “services” means the OneRound app and website, and all
        related services provided by OneRound;
      </p>
      <p>“you” and “your” means the user of the Service.</p>

      <h3>General</h3>
      <p>
        The Terms and Conditions of use by members are set out below. By becoming
        a OneRound member and using the services you agree to be bound by these
        Terms and Conditions, so please read them carefully. If you do not agree,
        you should not and are not permitted to use the Service.
      </p>
      <p>
        Be kind to venue staff. We want to make as many venues as possible
        available to OneRound members and your interactions with staff can make a
        huge difference.
      </p>

      <h3>Membership</h3>
      <p>
        Membership is only open to persons who can legally enter licensed
        premises, and who can legally purchase and consume liquor in licensed
        premises. This means that you must be 18 years of age or older and not be
        subject to any relevant banning order.
      </p>
      <p>
        Members acknowledge that if they falsely represent that they are of legal
        drinking age, or ignore any relevant banning order they may commit
        offences under licensing laws.
      </p>
      <p>
        OneRound is a paid subscription service. You agree to pay the
        subscription fees, and authorise us to take payment from the account
        nominated by you when you become a member. Subscription fees may change
        from time to time. If this occurs a notification will be provided in the
        notifications section of the OneRound mobile app.
      </p>
      <p>
        Your membership will be automatically suspended if the subscription fees
        are not paid.
      </p>
      <p>Either you or we can cancel your membership at any time.</p>

      <h3>Roundies</h3>
      <p>
        Roundies may be presented at participating venues and exchanged for a
        food or beverage item in accordance with the following rules:
      </p>
      <p>
        The kind of food or beverage item for which a Roundie can be exchanged
        will be at the discretion of the participating venue, and may change from
        time to time.
      </p>
      <p>
        To claim your Roundie you will need to show your unique roundie qr code
        at the venue.
      </p>
      <p>Only one (1) Roundie may be used during any 12 hour period.</p>

      <h3>RSA</h3>
      <p>
        OneRound supports the responsible service and consumption of liquor.
      </p>
      <p>
        Members acknowledge that they may be refused service, including being
        supplied with a drink in exchange for a Roundie, if they are unduly
        intoxicated or disorderly, and may be refused entry to participating
        venues at the venue’s discretion.
      </p>
      <p>
        Under the Liquor Act, it is an offence for liquor to be supplied to a
        person who is unduly intoxicated or disorderly. There are also offences
        relating to the consumption of liquor, allowing the consumption of
        liquor, and allowing the supply of liquor to persons who are unduly
        intoxicated or disorderly. A person may be taken to be unduly intoxicated
        if:
      </p>
      <ol className="alpha">
        <li>
          the person’s speech, balance, coordination or behaviour is noticeably
          affected; and
        </li>
        <li>
          there are reasonable grounds for believing the affected speech,
          balance, coordination or behaviour is the result of the consumption of
          liquor, drugs or another intoxicating substance.
        </li>
      </ol>

      <h3>Amendment of terms</h3>
      <p>
        We reserve the right to change, modify, add or remove portions of these
        Terms and Conditions from time to time. Revised Terms and Conditions will
        apply to the use of the services from the date of publication of the new
        Terms and Conditions on the Service. Please check these Terms and
        Conditions regularly prior to using the Service to ensure you are aware
        of any changes. If you choose to use the Service then we will regard that
        use as evidence of your agreement and acceptance of these Terms and
        Conditions.
      </p>

      <h3>Limitation of Liability</h3>
      <p>
        By using the services you acknowledge acceptance and agreement that
        OneRound is not legally responsible for any loss or damage you may incur
        in relation to your use of the services, whether from errors or omissions
        in content or information displayed, any goods or services offer, or from
        any other use of the Service. This includes your use or reliance on any
        third-party content. Your use of, and reliance on, any content or
        information on the Service is undertaken entirely at your own risk and no
        liability attaches to OneRound for any loss suffered.
      </p>
      <p>
        Whilst we make every effort to ensure the accuracy of the content on the
        Service, any information and materials displayed may contain inaccuracies
        and errors and we expressly exclude liability for any loss or damage
        attributable to such inaccuracies or errors.
      </p>
      <p>
        These Terms and Conditions are to be read in conjunction with any
        legislation which prohibits or restricts the exclusion, restriction or
        modification of any implied warranties, conditions, guarantees or
        obligations. Nothing in these Terms excludes or limits your rights under
        the Australian Consumer Law. If you have a complaint, contact us at{" "}
        <a href="mailto:hello@oneround.au?subject=Terms%20question">hello@oneround.au</a> or call 0410 567
        374.
      </p>
      <p>
        Whilst every effort is made to keep the Service up and running smoothly,
        we take no responsibility for, and will not be liable for, the services
        being temporarily unavailable.
      </p>

      <h3>Links To Other Websites</h3>
      <p>
        From time to time the Service may include links to third-party websites.
        OneRound may not have reviewed all of these sites and is not responsible
        for their content. The inclusion of any link does not signify endorsement
        by OneRound of the site. The use of any such linked website is at the
        user’s own risk.
      </p>
      <p>
        The availability of the website and mobile app does not warrant that
        these are free of any viruses or other malfunction that may cause loss or
        damage to users.
      </p>
      <p>
        OneRound accepts no responsibility and does not bear any liability for
        costs of servicing, repairs, or correction that may be required for
        technological devices damaged as a direct or indirect result of accessing
        or using the Service.
      </p>

      <h3>Privacy</h3>
      <p>
        At OneRound, we are committed to protecting your privacy. We agree to
        comply with the legal requirements of the Australian Privacy Principles
        as set out in the Privacy Act 1988 (Cth).
      </p>
      <p>
        OneRound does not and will not sell or deal in personal or customer
        information with third parties. We may, however, use non-identifiable
        information without any reference to your name or your information to
        create marketing statistics, identify user demands and to assist in
        meeting customer needs generally, including by providing that information
        to third parties. You acknowledge that the third party may use the
        information you provide to improve its website and services but not for
        any other use.
      </p>
      <p>
        You agree that through your use of the Service you consent to the
        collection and use of your information as set out in our Privacy Policy.
      </p>

      <h3>GST</h3>
      <p>
        If and when applicable, GST payable on our Services will be detailed on
        Invoices. By accepting these Terms and Conditions you agree to pay an
        amount equivalent to the GST imposed on these charges.
      </p>

      <h3>Intellectual property</h3>
      <p>
        The Service contains material that is owned by or licensed to us. This
        material may include, but is not limited to, the design, layout, look,
        appearance, trademarks and graphics. You are not permitted to reproduce
        any of this material for the purposes of sale or use by any third party.
      </p>
      <p>
        We expressly reserve all copyright and trademark in all documents,
        information and materials on the Service and we reserve the right to take
        action against you if our copyright is infringed.
      </p>

      <h3>Limitations of Use</h3>
      <p>
        You must not do any of the following while accessing or using the
        Service:
      </p>
      <ul>
        <li>
          access, tamper with, or use non-public areas of the Service, or our or
          our service providers’ computer or delivery systems;
        </li>
        <li>
          probe, scan, or test any system or network (particularly for
          vulnerabilities), or otherwise attempt to breach or circumvent any
          security or authentication measures;
        </li>
        <li>
          access or search the Service by any means (automated or otherwise)
          other than through currently available, published interfaces provided
          by us;
        </li>
        <li>scrape the Service;</li>
        <li>
          use the Service to send altered, deceptive, or false source-identifying
          information;
        </li>
        <li>
          interfere with, or disrupt, the access of any user, host or network,
          including by sending a virus to, spamming, or overloading the Service;
        </li>
        <li>
          take any action that may undermine the quality of information contained
          on the Service;
        </li>
        <li>
          use the Service for any unlawful purpose or in any way that violates
          these Terms;
        </li>
        <li>
          create multiple accounts to circumvent restrictions or abuse offers on
          the Service;
        </li>
        <li>share or transfer your account to another person; or</li>
        <li>
          engage in any conduct that, in our reasonable opinion, restricts or
          inhibits any other person from using or enjoying the Service.
        </li>
      </ul>

      <h3>Restricting Access</h3>
      <p>
        OneRound reserves the right to exclude or deny any person access to the
        Service at any time.
      </p>

      <h3>Severability</h3>
      <p>
        If any provision of these Terms and Conditions is held illegal, void, or
        unenforceable in any state or territory then such a clause shall not
        apply in that state or territory and shall be deemed never to have been
        included in these Terms and Conditions in that state or territory. Such a
        clause, if legal and enforceable in any other state or territory, shall
        continue to be enforceable and part of these Terms and Conditions in
        those other states and territories. The exclusion of any term pursuant to
        this paragraph shall not affect or modify the full enforceability and
        construction of the remaining provisions of these Terms and Conditions.
      </p>

      <h3>Entire Agreement</h3>
      <p>
        These Terms and Conditions make up the entire agreement between you and
        OneRound and supersede any prior agreement, understanding or arrangement
        between you and OneRound whether oral or in writing. No other term is to
        be included in this agreement except where it is required to be included
        or implied by any legislation of the Commonwealth, or any state or
        territory.
      </p>

      <h3>Jurisdiction</h3>
      <p>
        These Terms and Conditions and the services are subject to the laws of
        Queensland and Australia. If there is a dispute between you and OneRound
        that results in litigation then you irrevocably submit to the
        jurisdiction of the courts of Queensland.
      </p>
    </LegalPage>
  );
}
