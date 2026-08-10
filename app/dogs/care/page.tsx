import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { careSections } from "@/app/_data/care";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Care & Training Guide",
  description:
    "How to raise a livestock guardian puppy: the first week home, fencing and shelter, feeding for slow growth, the adolescent stage, handling, and routine health care.",
};

export default function CarePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Care & Training", path: "/dogs/care" },
        ])}
      />

      <PageHero
        eyebrow="The first two years"
        title="Care & Training Guide"
        subtitle="Everything we'd tell you standing at the gate — written down so you have it at 10 p.m. when the pup is howling."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-dog-puppy-portrait.jpeg"
        imagePosition="center 35%"
      />

      {/* Jump links */}
      <section className="py-8 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] mb-3 text-center"
            style={{ color: "var(--c-ink-2)" }}
          >
            Jump to
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {careSections.map((section, i) => (
              <a
                key={section.title}
                href={`#section-${i}`}
                className="px-4 py-2 rounded-btn text-sm font-medium border transition-colors hover:opacity-80"
                style={{
                  background: "var(--c-page)",
                  borderColor: "var(--c-line)",
                  color: "var(--c-ink)",
                  textDecoration: "none",
                }}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto space-y-12">
          {careSections.map((section, i) => (
            <article key={section.title} id={`section-${i}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: "var(--c-accent)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--c-title)" }}>
                  {section.title}
                </h2>
              </div>

              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-ink)" }}>
                {section.content}
              </p>

              <ul
                className="rounded-card border p-6 space-y-3"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                {section.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <span
                      className="flex-none mt-0.5 font-bold"
                      style={{ color: "var(--c-accent)" }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Support note */}
      <section className="pb-16 px-4" style={{ background: "var(--c-page)" }}>
        <div
          className="max-w-3xl mx-auto rounded-card border p-8 text-center shadow-soft"
          style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
        >
          <div className="text-3xl mb-3" aria-hidden="true">📞</div>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--c-title)" }}>
            Call us when something isn&apos;t working
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--c-ink)" }}>
            Chasing chickens, digging out, won&apos;t stay with the stock, won&apos;t let
            you catch it — we&apos;ve seen all of it, and most of it is fixable if you call
            early instead of waiting six months.
          </p>
          <a
            href={LINKS.phoneHref}
            className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
          >
            Call or Text {LINKS.phone}
          </a>
          <p className="text-sm mt-5" style={{ color: "var(--c-ink-2)" }}>
            More answers in the{" "}
            <Link href="/dogs/faq" style={{ color: "var(--c-link)" }}>
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>

      <CTABanner
        title="Ready When You Are"
        subtitle="Get the fence up, then come pick your puppy."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="How Buying Works"
        secondaryHref="/buying/process"
      />
    </>
  );
}
