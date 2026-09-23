import type { Metadata } from "next";
import Link from "next/link";
import { ScholarshipApplicationButton } from "@/components/ScholarshipApplicationButton";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Scholarship & Grant Feedback",
  description:
    "Share how CMAC has made a difference in your life and help inspire more support for students and educators.",
  openGraph: {
    title: "Scholarship & Grant Feedback | Comsewogue Music & Arts Corp.",
    description:
      "Tell your CMAC story and show how scholarships, grants, and community support make an impact.",
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
          Every student, family, teacher, and supporter has a story that can help others
          see the difference the arts can make. Share how CMAC scholarships, grants, or
          community support has encouraged you, helped you grow, or opened a new
          opportunity.
        </p>
      </section>

      <section className="content-card">
        <h2>How has CMAC made a difference?</h2>
        <p>
          Tell us what CMAC support made possible for you or someone you know. Your story
          may be featured on our future Impact page to celebrate the people behind CMAC
          and inspire others to support music and arts education.
        </p>

        <div className="scholarship-actions" style={{ marginTop: "1.5rem" }}>
          <ScholarshipApplicationButton href={feedbackUrl} label="Tell Your Story" />
          <Link href="/scholarships" className="text-link">
            Back to Scholarships
          </Link>
        </div>
      </section>
    </main>
  );
}
