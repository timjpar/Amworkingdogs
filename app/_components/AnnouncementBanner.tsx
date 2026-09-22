import Link from "next/link";
import { LITTER, litterCounts, PREORDER_HREF } from "@/app/_data/litter";

// Text follows the litter status and the live roster count in
// app/_data/litter.ts, so the banner can't drift out of sync with /puppies.
// Not dismissible — no client state.
const MESSAGES = {
  available: {
    text:
      litterCounts.available > 0
        ? `${litterCounts.available} guardian puppies available`
        : "Guardian puppies available",
    detail: "75% Kangal, 25% Great Pyrenees.",
    cta: "Meet the litter",
    href: "/puppies",
  },
  expecting: {
    text: "A guardian litter is on the way",
    detail: "Deposits hold a spot in line.",
    cta: "Get on the list",
    href: PREORDER_HREF,
  },
  between: {
    text: "This litter is sold out",
    detail: "Pre-orders are open for the next one.",
    cta: "Pre-order now",
    href: PREORDER_HREF,
  },
} as const;

export function AnnouncementBanner() {
  const message = MESSAGES[LITTER.status];

  return (
    <div
      className="relative z-[1001] w-full text-center"
      style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)" }}
      role="region"
      aria-label="Announcement"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-2 px-4 py-2 text-sm font-medium">
        <span aria-hidden="true">🐾</span>
        <span>{message.text}</span>
        {/* The detail is nice-to-have — dropping it on phones keeps the bar to
            a single line instead of pushing the nav down three. */}
        <span className="hidden sm:inline">{message.detail}</span>
        <Link
          href={message.href}
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-80 whitespace-nowrap"
          style={{ color: "var(--c-accent-fg)", textDecoration: "underline" }}
        >
          {message.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
