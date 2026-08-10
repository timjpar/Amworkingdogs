import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { AccordionItem } from "@/app/_components/ui/AccordionItem";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "@/app/_lib/schema";
import { faqItems } from "@/app/_data/faq";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Livestock Guardian Dog FAQ",
  description:
    "Common questions about Kangal x Great Pyrenees guardian puppies — price, go-home age, fencing, barking, poultry safety, whether you need two dogs, and pickup in Newport, TN.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(faqItems),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/dogs/faq" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Straight answers"
        title="Questions We Get Asked"
        subtitle="If yours isn't here, call — Michael would rather talk it through than have you guess."
        imageSrc="/images/dogs/kangal-pyrenees-guardian-puppies-pair.jpeg"
        imagePosition="center 40%"
      />

      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border px-6 md:px-8 shadow-soft"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>

          <div
            className="mt-10 rounded-card border p-8 text-center"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <h2 className="text-xl font-bold mb-3" style={{ color: "var(--c-title)" }}>
              Still have a question?
            </h2>
            <p className="text-base mb-6" style={{ color: "var(--c-ink)" }}>
              Call or text Michael at{" "}
              <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
                {LINKS.phone}
              </a>
              , or send a message and we&apos;ll get back to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
              >
                Contact Us
              </Link>
              <Link
                href="/dogs/care"
                className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-semibold border-2 transition-all hover:opacity-80"
                style={{ borderColor: "var(--c-brand)", color: "var(--c-brand)", textDecoration: "none" }}
              >
                Care & Training Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Pick a Puppy?"
        subtitle="See what's on the ground right now."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Reserve With a Deposit"
        secondaryHref="/reserve"
      />
    </>
  );
}
