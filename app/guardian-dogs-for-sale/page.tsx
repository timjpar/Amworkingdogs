import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { serviceAreas } from "@/app/_data/serviceAreas";
import { AREAS_SERVED } from "@/app/_config/business";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Livestock guardian dog puppies for farms across East Tennessee, Western North Carolina, and the Smoky Mountains. Farm pickup in Newport, TN; transport available.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/guardian-dogs-for-sale" },
        ])}
      />

      <PageHero
        eyebrow="Where our dogs go"
        title="Areas We Serve"
        subtitle="Farm pickup in Newport, Tennessee — with buyers coming from across the region and beyond."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dogs-fence-line.jpeg"
        imagePosition="center 45%"
      />

      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Pick Your Area"
            subtitle="Each one covers what the predator pressure looks like there and how far you'd be driving."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/guardian-dogs-for-sale/${area.slug}`}
                className="rounded-card border p-6 shadow-soft transition-transform hover:-translate-y-1"
                style={{
                  background: "var(--c-panel)",
                  borderColor: "var(--c-line)",
                  textDecoration: "none",
                }}
              >
                <h2 className="text-xl font-bold mb-2" style={{ color: "var(--c-title)" }}>
                  {area.headline}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--c-ink)" }}>
                  {area.intro}
                </p>
                <p
                  className="text-sm font-semibold inline-flex items-center gap-2"
                  style={{ color: "var(--c-link)" }}
                >
                  {area.driveTime}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full list */}
      <section className="pb-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--c-title)" }}>
            Counties &amp; Communities
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {AREAS_SERVED.map((area) => (
              <span
                key={area}
                className="px-3 py-1.5 rounded-full text-sm border"
                style={{
                  background: "var(--c-panel)",
                  borderColor: "var(--c-line)",
                  color: "var(--c-ink)",
                }}
              >
                {area}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm" style={{ color: "var(--c-ink-2)" }}>
            Farther out than this? We&apos;ve sent dogs a long way — see{" "}
            <Link href="/buying/transport" style={{ color: "var(--c-link)" }}>
              pickup &amp; transport
            </Link>
            .
          </p>
        </div>
      </section>

      <CTABanner
        title="However Far You Are"
        subtitle="Call and we'll figure out how to get a puppy to you."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
