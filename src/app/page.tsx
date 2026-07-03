import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero__slideshow" aria-hidden="true">
          <div className="hero__slide hero__slide--one" />
          <div className="hero__slide hero__slide--two" />
          <div className="hero__slide hero__slide--three" />
        </div>

        <div className="hero__meta">
          <p>Est. 2014</p>
          <span />
          <p>Suffolk Non-Profit</p>
        </div>

        <article className="hero-card">
          <header className="hero-card__header">
            <p>
              <span />
              Now Playing
            </p>
            <time>2025 — 26</time>
          </header>

          <div className="hero-card__visual" />
          <div className="hero-card__content">
            <h1>Where young artists find confidence, purpose, and voice.</h1>
            <p>
              Through music, visual arts, scholarships, and family partnership,
              CMAC helps every student shine in and beyond the classroom.
            </p>
            <Link href="/get-involved">Support This Season</Link>
          </div>
        </article>
      </section>

      <section className="announcement-banner">
        <p>
          Membership applications are now open for the 2026–2027 school year.
          Join a community of musicians, educators, and patrons sustaining arts
          education on Long Island.
        </p>
        <Link href="/get-involved" className="announcement-banner__button">
          Join Now
        </Link>
      </section>

      <section className="intro">
        <p>
          We strengthen Comsewogue’s arts ecosystem with year-round programs,
          funding, and community support for students and educators.
        </p>
      </section>

      <section className="grid">
        <article>
          <h2>Get Involved</h2>
          <p>
            Families and neighbors can support students through donations,
            volunteer help, and event participation across the district.
          </p>
        </article>
        <article>
          <h2>Scholarships</h2>
          <p>
            Our scholarships and grants help students access higher education,
            instruments, and resources that keep their momentum growing.
          </p>
        </article>
        <article>
          <h2>Teacher Grants</h2>
          <p>
            CMAC teacher grants help faculty launch high-impact classroom and
            performance projects that enrich student learning.
          </p>
        </article>
      </section>
    </main>
  );
}
