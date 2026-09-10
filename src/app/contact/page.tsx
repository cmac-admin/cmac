import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CMAC with questions about scholarships, teacher grants, events, sponsorships, or general support.",
  openGraph: {
    title: "Contact CMAC | Comsewogue Music & Arts Corp.",
    description:
      "Reach out to CMAC with questions about scholarships, teacher grants, events, or support for the arts community.",
    url: "https://www.comsewoguemusicandarts.org/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>Contact CMAC</h1>
        <p>
          We are happy to answer questions about scholarships, teacher grants,
          school events, sponsorship opportunities, and general CMAC support.
        </p>
      </section>

      <section className="content-card">
        <p>
          Questions about scholarships, teacher grants, programs, or sponsorships?
          Check our <Link href="/faq" className="text-link">FAQ</Link> first, or use the form below.
        </p>

        <ContactForm />
      </section>
    </main>
  );
}
