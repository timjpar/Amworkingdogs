import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema, puppyProductSchema } from "@/app/_lib/schema";
import { serviceAreas, getServiceArea } from "@/app/_data/serviceAreas";
import { suitedFor, CROSS } from "@/app/_data/breed";
import { PUPPY_PRICE } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};

  const description = `${CROSS.name} livestock guardian dog puppies for ${area.name} — $${PUPPY_PRICE}, raised with poultry and stock on our Newport, TN homestead. ${area.driveTime}`;

  return {
    title: area.headline,
    description,
    alternates: { canonical: `/guardian-dogs-for-sale/${area.slug}` },
    openGraph: {
      title: `${area.headline} | AM Working Dogs`,
      description,
      url: `/guardian-dogs-for-sale/${area.slug}`,
    },
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <JsonLd
        data={[
          puppyProductSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas We Serve", path: "/guardian-dogs-for-sale" },
            { name: area.name, path: `/guardian-dogs-for-sale/${area.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={CROSS.ratio}
        title={area.headline}
        subtitle={area.driveTime}
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dogs-fence-line.jpeg"
        imagePosition="center 45%"
      />

      {/* Intro */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border p-8 shadow-soft"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <p className="text-lg leading-relaxed" style={{ color: "var(--c-ink)" }}>
              {area.intro}
            </p>
          </div>

          {/* Nearby towns */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4 text-center" style={{ color: "var(--c-title)" }}>
              Buyers come to us from
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {area.nearby.map((town) => (
                <span
                  key={town}
                  className="px-3 py-1.5 rounded-full text-sm border"
                  style={{
                    background: "var(--c-panel)",
                    borderColor: "var(--c-line)",
                    color: "var(--c-ink)",
                  }}
                >
                  {town}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What they guard */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={`What They'll Guard in ${area.name === "the Smoky Mountains" ? "the Smokies" : area.name}`}
            subtitle="Same dogs, same raising, whatever you're running."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suitedFor.map((item) => (
              <div
                key={item.title}
                className="rounded-card border p-6 text-center"
                style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
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
        </div>
      </section>

      {/* Details + CTA */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border p-8 text-center shadow-soft"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--c-title)" }}>
              Buying From {area.name === "the Smoky Mountains" ? "the Smokies" : area.name}
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-ink)" }}>
              Puppies are ${PUPPY_PRICE}, males and females alike. Pickup is at the farm in
              Newport, and most buyers make the drive so they can meet the parents and see
              how the pups were raised. {area.driveTime}
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
                href="/puppies"
                className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold border-2 transition-all hover:opacity-80"
                style={{ borderColor: "var(--c-brand)", color: "var(--c-brand)", textDecoration: "none" }}
              >
                Available Puppies
              </Link>
            </div>
          </div>

          {/* Other areas */}
          <div className="mt-12">
            <h2 className="text-lg font-bold mb-4 text-center" style={{ color: "var(--c-title)" }}>
              We also serve
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {otherAreas.map((other) => (
                <Link
                  key={other.slug}
                  href={`/guardian-dogs-for-sale/${other.slug}`}
                  prefetch={false}
                  className="px-4 py-2 rounded-btn text-sm font-medium border transition-colors hover:opacity-80"
                  style={{
                    background: "var(--c-panel)",
                    borderColor: "var(--c-line)",
                    color: "var(--c-ink)",
                    textDecoration: "none",
                  }}
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's Talk About Your Place"
        subtitle="Acreage, stock, fencing, and what's been getting at you — that's all we need to point you at the right pup."
        primaryLabel="Reserve a Puppy"
        primaryHref="/reserve"
        secondaryLabel="Read the FAQ"
        secondaryHref="/dogs/faq"
      />
    </>
  );
}
