import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { ParallaxBanner } from "@/app/_components/ui/ParallaxBanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AM Working Dogs is a family homestead in Newport, Tennessee raising Kangal x Great Pyrenees livestock guardian dogs alongside poultry, rabbits, and produce.",
};

const commitments = [
  {
    icon: "🐕",
    title: "Bred With a Job in Mind",
    desc: "We breed dogs that have to work on our own place first. If a dog isn't sound with the stock and steady with people, it doesn't go into the program.",
  },
  {
    icon: "🌾",
    title: "Raised on a Real Farm",
    desc: "No kennel runs. Pups are whelped in the barn and grow up underfoot among chickens, ducks, rabbits, and everything else that lives here.",
  },
  {
    icon: "☎️",
    title: "We Pick Up the Phone",
    desc: "The first year decides how a guardian turns out. Michael is available before the sale and long after — call at eight weeks or at eighteen months.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="Newport, Tennessee"
        title="About AM Working Dogs"
        subtitle="A working homestead in the Smoky Mountain foothills — and the guardian dogs that keep it running."
        imageSrc="/images/dogs/kangal-pyrenees-livestock-guardian-dogs-pack.jpeg"
        imagePosition="center 45%"
      />

      {/* Story */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader title="Our Story" align="left" className="mb-6" />
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
                <p>
                  My name is Michael Parsons. My wife Ali and I run a homestead outside
                  Newport, Tennessee, where we raise rabbits, chickens, ducks, quail, and a
                  garden that keeps getting bigger than we planned.
                </p>
                <p>
                  The dogs came the way most things here come — out of need. When you keep
                  poultry and small stock in these foothills, you share the ground with
                  coyotes, bear, bobcat, and every loose dog in the county. We lost birds.
                  We tried the usual fixes. What finally worked was putting a guardian out
                  there to live with them.
                </p>
                <p>
                  We settled on a Kangal crossed with Great Pyrenees — three-quarters Kangal
                  for the size and the nerve, a quarter Pyrenees for the patience. Those dogs
                  changed how this place runs. The losses stopped, and the birds settled down
                  in a way you can see.
                </p>
                <p>
                  So we started raising them for other farms too. Every pup is whelped in
                  our barn and grows up in the middle of the stock it&apos;s meant to
                  protect. That&apos;s the whole method, and there isn&apos;t a shortcut for it.
                </p>
              </div>
            </div>

            <div
              className="rounded-card aspect-[3/4] relative overflow-hidden border shadow-soft"
              style={{ borderColor: "var(--c-line)" }}
            >
              <Image
                src="/images/dogs/kangal-pyrenees-guardian-puppy-held-newport-tn.jpeg"
                alt="Kangal x Great Pyrenees guardian puppy being held at the farm in Newport, Tennessee"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <ParallaxBanner
        src="/images/dogs/kangal-pyrenees-livestock-guardian-dogs-pack.jpeg"
        alt="Kangal x Great Pyrenees guardian dogs on the homestead"
      />

      {/* How we raise them */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="How We Raise Them"
            subtitle="The difference between a guardian and a large dog is almost entirely in the first year."
            className="mb-10"
          />
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
            <p>
              Puppies are born in the barn, not a whelping room in the house. From the time
              their eyes open they hear chickens, smell ducks, and get stepped over by
              animals going about their day. Livestock never becomes a novelty to them,
              because it was never new.
            </p>
            <p>
              At the same time, they get handled every single day — feet, ears, mouth,
              lifted, leashed. A guardian you can&apos;t catch is a guardian you can&apos;t
              treat, worm, or load in a truck, and that&apos;s a problem you don&apos;t want
              to discover at 140 pounds.
            </p>
            <p>
              By eight weeks they&apos;re weaned, eating well, health checked, and used to
              being around both livestock and people. That&apos;s when they&apos;re ready to
              start the same process on your place — and the sooner they get to your animals,
              the better the bond takes.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/dogs/care"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: "var(--c-link)", textDecoration: "none" }}
            >
              Read the care &amp; training guide
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="What You Get From Us"
            subtitle="Buying a guardian dog is the start of a relationship, not the end of a transaction."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((item) => (
              <div
                key={item.title}
                className="rounded-card border p-6 text-center"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sister site */}
      <section className="pb-16 px-4" style={{ background: "var(--c-page)" }}>
        <div
          className="max-w-3xl mx-auto rounded-card border p-8 text-center"
          style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--c-title)" }}>
            The rest of the homestead
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--c-ink)" }}>
            We also raise rabbits, chickens, ducks, quail, and hatching eggs. That side of
            the farm lives at AMRabbits — same family, same place, same phone number.
          </p>
          <a
            href={LINKS.sisterSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
          >
            Visit AMRabbits
          </a>
        </div>
      </section>

      <CTABanner
        title="Come Meet the Dogs"
        subtitle="Farm visits are by appointment — call and we'll set a time."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Available Puppies"
        secondaryHref="/puppies"
      />
    </>
  );
}
