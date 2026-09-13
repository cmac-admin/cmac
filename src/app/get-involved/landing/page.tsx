import Link from "next/link";

export default function GetInvolvedLandingPage() {
  return (
    <main className="subpage get-involved-page">
      <section className="subpage-hero">
        <h1>Get Involved</h1>
        <p>
          Join CMAC as a member, support our student programs, or volunteer your time to help bring
          music, art, and theater to life across our community.
        </p>
      </section>

      <section className="content-card">
        <h2>Choose Your Path</h2>
        <div className="membership-grid membership-grid--compact">
          <article className="membership-tier">
            <h3>Membership</h3>
            <p>Support scholarships, grants, and programs.</p>
            <ul>
              <li>Explore membership levels</li>
              <li>Learn about student opportunities</li>
              <li>Make a donation</li>
            </ul>
            <Link href="/cmac/get-involved/membership" className="apply-btn">
              Membership
            </Link>
          </article>

          <article className="membership-tier">
            <h3>Volunteer</h3>
            <p>Help at events and support CMAC in action.</p>
            <ul>
              <li>Student representatives</li>
              <li>Event support</li>
              <li>Volunteer outreach</li>
            </ul>
            <Link href="/cmac/get-involved/volunteer" className="secondary-btn">
              Volunteer
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
