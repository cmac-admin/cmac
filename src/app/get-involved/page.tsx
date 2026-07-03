export default function GetInvolvedPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Get Involved</p>
        <h1>Support CMAC Programs</h1>
        <p>
          Donations directly support scholarships, arts enrichment, and teacher
          grants across the district.
        </p>
      </section>

      <section className="content-card">
        <h2>Ways to Support</h2>
        <div className="split-grid">
          <article>
            <h3>Venmo</h3>
            <p>
              Donate via Venmo using
              {" "}
              <a href="https://venmo.com/code?user_id=4464015279392318341&created=1764440203">
                @CMAC-Comsewogue
              </a>
              .
            </p>
          </article>
          <article>
            <h3>Checks</h3>
            <p>
              Comsewogue Music and Arts Co.
              <br />
              c/o Comsewogue High School
              <br />
              565 Bicycle Path
              <br />
              Port Jefferson Station, NY 11776
            </p>
          </article>
        </div>
        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/get-involved/">
            View previous Get Involved page
          </a>
        </p>
      </section>
    </main>
  );
}
