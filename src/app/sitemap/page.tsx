import Link from "next/link";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CMAC" },
  { href: "/our-impact", label: "Our Impact" },
  { href: "/contact", label: "Contact" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/get-involved#direct-donate", label: "Direct Donation Methods" },
  { href: "/events", label: "Events" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/teacher-grants", label: "Teacher Grants" },
  { href: "/news", label: "Latest Updates from CMAC" },
  { href: "/news/logo-contest", label: "News: Logo Contest" },
  { href: "/faq", label: "FAQ" },
  { href: "/sponsors", label: "Community Sponsors" },
  { href: "/test", label: "Brand Test Page" },
  { href: "/order-form", label: "Order Form" },
  { href: "/order-here", label: "Order Here" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function SiteMapPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Sitemap</p>
        <h1>Site Directory</h1>
        <p>Browse all published pages on the CMAC website.</p>
      </section>

      <section className="content-card">
        <ul className="sitemap-list">
          {siteLinks.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href}>{entry.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
