import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { PuppyCard } from "@/app/_components/cards/PuppyCard";
import { PreorderForm } from "@/app/_components/forms/PreorderForm";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { puppyProductSchema, breadcrumbSchema } from "@/app/_lib/schema";
import {
  LITTER,
  litterCounts,
  puppiesByAvailability,
  includedWithPuppy,
  matchingNotes,
  takingPreorders,
  PREORDER_HREF,
} from "@/app/_data/litter";
import { CROSS } from "@/app/_data/breed";
import { PUPPY_PRICE, DEPOSIT } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Available Puppies",
  description: `Kangal x Great Pyrenees livestock guardian puppies for sale in Newport, TN — $${PUPPY_PRICE} for males and females. Health checked, wormed, first shots, raised with poultry and stock.`,
};

const statusCopy = {
  available: {
    heroTitle: "Available Guardian Puppies",
    heroSubtitle: "Raised in the barn with the flock, health checked, and ready to go to work.",
    badge: "Puppies available",
    heading: "Meet the Litter",
    sub: "Every pup below is from the current litter. Call or text to check what's still open — the list moves fast, and this page won't always be same-day accurate.",
  },
  expecting: {
    heroTitle: "Guardian Puppies",
    heroSubtitle: "A new litter is on the way, and pre-orders are open now.",
    badge: "Litter expected",
    heading: "A Litter Is On the Way",
    sub: "Deposits hold a spot in line before the pups hit the ground. Get on the list below, or call and we'll talk it through.",
  },
  between: {
    heroTitle: "Guardian Puppies",
    heroSubtitle: "The last litter is sold out. Pre-orders are open for the next one.",
    badge: "Sold out",
    heading: "Pre-Order From the Next Litter",
    sub: "Every pup from our last litter has gone home. Get on the list below and Michael will reach out as soon as the next litter is born.",
  },
} as const;

const preorderSteps = [
  "Put your name down — tell us what you're guarding and whether you're after a male, a female, or a pair.",
  "Michael reaches out as soon as the next litter is born.",
  `Pick your pup. A $${DEPOSIT} deposit holds it, and the balance is due at pickup in Newport.`,
];

