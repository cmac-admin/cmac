"use client";

import { useState, type FormEvent } from "react";

const formEndpoint = "https://formspree.io/f/xrpgaerj";

export function BoardFeedbackForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("sending");
    setStatusMessage("Sending your feedback...");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Board reviewer",
          email: email || "",
          page: typeof window !== "undefined" ? window.location.pathname : "",
          feedback,
          subject: "Board Review Feedback",
          _subject: "Board Review Feedback",
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      setStatusMessage("Thanks. Your feedback has been sent.");
      setName("");
      setEmail("");
      setFeedback("");
    } catch (error) {
      setStatus("error");
      setStatusMessage("Could not send automatically. Please email your notes to CMAC directly.");
    }
  };

  return (
    <section className="board-feedback" aria-label="Board review feedback">
      <div className="board-feedback__header">
        <p className="board-feedback__eyebrow">Board Review</p>
        <h2>Share feedback on this page</h2>
      </div>

      <form className="board-feedback__form" onSubmit={handleSubmit}>
        <label className="board-feedback__field board-feedback__field--full">
          What would you like changed?
          <textarea
            name="feedback"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Type the revisions or edits you want to see..."
            rows={6}
            required
          />
        </label>

        <div className="board-feedback__meta">
          <label className="board-feedback__field">
            Name (optional)
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className="board-feedback__field">
            Email (optional)
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className="board-feedback__actions">
          <button type="submit" className="apply-btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Feedback"}
          </button>
        </div>

        {statusMessage && (
          <p
            className={`contact-form__status contact-form__status--${status}`}
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}
      </form>
    </section>
  );
}
