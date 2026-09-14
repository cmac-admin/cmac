import type { Metadata } from "next";
import Link from "next/link";
import { ScholarshipApplicationButton } from "@/components/ScholarshipApplicationButton";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Scholarship & Grant Feedback",
  description:
    "Share feedback about CMAC scholarship or grant programs and help us improve support for students and educators.",
  openGraph: {
    title: "Scholarship & Grant Feedback | Comsewogue Music & Arts Corp.",
    description:
      "Tell CMAC how we can improve the scholarship and grant experience for students and teachers.",
    url: "https://www.comsewoguemusicandarts.org/scholarships/feedback",
  },
};

export default async function ScholarshipFeedbackPage() {
  const feedbackUrl = await resolveFormLink("scholarship-grant-feedback", DEFAULT_FORM_LINKS);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Scholarships & Grants</p>
        <h1>Scholarship & Grant Feedback</h1>
        <p>
          CMAC is committed to creating a strong, supportive experience for students,
          families, and educators. We welcome your feedback on our scholarship and grant
          programs so we can continue improving access and communication.
        </p>
      </section>

      <section className="content-card">
        <h2>We value your feedback</h2>
        <p>
          Please take a few minutes to share your experience with our scholarship or grant
          process. Your responses help us strengthen the program, improve clarity, and
          better serve the Comsewogue community.
        </p>

        <div className="scholarship-actions" style={{ marginTop: "1.5rem" }}>
          <ScholarshipApplicationButton href={feedbackUrl} label="Share Feedback" />
          <Link href="/scholarships" className="text-link">
            Back to Scholarships
          </Link>
        </div>
      </section>
    </main>
  );
}
