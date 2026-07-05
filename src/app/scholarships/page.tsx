export default function ScholarshipsPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Scholarships</p>
        <h1>Scholarships</h1>
        <p>
          CMAC awards scholarships and grants to support student growth in
          music, visual arts, business, and related creative fields.
        </p>
      </section>

      <section className="content-card scholarship-block">
        <h2>Senior Scholarships (Grade 12)</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Application Deadline</th>
              <td>Saturday, May 1, 2027</td>
            </tr>
            <tr>
              <th scope="row">Award</th>
              <td>Selected student(s) will receive a $500 senior scholarship.</td>
            </tr>
            <tr>
              <th scope="row">Fund Release Requirement</th>
              <td>
                CMAC scholarship winner(s) will be required to submit an
                acceptance letter from the college or university of their
                choice. The fund will not be released without an acceptance
                letter.
              </td>
            </tr>
          </tbody>
        </table>
        <p className="section-label">Eligibility</p>
        <ol className="eligibility-list">
          <li>
            Applying students must be a senior or junior graduating in June
            2027 from Comsewogue High School.
          </li>
          <li>
            Applying students must be in good standing and free of any school
            suspension.
          </li>
          <li>
            Applying students MUST have applied to colleges majoring in one of
            the following fields:
          </li>
        </ol>
        <ul className="eligibility-sublist">
          <li>
            MUSIC-related fields (MUSIC – performance, pedagogy, history,
            theory, composition, education, therapy, business, technology,
            theater, etc.)
          </li>
          <li>
            ART-related fields (ART – visual arts, history, education, digital
            arts, fashion, film, etc.)
          </li>
          <li>
            Business and Engineering-related fields (Marketing, Architect)
          </li>
        </ul>
        <p className="center-link">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScLSr4Da2R51xg59lu_j57lMg5Xd8On3rHcEowwMgNAB9V1ng/viewform">
            APPLY FOR SENIOR SCHOLARSHIP
          </a>
        </p>
      </section>

      <section className="content-card scholarship-block">
        <h2>Summer Music & Arts Study Scholarships (Grades 3–11)</h2>
        <table className="scholarship-table">
          <tbody>
            <tr>
              <th scope="row">Application Deadline</th>
              <td>Saturday, May 1, 2027</td>
            </tr>
            <tr>
              <th scope="row">Award</th>
              <td>Selected student(s) receive a $100 scholarship.</td>
            </tr>
            <tr>
              <th scope="row">Schools Covered</th>
              <td>
                Boyle Road Elementary, Terryville Road Elementary, John F.
                Kennedy Middle School, and Comsewogue High School.
              </td>
            </tr>
          </tbody>
        </table>
        <p className="section-label">Eligibility</p>
        <ol className="eligibility-list">
          <li>
            Applying students must be in grades 3–11 at Boyle Road Elementary,
            Terryville Road Elementary, John F. Kennedy Middle School, or
            Comsewogue High School for the 2026–2027 school year.
          </li>
          <li>
            Applying students must be in good standing and free of any school
            suspension.
          </li>
          <li>
            Applying students should be pursuing one of the following areas:
          </li>
        </ol>
        <ul className="eligibility-sublist">
          <li>
            MUSIC-related fields (MUSIC – performance, pedagogy, history,
            theory, composition, education, therapy, business, technology,
            theater, etc.)
          </li>
          <li>
            ART-related fields (ART – visual arts, history, education, digital
            arts, fashion, film, etc.)
          </li>
          <li>
            Business and Engineering-related fields (Marketing, Architect)
          </li>
        </ul>
        <p className="center-link">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScir77ruuBlPuoi-X3sfDQvLOyjKDciKPPWahdHYigpSOvm_Q/viewform">
            APPLY FOR SUMMER STUDY SCHOLARSHIP
          </a>
        </p>
        <p className="subpage-link">
          <a href="https://www.comsewoguemusicandarts.org/scholarshipsANDGRANTS/">
            View previous Scholarships page
          </a>
        </p>
      </section>
    </main>
  );
}
