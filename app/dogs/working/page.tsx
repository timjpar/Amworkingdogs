import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { ParallaxBanner } from "@/app/_components/ui/ParallaxBanner";
import { Fence } from "@/app/_components/ui/decorations/Fence";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { suitedFor } from "@/app/_data/breed";

export const metadata: Metadata = {
  title: "What Livestock Guardian Dogs Actually Do",
  description:
    "How a livestock guardian dog protects a flock — deterrence, perimeter patrol, and predator pressure. What guardians do, what they don't, and whether one fits your farm.",
};

const howItWorks = [
  {
    n: "1",
    title: "Presence",
    desc: "Most of the job is done before anything happens. A 120-pound dog living with the flock changes the math for every coyote that scouts your place, and the smell and sound of it alone turns most of them back.",
  },
  {
    n: "2",
    title: "Perimeter",
    desc: "Guardians patrol and mark a boundary, then work it on a loop — heavier at dusk and through the night, which is when the pressure comes. They learn your ground and where the trouble comes in.",
  },
  {
    n: "3",
    title: "Warning",
    desc: "Barking is the tool, not a nuisance behavior. A guardian announces itself long before it has to do anything, and that alone resolves the great majority of encounters.",
  },
  {
    n: "4",
    title: "Interception",
    desc: "If something keeps coming, the dog puts itself between the threat and the stock and escalates. Kangals are known for driving off predators as large as bears without engaging.",
  },
];

const notThis = [
  {
    title: "They don't herd",
    desc: "A guardian doesn't move stock, gather it, or take direction on livestock the way a Border Collie does. Different job, different dog.",
  },
  {
    title: "They aren't obedience dogs",
    desc: "These dogs were bred to make decisions alone, miles from a shepherd. You'll get a reliable recall with work, but you will never get a Lab.",
  },
  {
    title: "They aren't house dogs",
    desc: "A guardian that sleeps inside stops guarding. They can absolutely be family-friendly, but their post is with the animals.",
  },
  {
    title: "They aren't a fence",
    desc: "A guardian makes good fencing far more effective; it doesn't replace it. Loose dogs roam, and roaming guardians get hurt.",
  },
];

const predators = [
  { name: "Coyote", note: "The most common pressure in East Tennessee. Guardians shut this down almost entirely." },
  { name: "Stray & feral dogs", note: "Statistically the biggest killer of small stock. Dogs respect other dogs holding ground." },
  { name: "Black bear", note: "Real here in the foothills. A guardian's job is noise and deterrence, not a fight." },
  { name: "Bobcat", note: "Opportunistic on poultry and kids. Perimeter patrol pushes them to easier ground." },
  { name: "Fox & raccoon", note: "Poultry raiders. A dog living at the coop ends these losses fast." },
  { name: "Hawk & owl", note: "Guardians can't catch them, but their presence and barking break up the approach." },
];

export default function WorkingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "What They Do", path: "/dogs/working" },
        ])}
      />

      <PageHero
        eyebrow="The job"
        title="What a Guardian Dog Actually Does"
        subtitle="A guardian isn't a pet with a job title. Here's how the work really goes, and what it takes from you."
        imageSrc="/images/dogs/kangal-pyrenees-livestock-guardian-dogs-pack.jpeg"
        imagePosition="center 45%"
      />

      {/* How it works */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Four Layers of Protection"
            subtitle="Almost all of it happens before a predator ever gets close enough to matter."
            decoration={<Fence size={44} />}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {howItWorks.map((step) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <ParallaxBanner
        src="/images/dogs/kangal-pyrenees-livestock-guardian-dogs-pack.jpeg"
        alt="Kangal x Great Pyrenees guardian dogs together on the homestead"
      />

      {/* What they guard */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Stock They Work With"
            subtitle="Ours grow up around poultry, so birds are second nature — but the cross handles anything you'd put behind a fence."
            className="mb-12"
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
        </div>
      </section>

      {/* Predators */}
      <section className="py-16 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="What You're Up Against Here"
            subtitle="The pressure list for East Tennessee and the Carolina high country."
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {predators.map((p) => (
              <div
                key={p.name}
                className="rounded-card border p-5"
                style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
              >
                <h3 className="font-bold mb-1" style={{ color: "var(--c-title)" }}>
                  {p.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink-2)" }}>
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What they aren't */}
      <section className="py-16 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="What a Guardian Is Not"
            subtitle="We'd rather talk you out of one now than have a dog come back at fourteen months."
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {notThis.map((item) => (
              <div
                key={item.title}
                className="rounded-card border-l-4 p-5"
                style={{
                  background: "var(--c-panel)",
                  borderColor: "var(--c-accent)",
                }}
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

          <div
            className="mt-10 rounded-card border p-6 text-center"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <p className="text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
              Still weighing it? The{" "}
              <Link href="/dogs/care" style={{ color: "var(--c-link)" }}>
                care and training guide
              </Link>{" "}
              covers the first year honestly — including the adolescent stage where most
              people give up.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Sounds Like What You Need?"
        subtitle="Tell us about your place and we'll tell you what we'd put on it."
        primaryLabel="Available Puppies"
        primaryHref="/puppies"
        secondaryLabel="Ask a Question"
        secondaryHref="/contact"
      />
    </>
  );
}
