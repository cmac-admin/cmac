import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "CMAC supports music concerts, drama productions, and art shows across all four Comsewogue schools every year. See the full list of annual performances and events.",
  openGraph: {
    title: "Events | Comsewogue Music & Arts Corp.",
    description:
      "Explore the concerts, drama productions, and art shows CMAC proudly supports each year across the Comsewogue School District.",
    url: "https://www.comsewoguemusicandarts.org/events",
  },
};

export default function EventsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Events</p>
        <h1>School Arts Events</h1>
        <p>
          CMAC proudly supports the concerts, productions, and showcases that
          bring music, theater, and visual arts to life across the Comsewogue
          School District.
        </p>
      </section>

      <section className="content-card">
        <div className="cta-button-row">
          <Link href="/order-here" className="apply-btn">
            Support an Event
          </Link>
          <Link href="/get-involved" className="apply-btn apply-btn--secondary">
            Become a Member
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
          <li>Winter Concert @ Comsewogue High School</li>
          <li>Winter Concert Group 1 @ JFK Middle School</li>
          <li>Winter Concert Group 2 @ JFK Middle School</li>
          <li>Winter Concert @ Terryville Road Elementary</li>
          <li>Winter Concert @ Boyle Road Elementary</li>
          <li>Spring Concert @ Comsewogue High School</li>
          <li>Spring Concert Group 1 @ JFK Middle School</li>
          <li>Spring Concert Group 2 @ JFK Middle School</li>
          <li>Spring Concert @ Terryville Road Elementary</li>
          <li>Spring Concert @ Boyle Road Elementary</li>
          <li>POPS Concert @ Comsewogue High School</li>
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
          <li>CHS Drama Production</li>
          <li>JFK Drama Production</li>
          <li>Terryville Drama Show</li>
          <li>Boyle Drama Show</li>
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
          <li>High School Art Show</li>
          <li>JFK Art Show</li>
          <li>Boyle Road Art Show</li>
          <li>Terryville Road Art Show</li>
          <li>Library Art Exhibition</li>
          <li>One River Exhibition</li>
        </ul>
      </section>
    </main>
  );
}
