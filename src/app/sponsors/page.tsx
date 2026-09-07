import type { Metadata } from "next";
import Link from "next/link";

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

const sponsors = [
  {
    name: "ONE RIVER - Port Jefferson",
    website: "https://portjefferson.oneriverschool.com/",
    logo: "/cmac/one-river-logo-orange.png",
  },
  {
    name: "School of Rock Port Jefferson",
    website: "https://www.schoolofrock.com/locations/portjefferson",
    logo: "/cmac/school-of-rock-port-jefferson-logo.png",
  },
  {
    name: "Theatre Three",
    website: "https://theatrethree.com/",
    logo: "/cmac/theatre-three-logo.png",
  },
  {
    name: "Bellwether",
    website: "https://bellwether.band/",
    logo: "/cmac/bellwether-band-logo.png",
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

const familySupporters = [
  "The Andersen Family",
  "The Kosak Family",
  "The Perrone Family",
  "The Dvorsky Family",
  "The Jaklitsch Family",
  "The Provenzale Family",
  "C. Andersen",
  "M. Smith",
  "L. Jones",
];

export default function SponsorsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>Thank You to Our Community Supporters</h1>
        <p>
          We are grateful to every individual, family, and business that invests
          in Comsewogue students and helps keep music, drama, and visual arts
          strong in our district.
        </p>
      </section>

      <section className="content-card">
        <div className="supporter-heading-row">
          <span className="supporter-badge" aria-label="Premier supporter badge">
            PREM
          </span>
          <h2>Premier Community Sponsors</h2>
        </div>
        <p className="muted-copy">
          Thank you to our Premier Community Sponsors for their generous support
          of student scholarships and teacher grants.
        </p>
        <div className="sponsor-grid sponsor-grid--featured">
          {sponsors.map((sponsor) => (
            <article key={sponsor.name} className="sponsor-tile">
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-link"
              >
                <div className="sponsor-logo-placeholder sponsor-logo-placeholder--image">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="sponsor-logo-image"
                  />
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card community-support-card">
        <h2>Community Supporters</h2>
        <p className="muted-copy community-support-copy">
          We also thank the local businesses and organizations that contribute
          class passes, gift cards, merchandise, and other items for our raffle
          baskets and fundraising efforts. Your support helps keep CMAC
          accessible and thriving.
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
        <h2>Individual &amp; Family Supporters</h2>
        <p className="muted-copy community-support-copy">
          We are deeply grateful to the individuals and families whose continued
          support makes student scholarships possible.
        </p>
        <div className="family-supporter-ticker" aria-label="Individual and family supporters list">
          <div className="family-supporter-ticker__track">
            {[...familySupporters, ...familySupporters].map((name, index) => (
              <span key={`${name}-${index}`} className="family-supporter-ticker__item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="content-card community-support-card">
        <h2>Become a Supporter</h2>
        <p className="muted-copy community-support-copy">
          Your support directly funds scholarships for students in grades 3–12
          and grants for music and art teachers.
        </p>
        <p className="muted-copy community-support-copy">
          <strong>Community Supporter</strong> — $100/year
          <br />
          <strong>Premier Community Supporter</strong> — $150+/year
        </p>
        <p className="muted-copy community-support-copy">
          Benefits can include recognition on this page, logo placement at
          events, and social media highlights.
        </p>
        <div className="scholarship-actions">
          <Link href="/get-involved" className="apply-btn">
            Join as a Supporter
          </Link>
          <Link href="/contact" className="text-link">
            Contact CMAC
          </Link>
        </div>
      </section>
    </main>
  );
}
