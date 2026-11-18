import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SupporterTicker } from "@/components/SupporterTicker";

export const metadata: Metadata = {
  title: "Supporters",
  description:
    "Thank you to the CMAC community supporters who make our mission possible. Interested in joining the support circle? Learn about partnership opportunities.",
  openGraph: {
    title: "Supporters | Comsewogue Music & Arts Corp.",
    description:
      "CMAC thanks its community supporters for making student scholarships and arts programs possible. Learn how your business can get involved.",
    url: "https://www.comsewoguemusicandarts.org/sponsors",
  },
};

const sponsorshipLevels = [
  {
    title: "Community Supporter",
    detail: "$100 donation or class passes, gift cards, or other items for an art-themed or music-themed basket.",
    benefits: [
      "Supports student scholarships and teacher grants",
      "Ideal for family or business contributions",
      "Recognition as a CMAC community supporter",
    ],
  },
  {
    title: "Premier Community Supporter",
    detail: "$200 donation to help underwrite student arts opportunities and community programming.",
    benefits: [
      "Higher visibility on CMAC recognition materials",
      "Featured support for community arts initiatives",
      "Priority recognition for business sponsors",
    ],
  },
];

const communityDonors = [
  "Class Pass Donors",
  "Gift Card Contributors",
  "Merchandise Supporters",
  "Raffle Basket Donors",
  "Neighborhood Arts Boosters",
  "Friends of CMAC",
];

const studentSupporters = [
  "Freshman Student",
  "Sophomore Student",
  "Junior Student",
  "Senior Student",
  "CMAC Student Representative",
  "Arts Honor Society Member",
  "Tri-M Honor Society Member",
];

const individualFamilySupporters = [
  "FAMILY SUPPORTER",
  "INDIVIDUAL SUPPORTER",
  "D. Andersen",
  "The Kosak Family",
  "The Perrone Family",
  "The Dvorsky Family",
  "The Provenzale Family",
  "Anonymous",
];

export default function SponsorsPage() {
  return (
    <main className="subpage sponsors-page">
      <section className="subpage-hero">
        <p className="subpage-kicker">Who supports CMAC?</p>
        <p className="subpage-hero__statement">
          Families, businesses, and community partners who believe every young artist deserves the chance to thrive.
        </p>
      </section>

      <section className="content-card">
        <h2>Sponsorship Opportunities</h2>
        <p className="muted-copy">
          We are currently welcoming businesses, families, and community partners
          who want to help fund student opportunities and strengthen arts education
          in our schools.
        </p>

        <div className="membership-grid membership-grid--compact">
          {sponsorshipLevels.map((level) => (
            <article key={level.title} className="membership-tier">
              <h3>{level.title}</h3>
              <p>{level.detail}</p>
              <ul>
                {level.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card community-support-card">
        <h2>Community Supporters</h2>
        <p className="muted-copy community-support-copy">
          We appreciate the businesses and community members who contribute time,
          materials, class passes, gift cards, merchandise, and raffle items to
          help CMAC thrive. Your support creates more opportunities for students
          across the district.
        </p>
        <div className="family-supporter-ticker community-supporter-ticker" aria-label="Community supporter thank-you list">
          <div className="family-supporter-ticker__track">
            {[...communityDonors, ...communityDonors].map((donor, index) => (
              <span key={`${donor}-${index}`} className="family-supporter-ticker__item">
                {donor}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="content-card community-support-card">
        <h2>Student Supporters</h2>
        <p className="muted-copy community-support-copy">
          Thank you to the students whose support helps keep music and arts
          opportunities growing in our schools.
        </p>
        <SupporterTicker supporters={studentSupporters} label="Student Supporters list" />
      </section>

      <section className="content-card community-support-card">
        <h2>Individual &amp; Family Supporters</h2>
        <p className="muted-copy community-support-copy">
          We are grateful to the individuals and families whose generous support
          helps make scholarships and arts-learning opportunities possible.
        </p>
        <SupporterTicker
          supporters={individualFamilySupporters}
          label="Individual/Family Supporters list"
        />
      </section>

      <section className="content-card community-support-card">
        <h2>Become a Partner</h2>
        <p className="muted-copy community-support-copy">
          Your support helps fund scholarships for students in grades 3–12 and
          grants for teachers who are creating meaningful arts experiences in the
          classroom.
        </p>
        <p className="muted-copy community-support-copy">
          Partnership levels can include recognition on our website, event visibility,
          social media highlights, and in-kind or sponsor-based support tailored to
          your business or family goals.
        </p>
        <div className="scholarship-actions">
          <Link href="/get-involved" className="apply-btn">
            Explore Partnership
          </Link>
          <Link href="/contact" className="text-link">
            Contact CMAC
          </Link>
        </div>
      </section>
      <aside className="premier-sponsor-sidebar" aria-labelledby="premier-sidebar-title">
        <h2 id="premier-sidebar-title">Premier Community Sponsors</h2>
        <div className="premier-sponsor-sidebar__logos">
          {[1, 2].map((logo) => (
            <Link
              key={logo}
              href="/sponsors/thank-you"
              className="premier-sponsor-sidebar__logo"
            >
              <Image
                src="/cmac/friends-of-cmac.svg"
                alt="Friends of CMAC - view our sponsor thank-you page"
                width={320}
                height={320}
              />
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
