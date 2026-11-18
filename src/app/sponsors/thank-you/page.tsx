import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You, Sponsors",
  description:
    "Thank you to the premier community sponsors supporting Comsewogue students and arts education.",
};

export default function SponsorThankYouPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Friends of CMAC</p>
        <h1>THANK YOU FOR SPONSORING COMSEWOGUE MUSIC AND ART CORP</h1>
        <p>
          Your generosity helps students create, perform, and thrive through
          scholarships, teacher grants, and music and arts opportunities.
        </p>
      </section>
      <section className="content-card">
        <h2>Your support makes a difference</h2>
        <p>
          We are grateful to our Premier Community Sponsors for helping keep
          music and arts education strong in the Comsewogue community.
        </p>
        <Link href="/sponsors" className="text-link">
          Back to Supporters
        </Link>
      </section>
    </main>
  );
}
