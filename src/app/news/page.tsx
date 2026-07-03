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
        <h2>Featured Story</h2>
        <article className="news-item">
          <h3>Logo Contest</h3>
          <p className="news-date">March 22, 2025</p>
          <p>
            CMAC held a logo contest and celebrated student winners who helped
            shape the organization’s visual identity.
          </p>
          <p>
            <a href="https://www.comsewoguemusicandarts.org/logo-contest/">
              Read full story
            </a>
          </p>
        </article>
        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/category/news/">
            Browse previous News posts
          </a>
        </p>
      </section>
    </main>
  );
}
