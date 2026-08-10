import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { serviceAreas } from "@/app/_data/serviceAreas";
import { BUSINESS } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Pickup & Transport",
  description:
    "Farm pickup in Newport, Tennessee for guardian puppies, plus meet-up and third-party ground transport options for buyers across East Tennessee and Western North Carolina.",
};

const options = [
  {
    icon: "🚜",
    title: "Farm Pickup",
    tag: "How most buyers do it",
    desc: "Come out to the place in Newport. You'll meet the parents, see the barn the pups grew up in, and get a hands-on walk-through of feeding and the first month. This is far and away the best option — you learn more in twenty minutes here than in an hour on the phone.",
    cost: "No charge",
  },
  {
    icon: "🤝",
    title: "Meet Partway",
    tag: "For regional buyers",
    desc: "For buyers a few hours out, we can sometimes meet partway — usually along I-40 or I-81. Depends on the week and what else we have going on, so ask early rather than assuming.",
    cost: "Fuel cost, agreed up front",
  },
  {
    icon: "🚚",
    title: "Ground Transport",
    tag: "For long distances",
    desc: "For buyers too far to drive, we can point you toward third-party ground transporters who handle livestock and dogs. You book and pay them directly, and we'll get the pup and its paperwork ready for the pickup window.",
    cost: "Varies by distance — paid to the transporter",
  },
];

const notes = [
  "We don't ship puppies by air.",
  "Puppies travel best in the morning, before it heats up.",
  "Bring a crate or secure kennel — an eight-week guardian pup is already a big animal.",
  "Expect the drive home to involve at least one stop.",
  "Our exact address is shared once a pickup time is confirmed.",
];

export default function TransportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pickup & Transport", path: "/buying/transport" },
        ])}
      />

      <PageHero
        eyebrow="Getting your puppy home"
        title="Pickup & Transport"
        subtitle={`We're in ${BUSINESS.address.locality}, ${BUSINESS.address.region} — in the foothills, off I-40 between Knoxville and Asheville.`}
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dogs-fence-line.jpeg"
        imagePosition="center 50%"
      />

      {/* Options */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Three Ways to Do It" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="rounded-card border p-6 flex flex-col"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <div className="text-3xl mb-3" aria-hidden="true">{opt.icon}</div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--c-link)" }}
                >
                  {opt.tag}
                </p>
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--c-title)" }}>
                  {opt.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--c-ink)" }}>
                  {opt.desc}
                </p>
                <p
                  className="mt-4 pt-4 border-t text-sm font-semibold"
                  style={{ borderColor: "var(--c-line)", color: "var(--c-brand)" }}
                >
                  {opt.cost}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Where We Are"
            subtitle="Newport sits in Cocke County, right off I-40 in the Smoky Mountain foothills."
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/guardian-dogs-for-sale/${area.slug}`}
                className="rounded-card border p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--c-page)",
                  borderColor: "var(--c-line)",
                  textDecoration: "none",
                }}
              >
                <h3 className="font-bold mb-1" style={{ color: "var(--c-title)" }}>
                  {area.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--c-ink-2)" }}>
                  {area.driveTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Worth Knowing" align="left" className="mb-8" />
          <ul
            className="rounded-card border p-6 space-y-3"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span
                  className="flex-none mt-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--c-accent)" }}
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {note}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-center" style={{ color: "var(--c-ink-2)" }}>
            Coming a long way? Call Michael at{" "}
            <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
              {LINKS.phone}
            </a>{" "}
            and we&apos;ll work out the logistics before you commit.
          </p>
        </div>
      </section>

      <CTABanner
        title="Plan Your Pickup"
        subtitle="Reserve your pup, then we'll set a day that works."
        primaryLabel="Reserve a Puppy"
        primaryHref="/reserve"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
