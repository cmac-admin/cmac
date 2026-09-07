"use client";

import Link from "next/link";

import { ContactPopupLink } from "@/components/ContactPopupLink";
import { getSchoolYearInfo } from "@/lib/school-year";

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

    const { label: yearLabel } = getSchoolYearInfo();

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
        <p className="subpage-kicker">Get Involved</p>
        <h1>Join CMAC</h1>
        <p>
          Membership in Comsewogue Music & Arts Corp. helps fund scholarships,
          teacher grants, and summer arts programs that keep creativity strong
          in our schools and community.
        </p>
      </section>

      <section className="content-card">
        <div className="cta-button-row">
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
            Become a Member
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
            target="_blank"
            rel="noreferrer"
            className="apply-btn apply-btn--secondary"
            onClick={(event) => {
              event.preventDefault();
              openPopupWindow(
                "https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
              );
            }}
          >
            Volunteer / Student Representative
          </a>
        </div>
        <p className="muted-copy">
          Students and Honor Society members are welcome to volunteer and earn
          documented service hours while helping CMAC support the arts in our
          community.
        </p>
      </section>

      <section className="content-card">
        <h2>Membership Levels</h2>
        <div className="membership-table-wrap">
          <table className="membership-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Amount</th>
                <th>Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Friend of CMAC</td>
                <td>$10 suggested</td>
                <td>Membership status, meeting updates, voting rights, and email meeting minutes</td>
              </tr>
              <tr>
                <td>Individual</td>
                <td>$25/year</td>
                <td>Everything above, plus a free CMAC t-shirt (pickup at winter concerts)</td>
              </tr>
              <tr>
                <td>Family</td>
                <td>$50/year</td>
                <td>Everything above, plus 2 free t-shirts</td>
              </tr>
              <tr>
                <td>Community Supporter</td>
                <td>$100/year</td>
                <td>Family benefits and recognition for businesses or families on CMAC supporter materials</td>
              </tr>
              <tr>
                <td>Premier Community Supporter</td>
                <td>$150/year</td>
                <td>Website logo and link, event-table logo placement, digital support badge, and a social media spotlight</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          All donations are tax-deductible. Your bank statement or canceled
          check serves as a receipt. For an official tax letter, please
          <ContactPopupLink className="text-link" href="/cmac/contact">
            CONTACT CMAC
          </ContactPopupLink>
          with your request.
        </p>
      </section>

      <section className="content-card">
        <h2>What Your Support Makes Possible</h2>
        <p>
          Your membership and donations help fund student scholarships, teacher
          grants for music, art, and drama programs, and summer arts learning
          opportunities for Comsewogue students in grades 3–12.
        </p>
      </section>

      <section className="content-card">
        <h2>Volunteer Opportunities</h2>
        <div className="split-grid split-grid--two">
          <article className="give-detail-card">
            <h3>Adult Volunteers</h3>
            <p>
              Help at the CMAC table during concerts and productions, assist with
              fundraising items, support communications, or help review
              scholarship and grant applications. Every role makes a difference.
            </p>
          </article>
          <article className="give-detail-card">
            <h3>Student Representatives & Honor Society</h3>
            <p>
              High school students, including Tri-M and Arts Honor Society
              members, are encouraged to get involved. Earn documented volunteer
              hours and gain leadership experience while helping promote
              scholarships, assisting at events, and supporting the arts in our
              community.
            </p>
          </article>
        </div>
        <p className="muted-copy">
          Simply note your volunteer interest on the membership form.
        </p>
      </section>

      <section className="content-card">
        <h2>Performance-Night Fundraising</h2>
        <p>
          At concerts and drama productions, CMAC offers handcrafted items that
          directly support scholarships and grants. These include personalized
          ornaments, fresh flower bouquets, and “Kisses for the Cast.”
        </p>
        <p className="subpage-link">
          <a
            href="/cmac/order-here"
            target="_self"
            rel="noreferrer"
            className="apply-btn"
          >
            Support the Show
          </a>
        </p>
      </section>

      <section className="content-card" id="direct-donate">
        <h2>Direct Donation Methods</h2>
        <div className="split-grid split-grid--three">
          <article className="donation-qr-card">
            <h3>Venmo</h3>
            <p className="donation-card-copy">
              <a
                href="https://venmo.com/code?user_id=4464015279392318341&created=1764440203"
                target="_blank"
                rel="noreferrer"
              >
                @CMAC-Comsewogue
              </a>
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
            <p className="donation-card-copy">
              Scan this code in your banking app or use the QR code below.
            </p>
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
            <h3>Mail or Drop Off</h3>
            <div className="mail-subline">Please make checks payable to CMAC</div>
            <div className="mail-address-box">
              <p>Comsewogue Music & Arts Corp.</p>
              <p>
                c/o Comsewogue High School
                <br />
                565 Bicycle Path
                <br />
                Port Jefferson Station, NY 11776
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="content-card">
        <h2>Practical Details</h2>
        <ul>
          <li>All meetings are held via Google Meet.</li>
          <li>Student members should use a personal email address; school email accounts are blocked.</li>
          <li>Participation in the CMAC Facebook group is free for anyone who wants to stay connected and share news.</li>
        </ul>
      </section>

      <section className="content-card">
        <h2>Need More Info?</h2>
        <p>
          Visit our <Link href="/faq">FAQ page</Link> for answers about giving,
          scholarships, volunteering, and event support.
        </p>
      </section>

      <section className="content-card" id="membership-form">
        <h2>Membership Form</h2>
        <p className="muted-copy">
          Complete the official CMAC membership form below.
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

      <section className="content-card">
        <div className="cta-button-row">
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
            Join CMAC Today
          </a>
        </div>
      </section>
    </main>
  );
}
