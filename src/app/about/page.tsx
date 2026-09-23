import type { Metadata } from "next";
import Link from "next/link";
import { AboutImpactStats } from "@/components/LiveStats";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

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

export default async function AboutPage() {
  const joinUrl = await resolveFormLink("membership", DEFAULT_FORM_LINKS);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">What is CMAC?</p>
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
        <Link href="/impact-coming-soon" className="text-link">
          See our impact →
        </Link>
      </p>

      <section className="content-card">
        <h2>Our Mission</h2>
        <p>
          CMAC is committed to ensuring that music, drama, and visual arts
          remain accessible, vibrant, and deeply valued in the Comsewogue School
          District.
        </p>
        <ul className="mission-list">
          <li>
            Providing scholarships and program support so students can pursue
            meaningful music and arts opportunities.
          </li>
          <li>
            Funding classroom and district initiatives that expand creative
            learning and enrich student experience.
          </li>
          <li>
            Supporting summer and academic-year arts programs through financial
            assistance and community resources.
          </li>
          <li>
            Creating leadership and outreach opportunities for student
            representatives and arts organizations such as Tri-M and Arts Honor
            Society.
          </li>
          <li>
            Strengthening community awareness and appreciation for the arts as an
            essential part of student development.
          </li>
        </ul>
        <p className="mission-note">
          With board approval and available funding, CMAC may also extend support
          to surrounding communities in Suffolk County.
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
          <div className="board-card board-card--student board-card--vacant">
            <div className="board-card__photo board-card__photo--vacant" aria-hidden="true">
              <span className="board-card__vacant-icon">SR</span>
            </div>
            <p className="board-card__name">Student Representative</p>
            <p className="board-card__title board-card__title--open">Open role</p>
            <p className="board-card__note">We are actively seeking student leaders who want to help shape the future of CMAC.</p>
          </div>

          <div className="board-card board-card--student board-card--vacant">
            <div className="board-card__photo board-card__photo--vacant" aria-hidden="true">
              <span className="board-card__vacant-icon">SR</span>
            </div>
            <p className="board-card__name">Student Representative</p>
            <p className="board-card__title board-card__title--open">Open role</p>
            <p className="board-card__note">We are actively seeking student leaders who want to help shape the future of CMAC.</p>
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
            href={joinUrl}
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
