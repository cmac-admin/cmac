import type { Metadata } from "next";
import Link from "next/link";
import { AboutImpactStats } from "@/components/LiveStats";

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
        <h1 className="about-title-one-line">Comsewogue Music & Arts Corp.</h1>
        <p>
          Comsewogue Music & Arts Corp. (CMAC) is a volunteer-run 501(c)(3)
          nonprofit dedicated to keeping music, drama, and visual arts strong for
          students in the Comsewogue School District.
        </p>
        <p>
          Founded in 2023, we provide scholarships for students in grades 3–12
          and grants that help music, art, and drama teachers create meaningful
          classroom and performance experiences. Everything we do is made
          possible by parents, community members, and student representatives
          who believe the arts are essential.
        </p>
      </section>

      <AboutImpactStats />
      <p className="impact-stats__cta">
        <Link href="/our-impact" className="text-link">
          See our impact →
        </Link>
      </p>

      <section className="content-card">
        <h2>Our Mission</h2>
        <p>
          CMAC supports students and teachers throughout the Comsewogue School
          District by providing opportunities that make the arts more accessible,
          more inclusive, and more inspiring.
        </p>
        <ul className="mission-list">
          <li>Providing scholarships so students can pursue music and arts opportunities</li>
          <li>Offering partial or full financial support for summer and academic-year music and arts programs</li>
          <li>Funding classroom projects and district-wide initiatives led by music and arts teachers</li>
          <li>Creating community outreach and leadership opportunities for student representatives and Tri-M / Arts Honor Society members</li>
          <li>Building greater awareness and appreciation of music and arts programs in our community</li>
        </ul>
        <p className="mission-note">
          With board approval and available funds, CMAC may also extend support
          to surrounding areas in Suffolk County.
        </p>
      </section>

      <section className="content-card">
        <h2 className="center-heading board-title-line">Leadership & Student Representatives</h2>
        <h3 className="section-label board-section-label board-section-label--officers">Officers</h3>

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
              <span className="board-card__vacant-icon">VP</span>
            </div>
            <p className="board-card__name">Vice President</p>
            <p className="board-card__title board-card__title--open">Open role</p>
            <p className="board-card__note">We are currently seeking a dedicated volunteer to help lead CMAC.</p>
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

        <h3 className="section-label board-section-label board-section-label--students" style={{ marginTop: "2.25rem" }}>
          Student Representatives
        </h3>
        <div className="board-grid board-grid--students board-grid--students-centered">
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
          <div className="board-card board-card--student board-card--vacant">
            <div className="board-card__photo board-card__photo--vacant" aria-hidden="true">
              <span className="board-card__vacant-icon">SR</span>
            </div>
            <p className="board-card__name">Student Representative</p>
            <p className="board-card__title board-card__title--open">Open role</p>
            <p className="board-card__note">We are actively seeking student leaders who want to help shape the future of CMAC.</p>
          </div>
        </div>

        <p className="board-callout">
          We are actively looking for new adult volunteers and student
          representatives to help lead CMAC into the future. If you are
          interested in serving, please reach out or join through our
          <Link href="/get-involved">Get Involved</Link> page.
        </p>
      </section>

      <section className="content-card about-join">
        <h2>Join Us</h2>
        <p>
          CMAC exists because parents and community members decided the arts
          matter. We invite you to become a member, volunteer, or student
          representative so these opportunities continue for the next generation
          of Comsewogue artists.
        </p>
        <p className="subpage-link">
          <a
            className="apply-btn"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
            target="_blank"
            rel="noreferrer"
          >
            Join CMAC
          </a>
        </p>
      </section>
    </main>
  );
}
