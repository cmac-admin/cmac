export default function OrderFormPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Order Form</p>
        <h1>Concert Flowers & Drama Ornaments</h1>
        <p>Complete the form below to place your order.</p>
      </section>

      <section className="content-card">
        <div className="form-embed form-embed--order">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScrd01PmvNBLsV4ZRqhlKSNRGCgykUOClM61xDVlFGhrXjKiA/viewform?embedded=true"
            width="100%"
            height="2150"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="CMAC Order Form"
          >
            Loading order form...
          </iframe>
        </div>
      </section>
    </main>
  );
}
