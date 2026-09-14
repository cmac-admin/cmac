import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export default async function GetInvolvedBoardReviewPage() {
  const membershipFormUrl = await resolveFormLink("membership", DEFAULT_FORM_LINKS);

  return (
    <main className="subpage get-involved-page">
      <section className="subpage-hero">
        <h1>Get Involved</h1>
        <p>
          Help keep music and the arts strong for Comsewogue students in grades 3–12.
          Every contribution—whether a donation, membership, or your time—directly funds
          student scholarships and teacher grants. 100% of fundraising proceeds support our mission.
        </p>
      </section>

      <section className="content-card" id="choose-your-impact">
        <h2>Choose your impact</h2>
        <div className="membership-grid membership-grid--compact">
          <article className="membership-tier">
            <h3>Donate</h3>
            <p>Make an immediate impact</p>
            <ul>
              <li>Scholarships</li>
              <li>Teacher grants</li>
              <li>Student programs</li>
            </ul>
            <a href="#donate" className="mini-cta-link">Learn more</a>
          </article>

          <article className="membership-tier">
            <h3>Membership</h3>
            <p>Stay connected</p>
            <ul>
              <li>Meetings</li>
              <li>Voting</li>
              <li>Updates</li>
            </ul>
            <a href="#membership" className="mini-cta-link">Learn more</a>
          </article>

          <article className="membership-tier">
            <h3>Volunteer</h3>
            <p>Give your time</p>
            <ul>
              <li>Fundraising</li>
              <li>Event support</li>
              <li>Community help</li>
            </ul>
            <a href="#volunteer" className="mini-cta-link">Learn more</a>
          </article>
        </div>
      </section>

      <section className="content-card" id="donate">
        <h2>1. Donate</h2>
        <p className="muted-copy">
          <strong>Make an Immediate Impact</strong>
        </p>
        <p className="muted-copy">
          Your donation directly benefits Comsewogue&apos;s fine arts students through annual
          scholarships awarded in June and grants that help teachers enhance music and arts
          programs.
        </p>
        <p className="muted-copy">
          Seniors pursuing Music, Arts, Architecture, or Business Marketing in college are among
          those who receive scholarships. One teacher grant is awarded each year based on faculty
          proposals that benefit students.
        </p>

        <h3>Ways to Give</h3>

        <div className="content-card content-card--nested">
          <h4>Venmo</h4>
          <p className="muted-copy">@CMAC-Comsewogue</p>
          <p className="muted-copy">Scan the QR code or search the handle.</p>
        </div>

        <div className="content-card content-card--nested">
          <h4>Checks</h4>
          <p className="muted-copy">Make payable to Comsewogue Music and Arts Co.</p>
          <p className="muted-copy">
            Mail or drop off at:<br />
            Comsewogue Music and Arts Co.<br />
            c/o Comsewogue High School<br />
            565 Bicycle Path<br />
            Port Jefferson Station, NY 11776
          </p>
          <p className="muted-copy">
            Your gift is tax-deductible. Venmo transaction records or canceled checks serve as
            receipts. For an official letter, email
            <a href="mailto:comsewoguemusicandarts@gmail.com" className="text-link">
              {" "}comsewoguemusicandarts@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="primary-cta-row">
          <a href="/get-involved#direct-donate" className="apply-btn">
            Donate Now
          </a>
        </div>
      </section>

      <section className="content-card" id="membership">
        <h2>2. Become a Member</h2>
        <p className="muted-copy">
          <strong>Join CMAC and Stay Connected</strong>
        </p>
        <p className="muted-copy">
          Membership is free and open to parents, students, and community members who care about
          music and the arts.
        </p>

        <h3>Benefits</h3>
        <ul>
          <li>Receive meeting notifications and minutes</li>
          <li>Vote in elections and help shape decisions</li>
          <li>Stay informed about scholarships, events, and opportunities</li>
          <li>Optional support levels:</li>
          <ul>
            <li>Suggested donation: $10</li>
            <li>$25 or more: Receive a free CMAC T-shirt (adult sizes; available at winter concerts or in the spring)</li>
          </ul>
        </ul>

        <p className="muted-copy">
          All donations are tax-deductible. Meetings are held via Google Meet. Student members
          should use a personal email address (school accounts cannot receive our messages).
        </p>

        <div className="primary-cta-row">
          <a href={membershipFormUrl} className="apply-btn" target="_blank" rel="noreferrer">
            Join / Apply for Membership
          </a>
        </div>
      </section>

      <section className="content-card" id="volunteer">
        <h2>3. Volunteer</h2>
        <p className="muted-copy">
          <strong>Prefer to Give Your Time?</strong>
        </p>
        <p className="muted-copy">
          We welcome help with a few key activities throughout the year. Time is limited for many
          families, so even occasional support makes a difference.
        </p>

        <h3>Current needs include:</h3>
        <ul>
          <li>Board member</li>
          <li>Flower sales — assembling bouquets</li>
          <li>Drama production / musicals ornament sales</li>
          <li>General fundraising committee</li>
          <li>Membership coordinator (experience with Google Drive and contacts helpful)</li>
          <li>Raffle basket collection &amp; assembly</li>
          <li>Flexible help as needed</li>
        </ul>

        <p className="muted-copy">
          If you&apos;re interested, note it on the membership form or email us at
          <a href="mailto:comsewoguemusicandarts@gmail.com" className="text-link">
            {" "}comsewoguemusicandarts@gmail.com
          </a>
          . We&apos;ll follow up with details when opportunities arise.
        </p>

        <div className="primary-cta-row">
          <a href={membershipFormUrl} className="secondary-btn" target="_blank" rel="noreferrer">
            I&apos;m Interested in Volunteering
          </a>
        </div>
      </section>

      <section className="content-card">
        <p className="muted-copy">
          Thank you for supporting music and arts education in the Comsewogue community.
        </p>
      </section>
    </main>
  );
}
