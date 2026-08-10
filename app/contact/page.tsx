import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { ContactForm } from "@/app/_components/forms/ContactForm";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { LINKS } from "@/app/_config/links";
import { BUSINESS } from "@/app/_config/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact AM Working Dogs in Newport, TN about Kangal x Great Pyrenees livestock guardian puppies — availability, reserving, farm visits, and guardian dog questions.",
};

const payments = ["Cash", "PayPal", "Venmo", "Cash App", "Debit / credit card"];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Call or text for the fastest answer — Michael has the phone on him most of the day."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dog-puppy-portrait.jpeg"
        imagePosition="center 35%"
      />

      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--c-title)" }}>
                Reach Michael
              </h2>

              <div className="space-y-6">
                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-2"
                    style={{ color: "var(--c-ink-2)" }}
                  >
                    Phone / Text
                  </div>
                  <a
                    href={LINKS.phoneHref}
                    className="text-lg font-bold"
                    style={{ color: "var(--c-link)" }}
                  >
                    {LINKS.phone}
                  </a>
                  <p className="text-sm mt-1" style={{ color: "var(--c-ink-2)" }}>
                    Best way to reach us. Text is fine.
                  </p>
                </div>

                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-2"
                    style={{ color: "var(--c-ink-2)" }}
                  >
                    Email
                  </div>
                  <a
                    href={`mailto:${LINKS.email}`}
                    className="text-base font-medium break-all"
                    style={{ color: "var(--c-link)" }}
                  >
                    {LINKS.email}
                  </a>
                </div>

                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-2"
                    style={{ color: "var(--c-ink-2)" }}
                  >
                    Where We Are
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                    <strong>
                      {BUSINESS.address.locality}, {BUSINESS.address.regionName}{" "}
                      {BUSINESS.address.postalCode}
                    </strong>
                    <br />
                    Farm pickup, off I-40 between Knoxville and Asheville.
                    <br />
                    <span style={{ color: "var(--c-ink-2)" }}>
                      Exact address shared once a visit is confirmed.
                    </span>
                  </p>
                </div>

                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-2"
                    style={{ color: "var(--c-ink-2)" }}
                  >
                    Farm Visits
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                    {BUSINESS.hoursNote} — this is a working farm, not a storefront. Call
                    ahead and we&apos;ll set a time that works.
                  </p>
                </div>

                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-2"
                    style={{ color: "var(--c-ink-2)" }}
                  >
                    Payment Methods
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {payments.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-full text-xs font-medium border"
                        style={{
                          background: "var(--c-panel)",
                          borderColor: "var(--c-line)",
                          color: "var(--c-ink)",
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-wide mb-3"
                    style={{ color: "var(--c-ink-2)" }}
                  >
                    Follow Along
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href={LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 h-12 px-5 rounded-btn font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{ background: "#1877f2", color: "white", textDecoration: "none" }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-none">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Facebook
                    </a>
                    <a
                      href={LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 h-12 px-5 rounded-btn font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-none">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--c-title)" }}>
                Send a Message
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--c-ink-2)" }}>
                The more you tell us about your setup, the more useful our answer will be.
              </p>
              <ContactForm />

              <p className="text-sm mt-6" style={{ color: "var(--c-ink-2)" }}>
                Looking for care advice first? The{" "}
                <Link href="/dogs/faq" style={{ color: "var(--c-link)" }}>
                  FAQ
                </Link>{" "}
                and the{" "}
                <Link href="/dogs/care" style={{ color: "var(--c-link)" }}>
                  care guide
                </Link>{" "}
                cover most of what people ask.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
