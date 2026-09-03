import type { Metadata } from "next";

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
    name: "Bellwether",
    website: "https://bellwether.band/",
    logo: "/cmac/bellwether-band-logo.png",
  },
  { name: "Sponsor Logo 2" },
  { name: "Sponsor Logo 3" },
  { name: "Sponsor Logo 4" },
  { name: "Sponsor Logo 5" },
  { name: "Sponsor Logo 6" },
];

const communityDonors = [
  "Class Pass Donors",
  "Gift Card Contributors",
  "Community Family Supporters",
  "Neighborhood Arts Boosters",
  "Student Program Backers",
  "Friends of CMAC",
  "Season Supporters",
  "Music & Arts Helpers",
];

const familySupporters = [
  "THE ANDERSEN FAMILY",
  "THE KOSAK FAMILY",
  "THE PERRONE FAMILY",
  "THE DVORSKY FAMILY",
  "THE JAKLITSCH FAMILY",
  "THE PROVENZALE FAMILY",
  "C. ANDERSEN",
  "M. SMITH",
  "L. JONES",
  "THE ANDERSEN FAMILY",
  "THE KOSAK FAMILY",
  "THE PERRONE FAMILY",
  "THE DVORSKY FAMILY",
  "THE JAKLITSCH FAMILY",
  "THE PROVENZALE FAMILY",
  "C. ANDERSEN",
  "M. SMITH",
  "L. JONES",
];

export default function SponsorsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>Thank You to Our Community Supporters</h1>
      </section>

      <section className="content-card">
        <div className="supporter-heading-row">
          <span className="supporter-badge" aria-label="Premier supporter badge">
            PREM
          </span>
          <h2>OUR PREMIER COMMUNITY SPONSORS</h2>
        </div>
        <p className="muted-copy">
          Thank you for investing in Comsewogue students and strengthening our
          music and arts programs.
        </p>
        <div className="sponsor-grid sponsor-grid--featured">
          {sponsors.map((sponsor) => (
            <article key={sponsor.name} className="sponsor-tile">
              {sponsor.website ? (
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
              ) : (
                <>
                  <div className="sponsor-logo-placeholder">Logo</div>
                  <p>{sponsor.name}</p>
                </>
              )}
            </article>
          ))}
        </div>
        <p className="muted-copy sponsor-supporter-copy">
          We are deeply grateful for every supporter whose generosity helps us
          expand arts access and student opportunity.
        </p>
      </section>

      <section className="content-card community-support-card">
        <h2>COMMUNITY SUPPORTERS</h2>
        <p className="muted-copy community-support-copy">
          We also thank the many local community businesses that contribute class
          passes, gift cards, merchandise and other support that goes to our raffle
          baskets to help keep CMAC accessible and thriving.
        </p>
        <div className="community-donor-list" aria-label="Community donor thank-you list">
          {communityDonors.map((donor) => (
            <span key={donor} className="community-donor-pill">
              {donor}
            </span>
          ))}
        </div>
      </section>

      <section className="content-card community-support-card">
        <h2>INDIVIDUAL/FAMILY SUPPORTERS</h2>
        <p className="muted-copy community-support-copy">
          We are grateful to the individuals and families whose continued support
          makes it possible to offer students the scholarships to help them learn,
          perform and thrive.
        </p>
        <div className="family-supporter-ticker" aria-label="Individual/Family Supporters list">
          <div className="family-supporter-ticker__track">
            {[...familySupporters, ...familySupporters].map((name, index) => (
              <span key={`${name}-${index}`} className="family-supporter-ticker__item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
