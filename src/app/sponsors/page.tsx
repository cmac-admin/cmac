const sponsorPlaceholders = [
  "Sponsor Logo 1",
  "Sponsor Logo 2",
  "Sponsor Logo 3",
  "Sponsor Logo 4",
  "Sponsor Logo 5",
  "Sponsor Logo 6",
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
          {sponsorPlaceholders.map((name) => (
            <article key={name} className="sponsor-tile">
              <div className="sponsor-logo-placeholder">Logo</div>
              <p>{name}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