export default function PuppiesPage() {
  const copy = statusCopy[LITTER.status];
  const showRoster = LITTER.status !== "between";

  return (
    <>
      <JsonLd
        data={[
          puppyProductSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Available Puppies", path: "/puppies" },
          ]),
        ]}
      />

      <PageHero
        eyebrow={CROSS.ratio}
        title={copy.heroTitle}
        subtitle={copy.heroSubtitle}
        imageSrc="/images/dogs/kangal-pyrenees-guardian-puppies-pair.jpeg"
        imagePosition="center 40%"
      />

      {/* Status + pricing */}
      <section className="py-14 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4"
            style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)" }}
          >
            <span aria-hidden="true">🐾</span>
            {copy.badge}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--c-title)" }}>
            {copy.heading}
          </h2>

          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--c-ink)" }}>
            {copy.sub}
          </p>

          {showRoster && (
            <>
              {/* Litter stat strip */}
              <div
                className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-card overflow-hidden border"
                style={{ background: "var(--c-line)", borderColor: "var(--c-line)" }}
              >
                {[
                  { value: `$${PUPPY_PRICE}`, label: "Males & females" },
                  { value: litterCounts.available, label: "Still available" },
                  {
                    value: `${litterCounts.females}F / ${litterCounts.males}M`,
                    label: `${litterCounts.total} in the litter`,
                  },
                  { value: "8 wks", label: "Go-home age" },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-5" style={{ background: "var(--c-panel)" }}>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--c-brand)", fontFamily: "var(--font-display)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--c-ink-2)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm mt-6" style={{ color: "var(--c-ink-2)" }}>
                {LITTER.born} · {LITTER.readyDate}
              </p>
              {LITTER.note && (
                <p className="text-sm italic mt-2 max-w-lg mx-auto" style={{ color: "var(--c-ink-2)" }}>
                  {LITTER.note}
                </p>
              )}
            </>
          )}

          {!takingPreorders && (
            <>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <a
                  href={LINKS.phoneHref}
                  className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-bold text-lg transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
                >
                  Call or Text {LINKS.phone}
                </a>
                <Link
                  href="/reserve"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-bold text-lg border-2 transition-all hover:opacity-80"
                  style={{ borderColor: "var(--c-brand)", color: "var(--c-brand)", textDecoration: "none" }}
                >
                  Reserve With a Deposit
                </Link>
              </div>

              <p className="text-sm mt-6" style={{ color: "var(--c-ink-2)" }}>
                A ${DEPOSIT}{" "}
                deposit holds your pick and comes off the total. Deposits aren&apos;t required
                for same-day pickups.
              </p>
            </>
          )}
        </div>
      </section>

      {/* PRE-ORDERS — replaces the roster's call to action once the litter is gone */}
      {takingPreorders && (
        <section id="pre-order" className="pb-16 px-4 scroll-mt-24" style={{ background: "var(--c-page)" }}>
          <div
            className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-10 items-start rounded-card border p-6 md:p-10 shadow-soft"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--c-title)" }}>
                Pre-Order a Puppy
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-ink)" }}>
                Getting on the list is free and doesn&apos;t commit you to anything.
              </p>
              <ol className="space-y-4">
                {preorderSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className="flex-none w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)" }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed pt-1" style={{ color: "var(--c-ink)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-sm mt-6" style={{ color: "var(--c-ink-2)" }}>
                Rather talk it through? Call or text Michael at{" "}
                <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
                  {LINKS.phone}
                </a>
                .
              </p>
            </div>

            <PreorderForm />
          </div>
        </section>
      )}

      {/* THE ROSTER */}
      {showRoster && (
        <section className="pb-16 px-4" style={{ background: "var(--c-page)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {puppiesByAvailability.map((puppy, i) => (
                <PuppyCard key={puppy.id} puppy={puppy} priority={i < 3} />
              ))}
            </div>

            <p className="text-sm text-center mt-10" style={{ color: "var(--c-ink-2)" }}>
              Puppies go by collar color until their new families name them. Call or text
              Michael at{" "}
              <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
                {LINKS.phone}
              </a>{" "}
              and say which collar you&apos;re after.
            </p>
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div
              className="relative aspect-[4/3] rounded-card overflow-hidden border shadow-soft"
              style={{ borderColor: "var(--c-line)" }}
            >
              <Image
                src="/images/dogs/kangal-pyrenees-guardian-puppy-held-newport-tn.jpeg"
                alt="Kangal x Great Pyrenees guardian puppy being held in Newport, Tennessee"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <SectionHeader title="What Goes Home With You" align="left" className="mb-6" />
              <ul className="space-y-3">
                {includedWithPuppy.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="flex-none mt-0.5 font-bold"
                      style={{ color: "var(--c-accent)" }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-base" style={{ color: "var(--c-ink)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm" style={{ color: "var(--c-ink-2)" }}>
                Full terms are on the{" "}
                <Link href="/buying/policy" style={{ color: "var(--c-link)" }}>
                  health &amp; sales policy
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Picking a pup */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Picking the Right Pup"
            subtitle="We'd rather place the right dog than the fastest sale."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingNotes.map((note) => (
              <div
                key={note.title}
                className="rounded-card border p-6"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {note.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {note.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's Get You a Guardian"
        subtitle={
          takingPreorders
            ? "Get on the pre-order list for the next litter, or read how buying works first."
            : "Call for current availability, or reserve online and pick up in Newport."
        }
        primaryLabel={takingPreorders ? "Pre-Order a Puppy" : "Reserve a Puppy"}
        primaryHref={takingPreorders ? PREORDER_HREF : "/reserve"}
        secondaryLabel="How Buying Works"
        secondaryHref="/buying/process"
      />
    </>
  );
}
