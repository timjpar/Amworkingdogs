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
  title: "How Buying a Puppy Works",
  description:
    "Step by step: how to buy a Kangal x Great Pyrenees livestock guardian puppy from AM Working Dogs in Newport, TN — from the first call through pickup day and the weeks after.",
};

const steps = [
  {
    n: "1",
    title: "Tell us about your place",
    desc: `Call or text Michael at ${LINKS.phone}. What stock do you run, how many acres, what does your fencing look like, and what's been getting at you? That conversation decides whether a guardian is the right answer at all — and if it isn't, we'll say so.`,
  },
  {
    n: "2",
    title: "Get your setup ready",
    desc: "Fencing, a dry shelter, and a small pen inside or beside the stock area where the pup can start out. This is the part people underestimate. Have it done before pickup day, not after.",
  },
  {
    n: "3",
    title: "Reserve your pick",
    desc: `A $${DEPOSIT} deposit holds a specific puppy and comes off the $${PUPPY_PRICE} total. We'll point you toward the pups whose temperament fits your operation, and you choose from those. Deposits aren't required for same-day pickups.`,
  },
  {
    n: "4",
    title: "Come out at eight weeks",
    desc: "Pickup is at the farm in Newport. You'll meet the parents, see the barn the pups were raised in, and get a walk-through of feeding and the first few weeks. Plan on staying a bit — this isn't a hand-off in a parking lot.",
  },
  {
    n: "5",
    title: "The first year",
    desc: "Your pup goes home with records, feed, and our number. The adolescent stage around four to ten months is where guardians are made or ruined, and that's exactly when we want you calling.",
  },
];

const bringList = [
  "A crate or a truck bed with a secure kennel — these pups are heavy at eight weeks",
  "A collar and lead (we'll size it with you)",
  "Water for the ride home",
  "The balance, in whatever form you arranged",
  "Questions — bring all of them",
];

const beforeYouCome = [
  {
    title: "Fencing up and walked",
    desc: "Five-foot field fence minimum, no gaps under the bottom wire, gates that latch positively.",
  },
  {
    title: "Shelter in place",
    desc: "Shade, a dry windbreak, and somewhere out of the wind. They'd rather sleep outside than in a barn, but they need the option.",
  },
  {
    title: "A starter pen",
    desc: "Small area inside or beside the stock so the pup can see, hear, and smell the flock without being trampled.",
  },
  {
    title: "A vet lined up",
    desc: "Know who you're calling before you need them, and make sure they're comfortable with a large guardian breed.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/buying/process" },
        ])}
      />

      <PageHero
        eyebrow="Buying a puppy"
        title="How It Works"
        subtitle="From the first phone call to the drive home — and what we expect to be ready on your end."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-puppies-pair.jpeg"
        imagePosition="center 40%"
      />

      {/* Steps */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Five Steps" className="mb-12" />
          <ol className="space-y-6">
            {steps.map((step) => (
              <li
                key={step.n}
                className="rounded-card border p-6 flex gap-5"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <div
                  className="flex-none w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)" }}
                  aria-hidden="true"
                >
                  {step.n}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--c-title)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Before you come */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Have This Ready First"
            subtitle="A guardian pup dropped into an unprepared place is how good dogs end up rehomed."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beforeYouCome.map((item) => (
              <div
                key={item.title}
                className="rounded-card border-l-4 p-5"
                style={{ background: "var(--c-page)", borderColor: "var(--c-accent)" }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm" style={{ color: "var(--c-ink-2)" }}>
            The{" "}
            <Link href="/dogs/care" style={{ color: "var(--c-link)" }}>
              care &amp; training guide
            </Link>{" "}
            goes deeper on all of this.
          </p>
        </div>
      </section>

      {/* Pickup day */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Bring on Pickup Day"
            align="left"
            className="mb-8"
          />
          <ul
            className="rounded-card border p-6 space-y-3"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            {bringList.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex-none mt-0.5 font-bold" style={{ color: "var(--c-accent)" }} aria-hidden="true">
                  ✓
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm" style={{ color: "var(--c-ink-2)" }}>
            Coming from a distance? See{" "}
            <Link href="/buying/transport" style={{ color: "var(--c-link)" }}>
              pickup &amp; transport
            </Link>
            .
          </p>
        </div>
      </section>

      <CTABanner
        title="Start With a Phone Call"
        subtitle="Tell us what you're running and we'll tell you what we'd put on it."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Health & Sales Policy"
        secondaryHref="/buying/policy"
      />
    </>
  );
}
