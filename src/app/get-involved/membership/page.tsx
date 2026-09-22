import Link from "next/link";

import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export default async function MembershipPage() {
  const membershipFormUrl = await resolveFormLink("membership", DEFAULT_FORM_LINKS);

  const membershipLevels = [
    {
      level: "Student Supporter",
      amount: "$10 suggested",
      benefits: [
        "Event updates via email",
        "Outreach opportunities",
        "Volunteer participation",
      ],
    },
    {
      level: "Individual Supporter",
      amount: "$25 suggested",
      benefits: [
        "One free CMAC t-shirt",
        "Membership status",
        "Optional sponsor-page recognition",
      ],
    },
    {
      level: "FAMILY\nSUPPORTER",
      amount: "$50 suggested",
      benefits: [
        "Two free CMAC t-shirts",
        "Membership status",
        "Optional sponsor-page recognition",
      ],
    },
    {
      level: "Community Supporter",
      amount: "$100 suggested",
      benefits: [
        "Recognition for supporting district arts programs",
        "Optional sponsor-page visibility",
        "Community arts impact recognition",
      ],
    },
    {
      level: "Premier Community Supporter",
      amount: "$200 suggested",
      benefits: [
        "Website recognition",
        "Event-table visibility",
        "Digital support badge",
        "Social media shout-out",
        "Prime visibility on sponsor page and CMAC homepage",
      ],
    },
  ];

  const quickNavItems = [
    { label: "Membership Levels", href: "#membership-levels" },
    { label: "Student Member", href: "#student-member" },
    { label: "Support the Show", href: "#other-ways-to-give" },
    { label: "Donate", href: "#direct-donate" },
    { label: "Volunteer", href: "/cmac/get-involved/volunteer" },
    { label: "FAQ", href: "/cmac/faq" },
  ];

  return (
    <main className="subpage get-involved-page">
      <section className="subpage-hero" id="membership-levels">
        <h1>CMAC Membership</h1>
        <p>
          Membership in Comsewogue Music &amp; Arts Corp. directly supports student musicians,
          artists, performers, and creators through scholarships, teacher grants, and summer arts
          programs.
        </p>
        <div className="primary-cta-row">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Become a Member
          </a>
          <Link href="/cmac/get-involved/volunteer" className="secondary-btn">
            Volunteer / Student Representative
          </Link>
        </div>
        <p className="tiny-note">
          Students and Honor Society members are welcome and can earn documented volunteer hours.
        </p>
      </section>

      <nav className="get-involved-page-nav" aria-label="Quick navigation">
        <span className="get-involved-page-nav__label">Quick nav</span>
        {quickNavItems.map((item) => (
          <a key={item.href} href={item.href} className="get-involved-page-nav__link">
            {item.label}
          </a>
        ))}
      </nav>

      <section className="content-card">
        <h2>Membership Levels (Suggested Donations)</h2>
        <p className="muted-copy">
          Your membership and donations fund student scholarships, teacher grants for music, art, and
          drama projects, and summer arts programs for Comsewogue students in grades 3–12.
        </p>
        <div className="membership-grid membership-grid--compact">
          {membershipLevels.map(({ level, amount, benefits }) => (
            <article key={level} className="membership-tier">
              <h3>{level}</h3>
              <p>{amount}</p>
              <ul>
                {benefits.map((benefit) => (
                  <li key={`${level}-${benefit}`}>{benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="muted-copy membership-tax-note">
          <strong>All donations are tax-deductible.</strong> Your bank statement or canceled check
          serves as a receipt. For an official tax letter, please contact CMAC.
        </p>
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

        <div className="primary-cta-row primary-cta-row--bottom">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Join as a Student Member
          </a>
        </div>
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
        </div>
      </section>
    </main>
  );
}
