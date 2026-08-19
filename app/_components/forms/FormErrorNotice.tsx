import { LINKS } from "@/app/_config/links";

/**
 * Failure notice for the contact form.
 *
 * Failure is reported, not swallowed: if delivery fails the sender is told to
 * call or text instead, while they still have the page open. A false success is
 * worse than an error, because it costs a lead silently.
 */
export function FormErrorNotice({
  message,
  showFallback = false,
}: {
  message: string;
  showFallback?: boolean;
}) {
  return (
    <div
      role="alert"
      className="text-sm p-3 rounded-card"
      style={{
        background: "color-mix(in srgb, #b91c1c 12%, transparent)",
        color: "#b91c1c",
      }}
    >
      <p className="m-0">{message}</p>
      {showFallback && (
        <p className="m-0 mt-2">
          Please reach us directly at{" "}
          <a href={LINKS.phoneHref} style={{ color: "inherit", fontWeight: 600 }}>
            {LINKS.phone}
          </a>{" "}
          or{" "}
          <a href={`mailto:${LINKS.email}`} style={{ color: "inherit", fontWeight: 600 }}>
            {LINKS.email}
          </a>
          .
        </p>
      )}
    </div>
  );
}
