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
        <p className="subpage-kicker">Sponsors</p>
        <h1>Thank You to Our Community Sponsors</h1>
        <p>
          We are deeply grateful for every sponsor whose generosity helps us
          expand arts access and student opportunity.
        </p>
      </section>

      <section className="content-card">
        <h2>Our Sponsor Logos</h2>
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
                  rel="noreferrer"
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
      </section>
    </main>
  );
}
