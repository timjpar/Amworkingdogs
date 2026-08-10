import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { GalleryGrid } from "@/app/_components/ui/GalleryGrid";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { CROSS, parentBreeds } from "@/app/_data/breed";
import { adultPhotos } from "@/app/_data/gallery";

export const metadata: Metadata = {
  title: "The Breed — Kangal x Great Pyrenees",
  description:
    "What a 75% Kangal, 25% Great Pyrenees livestock guardian dog is: size, temperament, coat, lifespan, and how the two parent breeds combine into a working farm guardian.",
};

const traitTable = [
  { label: "Adult weight", value: "90–140 lb (males at the top end)" },
  { label: "Height", value: "28–32 in at the shoulder" },
  { label: "Coat", value: "Short to medium double coat; fawn with a black mask" },
  { label: "Lifespan", value: "11–13 years" },
  { label: "Maturity", value: "Slow — fully settled into the work around 2 years" },
  { label: "Shedding", value: "Heavy seasonal blow-out, spring and fall" },
  { label: "Climate", value: "Handles Tennessee summers and winters outdoors" },
  { label: "Best for", value: "Fenced acreage with stock to guard" },
];

export default function BreedPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About the Dogs", path: "/dogs/breed" },
          { name: "The Breed", path: "/dogs/breed" },
        ])}
      />

      <PageHero
        eyebrow={CROSS.ratio}
        title="Kangal x Great Pyrenees"
        subtitle="Bred on purpose, not by accident. Here's what each half brings and what you get when they come together."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dogs-fence-line.jpeg"
        imagePosition="center 45%"
      />

      {/* The cross in one paragraph */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border p-8 shadow-soft"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <p className="text-lg leading-relaxed" style={{ color: "var(--c-ink)" }}>
              Our puppies are{" "}
              <strong style={{ color: "var(--c-title)" }}>
                75% Kangal and 25% Great Pyrenees
              </strong>
              . {CROSS.summary} Ours are raised on the homestead among chickens, ducks, and
              other stock from the start.
            </p>
          </div>

          {/* Ratio bar */}
          <div className="mt-8">
            <div
              className="flex h-4 rounded-full overflow-hidden border"
              style={{ borderColor: "var(--c-line)" }}
              role="img"
              aria-label="Seventy-five percent Kangal, twenty-five percent Great Pyrenees"
            >
              <div style={{ width: "75%", background: "var(--c-brand)" }} />
              <div style={{ width: "25%", background: "var(--c-accent)" }} />
            </div>
            <div className="flex justify-between mt-2 text-sm font-medium">
              <span style={{ color: "var(--c-brand)" }}>75% Kangal</span>
              <span style={{ color: "var(--c-ink-2)" }}>25% Great Pyrenees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Parent breeds, in depth */}
      <section className="pb-4 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto space-y-16">
          {parentBreeds.map((breed, i) => (
            <article
              key={breed.id}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className="relative aspect-[4/3] rounded-card overflow-hidden border shadow-soft"
                style={{ borderColor: "var(--c-line)" }}
              >
                <Image
                  src={breed.imageSrc}
                  alt={breed.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em] mb-2"
                  style={{ color: "var(--c-link)" }}
                >
                  {breed.share} · {breed.origin}
                </p>
                <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {breed.name}
                </h2>
                <p className="text-lg font-medium mb-4" style={{ color: "var(--c-ink-2)" }}>
                  {breed.tagline}
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-ink)" }}>
                  {breed.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {breed.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1.5 rounded-full text-xs font-medium pill-soft-brand"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-semibold uppercase tracking-wide text-xs mb-1" style={{ color: "var(--c-ink-2)" }}>
                      Weight
                    </dt>
                    <dd style={{ color: "var(--c-ink)" }}>{breed.weight}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-wide text-xs mb-1" style={{ color: "var(--c-ink-2)" }}>
                      Height
                    </dt>
                    <dd style={{ color: "var(--c-ink)" }}>{breed.height}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trait table */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="What You're Signing Up For"
            subtitle="The practical numbers, before you build a pen."
            className="mb-10"
          />
          <dl
            className="rounded-card border overflow-hidden"
            style={{ borderColor: "var(--c-line)", background: "var(--c-page)" }}
          >
            {traitTable.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-5 py-4"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--c-line)",
                }}
              >
                <dt className="text-sm font-semibold" style={{ color: "var(--c-ink-2)" }}>
                  {row.label}
                </dt>
                <dd className="text-sm" style={{ color: "var(--c-ink)" }}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-center" style={{ color: "var(--c-ink-2)" }}>
            Wondering whether this is the right dog for your situation?{" "}
            <Link href="/dogs/faq" style={{ color: "var(--c-link)" }}>
              Read the FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" style={{ color: "var(--c-link)" }}>
              ask us directly
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Adults gallery */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Our Adults at Work"
            subtitle="The dogs behind the puppies — on pasture, on the fence line, on watch."
            className="mb-10"
          />
          <GalleryGrid images={adultPhotos} />
        </div>
      </section>

      <CTABanner
        title="Meet the Puppies"
        subtitle="Same cross, same raising, ready at eight weeks."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Care & Training"
        secondaryHref="/dogs/care"
      />
    </>
  );
}
