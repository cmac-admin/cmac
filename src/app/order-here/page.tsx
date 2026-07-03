const schools = [
  "Boyle Road Elementary",
  "Terryville Road Elementary",
  "John F. Kennedy Middle School",
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
              <h3>{school}</h3>
              <div className="order-buttons">
                <a href="/get-involved" className="order-button">
                  Concert Flowers
                </a>
                <a href="/get-involved" className="order-button">
                  Drama Ornament
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
