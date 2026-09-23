import Link from "next/link";

import { ContactPopupLink } from "@/components/ContactPopupLink";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";
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
        text: "Yes. You can donate by check, drop off a contribution at Comsewogue High School, or join as a yearly member.",
      },
    },
  ],
};

export default async function GetInvolvedPage() {
  const membershipFormUrl = await resolveFormLink("membership", DEFAULT_FORM_LINKS);

  const membershipLevels = [
    {
      level: "Student\nSupporter",
      amount: "$10 suggested",
      ctaWords: ["JOIN", "STUDENT", "SUPPORTER"],
      benefits: [
        "Event updates via email",
        "Outreach opportunities",
        "Volunteer participation",
      ],
      business: false,
    },
    {
      level: "Individual\nSupporter",
      amount: "$25 suggested",
      ctaWords: ["JOIN", "INDIVIDUAL", "SUPPORTER"],
      benefits: [
        "One free CMAC t-shirt",
        "Membership status",
        "Optional sponsor-page recognition",
      ],
      business: false,
    },
    {
      level: "Family\nSupporter",
      amount: "$50 suggested",
      ctaWords: ["JOIN", "FAMILY", "SUPPORTER"],
      benefits: [
        "Two free CMAC t-shirts",
        "Membership status",
        "Optional sponsor-page recognition",
      ],
      business: false,
    },
    {
      level: "Community Supporter",
      amount: "$100 suggested",
      ctaWords: ["JOIN", "COMMUNITY", "SUPPORTER"],
      benefits: [
        "Class passes, gift cards, or other in-kind support",
        "Art-themed raffle basket donation",
        "Music-themed raffle basket donation",
      ],
      business: true,
    },
    {
      level: "Premier Community Supporter",
      amount: "$200 suggested",
      ctaWords: ["JOIN", "PREMIER", "COMMUNITY", "SUPPORTER"],
      benefits: [
        "Website recognition",
        "Event-table visibility",
        "Digital support badge",
        "Social media shout-out",
        "Prime visibility on sponsor page and CMAC homepage",
      ],
      business: true,
    },
  ];


  const quickNavItems = [
    { label: "Membership", href: "#membership" },
    { label: "Donate", href: "#direct-donate" },
    { label: "Volunteer", href: "#volunteer" },
  ];

  return (
    <main className="subpage get-involved-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donationFaqJsonLd) }}
      />

      <section className="subpage-hero" id="membership">
        <p className="subpage-kicker">Why support CMAC?</p>
        <p className="subpage-hero__statement">
          When arts education is supported, students grow with confidence, creativity, and belonging.
        </p>
        <p>
          Membership in Comsewogue Music &amp; Arts Corp. directly supports musicians, artists,
          performers and creators through teacher grants and scholarships.
        </p>

        <nav className="get-involved-page-nav" aria-label="Quick navigation">
          <span className="get-involved-page-nav__label">Choose a Way to Support</span>
          <div className="get-involved-page-nav__link-group">
            {quickNavItems.map((item) => (
              <a key={item.href} href={item.href} className="get-involved-page-nav__link">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </section>

      <section className="content-card">
        <h2>Membership Levels (Suggested Donations)</h2>
        <p className="muted-copy">
          Your membership and donations fund student scholarships, teacher grants for music, art, and
          drama projects, and summer arts programs for Comsewogue Students.
        </p>
        <div className="membership-grid membership-grid--compact">
          {membershipLevels.map(({ level, amount, benefits, ctaWords, business }) => {
            const normalizedLevel = level.toLowerCase().replace(/\s+/g, " ").trim();
            const isCommunitySupporter = normalizedLevel.includes("community supporter");
            const isPremierCommunitySupporter = normalizedLevel.includes("premier community supporter");

            return (
              <article
                key={level}
                className={[
                  "membership-tier",
                  business || isCommunitySupporter ? "membership-tier--business" : "",
                  isPremierCommunitySupporter ? "membership-tier--business-premier" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h3>{level}</h3>
                <p>{amount}</p>
                <ul>
                  {benefits.map((benefit) => (
                    <li key={`${level}-${benefit}`}>{benefit}</li>
                  ))}
                </ul>
                <a href={membershipFormUrl} className="membership-tier__button" target="_blank" rel="noreferrer">
                  {ctaWords.map((word) => (
                    <span key={`${level}-${word}`} className="membership-tier__button-word">
                      {word}
                    </span>
                  ))}
                </a>
              </article>
            );
          })}
        </div>


        <p className="membership-benefits__prompt">Want more details on each level?</p>
        <p className="subpage-link">
          <a href="#membership-benefits" className="text-link">
            View Full Membership Benefits
          </a>
        </p>
        <p className="muted-copy membership-tax-note">
          <strong>All donations are tax-deductible.</strong> Your bank statement or canceled check
          serves as a receipt. For an official tax letter, please contact CMAC.
        </p>
      </section>

      <section className="content-card" id="direct-donate">
        <h2>Give Directly - Every Dollar Supports Students</h2>
        <p className="muted-copy">
          100% of your gift funds scholarships and teacher grants help Comsewogue Students keep
          creating and performing.
        </p>
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
            <p>Make checks payable to CMAC and send to:</p>
            <p>
              Comsewogue Music &amp; Arts Corp.
              <br />
              c/o CMAC
              <br />
              Comsewogue High School
              <br />
              565 Bicycle Path
              <br />
              Port Jefferson Station, NY 11776
            </p>
          </div>
        </div>
      </section>

      <section className="content-card" id="volunteer">
        <h2>Volunteer Opportunities</h2>
        <p className="muted-copy">
          <strong>Prefer to Give your Time?</strong>
        </p>
        <p className="muted-copy">
          Volunteering is meaningful, though we know time is limited for many families.
        </p>
        <div className="volunteer-grid">
          <article className="volunteer-card">
            <h3>Adult Volunteers</h3>
            <p>
              Help at the CMAC table during concerts, drama and art shows, assist with fundraising
              items, and help support communications.
            </p>
          </article>
          <article className="volunteer-card">
            <h3>Student Representatives &amp; Honor Society Volunteers</h3>
            <p>
              High school students (including Tri-M and Arts Honor Society members) can earn
              documented volunteer hours and leadership experience.
            </p>
          </article>
        </div>
        <p className="volunteer-note">
          To get involved, email
          <a href="mailto:comsewoguemusicandarts@gmail.com">comsewoguemusicandarts@gmail.com</a>.
        </p>
      </section>

      <section className="content-card" id="other-ways-to-give">
        <h2>Support CMAC Fundraisers</h2>
        <p className="muted-copy">
          At most concerts and drama productions, CMAC offers handcrafted items that directly support
          scholarships and grants. These include personalized ornaments, fresh flower bouquets, and
          “Kisses for the Cast.”
        </p>
        <p className="subpage-link">
          <a href="/cmac/order-here" className="text-link">
            Support the Show
          </a>
        </p>
      </section>

      <section className="content-card" id="membership-benefits">
        <h2>Full Membership Benefits</h2>
        <div className="table-wrap">
          <table className="membership-benefits-table">
            <thead>
              <tr>
                <th>Benefit</th>
                <th>
                  Student
                  <br />
                  $10
                </th>
                <th>
                  Individual
                  <br />
                  $25
                </th>
                <th>
                  Family
                  <br />
                  $50
                </th>
                <th>
                  Community
                  <br />
                  $100
                </th>
                <th>
                  Premier
                  <br />
                  $200
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event updates via email</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Membership status</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Free CMAC t-shirt(s)</td>
                <td>–</td>
                <td>1</td>
                <td>2</td>
                <td>–</td>
                <td>–</td>
              </tr>
              <tr>
                <td>Optional sponsor-page recognition</td>
                <td>–</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Event-table Logo visibility</td>
                <td>–</td>
                <td>–</td>
                <td>–</td>
                <td>–</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Social media shout-out</td>
                <td>–</td>
                <td>–</td>
                <td>Monthly Group</td>
                <td>Group</td>
                <td>Spotlight</td>
              </tr>
              <tr>
                <td>Prime visibility on sponsor page &amp; homepage</td>
                <td>–</td>
                <td>–</td>
                <td>–</td>
                <td>–</td>
                <td>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-card" id="student-member">
        <h2>CMAC Student Member</h2>
        <p className="muted-copy">
          Looking for a welcoming place to grow your skills, meet other creative students, and be part
          of something bigger? CMAC&apos;s Student membership is designed just for you.
        </p>
        <p className="muted-copy">
          <strong>Suggested donation: $10</strong>
        </p>

        <h3>Why Join as a Student?</h3>
        <ul className="table-list">
          <li>
            <strong>Be a connector</strong> — Serve as a bridge between CMAC and your school,
            including JFK and high school level, helping share opportunities with fellow students.
          </li>
          <li>
            <strong>Volunteer and represent</strong> — Help at volunteer tables and events while
            representing CMAC in your school community.
          </li>
          <li>
            <strong>Open doors for collaboration</strong> — Support future art and music projects
            between CMAC and your school, such as student art contests, collaborative artwork, or
            performance-based projects.
          </li>
          <li>
            <strong>College &amp; résumé boost</strong> — Show colleges and future employers that you&apos;re
            committed to your craft and community.
          </li>
          <li>
            <strong>Build community experience</strong> — Gain real-world experience in outreach,
            communication, and community engagement.
          </li>
          <li>
            <strong>Be part of something larger</strong> — Join a creative network beyond your school
            and help grow arts opportunities for other students.
          </li>
        </ul>

        <h3>How to Join</h3>
        <p className="muted-copy">
          Simply select the CMAC Student membership option when you sign up and contribute the
          suggested $10 donation (or any amount that works for you).
        </p>
        <p className="muted-copy">
          Students and Honor Society members are welcome and can earn documented volunteer hours.
        </p>

        <div className="primary-cta-row primary-cta-row--bottom">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Join as a Student Member
          </a>
        </div>
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
