import type { Metadata } from "next";
import Link from "next/link";
import { HomeImpactStats } from "@/components/LiveStats";

const premierSponsors = [
  {
    name: "ONE RIVER",
    logo: "/cmac/one-river-logo-orange.png",
    website: "https://portjefferson.oneriverschool.com/",
  },
  {
    name: "School of Rock Port Jefferson",
    logo: "/cmac/school-of-rock-port-jefferson-logo.png",
    website: "https://www.schoolofrock.com/locations/portjefferson",
  },
  {
    name: "Bellwether",
    logo: "/cmac/bellwether-band-logo.png",
    website: "https://bellwether.band/",
  },
  { name: "CMAC COMMUNITY" },
  { name: "LONG ISLAND ARTS" },
  { name: "MUSIC MAKERS" },
  { name: "LOCAL VOICES" },
  { name: "YOUTH ARTS" },
];

export const metadata: Metadata = {
  title: "Home",
  description:
    "CMAC is a 501(c) non-profit celebrating and funding arts education in the Comsewogue School District. Scholarships, teacher grants, concerts, and more.",
  openGraph: {
    title: "Comsewogue Music & Arts Corp.",
    description:
      "CMAC celebrates and funds arts education in the Comsewogue School District — scholarships, teacher grants, concerts, and community events.",
    url: "https://www.comsewoguemusicandarts.org",
  },
};

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
          <p>Est. 2023</p>
          <span />
          <p>Suffolk Non-Profit</p>
        </div>

        <article className="hero-card">
          <header className="hero-card__header">
            <p>
              <span />
              Now Playing
            </p>
            <time>2026 — 27</time>
          </header>

          <div
            className="hero-card__visual"
            aria-hidden="true"
            title="Music sheet artwork"
          />
          <div className="hero-card__content">
            <h1>We help young artists find confidence, purpose, and voice.</h1>
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

      <section className="premier-sponsors" aria-label="Premier sponsors">
        <div className="premier-sponsors__header">
          <p className="premier-sponsors__kicker">Premier Sponsors</p>
        </div>
        <div className="premier-sponsors__marquee" aria-label="Premier sponsor marquee">
          <div className="premier-sponsors__track">
            {[...premierSponsors, ...premierSponsors].map((sponsor, index) => {
              const content = sponsor.logo ? (
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
              ) : (
                <span>{sponsor.name}</span>
              );

              if (!sponsor.website) {
                return (
                  <div key={`${sponsor.name}-${index}`} className="premier-sponsor">
                    {content}
                  </div>
                );
              }

              return (
                <a
                  key={`${sponsor.name}-${index}`}
                  className="premier-sponsor"
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name}`}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <HomeImpactStats />

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
