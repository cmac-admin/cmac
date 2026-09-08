import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR_WhatIsCMAC",
  description:
    "Learn what CMAC is, how it supports Comsewogue students, and how to get involved through scholarships, grants, volunteering, and community support.",
  openGraph: {
    title: "What Is CMAC? | Comsewogue Music & Arts Corp.",
    description:
      "CMAC supports arts education in the Comsewogue School District through scholarships, teacher grants, events, and volunteer opportunities.",
    url: "https://www.comsewoguemusicandarts.org/QR_WhatIsCMAC",
  },
};

export default function QRWhatIsCMACPage() {
  return (
    <main className="qr-page">
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body {
          background: #f5f3ef;
          color: #1f1f1f;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.5;
        }
        .qr-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }
        .container {
          width: min(100%, 440px);
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 14px 35px rgba(15, 32, 55, 0.08);
          padding: 28px 20px 24px;
        }
        .logo {
          margin: 0 0 18px;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #36567e;
        }
        h1 {
          margin: 0;
          font-size: clamp(2rem, 7vw, 2.8rem);
          line-height: 1.1;
          text-align: center;
          color: #101f2f;
        }
        .subtitle {
          margin: 12px 0 24px;
          text-align: center;
          color: #3d4b5d;
          font-size: 1rem;
        }
        .cta-button {
          display: block;
          width: 100%;
          background: #102742;
          color: #ffffff;
          text-align: center;
          padding: 16px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          margin-bottom: 24px;
        }
        .feature-list {
          display: grid;
          gap: 12px;
        }
        .feature {
          background: #f7f4ee;
          border: 1px solid rgba(16, 39, 66, 0.12);
          border-radius: 12px;
          padding: 14px 14px 12px;
        }
        .feature strong {
          display: block;
          margin-bottom: 4px;
          color: #102742;
          font-size: 1rem;
        }
        .feature p {
          margin: 0;
          color: #46576a;
          font-size: 0.93rem;
        }
        .footer {
          margin: 24px 0 0;
          text-align: center;
          color: #102742;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="container">
        <div className="logo">Comsewogue Music &amp; Arts Corp.</div>
        <h1>What is CMAC?</h1>
        <p className="subtitle">
          A volunteer-led nonprofit supporting music, drama, and visual arts in the Comsewogue School District.
        </p>

        <a
          className="cta-button"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform"
          target="_blank"
          rel="noreferrer"
        >
          Join CMAC
        </a>

        <div className="feature-list">
          <div className="feature">
            <strong>Scholarships</strong>
            <p>Helping students pursue arts growth, summer study, and creative opportunities.</p>
          </div>
          <div className="feature">
            <strong>Teacher Grants</strong>
            <p>Funding classroom projects, materials, workshops, and student learning experiences.</p>
          </div>
          <div className="feature">
            <strong>Community Support</strong>
            <p>Volunteers, members, and donors help make concerts, productions, and arts programs possible.</p>
          </div>
        </div>

        <p className="footer">Volunteer • Donate • Support the Arts</p>
      </div>
    </main>
  );
}
