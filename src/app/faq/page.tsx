import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Comsewogue Music & Arts Corp. (CMAC) — who we support, fundraising, scholarships, teacher grants, volunteering, and events.",
  openGraph: {
    title: "FAQ | Comsewogue Music & Arts Corp.",
    description:
      "Frequently asked questions about CMAC — our mission, fundraising, scholarships, grants, volunteering, and the events we support in the Comsewogue School District.",
    url: "https://www.comsewoguemusicandarts.org/faq",
  },
};

type FaqItem = {
  question: string;
  answer: string;
  answerNode?: React.ReactNode;
};

type FaqGroup = {
  icon: string;
  title: string;
  items: FaqItem[];
};

const faqGroups: FaqGroup[] = [
  {
    icon: "",
    title: "General Questions",
    items: [
      {
        question: "What is CMAC?",
        answer:
          "CMAC is a volunteer-run nonprofit that supports music, art, and theater programs across the Comsewogue School District. We provide scholarships, teacher grants, and event-night support for student performances and exhibitions.",
      },
      {
        question: "Who does CMAC support?",
        answer:
          "We support all student music, art & drama artists — from 3rd grade through high school.",
      },
      {
        question: "How does CMAC choose what events to attend?",
        answer:
          "We attend district concerts, drama productions, art shows, and community arts events where our presence enhances the student experience and supports fundraising.",
      },
    ],
  },
  {
    icon: "💵",
    title: "Fundraising & Purchases",
    items: [
      {
        question: "What items does CMAC sell at events?",
        answer:
          "We offer many things to help raise funds for scholarships and teacher grants. Kisses for the Cast is one of our newest and most popular items! During drama shows, we offer Hershey Kisses in a bag for sale that you can write a note to your performer, and they receive them after the show. We also sell flowers, candy, and a balloon at the drama shows and concerts. We also offer pre-orders for custom themed ornaments for the drama shows — the ornaments are hand-made and customized for your star.",
      },
      {
        question: "Where does the money go?",
        answer:
          "All proceeds fund student scholarships, teacher grants, and arts program support across the district.",
      },
      {
        question: "Can I donate directly?",
        answer:
          "Yes, donations can be made directly through our website on the Donate page.",
        answerNode: (
          <>
            Yes, donations can be made directly through our website on the{" "}
            <Link href="/get-involved#direct-donate">Donate page</Link>.
          </>
        ),
      },
      {
        question: "Are donations tax-deductible?",
        answer:
          "Yes. CMAC is a registered nonprofit, and donations are tax-deductible to the extent allowed by law.",
      },
    ],
  },
  {
    icon: "🎓",
    title: "Scholarships & Grants",
    items: [
      {
        question: "What type of scholarships do you offer?",
        answer:
          "We offer $500 Senior scholarships to students in 12th grade. We also offer $100 scholarships to students in grades 3–11. For more detailed information and eligibility, visit our Scholarships page. All scholarships must be applied for from our website.",
        answerNode: (
          <>
            We offer $500 Senior scholarships to students in 12th grade. We also
            offer $100 scholarships to students in grades 3–11. For more detailed
            information and eligibility, visit our{" "}
            <Link href="/scholarships">Scholarships page</Link>. All scholarships
            must be applied for from our website.
          </>
        ),
      },
      {
        question: "How do students apply for scholarships?",
        answer:
          "All scholarship applications are done through our website. Seniors can apply through our annual scholarship application, available in the spring. Requirements and deadlines are posted on our Scholarships page.",
        answerNode: (
          <>
            All scholarship applications are done through our website. Seniors can
            apply through our annual scholarship application, available in the
            spring. Requirements and deadlines are posted on our{" "}
            <Link href="/scholarships">Scholarships page</Link>.
          </>
        ),
      },
      {
        question: "How do teachers apply for grants?",
        answer:
          "Teachers submit a short proposal describing how the grant will enhance student arts experiences. Applications open each fall. Learn more and apply on our Teacher Grants page.",
        answerNode: (
          <>
            Teachers submit a short proposal describing how the grant will enhance
            student arts experiences. Applications open each fall. Learn more and
            apply on our <Link href="/teacher-grants">Teacher Grants page</Link>.
          </>
        ),
      },
    ],
  },
  {
    icon: "🤝",
    title: "Volunteering",
    items: [
      {
        question: "How can I volunteer?",
        answer:
          "Volunteers help at event tables, assemble fundraising items, assist with displays, or support behind-the-scenes tasks. Even one hour makes a huge impact. Sign up on our Get Involved page.",
        answerNode: (
          <>
            Volunteers help at event tables, assemble fundraising items, assist
            with displays, or support behind-the-scenes tasks. Even one hour makes
            a huge impact. Sign up on our{" "}
            <Link href="/get-involved#volunteer">Get Involved page</Link>.
          </>
        ),
      },
      {
        question: "Do I need experience to volunteer?",
        answer:
          "Not at all — we welcome all helping hands. We'll show you everything you need to know.",
      },
      {
        question: "Can students volunteer?",
        answer:
          "Yes! Students can help with setup, greeting guests, or assisting with art-related tasks. It's a great way to earn service hours.",
      },
    ],
  },
  {
    icon: "🎟️",
    title: "Events",
    items: [
      {
        question: "Where can I find event dates?",
        answer:
          "We only list the events we support, the actual date may vary based on the Comsewogue School District Calendar and is subject to change, so please confirm with the school/district regarding specific events and dates.",
        answerNode: (
          <>
            We only list the <Link href="/events">events we support</Link>, the
            actual date may vary based on the Comsewogue School District Calendar
            and is subject to change, so please confirm with the school/district
            regarding specific events and dates.
          </>
        ),
      },
      {
        question: "Does CMAC run the school productions?",
        answer:
          "No — CMAC supports the talented students and teachers who create the productions. We provide fundraising items and arts-program support.",
      },
    ],
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  return (
    <main className="subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="subpage-hero">
        <p className="subpage-kicker">FAQ</p>
        <h1>Frequently Asked Questions</h1>
        <p>
          Everything you need to know about CMAC — how we support students, how
          fundraising works, and how you can get involved.
        </p>
      </section>

      {faqGroups.map((group) => (
        <section className="content-card faq-group" key={group.title}>
          <h2 className="faq-group__title">
            {group.icon ? (
              <span className="faq-group__icon" aria-hidden="true">
                {group.icon}
              </span>
            ) : null}
            {group.title}
          </h2>

          <div className="faq-list">
            {group.items.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary className="faq-item__question">
                  <span>{item.question}</span>
                  <span className="faq-item__marker" aria-hidden="true" />
                </summary>
                <div className="faq-item__answer">
                  <p>{item.answerNode ?? item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
