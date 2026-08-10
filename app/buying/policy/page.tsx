import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { PUPPY_PRICE, DEPOSIT } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Health & Sales Policy",
  description:
    "Our terms in plain language: what a puppy comes with, deposit and payment terms, the health guarantee, what isn't covered, and our rehoming commitment.",
};

const policies = [
  {
    title: "Price & Deposit",
    points: [
      `Puppies are $${PUPPY_PRICE}, males and females alike.`,
      `A $${DEPOSIT} deposit holds a specific puppy and applies toward the total.`,
      "Deposits are non-refundable once you've picked your pup — that's what takes it off the list for everyone else.",
      "If we can't deliver a puppy that suits you, your deposit is refunded in full.",
      "The balance is due at pickup.",
      "Deposits aren't required for same-day pickups.",
    ],
  },
  {
    title: "What Comes With Your Puppy",
    points: [
      "A health check before the pup leaves our place.",
      "Age-appropriate worming and first vaccinations.",
      "A written record of everything that's been done and when.",
      "The food they've been eating, plus feeding and transition instructions.",
      "Phone and text support for as long as you own the dog.",
    ],
  },
  {
    title: "Health Guarantee",
    points: [
      "Our puppies are healthy, well started, and raised in clean conditions.",
      "Have your vet look the pup over within 72 hours of pickup.",
      "If your vet finds a serious congenital or hereditary defect in that window, bring us the written diagnosis and we'll replace the puppy from a future litter or refund the purchase price.",
      "We can't guarantee against parasites, kennel cough, or anything picked up after the pup leaves — those come with any young dog.",
      "We don't guarantee adult size, coat, color, or working ability. These are living animals, not equipment.",
    ],
  },
  {
    title: "Our Expectations of You",
    points: [
      "Adequate fencing and shelter before the puppy comes home.",
      "Large-breed puppy food and a lean body condition through growth.",
      "Routine vet care, including rabies and parasite prevention.",
      "Daily handling so the dog stays catchable and manageable.",
      "No chaining as a substitute for fencing.",
    ],
  },
  {
    title: "If It Doesn't Work Out",
    points: [
      "Life changes and some placements don't fit. We'd rather hear from you than see one of our dogs end up in a shelter.",
      "Call us first. We'll help you rehome the dog or take it back — at any age, for the dog's whole life.",
      "We don't guarantee a refund on a returned adult, but we will always help you find it a good place.",
    ],
  },
];

export default function PolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Health & Sales Policy", path: "/buying/policy" },
        ])}
      />

      <PageHero
        eyebrow="The fine print, unfined"
        title="Health & Sales Policy"
        subtitle="What you get, what we expect, and what happens if something goes sideways."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dog-puppy-portrait.jpeg"
        imagePosition="center 35%"
      />

      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto space-y-10">
          {policies.map((section, i) => (
            <article key={section.title}>
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: "var(--c-accent)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-bold" style={{ color: "var(--c-title)" }}>
                  {section.title}
                </h2>
              </div>
              <ul
                className="rounded-card border p-6 space-y-3"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="flex-none mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--c-accent)" }}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div
            className="rounded-card border p-6 text-center"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
              Questions about any of this before you put money down? Call or text Michael at{" "}
              <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
                {LINKS.phone}
              </a>{" "}
              or{" "}
              <Link href="/contact" style={{ color: "var(--c-link)" }}>
                send a message
              </Link>
              . We&apos;d rather answer it twice than have you surprised.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Everything Clear?"
        subtitle="Then let's talk about which puppy fits your place."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Reserve a Puppy"
        secondaryHref="/reserve"
      />
    </>
  );
}
