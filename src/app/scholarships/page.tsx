import type { Metadata } from "next";
import { STATS } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Scholarships",
  description:
    "CMAC offers scholarships to Comsewogue students in grades 12 pursuing music, visual arts, and creative fields. Learn about eligibility and how to apply.",
  openGraph: {
    title: "Scholarships | Comsewogue Music & Arts Corp.",
    description:
      "CMAC awards scholarships to support Comsewogue students pursuing music, visual arts, and creative careers. See eligibility requirements and application details.",
    url: "https://www.comsewoguemusicandarts.org/scholarships",
  },
};

export default function ScholarshipsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Scholarships</p>
        <h1>Scholarships</h1>
        <p>
          CMAC awards scholarships and grants to support student growth in
          music, visual arts, business, and related creative fields.
        </p>
      </section>

      <section className="scholarship-impact-bar" aria-label="Scholarship impact">
        <div className="scholarship-impact-bar__stat">
          <span className="scholarship-impact-bar__value">{STATS.scholarshipsGranted}</span>
          <span className="scholarship-impact-bar__label">Scholarships Granted</span>
        </div>
        <div className="scholarship-impact-bar__divider" aria-hidden="true" />
        <div className="scholarship-impact-bar__stat">
          <span className="scholarship-impact-bar__value">{STATS.totalAwarded}</span>
          <span className="scholarship-impact-bar__label">Total Awarded</span>
        </div>
      </section>

      <section className="content-card scholarship-block">
        <h2>Senior Scholarships (Grade 12)</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Application Deadline</th>
              <td>Saturday, May 1, 2027</td>
            </tr>
            <tr>
              <th scope="row">Award</th>
              <td>Selected student(s) will receive a $500 senior scholarship.</td>
            </tr>
            <tr>
              <th scope="row">Fund Release Requirement</th>
              <td>
                CMAC scholarship winner(s) will be required to submit an
                acceptance letter from the college or university of their
                choice. The funds will not be released without an acceptance
                letter.
              </td>
            </tr>
          </tbody>
        </table>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Eligibility</th>
              <td>
                <ol className="table-list">
                  <li>
                    Must be a senior or junior graduating in June 2027 from
                    Comsewogue High School.
                  </li>
                  <li>
                    Must be in good standing and free of any school suspension.
                  </li>
                  <li>
                    Must have applied to colleges majoring in one of the
                    following fields:
                    <ul className="table-sublist">
                      <li>
                        MUSIC-related fields (performance, pedagogy, history,
                        theory, composition, education, therapy, business,
                        technology, theater, etc.)
                      </li>
                      <li>
                        ART-related fields (visual arts, history, education,
                        digital arts, fashion, film, etc.)
                      </li>
                      <li>
                        Business and Engineering-related fields (Marketing,
                        Architecture)
                      </li>
                    </ul>
                  </li>
                </ol>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="center-link">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScLSr4Da2R51xg59lu_j57lMg5Xd8On3rHcEowwMgNAB9V1ng/viewform"
            className="apply-btn"
          >
            Apply for Senior Scholarship
          </a>
        </p>
      </section>

      <section className="content-card scholarship-block">
        <h2>Scholarships Granted by Year</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">2025 Total Scholarships Awarded</th>
              <td>X</td>
            </tr>
            <tr>
              <th scope="row">2025 Senior Scholarships Awarded</th>
              <td>X</td>
            </tr>
            <tr>
              <th scope="row">2025 Total Scholarship Amount Awarded</th>
              <td>$X</td>
            </tr>
            <tr>
              <th scope="row">2024 Total Scholarships Awarded</th>
              <td>X</td>
            </tr>
            <tr>
              <th scope="row">2024 Senior Scholarships Awarded</th>
              <td>X</td>
            </tr>
            <tr>
              <th scope="row">2024 Total Scholarship Amount Awarded</th>
              <td>$X</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="content-card scholarship-block">
        <h2>Summer Music & Arts Study Scholarships (Grades 3–11)</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Application Deadline</th>
              <td>Saturday, May 1, 2027</td>
            </tr>
            <tr>
              <th scope="row">Award</th>
              <td>Selected student(s) receive a $100 scholarship.</td>
            </tr>
            <tr>
              <th scope="row">Schools Covered</th>
              <td>
                Boyle Road Elementary, Terryville Road Elementary, John F.
                Kennedy Middle School, and Comsewogue High School.
              </td>
            </tr>
          </tbody>
        </table>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Eligibility</th>
              <td>
                <ol className="table-list">
                  <li>
                    Must be in grades 3–11 at Boyle Road Elementary, Terryville
                    Road Elementary, John F. Kennedy Middle School, or
                    Comsewogue High School for the 2026–2027 school year.
                  </li>
                  <li>
                    Must be in good standing and free of any school suspension.
                  </li>
                  <li>
                    Should be pursuing one of the following areas:
                    <ul className="table-sublist">
                      <li>
                        MUSIC-related fields (performance, pedagogy, history,
                        theory, composition, education, therapy, business,
                        technology, theater, etc.)
                      </li>
                      <li>
                        ART-related fields (visual arts, history, education,
                        digital arts, fashion, film, etc.)
                      </li>
                      <li>
                        Business and Engineering-related fields (Marketing,
                        Architecture)
                      </li>
                    </ul>
                  </li>
                </ol>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="center-link">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScir77ruuBlPuoi-X3sfDQvLOyjKDciKPPWahdHYigpSOvm_Q/viewform"
            className="apply-btn"
          >
            Apply for Summer Study Scholarship
          </a>
        </p>
        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/scholarshipsANDGRANTS/">
            View previous Scholarships page
          </a>
        </p>
      </section>
    </main>
  );
}
