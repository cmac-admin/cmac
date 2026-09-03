"use client";

const donationFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the fastest way to donate to CMAC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Donate with Venmo, Apple Pay, or Zelle buttons on the Get Involved page.",
      },
    },
    {
      "@type": "Question",
      name: "Where does CMAC donation money go?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Donations support student scholarships, teacher grants, and arts event support across the Comsewogue School District.",
      },
    },
    {
      "@type": "Question",
      name: "Can I support CMAC without making a payment online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can donate by check, volunteer at events, or join as a yearly member.",
      },
    },
  ],
};

export default function GetInvolvedPage() {
  const getSchoolYearLabel = () => {
    const today = new Date();
    const startYear = today >= new Date(today.getFullYear(), 7, 15)
      ? today.getFullYear()
      : today.getFullYear() - 1;

    return `${startYear}-${startYear + 1}`;
  };

  const openPopupWindow = (url: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const popup = window.open(
      "",
      "cmacPopup",
      "width=980,height=760,top=80,left=120,resizable=yes,scrollbars=yes"
    );

    if (!popup) {
      return;
    }

    const yearLabel = getSchoolYearLabel();

    popup.document.write(`<!doctype html>
      <html>
        <head>
          <title>CMAC ${yearLabel} MEMBERSHIP FORM</title>
          <style>
            html, body { margin: 0; height: 100%; background: #f3efe7; font-family: Arial, sans-serif; }
            body { display: flex; flex-direction: column; }
            .popup-header {
              padding: 1rem 1.25rem;
              text-align: center;
              background: #0f2037;
              color: #f4d38d;
              border-bottom: 3px solid #c99c3d;
              font-size: 1.2rem;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }
            iframe {
              flex: 1;
              width: 100%;
              min-height: 680px;
              border: 0;
            }
          </style>
        </head>
        <body>
          <div class="popup-header">CMAC ${yearLabel} MEMBERSHIP FORM</div>
          <iframe src="${url}" title="CMAC ${yearLabel} MEMBERSHIP FORM"></iframe>
        </body>
      </html>`);

    popup.document.close();
  };

  return (
    <main className="subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donationFaqJsonLd) }}
      />
      <section className="subpage-hero">
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
          <a className="give-nav-link" href="#community-supporter-levels">
            4. Community Supporter
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
            <p className="subpage-link">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
                target="_blank"
                rel="noreferrer"
                className="apply-btn"
                onClick={(event) => {
                  event.preventDefault();
                  openPopupWindow(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
                  );
                }}
              >
                JOIN CMAC
              </a>
            </p>
          </article>

          <article id="one-time-donation" className="give-detail-card">
            <h3>2. One-Time Donation</h3>
            <p>Make a single contribution to support CMAC&apos;s mission.</p>
            <p className="subpage-link">
              <a
                href="https://www.comsewoguemusicandarts.org/get-involved#direct-donate"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                GIVE NOW
              </a>
            </p>
          </article>

          <article id="monthly-giving" className="give-detail-card">
            <h3>3. Monthly Giving</h3>
            <p>
              Become a CMAC Sustaining Supporter. Your recurring gift provides
              stable funding for student scholarships and teacher grants.
            </p>
            <p className="subpage-link">
              <a
                href="https://www.comsewoguemusicandarts.org/get-involved#direct-donate"
                target="_blank"
                rel="noreferrer"
                className="text-link text-link--disabled"
                aria-disabled="true"
              >
                COMING SOON
              </a>
            </p>
          </article>

          <article
            id="community-supporter-levels"
            className="give-detail-card give-detail-card--wide"
          >
            <h3>4. Community Supporter</h3>
            <div className="membership-grid">
              <article className="membership-tier">
                <h3>Individual</h3>
                <p>$25/year</p>
                <ul>
                  <li>Free t-shirt</li>
                </ul>
              </article>
              <article className="membership-tier">
                <h3>Family</h3>
                <p>$50/year</p>
                <ul>
                  <li>2 free t-shirts</li>
                </ul>
              </article>
              <article className="membership-tier">
                <h3>Community Supporter</h3>
                <p>$100/year</p>
                <ul>
                  <li>Business name in community supporter ticker</li>
                </ul>
              </article>
              <article className="membership-tier membership-tier--featured">
                <h3>
                  <span className="membership-badge" aria-hidden="true" />
                  Premier Community Supporter
                </h3>
                <p>$150/year</p>
                <ul>
                  <li>Business logo + link on website Supporter page</li>
                  <li>Logo displayed at event tables throughout the school year</li>
                  <li>Digital support badge</li>
                  <li>Dedicated social media spotlight post</li>
                </ul>
              </article>
            </div>
          </article>

          <article id="tribute-gifts" className="give-detail-card">
            <h3>5. Honor a Loved One</h3>
            <p>
              Honor a student or loved one with a donation in their name.
              Tribute gifts can be recognized on our website or at events.
            </p>
            <p className="subpage-link">
              <a
                href="https://www.comsewoguemusicandarts.org/get-involved#direct-donate"
                target="_blank"
                rel="noreferrer"
                className="text-link text-link--disabled"
                aria-disabled="true"
              >
                COMING SOON
              </a>
            </p>
          </article>

          <article id="matching-gifts" className="give-detail-card">
            <h3>6. Matching Gifts</h3>
            <p>
              Check with your employer about matching charitable donations.
              Contact your HR department to double your impact.
            </p>
            <p className="subpage-link">
              <a
                href="https://www.comsewoguemusicandarts.org/get-involved#direct-donate"
                target="_blank"
                rel="noreferrer"
                className="text-link text-link--disabled"
                aria-disabled="true"
              >
                COMING SOON
              </a>
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
            <p className="subpage-link">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                SUPPORT THE SHOW
              </a>
            </p>
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
            <p className="subpage-link">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
                target="_blank"
                rel="noreferrer"
                className="apply-btn"
                onClick={(event) => {
                  event.preventDefault();
                  openPopupWindow(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
                  );
                }}
              >
                JOIN CMAC
              </a>
            </p>
          </article>
        </div>
      </section>

      <section className="content-card" id="direct-donate">
        <h2>Direct Donation Methods</h2>
        <div className="split-grid split-grid--three">
          <article className="donation-qr-card">
            <h3>Venmo</h3>
            <p className="donation-card-copy">
              Donate via Venmo using
              {" "}
              <a href="https://venmo.com/code?user_id=4464015279392318341&created=1764440203" target="_blank" rel="noreferrer">
                @CMAC-Comsewogue
              </a>
              .
            </p>
            <div className="qr-frame">
              <img
                className="qr-image"
                src="/cmac/cmac-venmo-qr.png"
                alt="CMAC Venmo QR code"
              />
            </div>
            <a
              className="apply-btn donation-method-button"
              href="https://venmo.com/code?user_id=4464015279392318341&created=1764440203"
              target="_blank"
              rel="noreferrer"
            >
              Donate with Venmo
            </a>
          </article>
          <article className="donation-qr-card" id="zelle-qr">
            <h3>Zelle</h3>
            <p className="donation-card-copy">Scan this code in your banking app to donate via Zelle.</p>
            <div className="qr-frame">
              <img
                className="qr-image"
                src="/cmac/cmac-zelle-qr.png"
                alt="CMAC Zelle QR code"
              />
            </div>
            <a
              className="apply-btn donation-method-button"
              href="/cmac/cmac-zelle-qr.png"
              target="_blank"
              rel="noreferrer"
            >
              Donate with Zelle
            </a>
          </article>
          <article className="donation-qr-card donation-qr-card--mail">
            <h3>By Mail</h3>
            <div className="mail-subline">Please make checks payable to CMAC</div>
            <div className="mail-address-box">
              <p>Mail or drop off to:</p>
              <p>
                Comsewogue Music & Arts Corp.
                <br />
                c/o Comsewogue High School
                <br />
                565 Bicycle Path
                <br />
                Port Jefferson Station, NY 11776
              </p>
            </div>
            <div className="apple-pay-mini">
              <h3>Apple Pay</h3>
              <a
                href="https://www.comsewoguemusicandarts.org/get-involved#direct-donate"
                target="_blank"
                rel="noreferrer"
                className="text-link text-link--disabled"
                aria-disabled="true"
              >
                COMING SOON
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="content-card">
        <h2>Donation Questions</h2>
        <div className="faq-list">
          <details>
            <summary>What is the fastest way to donate?</summary>
            <p>
              Use the <strong>Donate with Venmo</strong>, <strong>Apple Pay</strong>,
              or <strong>Zelle</strong> buttons below to give quickly.
            </p>
          </details>
          <details>
            <summary>What does my donation support?</summary>
            <p>
              CMAC donations support student scholarships, teacher grants, and
              arts-event support throughout the district.
            </p>
          </details>
          <details>
            <summary>Can I donate without paying online?</summary>
            <p>
              Yes. You can donate by check, join as a member, or volunteer at
              events.
            </p>
          </details>
        </div>
      </section>

      <section className="content-card" id="membership-form">
        <h2>Membership Form</h2>
        <p className="muted-copy">
          Complete the full official CMAC membership form below.
        </p>
        <div className="form-embed form-embed--membership">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform?embedded=true"
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
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
            onClick={(event) => {
              event.preventDefault();
              openPopupWindow(
                "https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
              );
            }}
          >
            Open membership form in a new window
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
