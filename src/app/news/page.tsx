import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">News</p>
        <h1>Latest Updates from CMAC</h1>
        <p>
          Follow announcements, highlights, and student achievements from
          programs across the district.
        </p>
      </section>

      <section className="content-card">
        <h2>Featured Stories</h2>
        <article className="news-item">
          <h3>Our First Teacher Grant Recipient</h3>
          <p className="news-date">By Yoon Perrone | October 16, 2025</p>
          <p>
            CMAC is thrilled to announce and congratulate Ms. Daly-Greco on
            being our first Teacher Grant Recipient. Several Comsewogue
            teachers applied for a grant over the summer.
          </p>
          <p>
            Ms. Daly-Greco is an art teacher at JFK and Clinton Ave. Her grant
            proposal is for a summer professional workshop to learn more about a
            choice-based approach to teaching. She has already spent her time
            reading and researching the topic. CMAC Board members determined her
            project would benefit the most of our fine art students.
          </p>
          <p>
            Congratulations, Ms. Daly-Greco!
            <br />
            And, THANK YOU to all of the Comsewogue teachers, for always
            working so hard to provide the very best education for our students!
          </p>
          <p>
            <a href="https://www.facebook.com/share/p/18Ri7hmqTH/">
              Read full story
            </a>
          </p>
        </article>

        <article className="news-item">
          <h3>Logo Contest</h3>
          <p className="news-date">By Johanna Kosak | March 22, 2025</p>
          <p>
            We held a logo contest in 2023 and the winner was Geana Ottenwalder
            (image 1099 Geana Ottenwalder) and the final logo was created.
            Geana won a $200 scholarship. Then Avry Van Schaick (Class of 2024)
            won the poster contest with our logo.
          </p>
          <p>
            <Link href="/news/logo-contest">
              Read full story
            </Link>
          </p>
        </article>

        <article className="news-item">
          <h3>
            Johanna Kosak as the Fifth Legislative District’s Woman of
            Distinction
          </h3>
          <p className="news-date">By Yoon Choi | March 11, 2025</p>
          <p>
            Kosak founded the Comsewogue Music and Arts Corporation, a
            501(c)(3) nonprofit organization, in September 2023 after her
            daughter noticed a lack of music and arts scholarships in the
            Comsewogue School District. The nonprofit organization assists
            students pursuing creative paths.
          </p>
          <p>
            <a href="https://tbrnewsmedia.com/?s=woman+of+distinction+Johanna+Kosak">
              Read full article
            </a>
            {" · "}
            <a href="https://www.comsewoguemusicandarts.org/johanna-kosak-as-the-fifth-legislative-districts-woman-of-distinction/">
              Previous page & photos
            </a>
          </p>
        </article>

        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/category/news/">
            Browse previous News posts
          </a>
        </p>
      </section>

      <section className="content-card">
        <h2>Join Our Email List</h2>
        <p className="muted-copy">
          Stay connected for CMAC announcements, event updates, and scholarship
          reminders.
        </p>
        <p className="coming-soon-banner">COMING SOON</p>
        <form className="membership-form mailing-list-form">
          <label>
            Name
            <input type="text" name="mailName" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="mailEmail" placeholder="you@email.com" />
          </label>
          <button type="button" disabled>Join Email List</button>
        </form>
      </section>
    </main>
  );
}
