import Link from "next/link";

import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export default async function VolunteerPage() {
  const membershipFormUrl = await resolveFormLink("membership", DEFAULT_FORM_LINKS);

  const quickNavItems = [
    { label: "Opportunities", href: "#volunteer-opportunities" },
    { label: "Student Reps", href: "#student-reps" },
    { label: "Event Support", href: "#event-support" },
    { label: "Contact", href: "#contact" },
    { label: "Membership", href: "/cmac/get-involved/membership" },
    { label: "FAQ", href: "/cmac/faq" },
  ];

  return (
    <main className="subpage get-involved-page">
      <section className="subpage-hero" id="top">
        <h1>Volunteer with CMAC</h1>
        <p>
          Volunteering is one of the most meaningful ways to support CMAC and the students who bring
          music, art, and theater to life in our district.
        </p>
        <div className="primary-cta-row">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Volunteer / Student Representative
          </a>
          <Link href="/cmac/get-involved/membership" className="secondary-btn">
            Join as a Member
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

      <section className="content-card" id="volunteer-opportunities">
        <h2>Volunteer Opportunities</h2>
        <p className="muted-copy">
          Volunteers help at concerts, fundraising tables, student outreach events, and community arts
          programming that make CMAC possible.
        </p>
        <div className="volunteer-grid">
          <article className="volunteer-card">
            <h3>Adult Volunteers</h3>
            <p>
              Help at the CMAC table during concerts and productions, assist with fundraising items,
              support communications, or help review scholarship and grant applications. Every role
              makes a difference.
            </p>
          </article>
          <article className="volunteer-card" id="student-reps">
            <h3>Student Representatives &amp; Honor Society Volunteers</h3>
            <p>
              High school students, including Tri-M and Arts Honor Society members, are encouraged to
              get involved. Earn documented volunteer hours and gain leadership experience while helping
              promote scholarships, assisting at events, and supporting the arts in our community.
            </p>
            <p className="volunteer-note">
              For volunteer questions or to get involved, email
              <a href="mailto:Comsewoguemusicandarts@gmail.com">Comsewoguemusicandarts@gmail.com</a>.
            </p>
          </article>
        </div>
      </section>

      <section className="content-card" id="event-support">
        <h2>Support the Show</h2>
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

      <section className="content-card" id="contact">
        <h2>Contact CMAC</h2>
        <p className="muted-copy">
          Want to volunteer with us or learn more about student leadership opportunities? Reach out
          directly and we will connect you with the right next step.
        </p>
        <p className="muted-copy">
          Email: <a href="mailto:Comsewoguemusicandarts@gmail.com">Comsewoguemusicandarts@gmail.com</a>
        </p>
      </section>
    </main>
  );
}
