import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /**
   * Background photo. Prefer a landscape source — the banner crops to roughly
   * 2.5:1, so a portrait photo becomes an unreadable sliver of the subject.
   */
  imageSrc?: string;
  /** CSS object-position for the crop. Defaults to slightly above center. */
  imagePosition?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}

/**
 * Standard interior-page banner: photo under a brand scrim, centered title.
 * Every page except the home page uses this so the headers stay consistent.
 */
export function PageHero({
  title,
  subtitle,
  imageSrc,
  imagePosition = "center 38%",
  eyebrow,
  children,
}: PageHeroProps) {
  return (
    <section className="relative flex items-center min-h-[300px] md:min-h-[380px] py-16 md:py-20 px-4 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        )}
        <div className="absolute inset-0 page-hero-overlay" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center w-full">
        {eyebrow && (
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--c-accent)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: "var(--c-rail-fg)", textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 10px rgba(0,0,0,0.5)",
            }}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
