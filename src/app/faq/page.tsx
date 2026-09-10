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
          "CMAC is a volunteer-run 501(c)(3) nonprofit that supports music, art, and theater programs in the Comsewogue School District. We provide student scholarships, teacher grants, and fundraising support at performances and events.",
      },
      {
        question: "Who does CMAC support?",
        answer:
          "We support Comsewogue students in grades 3–12 and the music, art, and drama teachers who work with them.",
      },
      {
        question: "How can I become a member?",
        answer:
          "Membership is open to parents, community members, and students. Join through our Get Involved page. Your support directly funds scholarships and teacher grants.",
        answerNode: (
          <>
            Membership is open to parents, community members, and students. Join
            through our <Link href="/get-involved">Get Involved page</Link>. Your
            support directly funds scholarships and teacher grants.
          </>
        ),
      },
      {
        question: "What are the membership levels?",
        answer:
          "Suggested levels begin at $10. Individual membership is $25 (includes a t-shirt), Family is $50, and higher supporter levels are also available. Full details are on the Get Involved page.",
        answerNode: (
          <>
            Suggested levels begin at $10. Individual membership is $25 (includes a
            t-shirt), Family is $50, and higher supporter levels are also
            available. Full details are on the <Link href="/get-involved">Get
            Involved page</Link>.
          </>
        ),
      },
    ],
  },
  {
    icon: "💵",
    title: "Fundraising & Donations",
    items: [
      {
        question: "What items does CMAC sell at events?",
        answer:
          "At concerts and drama productions we offer performance-night items such as personalized ornaments, flower bouquets, candy, balloons, and 'Kisses for the Cast.' All proceeds support scholarships and teacher grants.",
      },
      {
        question: "Where does the money go?",
        answer:
          "100% of proceeds fund student scholarships, teacher grants, and arts program support across the district.",
      },
      {
        question: "Can I donate directly?",
        answer:
          "Yes. You can donate through Venmo, Zelle, check, or the options listed on our Get Involved page.",
        answerNode: (
          <>
            Yes. You can donate through Venmo, Zelle, check, or the options listed
            on our <Link href="/get-involved">Get Involved page</Link>.
          </>
        ),
      },
      {
        question: "Are donations tax-deductible?",
        answer:
          "Yes. CMAC is a registered 501(c)(3) nonprofit. Donations are tax-deductible to the extent allowed by law.",
      },
    ],
  },
  {
    icon: "🎓",
    title: "Scholarships & Grants",
    items: [
      {
        question: "What scholarships does CMAC offer?",
        answer:
          "We offer a $500 Senior Scholarship for graduating seniors and $100 Summer Study Scholarships for students in grades 3–11. Details, eligibility, and applications are on our Scholarships page.",
        answerNode: (
          <>
            We offer a $500 Senior Scholarship for graduating seniors and $100
            Summer Study Scholarships for students in grades 3–11. Details,
            eligibility, and applications are on our{" "}
            <Link href="/scholarships">Scholarships page</Link>.
          </>
        ),
      },
      {
        question: "How do students apply for scholarships?",
        answer:
          "All applications are submitted online through the Scholarships page. Deadlines and requirements are posted there each year.",
        answerNode: (
          <>
            All applications are submitted online through the{" "}
            <Link href="/scholarships">Scholarships page</Link>. Deadlines and
            requirements are posted there each year.
          </>
        ),
      },
      {
        question: "How do teachers apply for grants?",
        answer:
          "Teachers submit a short proposal describing how the grant will enhance student learning in the arts. Information and the application are on our Teacher Grants page.",
        answerNode: (
          <>
            Teachers submit a short proposal describing how the grant will enhance
            student learning in the arts. Information and the application are on
            our <Link href="/teacher-grants">Teacher Grants page</Link>.
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
          "Volunteers help at event tables, prepare fundraising items, assist with communications, or support other tasks. Even a few hours makes a difference. Sign up on our Get Involved page.",
        answerNode: (
          <>
            Volunteers help at event tables, prepare fundraising items, assist
            with communications, or support other tasks. Even a few hours makes a
            difference. Sign up on our <Link href="/get-involved">Get Involved
            page</Link>.
          </>
        ),
      },
      {
        question: "Do I need experience to volunteer?",
        answer:
          "No experience is needed. We’ll show you everything you need to know.",
      },
      {
        question: "Can students volunteer?",
        answer:
          "Yes. Students, including Honor Society members, are welcome and can earn documented service hours while helping at events or serving as student representatives.",
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
          "We list the events we support on our Events page. Specific dates follow the Comsewogue School District calendar and may change, so please confirm with the school or district.",
        answerNode: (
          <>
            We list the events we support on our <Link href="/events">Events page</Link>.
            Specific dates follow the Comsewogue School District calendar and may
            change, so please confirm with the school or district.
          </>
        ),
      },
      {
        question: "Does CMAC run the school productions?",
        answer:
          "No. CMAC supports the students and teachers who create the productions by providing fundraising items and arts-program support.",
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

      <section className="content-card faq-group faq-group--cta">
        <h2 className="faq-group__title">Still have questions?</h2>
        <div className="faq-item__answer">
          <p>
            We’re happy to help.<br />
            <Link href="/contact">Contact CMAC</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
