import type { Metadata } from "next";
import { STATS } from "@/lib/stats";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Comsewogue Music & Arts Corp. — our mission, board members, and commitment to supporting students in grades 3–12 across the Comsewogue School District.",
  openGraph: {
    title: "About CMAC | Comsewogue Music & Arts Corp.",
    description:
      "CMAC is a 501(c) non-profit dedicated to supporting student artists and musicians in the Comsewogue School District through scholarships, grants, and community events.",
    url: "https://www.comsewoguemusicandarts.org/about",
  },
};

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

      <section
        className="impact-stats impact-stats--compact"
        aria-label="CMAC impact highlights"
      >
        <article>
          <p className="impact-stats__value">{STATS.foundedYear}</p>
          <p className="impact-stats__label">Founded</p>
        </article>
        <article>
          <p className="impact-stats__value">{STATS.schoolsCount}</p>
          <p className="impact-stats__label">District Event Support</p>
        </article>
        <article>
          <p className="impact-stats__value">{STATS.scholarshipsGranted}</p>
          <p className="impact-stats__label">Scholarships Granted</p>
        </article>
        <article>
          <p className="impact-stats__value">{STATS.totalAwarded}</p>
          <p className="impact-stats__label">Total Awarded</p>
        </article>
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
        <h2>2026–2027 Board of Directors</h2>

        <h3 className="section-label board-section-label">Officers</h3>
        <div className="board-grid">
          <div className="board-card">
            <div className="board-card__photo" aria-hidden="true">
              <span className="board-card__initials">JK</span>
            </div>
            <p className="board-card__name">Johanna Kosak</p>
            <p className="board-card__title">President</p>
          </div>

          <div className="board-card board-card--vacant">
            <div className="board-card__photo board-card__photo--vacant" aria-hidden="true">
              <span className="board-card__vacant-icon">?</span>
            </div>
            <p className="board-card__name">Vice President</p>
            <p className="board-card__title board-card__title--open">Position Open</p>
          </div>

          <div className="board-card">
            <div className="board-card__photo" aria-hidden="true">
              <span className="board-card__initials">DA</span>
            </div>
            <p className="board-card__name">Debra Andersen</p>
            <p className="board-card__title">Treasurer</p>
          </div>

          <div className="board-card">
            <div className="board-card__photo" aria-hidden="true">
              <span className="board-card__initials">MD</span>
            </div>
            <p className="board-card__name">Michelle Dvorsky</p>
            <p className="board-card__title">Recording Secretary</p>
          </div>
        </div>

        <h3 className="section-label board-section-label" style={{ marginTop: "2.25rem" }}>
          Student Representatives
        </h3>
        <div className="board-grid board-grid--students">
          <div className="board-card board-card--student">
            <div className="board-card__photo" aria-hidden="true">
              <span className="board-card__initials">AK</span>
            </div>
            <p className="board-card__name">Annmarie Kosak</p>
            <p className="board-card__title">Student Rep</p>
          </div>
          <div className="board-card board-card--student">
            <div className="board-card__photo" aria-hidden="true">
              <span className="board-card__initials">JP</span>
            </div>
            <p className="board-card__name">James Perrone</p>
            <p className="board-card__title">Student Rep</p>
          </div>
          <div className="board-card board-card--student">
            <div className="board-card__photo" aria-hidden="true">
              <span className="board-card__initials">MP</span>
            </div>
            <p className="board-card__name">Michael Provenzale</p>
            <p className="board-card__title">Student Rep</p>
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
