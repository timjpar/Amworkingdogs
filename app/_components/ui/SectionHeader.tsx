interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
  decoration?: React.ReactNode;
  eyebrow?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
  decoration,
  eyebrow,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} ${className}`}>
      {decoration && (
        <div
          className={`mb-3 flex ${
            align === "center" ? "justify-center" : "justify-start"
          }`}
          aria-hidden="true"
        >
          {decoration}
        </div>
      )}
      {eyebrow && (
        <p
          className="mb-3 text-xs font-bold uppercase tracking-[0.18em]"
          style={
            light
              ? { color: "rgba(255,255,255,0.85)" }
              : { color: "var(--c-link)" }
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold"
        style={{ color: light ? "#fff" : "var(--c-title)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={{ color: light ? "rgba(255,255,255,0.85)" : "var(--c-ink-2)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
