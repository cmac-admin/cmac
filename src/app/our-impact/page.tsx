import type { Metadata } from "next";

const seniorStories = [
  {
    name: "Ava M.",
    meta: "2025 Senior Scholarship Recipient",
    label: "Music Performance",
    visual: "sunset",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    result: "Helped fund her next step in music study.",
    quote:
      "I’m so grateful for the support from CMAC. The scholarship helped me pursue my music degree and gave me the confidence to keep growing as a performer.",
  },
  {
    name: "Jordan P.",
    meta: "2024 Senior Scholarship Recipient",
    label: "Visual Arts",
    visual: "violet",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
    result: "Helped cover the cost of College Art Study.",
    quote:
      "This funding made it possible for me to continue my studies in art and design. I am truly thankful for a community that believes in young artists.",
  },
  {
    name: "Sophia T.",
    meta: "2023 Senior Scholarship Recipient",
    label: "Theater & Media",
    visual: "forest",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80",
    result: "Opened new creative career pathways.",
    quote:
      "CMAC helped open doors that I thought were out of reach. I’m grateful for the encouragement and the belief that the arts can be a life path.",
  },
];

const gradesStories = [
  {
    name: "Lena F.",
    grade: "Grade 4",
    meta: "Summer Music Study Scholarship",
    label: "Private Lessons",
    visual: "gold",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    result: "Kept her piano lessons going all summer.",
    quote:
      "The scholarship helped me keep taking piano lessons and build confidence in my playing. I’m thankful for the chance to keep improving.",
  },
  {
    name: "Mateo R.",
    grade: "Grade 7",
    meta: "Summer Arts Study Scholarship",
    label: "Studio Workshop",
    visual: "teal",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    result: "Gave him access to an art program that may not have been possible otherwise.",
    quote:
      "I was able to attend a visual arts program I never thought I could afford, and it changed how I see my future. I’m grateful every day.",
  },
  {
    name: "Zoe H.",
    grade: "Grade 3",
    meta: "Summer Performance Scholarship",
    label: "Choir Camp",
    visual: "rose",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    result: "Helped her grow in confidence through performance.",
    quote:
      "CMAC gave me the chance to learn, perform, and grow with other student musicians. I’m grateful for the support that kept me moving forward.",
  },
];

const teacherStories = [
  {
    name: "Ms. Elena Cruz",
    meta: "Middle School Visual Arts Teacher",
    label: "Mixed-Media Lab",
    visual: "navy",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    result: "Expanded creative studio experiences for students.",
    quote:
      "The CMAC grant let us build a stronger studio experience for our students, and the impact was immediate. We’re grateful for the investment in creativity.",
  },
  {
    name: "Mr. Daniel Brooks",
    meta: "High School Band Teacher",
    label: "Instrument Access",
    visual: "silver",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=900&q=80",
    result: "Broadened student access to instruments and materials.",
    quote:
      "This support gave students access to materials and opportunities they otherwise would not have had. It made a meaningful difference in our program.",
  },
  {
    name: "Ms. Priya Singh",
    meta: "Elementary Music Teacher",
    label: "Performance Project",
    visual: "amber",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    result: "Created a more immersive and memorable music experience.",
    quote:
      "The grant helped us bring a more immersive music experience to our students. We are so thankful to CMAC for supporting hands-on learning.",
  },
];

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See how CMAC supports students and teachers through senior scholarships, student arts funding, and teacher grants across the Comsewogue School District.",
  openGraph: {
    title: "Our Impact | Comsewogue Music & Arts Corp.",
    description:
      "CMAC supports student musicians, artists, and classroom creativity across the Comsewogue School District through scholarships and teacher grants.",
    url: "https://www.comsewoguemusicandarts.org/our-impact",
  },
};

function ImpactQuoteCard({
  name,
  meta,
  label,
  visual,
  image,
  quote,
  grade,
  result,
}: {
  name: string;
  meta: string;
  label: string;
  visual: string;
  image?: string;
  quote: string;
  grade?: string;
  result?: string;
}) {
  return (
    <article className="impact-story-card">
      <div
        className={`impact-story-card__visual impact-story-card__visual--${visual}`}
        aria-hidden="true"
        style={image ? { backgroundImage: `linear-gradient(180deg, rgba(10,17,25,0.12), rgba(10,17,25,0.58)), url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <span>{label}</span>
      </div>
      <div className="impact-story-card__body">
        <p className="impact-story-card__quote">“{quote}”</p>
        <p className="impact-story-card__name">{name}</p>
        <p className="impact-story-card__meta">{grade ? `${grade} • ` : ""}{meta}</p>
        {result ? <p className="impact-story-card__result">Impact: {result}</p> : null}
      </div>
    </article>
  );
}

export default function OurImpactPage() {
  return (
    <main className="subpage impact-page">
      <section className="subpage-hero">
        <p className="subpage-kicker">Our Impact</p>
        <h1>Supporting creativity, confidence, and opportunity.</h1>
        <p>
          CMAC helps students and teachers do more with the arts through scholarships,
          school-based support, and meaningful classroom investment across the district.
        </p>
      </section>

      <section className="content-card">
        <h2>How CMAC Makes a Difference</h2>
        <div className="impact-overview-grid">
          <article className="impact-overview-item">
            <span className="impact-overview-item__value">Seniors</span>
            <p>Helping graduating students pursue college and creative careers.</p>
          </article>
          <article className="impact-overview-item">
            <span className="impact-overview-item__value">Grades 3–11</span>
            <p>Funding summer study, lessons, camps, and art enrichment.</p>
          </article>
          <article className="impact-overview-item">
            <span className="impact-overview-item__value">Teacher Grants</span>
            <p>Supporting innovative classroom projects that deepen learning.</p>
          </article>
        </div>
        <p className="impact-note">Sample testimonials below are for display purposes only.</p>
      </section>

      <section className="content-card impact-section">
        <h2>Seniors</h2>
        <p className="impact-section__intro">
          Our senior scholarships help students take the next step in music, art, and creative careers with the encouragement of the broader CMAC community.
        </p>
        <div className="impact-story-grid">
          {seniorStories.map((story) => (
            <ImpactQuoteCard key={story.name} {...story} />
          ))}
        </div>
      </section>

      <section className="content-card impact-section">
        <h2>Grades 3–11</h2>
        <p className="impact-section__intro">
          CMAC scholarships for younger students help keep arts education accessible and inspiring, from lessons to summer workshops and performance camps.
        </p>
        <div className="impact-story-grid">
          {gradesStories.map((story) => (
            <ImpactQuoteCard key={story.name} {...story} />
          ))}
        </div>
      </section>

      <section className="content-card impact-section">
        <h2>Teacher Grants</h2>
        <p className="impact-section__intro">
          Teachers bring the arts to life in the classroom, and CMAC grants help fund experiences, tools, and projects that create lasting student growth.
        </p>
        <div className="impact-story-grid">
          {teacherStories.map((story) => (
            <ImpactQuoteCard key={story.name} {...story} />
          ))}
        </div>
      </section>
    </main>
  );
}
