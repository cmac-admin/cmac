export default function GetInvolvedPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Get Involved</p>
        <h1>Join CMAC</h1>
        <p>
          Membership in Comsewogue Music & Arts Corp. directly supports student
          musicians, artists, performers, and creators.
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
            <img
              className="qr-image"
              src="/cmac/cmac-venmo-qr.png"
              alt="CMAC Venmo QR code"
            />
          </article>
          <article>
            <h3>Zelle</h3>
            <p>Scan this code in your banking app to donate via Zelle.</p>
            <img
              className="qr-image"
              src="/cmac/cmac-zelle-qr.png"
              alt="CMAC Zelle QR code"
            />
          </article>
          <article>
            <h3>Checks</h3>
            <p>
              Comsewogue Music & Arts Corp.
              <br />
              c/o Comsewogue High School
              <br />
              565 Bicycle Path
              <br />
              Port Jefferson Station, NY 11776
            </p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <h2>Membership Levels</h2>
        <div className="membership-grid">
          <article className="membership-tier">
            <h3>Individual</h3>
            <p>$25/year</p>
          </article>
          <article className="membership-tier">
            <h3>Family</h3>
            <p>$40/year</p>
          </article>
          <article className="membership-tier">
            <h3>Patron</h3>
            <p>$75/year</p>
          </article>
          <article className="membership-tier">
            <h3>Corporate Sponsor</h3>
            <p>$150/year - Business logo will appear on our website as a sponsor.</p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <h2>Membership Form</h2>
        <p className="muted-copy">
          Complete the full official CMAC membership form below.
        </p>
        <div className="form-embed form-embed--membership">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3H1Sqc-KhiCq5U9LUeACC7AUIQQnyPMifdTXLea3xW8oJHw/viewform?embedded=true"
            width="100%"
            height="1850"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="CMAC Membership Form"
          >
            Loading membership form…
          </iframe>
        </div>
        <p className="subpage-link">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3H1Sqc-KhiCq5U9LUeACC7AUIQQnyPMifdTXLea3xW8oJHw/viewform">
            Open membership form in a new tab
          </a>
        </p>
      </section>

      <section className="content-card" id="mailing-list">
        <h2>Join Our Mailing List</h2>
        <p className="muted-copy">
          Get updates on fundraisers, student events, scholarship windows, and
          new CMAC announcements.
        </p>
        <p className="coming-soon-banner">COMING SOON</p>
        <form className="membership-form mailing-list-form">
          <label>
            Name
            <input type="text" name="mailName" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="mailEmail" placeholder="you@email.com" />
          </label>
          <button type="button" disabled>Join Mailing List</button>
        </form>
      </section>
    </main>
  );
}
