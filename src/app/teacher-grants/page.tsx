import type { Metadata } from "next";
import { ContactPopupLink } from "@/components/ContactPopupLink";
import { TeacherGrantImpactBar } from "@/components/LiveStats";
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
        <h1>Funding Innovative Classroom Arts Projects</h1>
      </section>

      <TeacherGrantImpactBar />

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
          <h2>CMAC Teacher Grants</h2>
          <table className="scholarship-table">
            <tbody>
              <tr>
                <th scope="row">Overview</th>
                <td>
                  CMAC Teacher Grants support music and art teachers in the
                  Comsewogue School District by funding projects that enhance
                  student learning, creativity, and arts participation.
                </td>
              </tr>
              <tr>
                <th scope="row">Application Deadline</th>
                <td>{`June 30, ${endYear}`}</td>
              </tr>
              <tr>
                <th scope="row">Award</th>
                <td>Selected teacher(s) may receive a CMAC grant up to $1,000.</td>
              </tr>
              <tr>
                <th scope="row">Eligibility</th>
                <td>
                  Must be a full-time music or art teacher in the Comsewogue
                  School District. Must continue in this position during the
                  {schoolYearLabel} school year.
                </td>
              </tr>
              <tr>
                <th scope="row">Purpose of the Grant</th>
                <td>
                  Funds may be used for guest artists, workshops, career
                  development, equipment purchases, or other creative ideas that
                  support student learning in the arts.
                </td>
              </tr>
              <tr>
                <th scope="row">Requirements</th>
                <td>
                  Proposed projects must demonstrate clear benefit to student
                  learning and arts participation.
                </td>
              </tr>
              <tr>
                <th scope="row">Notification</th>
                <td>Selected teachers will be contacted directly by CMAC.</td>
              </tr>
              <tr>
                <th scope="row">Questions</th>
                <td>
                  <ContactPopupLink className="text-link">
                    CONTACT CMAC
                  </ContactPopupLink>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="center-link">
            <a
              href="https://docs.google.com/document/d/1NEmmvCaJiTQ7hQDIYkMWc2D85RBUprq-Iq7pR4WUqkM/edit?tab=t.0"
              className="apply-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for Teacher Grant
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
