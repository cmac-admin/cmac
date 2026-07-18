export default function AboutPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">About</p>
        <h1 className="about-title-one-line">About Comsewogue Music & Arts Corp.</h1>
        <p>
          We are a 501(c) non-profit organization supporting Comsewogue
          students through music, visual arts, scholarships, and grants.
        </p>
      </section>

      <section className="content-card">
        <h2>Our Mission</h2>
        <p>
          Comsewogue Music & Arts Corp is dedicated to supporting students in
          grades 3–12 throughout the Comsewogue School District by:
        </p>
        <ul className="mission-list">
          <li>
            Providing scholarships to students pursuing music and arts
            opportunities
          </li>
          <li>
            Offering partial or full financial support for summer or
            academic-year music and arts programs
          </li>
          <li>
            Supporting music and arts teachers with funding for classroom
            projects and district-wide initiatives
          </li>
          <li>
            Creating community outreach opportunities for student
            representatives and Tri-M / Arts Honor Society students
          </li>
          <li>
            Promoting awareness and appreciation of music and arts programs
            within the Comsewogue community
          </li>
        </ul>
        <p>
          With board approval and based on available funds, CMAC may extend
          support to surrounding Suffolk County areas.
        </p>
      </section>

      <section className="content-card">
        <h2>2026–2027 Board Members & Representatives</h2>
        <div className="about-groups">
          <div className="about-group">
            <h3 className="section-label">Board Members</h3>
            <ul className="info-list">
              <li>President: Johanna Kosak</li>
              <li>Vice President: —</li>
              <li>Treasurer: Debra Andersen</li>
              <li>Recording Secretary: Michelle Dvorsky</li>
            </ul>
          </div>

          <div className="about-divider" aria-hidden="true" />

          <div className="about-group">
            <h3 className="section-label">Student Representatives</h3>
            <ul className="info-list">
              <li>Annmarie Kosak</li>
              <li>James Perrone</li>
              <li>Michael Provenzale</li>
            </ul>
          </div>
        </div>
        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/about-us/">
            View previous About page
          </a>
        </p>
      </section>
    </main>
  );
}
