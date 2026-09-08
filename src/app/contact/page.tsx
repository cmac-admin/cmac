import type { Metadata } from "next";
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

const emailAddress = "comsewoguemusicandarts@gmail.com";

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
        <h2>Send a Message</h2>
        <p>
          Use the form below to draft a message through your email app and send it to CMAC. We typically respond within 3 business days. You can also
          email us directly at <a className="text-link" href={`mailto:${emailAddress}`}>CONTACT CMAC</a>.
        </p>

        <ContactForm />
      </section>
    </main>
  );
}
