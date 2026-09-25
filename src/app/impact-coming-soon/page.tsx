import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon",
  description:
    "CMAC impact stories and results will be shared here soon.",
};

const previewAreas = [
  {
    label: "Scholarships",
    text: "Student support that keeps creativity accessible and affordable.",
  },
  {
    label: "Teacher Grants",
    text: "Classroom investments that deepen arts learning and student growth.",
  },
  {
    label: "Community Support",
    text: "The people and families helping CMAC make opportunity possible.",
  },
];

export default function ImpactComingSoonPage() {
  return (
    <main className="subpage impact-coming-soon-page">
      <section className="subpage-hero">
        <p className="subpage-kicker">Coming Soon - How does CMAC make a difference?</p>
        <p className="subpage-hero__statement">
          Hear it through the voices of students and teachers —stories that show the real impact of supporting the arts.
        </p>
      </section>

      <section className="content-card impact-coming-soon-card">
        <p className="muted-copy">
          Impact updates are in progress. When this page is published, it will highlight
          scholarships, teacher support, and the community moments that make the arts
          more accessible for students.
        </p>

        <div className="impact-coming-soon-grid">
          {previewAreas.map((item) => (
            <article key={item.label} className="impact-coming-soon-tile">
              <span className="impact-coming-soon-tile__label">{item.label}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="scholarship-actions impact-coming-soon-actions">
          <Link href="/get-involved" className="apply-btn">
            Get Involved
          </Link>
          <Link href="/" className="text-link">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
