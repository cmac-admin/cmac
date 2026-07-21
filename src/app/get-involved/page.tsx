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
        <h2>Ways to Give</h2>
        <p className="muted-copy">
          Select an option below to jump to details.
        </p>
        <div className="give-nav-grid">
          <a className="give-nav-link" href="#yearly-membership">
            1. Yearly Membership
          </a>
          <a className="give-nav-link" href="#one-time-donation">
            2. One-Time Donation
          </a>
          <a className="give-nav-link" href="#monthly-giving">
            3. Monthly Giving
          </a>
          <a className="give-nav-link" href="#corporate-sponsorships">
            4. Corporate Sponsorships
          </a>
          <a className="give-nav-link" href="#tribute-gifts">
            5. Tribute Gifts
          </a>
          <a className="give-nav-link" href="#matching-gifts">
            6. Matching Gifts
          </a>
          <a className="give-nav-link" href="#fundraising-sales">
            7. Fundraising Sales
          </a>
          <a className="give-nav-link" href="#volunteer">
            8. Volunteer
          </a>
        </div>
      </section>

      <section className="content-card">
        <h2>Giving Option Details</h2>
        <div className="give-detail-grid">
          <article id="yearly-membership" className="give-detail-card">
            <h3>1. Yearly Membership</h3>
            <p>Join today to become a member of CMAC.</p>
          </article>

          <article id="one-time-donation" className="give-detail-card">
            <h3>2. One-Time Donation</h3>
            <p>
              Make a single contribution to support CMAC&apos;s mission.
            </p>
          </article>

          <article id="monthly-giving" className="give-detail-card">
            <h3>3. Monthly Giving</h3>
            <p>
              Become a CMAC Sustaining Supporter. Your recurring gift provides
              stable funding for student scholarships and teacher grants.
            </p>
          </article>

          <article id="corporate-sponsorships" className="give-detail-card">
            <h3>4. Corporate Sponsorships</h3>
            <p>
              Local businesses can support CMAC through sponsorship packages
              that include:
            </p>
            <ul>
              <li>Logo placement on our site</li>
              <li>Community visibility</li>
              <li>Event recognition</li>
            </ul>
          </article>

          <article id="tribute-gifts" className="give-detail-card">
            <h3>5. Tribute Gifts</h3>
            <p>
              Honor a student or loved one with a donation in their name.
              Tribute gifts can be recognized on our website or at events.
            </p>
          </article>

          <article id="matching-gifts" className="give-detail-card">
            <h3>6. Matching Gifts</h3>
            <p>
              Check with your employer about matching charitable donations.
              Contact your HR department to double your impact.
            </p>
          </article>

          <article id="fundraising-sales" className="give-detail-card">
            <h3>7. Fundraising Sales</h3>
            <p>
              At most concerts and drama productions, CMAC offers handcrafted
              performance-night gifts that directly support our scholarships and
              grants. These items celebrate your performer while fueling the
              arts in our district.
            </p>
            <p>A few examples include:</p>
            <ul>
              <li>
                <strong>Personalized Ornaments:</strong> themed keepsakes
                created for each show to commemorate your student&apos;s
                performance.
              </li>
              <li>
                <strong>Fresh Flower Bouquets:</strong> ready for pickup at the
                show, making concert night effortless and memorable.
              </li>
              <li>
                <strong>Kisses for the Cast:</strong> a fun, heartfelt way to
                send encouragement backstage while supporting CMAC.
              </li>
            </ul>
          </article>

          <article id="volunteer" className="give-detail-card">
            <h3>8. Volunteer</h3>
            <p>
              Volunteering is one of the most meaningful ways to support CMAC
              and the talented students who bring art, music, and theater to
              life in our district.
            </p>
            <p>
              Whether you help at the CMAC table or assist with fundraising
              items, every volunteer makes a difference - and every role helps
              CMAC continue to provide scholarships and grants within our
              district.
            </p>
            <p>
              Fill out our membership application to become a part of CMAC
              today.
            </p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <h2>Direct Donation Methods</h2>
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
