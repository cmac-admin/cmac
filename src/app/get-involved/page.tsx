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
            <div className="qr-placeholder" aria-label="QR code placeholder">
              <p>QR CODE</p>
              <span>@CMAC-Comsewogue</span>
            </div>
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
            <p>$150/year</p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <h2>Membership Form</h2>
        <p className="muted-copy">
          Keep this polished quick-entry form, then continue to our official
          Google Form for final submission.
        </p>
        <form
          className="membership-form"
          action="https://docs.google.com/forms/d/e/1FAIpQLSd3H1Sqc-KhiCq5U9LUeACC7AUIQQnyPMifdTXLea3xW8oJHw/viewform"
          target="_blank"
        >
          <label>
            Full Name
            <input type="text" name="fullName" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="name@email.com" />
          </label>
          <label>
            Membership Level
            <select name="membershipLevel" defaultValue="">
              <option value="" disabled>
                Select a level
              </option>
              <option>Individual — $25/year</option>
              <option>Family — $40/year</option>
              <option>Patron — $75/year</option>
              <option>Corporate Sponsor — $150/year</option>
            </select>
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              rows={4}
              placeholder="Any additional details..."
            />
          </label>
          <p className="muted-copy">
            Submission is collected through the official Google Form.
          </p>
          <button type="submit">Continue to Official Membership Form</button>
        </form>
        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/join-cmac/">
            View previous Join CMAC page
          </a>
        </p>
      </section>

      <section className="content-card">
        <h2>Join Our Mailing List</h2>
        <p className="muted-copy">
          Get updates on fundraisers, student events, scholarship windows, and
          new CMAC announcements.
        </p>
        <form className="membership-form mailing-list-form">
          <label>
            Name
            <input type="text" name="mailName" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="mailEmail" placeholder="you@email.com" />
          </label>
          <button type="button">Join Mailing List</button>
        </form>
      </section>
    </main>
  );
}
