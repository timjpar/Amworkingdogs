import type { Metadata } from "next";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { GalleryGrid } from "@/app/_components/ui/GalleryGrid";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { puppyPhotos, adultPhotos } from "@/app/_data/gallery";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Photo Gallery — Guardian Dogs & Puppies",
  description:
    "Photos of our Kangal x Great Pyrenees livestock guardian dogs and puppies in Newport, Tennessee — newborns in the straw through working adults on pasture.",
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/dogs/gallery" },
        ])}
      />

      <PageHero
        eyebrow="Photos"
        title="Our Dogs & Puppies"
        subtitle="Current and past litters, and the working adults behind them."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-puppies-pair.jpeg"
        imagePosition="center 40%"
      />

      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Puppies"
            subtitle="From newborn to eight weeks — straw nest to tall grass."
            className="mb-10"
          />
          <GalleryGrid images={puppyPhotos} />
        </div>
      </section>

      <section className="pb-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Working Adults"
            subtitle="The parents and pack, out doing the job."
            className="mb-10"
          />
          <GalleryGrid images={adultPhotos} />
        </div>
      </section>

      <section className="pb-16 px-4" style={{ background: "var(--c-page)" }}>
        <div
          className="max-w-3xl mx-auto rounded-card border p-8 text-center"
          style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
        >
          <p className="text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
            We post new litters to Facebook and Instagram as they hit the ground, and keep a
            longer photo archive on{" "}
            <a
              href={LINKS.flickrGuardianDogs}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--c-link)" }}
            >
              Flickr
            </a>
            .
          </p>
        </div>
      </section>

      <CTABanner
        title="See One You Like?"
        subtitle="Call about the current litter, or put a deposit on your pick."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Reserve a Puppy"
        secondaryHref="/reserve"
      />
    </>
  );
}
