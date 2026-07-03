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
        <div className="top-strip" />
        <header className="masthead">
          <div className="brand-block">
            <Link href="/" className="brand-mark" aria-label="CMAC Home">
              C
            </Link>
            <p className="brand-text">
              <span>Comsewogue</span>
              <span>Music & Arts</span>
            </p>
          </div>

          <nav className="main-nav" aria-label="Primary">
            <Link href="/about">About</Link>
            <Link href="/get-involved">Get Involved</Link>
            <Link href="/scholarships">Scholarships</Link>
            <Link href="/teacher-grants">Teacher Grants</Link>
            <Link href="/news">News</Link>
            <Link href="/sponsors">Sponsors</Link>
            <Link href="/order-here">Order Here</Link>
          </nav>

          <Link className="join-button" href="/get-involved">
            Join CMAC <span aria-hidden="true">→</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
