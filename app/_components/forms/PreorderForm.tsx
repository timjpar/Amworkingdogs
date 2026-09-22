"use client";

import { useState } from "react";
import { submitForm } from "@/app/_lib/submitForm";
import { FormErrorNotice } from "@/app/_components/forms/FormErrorNotice";
import { CONTACT_LIMITS, PREORDER_WANTS } from "@/app/_config/contact";
import { LINKS } from "@/app/_config/links";

/**
 * Next-litter pre-order list. Delivered the same way as the contact form —
 * straight from the browser to FormSubmit — so it lands in the same inbox with
 * "Pre-order" in the subject line. It takes no payment; it's a name on the list.
 */
export function PreorderForm() {
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
    const details = read("details");

    // `required` stops an empty field, but not one holding only spaces.
    if (!name || !email) {
      fail("Please fill in your name and email.");
      return;
    }

    const wants =
      PREORDER_WANTS.find((w) => w.value === read("wants"))?.label ?? PREORDER_WANTS[0].label;

    const result = await submitForm({
      // Both sites mail the same inbox, so the site name leads the subject.
      subject: `AM Working Dogs — Pre-order, next litter — ${name}`,
      fields: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "not given"],
        ["Looking for", wants],
        ["About their place", details || "not given"],
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
          You&apos;re on the list
        </h3>
        <p className="text-sm" style={{ color: "var(--c-ink-2)" }}>
          Michael will reach out as soon as the next litter is born. Want to talk it
          through sooner? Call or text{" "}
          <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
            {LINKS.phone}
          </a>
          .
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
          <label htmlFor="po-name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Name <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>*</span>
          </label>
          <input id="po-name" name="name" type="text" required maxLength={CONTACT_LIMITS.name} autoComplete="name" className="input-base" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="po-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Email <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>*</span>
          </label>
          <input id="po-email" name="email" type="email" required maxLength={CONTACT_LIMITS.email} autoComplete="email" className="input-base" placeholder="you@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="po-phone" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Phone
          </label>
          <input id="po-phone" name="phone" type="tel" maxLength={CONTACT_LIMITS.phone} autoComplete="tel" className="input-base" placeholder="Optional, but faster" />
        </div>
        <div>
          <label htmlFor="po-wants" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
            Looking for
          </label>
          <select id="po-wants" name="wants" className="input-base" defaultValue={PREORDER_WANTS[0].value}>
            {PREORDER_WANTS.map((w) => (
              <option key={w.value} value={w.value}>{w.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="po-details" className="block text-sm font-medium mb-1.5" style={{ color: "var(--c-ink)" }}>
          About your place
        </label>
        <textarea
          id="po-details"
          name="details"
          rows={4}
          maxLength={CONTACT_LIMITS.message}
          className="input-base resize-none"
          placeholder="Optional — what you're guarding, how much ground, and when you'd like a pup."
        />
      </div>

      {status === "error" && <FormErrorNotice message={errorMsg} showFallback={showFallback} />}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-12 rounded-btn font-semibold text-base transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)" }}
      >
        {status === "loading" ? "Sending…" : "Put Me on the List"}
      </button>
    </form>
  );
}
