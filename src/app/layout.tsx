import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comsewogue Music & Arts",
  description: "Comsewogue Music and Arts Connection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Link href="/" className="floating-logo" aria-label="CMAC Home">
          <img
            src="/cmac/cmac-logo.png"
            alt="Comsewogue Music and Arts Connection logo"
            width={92}
            height={92}
          />
        </Link>
        <header className="site-header">
          <div className="masthead">
            <div className="brand-block">
              <p className="brand-text">
                <span className="brand-title">
                  COMSEWOGUE MUSIC AND ARTS CORP.
                </span>
              </p>
            </div>

            <Link className="join-button" href="/get-involved">
              Join CMAC <span aria-hidden="true">→</span>
            </Link>
          </div>

          <nav className="menu-bar main-nav" aria-label="Primary">
            <Link href="/about">About</Link>
            <Link href="/get-involved">Get Involved</Link>
            <Link href="/scholarships">Scholarships</Link>
            <Link href="/teacher-grants">Teacher Grants</Link>
            <Link href="/news">News</Link>
            <Link href="/sponsors">Sponsors</Link>
            <Link href="/order-here">Order Here</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p className="site-footer__mailing">
            <Link href="/get-involved#mailing-list">JOIN OUR MAILING LIST</Link>
          </p>
          <div className="site-footer__social">
            <p>Follow Us</p>
            <div className="site-footer__icons">
              <a
                href="https://www.facebook.com/groups/1267469880589912/"
                target="_blank"
                rel="noreferrer"
                aria-label="CMAC Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.98 3.66 9.1 8.44 9.84v-6.99H7.9v-2.85h2.54V9.89c0-2.52 1.5-3.9 3.8-3.9 1.1 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.85H13.6v6.99C18.34 21.16 22 17.04 22 12.06z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/comsewogue_music_and_arts/"
                target="_blank"
                rel="noreferrer"
                aria-label="CMAC Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.5 2h9A5.51 5.51 0 0 1 22 7.5v9a5.51 5.51 0 0 1-5.5 5.5h-9A5.51 5.51 0 0 1 2 16.5v-9A5.51 5.51 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </a>
            </div>
          </div>

          <p className="site-footer__copyright">
            © Copyright Comsewogue Music and Arts. All Rights Reserved. Privacy
            Policy {"|"} <Link href="/sitemap">Sitemap</Link>
            <br />
            Webmaster:{" "}
            <a href="mailto:webmaster@webmaster.com">webmaster@webmaster.com</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
