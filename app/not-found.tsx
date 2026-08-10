import type { Metadata } from "next";
import Link from "next/link";
import { Paw } from "@/app/_components/ui/decorations/Paw";
import { Ridge } from "@/app/_components/ui/decorations/Ridge";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 px-4 min-h-[75vh] flex items-center"
      style={{ background: "var(--c-page)" }}
    >
      {/* Ridgeline decorations */}
      <div className="absolute top-10 left-[6%] opacity-20 hidden md:block" aria-hidden="true">
        <Ridge size={110} />
      </div>
      <div className="absolute top-24 right-[8%] opacity-15 hidden md:block" aria-hidden="true">
        <Ridge size={80} />
      </div>

      {/* Tracks wandering off */}
      <div className="absolute bottom-12 left-[10%] opacity-25 rotate-[-16deg]" aria-hidden="true">
        <Paw size={30} color="var(--c-brand)" />
      </div>
      <div className="absolute bottom-24 left-[20%] opacity-25 rotate-[8deg]" aria-hidden="true">
        <Paw size={26} color="var(--c-brand)" />
      </div>
      <div className="absolute bottom-36 left-[29%] opacity-25 rotate-[-10deg]" aria-hidden="true">
        <Paw size={22} color="var(--c-brand)" />
      </div>
      <div className="absolute bottom-16 right-[14%] opacity-25 rotate-[22deg] hidden sm:block" aria-hidden="true">
        <Paw size={28} color="var(--c-accent)" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center w-full">
        <p
          className="select-none leading-none font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--c-title)",
            fontSize: "clamp(6rem, 20vw, 12rem)",
            letterSpacing: "-0.04em",
          }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: "var(--c-title)" }}>
          This one wandered off
        </h1>

        <p
          className="mt-4 text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: "var(--c-ink)" }}
        >
          The page you&apos;re after isn&apos;t here. Somebody left a gate open. Try one of
          these instead.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-6 rounded-btn font-semibold shadow-soft transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
          >
            Back Home
          </Link>
          <Link
            href="/puppies"
            className="inline-flex items-center justify-center h-12 px-6 rounded-btn font-semibold shadow-soft transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
          >
            Available Puppies
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-6 rounded-btn font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] border-2"
            style={{
              borderColor: "var(--c-brand)",
              color: "var(--c-brand)",
              background: "transparent",
              textDecoration: "none",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
