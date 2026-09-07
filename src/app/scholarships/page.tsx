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
        <p>
          CMAC scholarships help Comsewogue students continue growing in music,
          visual arts, and related creative fields. We offer two programs: one
          for graduating seniors and one for students in grades 3–11 who want to
          keep studying over the summer.
        </p>
      </section>

      <ScholarshipImpactBar />

      <section className="content-card scholarship-block">
        <div className="scholarship-header">
          <p className="scholarship-kicker">CMAC Senior Scholarship</p>
          <h2>CMAC Senior Scholarships (Grade 12)</h2>
        </div>

        <div className="scholarship-metadata">
          <article className="scholarship-meta">
            <span>Overview</span>
            <p>
              The CMAC Senior Scholarship supports graduating Comsewogue High
              School students who plan to continue their studies in music, art,
              or a related creative field in college.
            </p>
          </article>
          <article className="scholarship-meta">
            <span>Award</span>
            <p>$500</p>
          </article>
          <article className="scholarship-meta">
            <span>Application Deadline</span>
            <p>{`April 30, ${endYear}`}</p>
          </article>
        </div>

        <div className="scholarship-details">
          <h3>Eligibility</h3>
          <ul>
            <li>Graduating senior from Comsewogue High School</li>
            <li>In good standing</li>
            <li>
              Planning to pursue a music-related field, art-related field, or a
              business or engineering field connected to the arts
            </li>
          </ul>
        </div>

        <div className="scholarship-details">
          <h3>Requirements</h3>
          <p>
            Scholarship recipients must submit an official college acceptance
            letter before funds are released.
          </p>
        </div>

        <div className="scholarship-actions">
          <ScholarshipApplicationButton
            href="https://docs.google.com/forms/d/e/1FAIpQLScLSr4Da2R51xg59lu_j57lMg5Xd8On3rHcEowwMgNAB9V1ng/viewform"
            label="Apply for Senior Scholarship"
          />
          <ContactPopupLink className="text-link">CONTACT CMAC</ContactPopupLink>
        </div>
      </section>

      <section className="content-card scholarship-block">
        <div className="scholarship-header">
          <p className="scholarship-kicker">Summer Study Scholarship</p>
          <h2>CMAC Summer Music & Arts Study Scholarships (Grades 3–11)</h2>
        </div>

        <div className="scholarship-metadata">
          <article className="scholarship-meta">
            <span>Overview</span>
            <p>
              These scholarships help students continue their music or art study
              over the summer by offsetting the cost of programs, lessons,
              camps, or workshops.
            </p>
          </article>
          <article className="scholarship-meta">
            <span>Award</span>
            <p>$100</p>
          </article>
          <article className="scholarship-meta">
            <span>Application Deadline</span>
            <p>{`April 1, ${endYear}`}</p>
          </article>
        </div>

        <div className="scholarship-details">
          <h3>Eligibility</h3>
          <ul>
            <li>Student in grades 3–11 during the {schoolYearLabel} school year</li>
            <li>Attends a school in the Comsewogue School District</li>
            <li>In good standing</li>
          </ul>
        </div>

        <div className="scholarship-details">
          <h3>Selection</h3>
          <p>
            Up to five students may be selected from each school building:
            Boyle Road Elementary, Terryville Road Elementary, John F. Kennedy
            Middle School, and Comsewogue High School.
          </p>
        </div>

        <div className="scholarship-details">
          <h3>Requirements</h3>
          <p>
            Applications must be completed by the student. Adults may assist only
            with technology. Students should be pursuing music, visual arts, or a
            related creative field.
          </p>
        </div>

        <div className="scholarship-actions">
          <ScholarshipApplicationButton
            href="https://docs.google.com/forms/d/e/1FAIpQLScir77ruuBlPuoi-X3sfDQvLOyjKDciKPPWahdHYigpSOvm_Q/viewform"
            label="Apply for Summer Study Scholarship"
          />
          <ContactPopupLink className="text-link">CONTACT CMAC</ContactPopupLink>
        </div>
      </section>

      <section className="content-card scholarship-contact">
        <h2>Questions?</h2>
        <p>We’re happy to help. Contact CMAC and we’ll answer your questions.</p>
      </section>
    </main>
  );
}
