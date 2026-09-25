import type { Metadata } from "next";
import Link from "next/link";
import { ART_EVENTS, MUSIC_EVENTS, THEATER_EVENTS } from "@/lib/events";

export const metadata: Metadata = {
  title: "Comsewogue District Music, Arts & Drama Events",
  description:
    "CMAC supports music concerts, drama productions, and art shows across all four Comsewogue schools every year. See the full list of annual performances and events.",
  openGraph: {
    title: "Comsewogue District Music, Arts & Drama Events | Comsewogue Music & Arts Corp.",
    description:
      "Explore the concerts, drama productions, and art shows CMAC proudly supports each year across the Comsewogue School District.",
    url: "https://www.comsewoguemusicandarts.org/events",
  },
};

export default function EventsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Where does CMAC show up?</p>
        <p className="subpage-hero__statement">
          At concerts, drama productions, art shows, and celebrations across the district — supporting the moments that matter most.
        </p>
      </section>

      <section className="content-card">
        <div className="cta-button-row events-page__cta">
          <Link href="/order-here" className="apply-btn">
            Pre-Order for Event
          </Link>
        </div>
        <p className="muted-copy">
          At many events, families can purchase our handcrafted ornaments,
          fresh flower bouquets, and “Kisses for the Cast” items, with proceeds
          directly supporting CMAC scholarships and grants.
        </p>
      </section>

      <section className="content-card">
        <h2>Music Performances</h2>
        <p className="muted-copy">
          These concerts happen throughout the year and highlight the energy,
          discipline, and artistry of our student musicians.
        </p>
        <ul className="event-list">
          {MUSIC_EVENTS.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h2>Theater Productions</h2>
        <p>
          CMAC is proud to support the dramatic arts and celebrate the student
          performers, designers, and crew members who bring each production to
          life.
        </p>
        <ul className="event-list">
          {THEATER_EVENTS.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h2>Art Shows & Exhibitions</h2>
        <p>
          CMAC celebrates student creativity through district-wide displays and
          community showcases that give young artists a platform to share their
          work with families, peers, and the community.
        </p>
        <ul className="event-list">
          {ART_EVENTS.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
