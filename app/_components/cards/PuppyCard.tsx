import Image from "next/image";
import type { Puppy } from "@/app/_data/litter";
import { STATUS_LABEL } from "@/app/_data/litter";

/**
 * One puppy in the litter roster.
 *
 * The photos already carry the collar name printed on them — that's how the
 * family labels them on Facebook and how buyers ask for them by phone — so the
 * card is sized 3:4 to match the source exactly and never crop that label off.
 */
export function PuppyCard({ puppy, priority = false }: { puppy: Puppy; priority?: boolean }) {
  const taken = puppy.status !== "available";

  const statusStyle =
    puppy.status === "available"
      ? { background: "var(--c-brand)", color: "var(--c-brand-fg)" }
      : puppy.status === "reserved"
      ? { background: "var(--c-accent)", color: "var(--c-accent-fg)" }
      : { background: "color-mix(in srgb, var(--c-ink) 72%, transparent)", color: "var(--c-page)" };

  return (
    <article
      className="rounded-card border overflow-hidden shadow-soft transition-transform duration-200 hover:-translate-y-1 flex flex-col"
      style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={puppy.image}
          alt={`${puppy.name} — ${puppy.sex.toLowerCase()} Kangal x Great Pyrenees livestock guardian puppy in a ${puppy.name.toLowerCase()} collar`}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          style={taken ? { filter: "grayscale(0.85)", opacity: 0.75 } : undefined}
        />

        <span
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft"
          style={statusStyle}
        >
          {STATUS_LABEL[puppy.status]}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5 mb-1">
          <span
            className="flex-none w-4 h-4 rounded-full border"
            style={{ background: puppy.collar, borderColor: "color-mix(in srgb, var(--c-ink) 25%, transparent)" }}
            aria-hidden="true"
          />
          <h3 className="text-lg font-bold leading-tight" style={{ color: "var(--c-title)" }}>
            {puppy.name}
          </h3>
          <span
            className="text-sm font-medium ml-auto"
            style={{ color: "var(--c-ink-2)" }}
          >
            {puppy.sex}
          </span>
        </div>

        {puppy.note && (
          <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--c-ink)" }}>
            {puppy.note}
          </p>
        )}
      </div>
    </article>
  );
}
