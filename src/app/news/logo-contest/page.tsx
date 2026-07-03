import Link from "next/link";

export default function LogoContestStoryPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">News</p>
        <h1>Logo Contest</h1>
        <p>By Johanna Kosak | March 22, 2025</p>
      </section>

      <section className="content-card">
        <p>
          We held a logo contest in 2023 and the winner was Geana Ottenwalder
          (image 1099 Geana Ottenwalder) and the final logo was created. Geana
          won a $200 scholarship. Then Avry Van Schaick (Class of 2024) won the
          poster contest with our logo.
        </p>

        <div className="news-images story-images">
          <img
            src="https://www.comsewoguemusicandarts.org/wp-content/uploads/2025/03/IMG_1099-Geana-Ottenwalder.jpeg"
            alt="Logo contest winner Geana Ottenwalder"
          />
          <img
            src="https://www.comsewoguemusicandarts.org/wp-content/uploads/2025/03/CMAC-logo.jpg"
            alt="Winning CMAC logo graphic"
          />
          <img
            src="https://www.comsewoguemusicandarts.org/wp-content/uploads/2025/03/Winning-Poster-1.jpg"
            alt="Winning poster featuring the CMAC logo"
          />
        </div>

        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/logo-contest/">
            View original story page
          </a>
        </p>
        <p className="subpage-link">
          <Link href="/news">← Back to News</Link>
        </p>
      </section>
    </main>
  );
}
