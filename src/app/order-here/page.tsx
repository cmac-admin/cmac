import Link from "next/link";

const schools = [
  "Boyle Road Elementary",
  "Terryville Road Elementary",
  "JFK Middle Shchool",
  "Comsewogue High School",
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
            <article key={school} className="school-card">
              <h3
                className={
                  school === "JFK Middle Shchool"
                    ? "school-card__title school-card__title--long"
                    : "school-card__title"
                }
              >
                {school}
              </h3>
              <div className="order-buttons">
                <Link
                  href="/order-form"
                  className="order-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Concert Flowers
                </Link>
                <Link
                  href="/order-form"
                  className="order-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Drama Ornaments
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
