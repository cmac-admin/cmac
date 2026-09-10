"use client";

import { ContactPopupLink } from "@/components/ContactPopupLink";
import { getSchoolYearInfo } from "@/lib/school-year";

const donationFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the fastest way to donate to CMAC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Donate with Venmo, Apple Pay, or Zelle buttons on the Get Involved page.",
      },
    },
    {
      "@type": "Question",
      name: "Where does CMAC donation money go?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Donations support student scholarships, teacher grants, and arts event support across the Comsewogue School District.",
      },
    },
    {
      "@type": "Question",
      name: "Can I support CMAC without making a payment online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can donate by check, volunteer at events, or join as a yearly member.",
      },
    },
  ],
};

export default function GetInvolvedPage() {
  const membershipFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform";

  const membershipLevels = [
    {
      level: "Friend of CMAC",
      amount: "$10 suggested",
      benefits: "Membership status, meeting notifications, voting rights, and meeting minutes by email",
    },
    {
      level: "Individual",
      amount: "$25/year",
      benefits: "All of the above + free CMAC t-shirt (pickup at winter concerts)",
    },
    {
      level: "Family",
      amount: "$50/year",
      benefits: "All of the above + 2 free t-shirts",
    },
    {
      level: "Community Supporter",
      amount: "$100/year",
      benefits: "Family benefits + business or family name recognition",
    },
    {
      level: "Premier Community Supporter",
      amount: "$150/year",
      benefits: "Logo and link on the website, logo displayed at event tables, digital support badge, and a dedicated social media spotlight",
    },
  ];

  return (
    <main className="subpage get-involved-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donationFaqJsonLd) }}
      />

      <section className="subpage-hero">
        <h1>Join CMAC</h1>
        <p>
          Membership in Comsewogue Music &amp; Arts Corp. directly supports
          student musicians, artists, performers, and creators through
          scholarships, teacher grants, and summer arts programs.
        </p>
        <div className="primary-cta-row">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Become a Member
          </a>
          <a href={membershipFormUrl} className="secondary-btn" target="_blank" rel="noreferrer">
            Volunteer / Student Representative
          </a>
        </div>
        <p className="tiny-note">
          Students and Honor Society members are welcome and can earn documented
          volunteer hours.
        </p>
      </section>

      <section className="content-card">
        <h2>Membership Levels</h2>
        <div className="membership-grid membership-grid--compact">
          {membershipLevels.map(({ level, amount, benefits }) => (
            <article key={level} className="membership-tier">
              <h3>{level}</h3>
              <p>{amount}</p>
              <ul>
                <li>{benefits}</li>
              </ul>
            </article>
          ))}
        </div>
        <p className="muted-copy membership-tax-note">
          All donations are tax-deductible. Your bank statement or canceled check
          serves as a receipt. For an official tax letter, please contact CMAC.
        </p>
      </section>

      <section className="content-card">
        <h2>What Your Support Makes Possible</h2>
        <p className="muted-copy">
          Your membership and donations fund student scholarships, teacher grants
          for music, art, and drama projects, and summer arts programs for
          Comsewogue students in grades 3–12.
        </p>
      </section>

      <section className="content-card" id="volunteer">
        <h2>Volunteer Opportunities</h2>
        <p className="muted-copy">
          Volunteering is one of the most meaningful ways to support CMAC and the
          students who bring music, art, and theater to life in our district.
        </p>
        <div className="volunteer-grid">
          <article className="volunteer-card">
            <h3>Adult Volunteers</h3>
            <p>
              Help at the CMAC table during concerts and productions, assist with
              fundraising items, support communications, or help review
              scholarship and grant applications. Every role makes a difference.
            </p>
          </article>
          <article className="volunteer-card">
            <h3>Student Representatives &amp; Honor Society Volunteers</h3>
            <p>
              High school students, including Tri-M and Arts Honor Society members,
              are encouraged to get involved. Earn documented volunteer hours and
              gain leadership experience while helping promote scholarships,
              assisting at events, and supporting the arts in our community.
            </p>
            <p className="volunteer-note">
              Simply note your volunteer interest when you complete the membership
              form.
            </p>
          </article>
        </div>
      </section>

      <section className="content-card" id="other-ways-to-give">
        <h2>Performance-Night Fundraising</h2>
        <p className="muted-copy">
          At most concerts and drama productions, CMAC offers handcrafted items
          that directly support scholarships and grants. These include
          personalized ornaments, fresh flower bouquets, and “Kisses for the
          Cast.”
        </p>
        <p className="subpage-link">
          <a href="/cmac/order-here" className="text-link">
            Support the Show
          </a>
        </p>
      </section>

      <section className="content-card" id="direct-donate">
        <h2>Direct Donation Methods</h2>
        <div className="donation-compact-list donation-compact-list--full">
          <div className="donation-compact-item donation-compact-item--split">
            <div className="donation-compact-method">
              <strong>Venmo</strong>
              <p>
                <a
                  href="https://venmo.com/code?user_id=4464015279392318341&created=1764440203"
                  target="_blank"
                  rel="noreferrer"
                >
                  @CMAC-Comsewogue
                </a>
              </p>
              <img
                className="qr-image qr-image--small"
                src="/cmac/cmac-venmo-qr.png"
                alt="CMAC Venmo QR code"
              />
            </div>
            <div className="donation-compact-method">
              <strong>Zelle</strong>
              <p>Scan the code in your banking app or use the QR code on this page.</p>
              <img
                className="qr-image qr-image--small"
                src="/cmac/cmac-zelle-qr.png"
                alt="CMAC Zelle QR code"
              />
            </div>
          </div>
          <div className="donation-compact-item donation-compact-item--mail">
            <strong>By Mail</strong>
            <p>Make checks payable to CMAC.</p>
            <p>
              Comsewogue Music &amp; Arts Corp.
              <br />
              c/o Comsewogue High School
              <br />
              565 Bicycle Path
              <br />
              Port Jefferson Station, NY 11776
            </p>
          </div>
        </div>
      </section>

      <section className="content-card">
        <h2>Practical Details</h2>
        <ul className="table-list">
          <li>All meetings are held via Google Meet.</li>
          <li>
            Student members: Please use a personal email address. School email
            accounts are blocked.
          </li>
          <li>
            Participation in the CMAC Facebook group is free for anyone who wants
            to stay connected and share news.
          </li>
        </ul>
      </section>

      <section className="content-card">
        <h2>Quick Questions</h2>
        <div className="faq-list">
          <details>
            <summary>What is the fastest way to donate?</summary>
            <p>Venmo or Zelle.</p>
          </details>
          <details>
            <summary>What does my donation support?</summary>
            <p>
              Student scholarships, teacher grants, and arts-event support
              throughout the district.
            </p>
          </details>
          <details>
            <summary>Can I support CMAC without donating online?</summary>
            <p>
              Yes. You can join as a member, volunteer at events, or send a
              check.
            </p>
          </details>
        </div>
        <p className="subpage-link">
          <a href="/cmac/faq" className="text-link">
            More questions? Visit our FAQ
          </a>
        </p>
      </section>

      <section className="content-card">
        <div className="primary-cta-row primary-cta-row--bottom">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Join CMAC Today
          </a>
        </div>
      </section>
    </main>
  );
}
