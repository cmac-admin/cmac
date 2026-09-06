import type { Metadata } from "next";
import { ContactPopupLink } from "@/components/ContactPopupLink";
import { ScholarshipImpactBar } from "@/components/LiveStats";
import { ScholarshipApplicationButton } from "@/components/ScholarshipApplicationButton";
import { getSchoolYearInfo } from "@/lib/school-year";

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
  const { label: schoolYearLabel, endYear } = getSchoolYearInfo();

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>Scholarships</h1>
      </section>

      <ScholarshipImpactBar />

      <section className="content-card scholarship-block">
        <h2>CMAC Senior Scholarships (Grade 12)</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Overview</th>
              <td>
                The CMAC Senior Scholarship supports graduating Comsewogue High
                School students pursuing college studies in music, art, or
                related creative fields.
              </td>
            </tr>
            <tr>
              <th scope="row">Application Deadline</th>
              <td>{`April 30, ${endYear}`}</td>
            </tr>
            <tr>
              <th scope="row">Award</th>
              <td>Selected student(s) will receive a $500 CMAC Senior Scholarship.</td>
            </tr>
            <tr>
              <th scope="row">Eligibility</th>
              <td>
                <ol className="table-list">
                  <li>
                    Must be a senior or junior graduating in June {endYear} from
                    Comsewogue High School.
                  </li>
                  <li>Must be in good standing with no school suspensions.</li>
                  <li>
                    Must be applying to colleges majoring in one of the following
                    fields:
                    <ul className="table-sublist">
                      <li>Music-related fields</li>
                      <li>Art-related fields</li>
                      <li>Business/Engineering fields related to the arts (Marketing, Architecture)</li>
                    </ul>
                  </li>
                </ol>
              </td>
            </tr>
            <tr>
              <th scope="row">Requirements</th>
              <td>
                Scholarship winners must submit an official college acceptance
                letter. Funds will not be released until the acceptance letter is
                received.
              </td>
            </tr>
            <tr>
              <th scope="row">Notification</th>
              <td>Selected students will be notified directly by CMAC.</td>
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
          <ScholarshipApplicationButton
            href="https://docs.google.com/forms/d/e/1FAIpQLScLSr4Da2R51xg59lu_j57lMg5Xd8On3rHcEowwMgNAB9V1ng/viewform"
            label="Apply for Senior Scholarship"
          />
        </p>
      </section>

      <section className="content-card scholarship-block">
        <h2>CMAC Summer Music & Arts Study Scholarships (Grades 3–11)</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Overview</th>
              <td>
                This scholarship supports students who wish to continue studying
                music or art over the summer. Funds help offset the cost of
                summer programs, lessons, camps, or workshops.
              </td>
            </tr>
            <tr>
              <th scope="row">Application Deadline</th>
              <td>{`April 1, ${endYear}`}</td>
            </tr>
            <tr>
              <th scope="row">Award</th>
              <td>Selected student(s) will receive a $100 Summer Study Scholarship.</td>
            </tr>
            <tr>
              <th scope="row">Up to 5 students per school building may be awarded.</th>
              <td>Schools Covered: Boyle Road Elementary, Terryville Road Elementary, John F. Kennedy Middle School, and Comsewogue High School.</td>
            </tr>
            <tr>
              <th scope="row">Eligibility</th>
              <td>
                <ol className="table-list">
                  <li>
                    Must be a student in grades 3–11 during the {schoolYearLabel} school
                    year.
                  </li>
                  <li>Must attend a school in the Comsewogue School District.</li>
                  <li>Must be in good standing with no school suspensions.</li>
                </ol>
              </td>
            </tr>
            <tr>
              <th scope="row">Requirements</th>
              <td>
                Applications must be completed by students, not parents/guardians.
                (Adults may assist only with technology issues.) Students should be
                pursuing one of the following areas: Music-related fields;
                Art-related fields; Business/Engineering fields related to the arts.
              </td>
            </tr>
            <tr>
              <th scope="row">Notification</th>
              <td>Winners will be contacted in June.</td>
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
          <ScholarshipApplicationButton
            href="https://docs.google.com/forms/d/e/1FAIpQLScir77ruuBlPuoi-X3sfDQvLOyjKDciKPPWahdHYigpSOvm_Q/viewform"
            label="Apply for Summer Study Scholarship"
          />
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
