import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HomeImpactStats } from "@/components/LiveStats";

const premierSponsors = [
  {
    name: "Partner with CMAC",
    logo: "/cmac/cmac-logo.png",
    website: "/sponsors",
  },
  {
    name: "Support the Arts",
    logo: "/cmac/cmac-logo.png",
    website: "/sponsors",
  },
  {
    name: "Community Partnership",
    logo: "/cmac/cmac-logo.png",
    website: "/sponsors",
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
        </div>

        <div className="hero__meta">
          <p>Est. 2023</p>
          <span />
          <p>Suffolk Non-Profit</p>
        </div>

        <article className="hero-card">
          <header className="hero-card__header">
            <div className="hero-card__titleline" aria-label="Now playing 2026 to 2027 season">
              <span className="hero-card__label">NOW PLAYING</span>
              <time dateTime="2026-2027">2026–27</time>
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
              <Link href="/impact-coming-soon" className="hero-card__button hero-card__button--secondary">
                See our impact
              </Link>
            </div>
            <p className="hero-card__footnote">
              Volunteer. Donate. Help students thrive.
              <Link href="/get-involved" className="hero-card__footnote--accent">
                {" "}SUPPORT THE SEASON.
              </Link>
            </p>
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
                  <span className="premier-sponsor__label">YOUR LOGO HERE</span>
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={96}
                    height={96}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <HomeImpactStats />
      <p className="impact-stats__cta">
        <Link href="/impact-coming-soon" className="text-link">
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
            <p>Help at events, welcome families, and support the students, teachers, and programs that make the arts thrive.</p>
            <Link href="/get-involved/volunteer" className="mini-cta-link">
              Learn how
            </Link>
          </article>
          <article className="home-pathway-card">
            <p className="home-pathway-card__eyebrow">Membership</p>
            <h3>Become a CMAC Member</h3>
            <p>Join as a member and help provide year-round support for music and arts education in our community.</p>
            <Link href="/get-involved/membership" className="mini-cta-link">
              Become a member
            </Link>
          </article>
          <article className="home-pathway-card">
            <p className="home-pathway-card__eyebrow">Sponsorship</p>
            <h3>Become a Sponsor</h3>
            <p>Partner with CMAC to strengthen student programs, annual events, and creative learning opportunities.</p>
            <Link href="/sponsors" className="mini-cta-link">
              Explore sponsorship
            </Link>
          </article>
          <article className="home-pathway-card">
            <p className="home-pathway-card__eyebrow">Fundraising</p>
            <h3>Support CMAC Fundraisers</h3>
            <p>Help fund scholarships, teacher grants, and student-centered arts opportunities through CMAC events and campaigns.</p>
            <Link href="/get-involved#direct-donate" className="mini-cta-link">
              Give today
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
          <Link href="/impact-coming-soon" className="hero-card__button hero-card__button--secondary">
            See our impact
          </Link>
        </div>
      </section>
    </main>
  );
}