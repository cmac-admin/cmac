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
  { name: "Sponsor Logo 2" },
  { name: "Sponsor Logo 3" },
  { name: "Sponsor Logo 4" },
  { name: "Sponsor Logo 5" },
  { name: "Sponsor Logo 6" },
];

export default function SponsorsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>Thank You to Our Community Supporters</h1>
      </section>

      <section className="content-card">
        <h2>OUR PREMIERE COMMUNITY SUPPORTERS</h2>
        <p className="muted-copy">
          Thank you for investing in Comsewogue students and strengthening our
          music and arts programs.
        </p>
        <div className="sponsor-grid">
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
    </main>
  );
}
