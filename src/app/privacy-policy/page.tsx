import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CMAC privacy policy explaining how we use visitor information, analytics, and contact data on our website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>Privacy Policy</h1>
      </section>

      <section className="content-card">
        <h2>Who We Are</h2>
        <p>
          Comsewogue Music &amp; Arts Corp. (CMAC) is a nonprofit organization
          supporting music, visual arts, and performance opportunities for
          students in the Comsewogue School District and surrounding community.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect non-personally identifying information such as website
          traffic data, page visits, referral sources, and browser/device
          information to help us understand how people use our site and improve
          our programs.
        </p>

        <h2>How We Use Information</h2>
        <p>
          We use this information to improve website performance, understand
          which pages are most useful to visitors, and support our communication
          and programming goals. We do not sell personal information.
        </p>

        <h2>Analytics</h2>
        <p>
          We use privacy-conscious analytics tools to understand website usage.
          These tools may collect anonymous usage data such as page views,
          browser type, approximate location, and device information. This helps
          us learn how visitors engage with the site without identifying
          individuals.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you contact us by email or submit a form, we may keep the
          information you provide so we can respond to your message, process a
          request, or support a program or event.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our site may include links to external websites, including donation,
          scholarship, and event forms. CMAC is not responsible for the privacy
          practices or content of those third-party sites.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may choose not to use the website or may disable cookies in your
          browser settings. Please note that some website features may not work
          correctly if analytics or cookies are disabled.
        </p>

        <h2>Updates</h2>
        <p>
          This privacy policy may be updated from time to time. Any changes will
          be reflected on this page with the updated date.
        </p>

        <p>
          If you have questions about this policy or how we handle information,
          please <a className="text-link" href="mailto:comsewoguemusicandarts@gmail.com">CONTACT CMAC</a>.
        </p>
      </section>
    </main>
  );
}
