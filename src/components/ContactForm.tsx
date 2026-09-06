"use client";

import { useMemo, useState, type FormEvent } from "react";

const emailAddress = "comsewoguemusicandarts@gmail.com";
const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
const schoolOptions = [
  "Comsewogue High School",
  "JFK Middle School",
  "Boyle Road Elementary School",
  "Terryville Road Elementary School",
  "Clinton Avenue Elementary School",
  "Norwood Elementary School",
  "Other",
];
const subjectOptions = [
  "Donating",
  "Events",
  "Grades 3-11 Scholarship",
  "Ordering",
  "Other",
  "Senior Scholarship",
  "Sponsorship",
  "Teacher Grant",
  "Volunteering",
];

export default function ContactForm() {
  const [category, setCategory] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [school, setSchool] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const pageLocation = useMemo(() => {
    if (typeof window === "undefined") {
      return "Unknown page";
    }

    const params = new URLSearchParams(window.location.search);
    const rawPage = params.get("page");

    if (rawPage) {
      return rawPage;
    }

    return `${window.location.pathname}${window.location.search}${window.location.hash}` || "Unknown page";
  }, []);

  const subjectLabel = useMemo(() => {
    if (category === "Other") {
      return customSubject.trim() || "Other";
    }
    return category;
  }, [category, customSubject]);

  const fallbackMailto = (payload: {
    name: string;
    email: string;
    schoolProgram: string;
    message: string;
    subject: string;
    body: string;
  }) => {
    const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(payload.subject)}&cc=${encodeURIComponent(payload.email)}&body=${encodeURIComponent(payload.body)}`;
    window.location.href = mailtoHref;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const schoolProgram = school === "Other" ? (customSchool.trim() || "Other") : school;
    const message = String(formData.get("message") ?? "").trim();

    const subject = `[CMAC Contact] ${subjectLabel}`;
    const body = [
      "Name: " + (name || "N/A"),
      "Email: " + (email || "N/A"),
      "Category: " + subjectLabel,
      "School/Program: " + schoolProgram,
      "Page: " + pageLocation,
      "",
      "Message:",
      message || "N/A",
    ].join("\n");

    const payload = { name, email, schoolProgram, message, subject, body, page: pageLocation };

    if (formEndpoint) {
      setStatus("sending");
      setStatusMessage("Sending your message...");

      try {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            category: subjectLabel,
            school: schoolProgram,
            message,
            subject,
            body,
            page: pageLocation,
            _replyto: email,
            _cc: email,
          }),
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        form.reset();
        setCategory("");
        setCustomSubject("");
        setSchool("");
        setCustomSchool("");
        setStatus("success");
        setStatusMessage("Message Sent. A copy has been sent to the email address you entered.");
        return;
      } catch (error) {
        setStatus("error");
        setStatusMessage("Your message could not be sent automatically. Opening your email app instead.");
        fallbackMailto(payload);
        return;
      }
    }

    fallbackMailto(payload);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <label>
          Full Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>

        <label>
          Email Address
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>

        <label>
          Page
          <input type="text" value={pageLocation} readOnly aria-readonly="true" />
        </label>

        <label>
          Topic
          <select
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            <option value="">Select a topic</option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          School
          <select
            name="schoolProgram"
            value={school}
            onChange={(event) => setSchool(event.target.value)}
            required
          >
            <option value="">Select a school</option>
            {schoolOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        {school === "Other" && (
          <label className="contact-form__full">
            Custom School / Program
            <input
              type="text"
              value={customSchool}
              onChange={(event) => setCustomSchool(event.target.value)}
              placeholder="Please enter your school or organization"
            />
          </label>
        )}

        {category === "Other" && (
          <label className="contact-form__full">
            Custom Subject
            <input
              type="text"
              value={customSubject}
              onChange={(event) => setCustomSubject(event.target.value)}
              placeholder="Please describe your topic"
            />
          </label>
        )}

        <label className="contact-form__full">
          Message
          <textarea
            name="message"
            rows={6}
            placeholder="Please share your question or request."
            required
          />
        </label>
      </div>

      <div className="contact-form__actions">
        <button type="submit" className="apply-btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {statusMessage && (
          <p
            className={`contact-form__status contact-form__status--${status}`}
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
