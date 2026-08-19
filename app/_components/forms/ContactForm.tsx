"use client";

import { useState } from "react";
import { submitForm } from "@/app/_lib/submitForm";
import { FormErrorNotice } from "@/app/_components/forms/FormErrorNotice";
import { CONTACT_LIMITS, CONTACT_SUBJECTS } from "@/app/_config/contact";

export function ContactForm({ defaultSubject = "puppy" }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showFallback, setShowFallback] = useState(false);

  function fail(error: string, fallback = false) {
    setStatus("error");
    setErrorMsg(error);
    setShowFallback(fallback);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const read = (key: string) => ((fd.get(key) as string) ?? "").trim();

    const name = read("name");
    const email = read("email");
    const phone = read("phone");
    const message = read("message");

    // `required` stops an empty field, but not one holding only spaces.
    if (!name || !email || !message) {
      fail("Please fill in all required fields.");
      return;
    }

    // The email carries the label, not the <select> value it was chosen by.
    const subjectLabel =
      CONTACT_SUBJECTS.find((s) => s.value === read("subject"))?.label ?? "Something else";

    const result = await submitForm({
      // Both sites mail the same inbox, so the site name leads the subject.
      subject: `AM Working Dogs — ${subjectLabel} — ${name}`,
      fields: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "not given"],
        ["About", subjectLabel],
        ["Message", message],
      ],
      replyTo: email,
      honeypot: fd.get("_h") as string,
    });

    if (result.success) {
      setStatus("success");
    } else {
      fail(result.error ?? "Something went wrong. Please try again.", Boolean(result.showFallback));
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-card border p-8 text-center"
        style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
      >
        <div className="text-4xl mb-4" aria-hidden="true">🐾</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--c-title)" }}>
          Message sent
        </h3>
        <p className="text-sm" style={{ color: "var(--c-ink-2)" }}>
          Michael will get back to you within a day or two. If you need an answer sooner,
          call or text — that&apos;s always fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input name="_h" type="text" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Name <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>*</span>
          </label>
          <input id="cf-name" name="name" type="text" required maxLength={CONTACT_LIMITS.name} autoComplete="name" className="input-base" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Email <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>*</span>
          </label>
          <input id="cf-email" name="email" type="email" required maxLength={CONTACT_LIMITS.email} autoComplete="email" className="input-base" placeholder="you@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Phone
          </label>
          <input id="cf-phone" name="phone" type="tel" maxLength={CONTACT_LIMITS.phone} autoComplete="tel" className="input-base" placeholder="Optional, but faster" />
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            What&apos;s this about?
          </label>
          <select id="cf-subject" name="subject" className="input-base" defaultValue={defaultSubject}>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
          Message <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={CONTACT_LIMITS.message}
          className="input-base resize-none"
          placeholder="Tell us what you're running — stock, acreage, fencing, and what you're up against for predators."
        />
      </div>

      {status === "error" && <FormErrorNotice message={errorMsg} showFallback={showFallback} />}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-12 rounded-btn font-semibold text-base transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)" }}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
