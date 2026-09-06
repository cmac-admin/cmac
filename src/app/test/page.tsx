import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test",
  description: "CMAC brand test page using the studio yellow and navy palette from the logo.",
};

export default function TestPage() {
  return (
    <main className="test-page">
      <section className="test-page__hero">
        <div className="test-page__badge">TEST</div>
        <h1>CMAC Brand Test Page</h1>
        <p>
          A simple preview using the logo-inspired yellow, deep navy, and clean
          modern contrast for CMAC materials.
        </p>
      </section>

      <section className="test-page__grid" aria-label="Current CMAC logo palette">
        <article className="test-page__card test-page__card--primary">
          <p className="test-page__eyebrow">Primary Color</p>
          <div className="test-page__swatch test-page__swatch--yellow" />
          <h2>CMAC Yellow</h2>
          <p>#F5D116</p>
        </article>

        <article className="test-page__card test-page__card--secondary">
          <p className="test-page__eyebrow">Accent Color</p>
          <div className="test-page__swatch test-page__swatch--navy" />
          <h2>CMAC Navy</h2>
          <p>#173B63</p>
        </article>

        <article className="test-page__card test-page__card--soft">
          <p className="test-page__eyebrow">Supporting Tone</p>
          <div className="test-page__swatch test-page__swatch--sky" />
          <h2>Sky Blue</h2>
          <p>#EAF3FF</p>
        </article>
      </section>

      <section className="test-page__compare" aria-label="Legacy CMAC colors to compare">
        <h2 className="test-page__subheading">Legacy CMAC palette</h2>
        <div className="test-page__grid test-page__grid--legacy">
          <article className="test-page__card test-page__card--legacy">
            <p className="test-page__eyebrow">Original Gold</p>
            <div className="test-page__swatch test-page__swatch--old-gold" />
            <h2>Muted Gold</h2>
            <p>#C9A75A</p>
          </article>

          <article className="test-page__card test-page__card--legacy">
            <p className="test-page__eyebrow">Original Navy</p>
            <div className="test-page__swatch test-page__swatch--old-navy" />
            <h2>Deep Navy</h2>
            <p>#0F2037</p>
          </article>

          <article className="test-page__card test-page__card--legacy">
            <p className="test-page__eyebrow">Warm Tone</p>
            <div className="test-page__swatch test-page__swatch--old-cream" />
            <h2>Warm Cream</h2>
            <p>#F3EFE7</p>
          </article>
        </div>
      </section>

      <section className="test-page__panel">
        <h2>Sample callout</h2>
        <p>
          This layout keeps the CMAC identity strong while using the yellow from the
          logo as the main visual accent instead of the older gold tone.
        </p>
        <div className="test-page__actions">
          <button type="button">Primary Button</button>
          <button type="button" className="test-page__button--secondary">
            Secondary Button
          </button>
        </div>
      </section>
    </main>
  );
}
