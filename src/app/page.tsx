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
            <div className="hero-card__season-wrap">
              <time>2026 — 27</time>
              <span className="hero-card__season">SEASON</span>
            </div>
          </header>

          <div
            className="hero-card__visual"
            aria-hidden="true"
            title="Music sheet artwork"
          />
          <div className="hero-card__content">
            <h1>Help CMAC turn young talent into lifelong opportunity.</h1>
            <p>
              Through scholarships, teacher grants, and community support, we help
              students keep creating, performing, and believing in what the arts can do.
            </p>
            <div className="hero-card__actions">
              <Link href="/get-involved" className="hero-card__button hero-card__button--primary">
                Join CMAC
              </Link>
              <Link href="/our-impact" className="hero-card__button hero-card__button--secondary">
                See our impact
              </Link>
            </div>
            <p className="hero-card__footnote">Volunteer. Donate. Help students thrive.</p>
          </div>
        </article>
      </section>

      {premierSponsors.length > 0 && (
        <section className="premier-sponsors" aria-label="Premier sponsors">
          <div className="premier-sponsors__header">
            <p className="premier-sponsors__kicker">Premier Sponsors</p>
          </div>
          <div className="premier-sponsors__marquee" aria-label="Premier sponsor marquee">
            <div className="premier-sponsors__track">
              {[...premierSponsors, ...premierSponsors].map((sponsor, index) => (
                <a
                  key={`${sponsor.name}-${index}`}
                  className="premier-sponsor"
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name}`}
                >
                  <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="home-why-support">
        <div className="home-why-support__header">
          <p className="section-kicker">Why support CMAC?</p>
          <h2>When arts education is supported, students grow with confidence, creativity, and belonging.</h2>
        </div>
        <p>
          CMAC helps remove barriers so students can keep learning, performing, and building
          confidence through music and the arts — whether through a scholarship, a classroom grant,
          or a community donation.
        </p>
        <p className="home-upcoming-events">
          Looking for upcoming performances or ways to support a show? Visit our <Link href="/events">Events</Link> page or <Link href="/get-involved#direct-donate">Support an Event</Link>.
        </p>
      </section>


      <HomeImpactStats />
      <p className="impact-stats__cta">
        <Link href="/our-impact" className="text-link">
          See our impact →
        </Link>
      </p>

      <section className="home-pathways" aria-label="Ways to support CMAC">
        <div className="section-heading">
          <p className="section-kicker">Ways to support</p>
          <h2>Choose how you want to make an impact.</h2>
        </div>
        <div className="home-pathways__grid">
          <article className="home-pathway-card">
            <p className="home-pathway-card__eyebrow">Get involved</p>
            <h3>Volunteer with CMAC</h3>
            <p>Help at events, share our mission, and support the students and teachers who make the arts thrive.</p>
            <Link href="/get-involved" className="mini-cta-link">
              Learn how
            </Link>
          </article>
          <article className="home-pathway-card">
            <p className="home-pathway-card__eyebrow">Scholarships</p>
            <h3>Open doors for students</h3>
            <p>Help fund creative learning and opportunities that keep young artists moving forward.</p>
            <Link href="/scholarships" className="mini-cta-link">
              Explore scholarships
            </Link>
          </article>
          <article className="home-pathway-card">
            <p className="home-pathway-card__eyebrow">Teacher grants</p>
            <h3>Power classroom creativity</h3>
            <p>Support projects that bring music, performance, and artistic exploration into everyday learning.</p>
            <Link href="/teacher-grants" className="mini-cta-link">
              See teacher grants
            </Link>
          </article>
        </div>
      </section>

      <section className="home-cta-banner">
        <div>
          <p className="section-kicker">Make it possible</p>
          <h2>Support the next generation of CMAC artists.</h2>
        </div>
        <div className="home-cta-banner__actions">
          <Link href="/get-involved" className="hero-card__button hero-card__button--primary">
            Join CMAC
          </Link>
          <Link href="/our-impact" className="hero-card__button hero-card__button--secondary">
            See our impact
          </Link>
        </div>
      </section>
    </main>
  );
}