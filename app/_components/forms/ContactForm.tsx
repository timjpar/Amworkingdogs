"use client";

import { useState } from "react";
import { submitContact } from "@/app/_actions/contact";

const SUBJECTS = [
  { value: "puppy", label: "Puppy availability" },
  { value: "reserve", label: "Reserving a puppy" },
  { value: "visit", label: "Visiting the farm" },
  { value: "advice", label: "Guardian dog questions" },
  { value: "other", label: "Something else" },
];

export function ContactForm({ defaultSubject = "puppy" }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const result = await submitContact({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
      honeypot: fd.get("_h") as string,
    });
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
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
          <input id="cf-name" name="name" type="text" required autoComplete="name" className="input-base" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Email <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="input-base" placeholder="you@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Phone
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className="input-base" placeholder="Optional, but faster" />
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            What&apos;s this about?
          </label>
          <select id="cf-subject" name="subject" className="input-base" defaultValue={defaultSubject}>
            {SUBJECTS.map((s) => (
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
          className="input-base resize-none"
          placeholder="Tell us what you're running — stock, acreage, fencing, and what you're up against for predators."
        />
      </div>

      {status === "error" && (
        <p
          className="text-sm p-3 rounded-card"
          style={{ background: "color-mix(in srgb, #b91c1c 12%, transparent)", color: "#b91c1c" }}
          role="alert"
        >
          {errorMsg}
        </p>
      )}

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
