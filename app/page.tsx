import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { ParallaxBanner } from "@/app/_components/ui/ParallaxBanner";
import { Ridge } from "@/app/_components/ui/decorations/Ridge";
import { Paw } from "@/app/_components/ui/decorations/Paw";
import { Fence } from "@/app/_components/ui/decorations/Fence";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { puppyProductSchema } from "@/app/_lib/schema";
import { CROSS, parentBreeds, suitedFor } from "@/app/_data/breed";
import { litterPortraits } from "@/app/_data/gallery";
import { litterCounts } from "@/app/_data/litter";
import { PUPPY_PRICE } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: {
    absolute:
      "Livestock Guardian Dog Puppies for Sale in Tennessee | AM Working Dogs",
  },
  description: `Kangal x Great Pyrenees livestock guardian dog puppies for sale in Newport, TN. 75% Kangal, 25% Great Pyrenees — $${PUPPY_PRICE}, raised from birth with poultry and stock. Serving East Tennessee & Western NC.`,
};

const whyItems = [
  {
    icon: "🐔",
    title: "Raised With Stock",
    desc: "Whelped on the homestead and living among chickens, ducks, and rabbits from the day their eyes open. Livestock is normal to them before they ever meet you.",
  },
  {
    icon: "🧬",
    title: "A Deliberate Cross",
    desc: "75% Kangal for size and nerve, 25% Great Pyrenees for patience and tolerance. Serious enough to do the work, steady enough to live with.",
  },
  {
    icon: "👋",
    title: "Handled Every Day",
    desc: "Feet, ears, and mouth handled from week one, so your dog is catchable, leadable, and manageable at the vet — not a wild thing in a pasture.",
  },
  {
    icon: "🩺",
    title: "Health Checked",
    desc: "Every pup gets a health check, age-appropriate worming, and first shots before it goes home. We tell you exactly what's been done.",
  },
  {
    icon: "📞",
    title: "We Answer After",
    desc: "The first year is where guardians are made or ruined. Michael takes the call at eight weeks and at eighteen months alike.",
  },
  {
    icon: "🏔️",
    title: "Working Mountain Stock",
    desc: "Our adults hold a real perimeter against coyote, bear, and hawk pressure in the Smoky foothills. The pups come from dogs that do the job.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={puppyProductSchema()} />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[62vh] md:min-h-[86vh] flex items-end py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image
            src="/images/dogs/kangal-pyrenees-guardian-dogs-pair-pasture.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl">
            <p
              className="text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] mb-4"
              style={{
                color: "color-mix(in srgb, var(--c-accent) 80%, white)",
                textShadow: "0 1px 3px rgba(0,0,0,0.75), 0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              Newport, Tennessee · Smoky Mountain Foothills
            </p>

            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
              style={{ color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
            >
              Livestock Guardian Dogs{" "}
              <span style={{ color: "color-mix(in srgb, var(--c-accent) 90%, white)" }}>
                Bred to Work
              </span>
            </h1>

            <p
              className="mt-4 text-lg md:text-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
            >
              {CROSS.ratio}. Whelped in the barn, raised among the flock, and ready to
              take up the job on your place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/puppies"
                className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-semibold text-lg shadow-soft transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
              >
                See Available Puppies
              </Link>
              <Link
                href="/dogs/breed"
                className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-semibold text-lg border-2 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(255,255,255,0.7)",
                  color: "#fff",
                  background: "rgba(0,0,0,0.15)",
                  textDecoration: "none",
                }}
              >
                Meet the Breed
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUICK FACTS STRIP ============ */}
      <section className="brand-band py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: `$${PUPPY_PRICE}`, label: "Males & females alike" },
            { value: "75 / 25", label: "Kangal to Pyrenees" },
            { value: "8 weeks", label: "Typical go-home age" },
            { value: "90–140 lb", label: "Grown adult weight" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--c-brand-fg)", fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs md:text-sm opacity-85" style={{ color: "var(--c-brand-fg)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Guardians, Not Just Big Dogs"
            subtitle="A livestock guardian is only as good as the way it was raised. Here's how ours start."
            eyebrow="Why buyers choose us"
            decoration={<Ridge size={44} />}
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="rounded-card border p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
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

      {/* ============ PARALLAX ============ */}
      <ParallaxBanner
        src="/images/dogs/kangal-pyrenees-guardian-dogs-fence-line.jpeg"
        alt="Kangal x Great Pyrenees guardian dogs walking the fence line"
      />

      {/* ============ THE CROSS ============ */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Two Breeds, One Job"
            subtitle={CROSS.summary}
            eyebrow="The cross"
            decoration={<Paw size={36} color="var(--c-brand)" />}
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentBreeds.map((breed) => (
              <article
                key={breed.id}
                className="rounded-card border overflow-hidden shadow-soft"
                style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={breed.imageSrc}
                    alt={breed.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)" }}
                  >
                    {breed.share}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--c-title)" }}>
                    {breed.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: "var(--c-link)" }}>
                    {breed.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--c-ink)" }}>
                    {breed.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {breed.traits.slice(0, 3).map((trait) => (
                      <span
                        key={trait}
                        className="px-2.5 py-1 rounded-full text-xs font-medium pill-soft-brand"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/dogs/breed"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: "var(--c-link)", textDecoration: "none" }}
            >
              Read the full breed profile
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT THEY GUARD ============ */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="What They'll Guard for You"
            subtitle="Coyote, bear, bobcat, hawk, and the neighbor's loose dogs. A guardian that lives with your stock is out there at three in the morning when you aren't."
            eyebrow="Built for"
            decoration={<Fence size={44} />}
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suitedFor.map((item) => (
              <div
                key={item.title}
                className="rounded-card border p-6 text-center"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/dogs/working"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: "var(--c-link)", textDecoration: "none" }}
            >
              How a guardian dog actually works
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CURRENT LITTER PREVIEW ============ */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Meet This Litter"
            subtitle={
              litterCounts.available > 0
                ? `${litterCounts.available} of ${litterCounts.total} still available. They go by collar color until their new families name them.`
                : "They go by collar color until their new families name them."
            }
            eyebrow="On the ground now"
            decoration={<Paw size={36} color="var(--c-accent)" />}
            className="mb-12"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {litterPortraits.slice(0, 12).map((img, i) => (
              <div
                key={img.src}
                className="relative aspect-[3/4] rounded-card overflow-hidden border"
                style={{ borderColor: "var(--c-line)" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  loading={i < 6 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/puppies"
              className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
            >
              See Every Puppy
            </Link>
            <Link
              href="/dogs/gallery"
              className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold border-2 transition-all hover:opacity-80"
              style={{ borderColor: "var(--c-brand)", color: "var(--c-brand)", textDecoration: "none" }}
            >
              Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TALK TO MICHAEL ============ */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div
          className="max-w-3xl mx-auto rounded-card border p-8 md:p-10 text-center shadow-soft"
          style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--c-title)" }}>
            Not sure a guardian is right for your place?
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-ink)" }}>
            Call and describe what you&apos;re running — how much ground, what stock, what
            fencing you have, and what&apos;s been getting at you. Michael will tell you
            straight whether one of these dogs is the answer, and how many you&apos;d need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={LINKS.phoneHref}
              className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
            >
              Call or Text {LINKS.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold border-2 transition-all hover:opacity-80"
              style={{ borderColor: "var(--c-brand)", color: "var(--c-brand)", textDecoration: "none" }}
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Put a Guardian on Your Stock?"
        subtitle={`Puppies are $${PUPPY_PRICE}. A deposit holds your pick from the current litter.`}
        primaryLabel="Reserve a Puppy"
        primaryHref="/reserve"
        secondaryLabel="See What's Available"
        secondaryHref="/puppies"
      />
    </>
  );
}
