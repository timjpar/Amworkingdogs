import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { PUPPY_PRICE, DEPOSIT } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Reserve a Guardian Puppy",
  description:
    `Reserve a Kangal x Great Pyrenees livestock guardian puppy from AM Working Dogs in Newport, TN. A $${DEPOSIT} deposit holds your pick and comes off the $${PUPPY_PRICE} total.`,
};

const steps = [
  {
    n: "1",
    title: "Call or Text",
    desc: `Reach Michael at ${LINKS.phone}. Tell him what stock you're running, how much ground, and what your fencing looks like — that's how we match you to a pup.`,
  },
  {
    n: "2",
    title: "Put Down a Deposit",
    desc: `A $${DEPOSIT} deposit holds your pick from the litter and comes off the $${PUPPY_PRICE} total. Deposits aren't required for same-day pickups.`,
  },
  {
    n: "3",
    title: "Pick Up in Newport",
    desc: "Come out at eight weeks, meet the parents, see how the pups were raised, and take yours home with its records and feed.",
  },
];

const paymentMethods = [
  { label: "Cash (at pickup)", icon: "🤝" },
  { label: "PayPal", icon: "🔵" },
  { label: "Venmo", icon: "💸" },
  { label: "Cash App", icon: "💵" },
  { label: "Debit / credit card", icon: "💳" },
];

const holdTerms = [
  `Deposit is $${DEPOSIT} and applies toward the $${PUPPY_PRICE} total`,
  "Deposits are non-refundable once your pup is picked",
  "If we can't deliver a puppy that suits you, the deposit is fully refunded",
  "Balance is due at pickup",
  "We'll hold a pup past eight weeks if you need time — just tell us",
];

export default function ReservePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reserve a Puppy", path: "/reserve" },
        ])}
      />

      <PageHero
        eyebrow="Hold your pick"
        title="Reserve a Guardian Puppy"
        subtitle="Raised on our homestead in the Smoky Mountain foothills. Pickup in Newport, Tennessee."
        imageSrc="/images/dogs/kangal-pyrenees-livestock-guardian-dogs-pack.jpeg"
        imagePosition="center 45%"
      />

      {/* Steps */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="How It Works" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.n}
                className="rounded-card border p-6 text-center"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
                  style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)" }}
                  aria-hidden="true"
                >
                  {step.n}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deposit panel */}
      <section id="deposit" className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border p-8 md:p-12 text-center shadow-soft"
            style={{ borderColor: "var(--c-line)", background: "var(--c-page)" }}
          >
            <div className="text-5xl mb-4" aria-hidden="true">🐾</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--c-title)" }}>
              Hold Your Puppy
            </h2>
            <p className="text-lg mb-2" style={{ color: "var(--c-ink)" }}>
              A{" "}
              <strong style={{ color: "var(--c-brand)" }}>${DEPOSIT}{" "}deposit</strong>{" "}
              holds your pick.
            </p>
            <p className="text-base leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "var(--c-ink-2)" }}>
              Puppies are ${PUPPY_PRICE}, males and females alike. The deposit comes off
              the total, and the balance is due when you pick up in Newport.
            </p>

            <ul className="flex flex-col gap-3 items-center mb-8">
              {holdTerms.map((term) => (
                <li key={term} className="flex items-start gap-2 text-sm text-left max-w-sm" style={{ color: "var(--c-ink)" }}>
                  <span style={{ color: "var(--c-accent)" }} aria-hidden="true">✓</span>
                  {term}
                </li>
              ))}
            </ul>

            <div className="mb-8">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--c-ink-2)" }}
              >
                We accept
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {paymentMethods.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border"
                    style={{
                      background: "var(--c-panel)",
                      color: "var(--c-ink)",
                      borderColor: "var(--c-line)",
                    }}
                  >
                    <span aria-hidden="true">{m.icon}</span>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 items-stretch mx-auto max-w-sm">
              <a
                href={LINKS.phoneHref}
                className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-bold text-lg transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
              >
                Call or Text {LINKS.phone}
              </a>
              <a
                href={LINKS.paypal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-bold text-lg transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "#003087", color: "#ffffff", textDecoration: "none" }}
              >
                Pay Deposit with PayPal
              </a>
              <a
                href={LINKS.cashapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-bold text-lg transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "#00D036", color: "#ffffff", textDecoration: "none" }}
              >
                Pay Deposit with Cash App
              </a>
            </div>

            <p className="mt-6 text-sm" style={{ color: "var(--c-ink-2)" }}>
              Always call or text before sending a deposit so we can confirm which pup
              you&apos;re holding.
            </p>
            <p className="mt-3 text-xs" style={{ color: "var(--c-ink-2)" }}>
              Need another arrangement?{" "}
              <Link href="/contact" style={{ color: "var(--c-link)" }}>
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* What's available */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Not Sure What's Open?"
            subtitle="The available-puppies page has the current litter, and we post new pups to Facebook and Instagram as they arrive."
            className="mb-8"
          />
          <Link
            href="/puppies"
            className="inline-flex items-center justify-center h-14 px-10 rounded-btn font-bold text-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
          >
            View Available Puppies
          </Link>
        </div>
      </section>

      <CTABanner
        title="Questions Before You Commit?"
        subtitle="Fencing, two dogs versus one, poultry — ask before the deposit, not after."
        primaryLabel="Read the FAQ"
        primaryHref="/dogs/faq"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
