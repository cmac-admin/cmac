import Link from "next/link";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/teacher-grants", label: "Teacher Grants" },
  { href: "/news", label: "News" },
  { href: "/news/logo-contest", label: "News: Logo Contest" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/order-here", label: "Order Here" },
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
