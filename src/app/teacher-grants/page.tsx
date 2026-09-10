import type { Metadata } from "next";
import { ContactPopupLink } from "@/components/ContactPopupLink";
import { getSchoolYearInfo } from "@/lib/school-year";

export const metadata: Metadata = {
  title: "Teacher Grants",
  description:
    "CMAC teacher grants fund innovative arts classroom projects in the Comsewogue School District. Apply by June 30, 2027.",
  openGraph: {
    title: "Teacher Grants | Comsewogue Music & Arts Corp.",
    description:
      "CMAC provides grants to Comsewogue music and arts teachers to fund high-impact classroom projects. Apply by June 30, 2027.",
    url: "https://www.comsewoguemusicandarts.org/teacher-grants",
  },
};

export default function TeacherGrantsPage() {
  const { label: schoolYearLabel, endYear } = getSchoolYearInfo();
  const grantWinners = [
    { year: "2026", description: "To be announced." },
    {
      year: "2025",
      description: "Ms. Daly-Greco, Art Teacher at JFK Middle School & Clinton Avenue.",
    },
  ];

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>CMAC Teacher Grants</h1>
        <p>
          CMAC Teacher Grants help music and art teachers in the Comsewogue
          School District bring creative ideas to life in the classroom. These
          grants support projects that increase student learning, participation,
          and excitement in the arts.
        </p>
      </section>

      <div className="teacher-grants-layout">
        <aside className="grant-winner-ticker" aria-label="Previous grant winners">
          <div className="grant-winner-ticker__header">Previous Grant Winners</div>
          <div className="grant-winner-ticker__viewport">
            <div className="grant-winner-ticker__track">
              {[...grantWinners, ...grantWinners].map((winner, index) => (
                <div key={`${winner.year}-${index}`} className="grant-winner-ticker__item">
                  <span className="grant-winner-ticker__year">{winner.year}</span>
                  <p>{winner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="content-card scholarship-block teacher-grants-details">
          <div className="scholarship-header">
            <p className="scholarship-kicker">Teacher Grant Overview</p>
            <h2>Support for Creative Classroom Ideas</h2>
          </div>

          <div className="scholarship-metadata">
            <article className="scholarship-meta">
              <span>Overview</span>
              <p>
                We support full-time music and art teachers who want to try new
                approaches, bring in guest artists, purchase needed materials,
                or create meaningful experiences for their students.
              </p>
            </article>
            <article className="scholarship-meta">
              <span>Award</span>
              <p>Up to $1,000</p>
            </article>
            <article className="scholarship-meta">
              <span>Application Deadline</span>
              <p>{`June 30, ${endYear}`}</p>
            </article>
          </div>

          <div className="scholarship-details">
            <h3>Eligibility</h3>
            <ul>
              <li>Full-time music or art teacher in the Comsewogue School District</li>
              <li>Continuing in that position during the {schoolYearLabel} school year</li>
            </ul>
          </div>

          <div className="scholarship-details">
            <h3>What the Grant Can Support</h3>
            <p>
              Funds may be used for guest artists, workshops, equipment,
              materials, professional development, or other creative projects
              that clearly benefit student learning and arts participation.
            </p>
          </div>

          <div className="scholarship-details">
            <h3>How to Apply</h3>
            <p>
              Applications are submitted through the CMAC Teacher Grant form.
              Selected teachers will be contacted directly by CMAC.
            </p>
          </div>

          <div className="scholarship-actions">
            <a
              href="https://docs.google.com/document/d/1NEmmvCaJiTQ7hQDIYkMWc2D85RBUprq-Iq7pR4WUqkM/edit?tab=t.0"
              className="apply-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for Teacher Grant
            </a>
            <ContactPopupLink className="text-link">CONTACT CMAC</ContactPopupLink>
          </div>
        </section>
      </div>
    </main>
  );
}
