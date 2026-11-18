import type { Metadata } from "next";
import Link from "next/link";
import { ScholarshipApplicationButton } from "@/components/ScholarshipApplicationButton";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Scholarship & Grant Feedback",
  description:
    "Share feedback about a CMAC scholarship or grant through the option that matches your experience.",
  openGraph: {
    title: "Scholarship & Grant Feedback | Comsewogue Music & Arts Corp.",
    description: "Share feedback about a CMAC scholarship or grant.",
    url: "https://www.comsewoguemusicandarts.org/scholarships/feedback",
  },
};

export default async function ScholarshipFeedbackPage() {
  const scholarshipFeedbackUrl = await resolveFormLink(
    "scholarship-grant-feedback",
    DEFAULT_FORM_LINKS
  );
  const grantFeedbackUrl = await resolveFormLink(
    "grant-recipient-feedback",
    DEFAULT_FORM_LINKS
  );

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Scholarships & Grants</p>
        <h1>Scholarship & Grant Feedback</h1>
        <p>
          Choose the option that matches the CMAC support you received. Scholarship and
          grant experiences are different, so each has its own feedback path.
        </p>
      </section>

      <section className="content-card" aria-labelledby="scholarship-feedback-title">
        <h2 id="scholarship-feedback-title">Scholarship Feedback</h2>
        <p>
          For students and families who received a CMAC scholarship. Tell us how the
          scholarship supported your studies, lessons, or arts opportunities.
        </p>

        <div className="scholarship-actions" style={{ marginTop: "1.5rem" }}>
          <ScholarshipApplicationButton
            href={scholarshipFeedbackUrl}
            label="Share Scholarship Feedback"
          />
          <Link href="/scholarships" className="text-link">
            View Scholarships
          </Link>
        </div>
      </section>

      <section className="content-card" aria-labelledby="grant-feedback-title">
        <h2 id="grant-feedback-title">Grant Feedback</h2>
        <p>
          For teachers who received a CMAC grant. Use this separate form to share how
          the grant supported your project and students.
        </p>

        <div className="scholarship-actions" style={{ marginTop: "1.5rem" }}>
          <ScholarshipApplicationButton
            href={grantFeedbackUrl}
            label="Share Grant Feedback"
          />
          <Link href="/teacher-grants" className="text-link">
            View Grants
          </Link>
        </div>
      </section>
    </main>
  );
}
