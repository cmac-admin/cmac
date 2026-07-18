const schools = [
  {
    name: "Boyle Road Elementary",
    flowers: "https://docs.google.com/forms/d/1xqKn5CFlQZgz9zYslwFGNXFPtLAi2al5AMg7HhOhdGU",
    ornaments: "https://docs.google.com/forms/d/1S6hiq3XedpE0MTFhJ-_kJ7e9OarZ-OXNpdme_x7Hjh0",
  },
  {
    name: "Terryville Road Elementary",
    flowers: "https://docs.google.com/forms/d/13hbjvcSC3SRRVlUGRtyJj-0SrrOM8hPZaoZ6ON5_IY0",
    ornaments: "https://docs.google.com/forms/d/1IeQC2bPE2to2BX9rShk9YN-3-YrhQ_hsRe9Uq8Hqtbo",
  },
  {
    name: "JFK Middle School",
    flowers: "https://docs.google.com/forms/d/1l1wG1x3L_vtdf3DDRrFdcLWVhRiVYNiBPiLio11opok",
    ornaments: "https://docs.google.com/forms/d/1q78yuUMlMcCBqat6y_q6dfCsAPvwnwd50y4lrIvLbTQ",
  },
  {
    name: "Comsewogue High School",
    flowers: "https://docs.google.com/forms/d/1V_mBSL7HOEZ9Wd3Tc1v-fluX3dK2SxzyA9s1myKlAv8",
    ornaments: "https://docs.google.com/forms/d/1v2sQh0siQoEAAZSXmK7agR52GLR8I0CysX4GJcTtg0g",
  },
];

export default function OrderHerePage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Order Here</p>
        <h1>School Event Orders</h1>
        <p>
          Select your school and choose an item to order for upcoming music and
          drama events.
        </p>
      </section>

      <section className="content-card">
        <h2>Order by School</h2>
        <p className="muted-copy">
          Use the buttons below to start your order. Online checkout links can
          be updated as school-specific forms are finalized.
        </p>
        <div className="school-grid">
          {schools.map((school) => (
            <article key={school.name} className="school-card">
              <h3
                className={
                  school.name === "JFK Middle School"
                    ? "school-card__title school-card__title--long"
                    : "school-card__title"
                }
              >
                {school.name}
              </h3>
              <div className="order-buttons">
                <a
                  href={school.flowers}
                  className="order-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Concert Flowers
                </a>
                <a
                  href={school.ornaments}
                  className="order-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Drama Ornaments
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
