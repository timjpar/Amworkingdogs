"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ParallaxBannerProps = {
  src: string;
  alt: string;
  className?: string;
};

const PARALLAX_SCALE = 1.24;
const PARALLAX_MAX_Y = 96;
const PARALLAX_INITIAL_Y = -50;
const PARALLAX_BLEED_Y = Math.ceil(
  Math.abs(PARALLAX_INITIAL_Y) + PARALLAX_MAX_Y + 24,
);

export function ParallaxBanner({ src, alt, className = "" }: ParallaxBannerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let inView = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(
        -PARALLAX_MAX_Y,
        Math.min(PARALLAX_MAX_Y, progress * -PARALLAX_MAX_Y),
      );
      img.style.transform = `translate3d(0, ${PARALLAX_INITIAL_Y + y}px, 0) scale(${PARALLAX_SCALE})`;
    };

    const onScroll = () => {
      if (!inView || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) update();
      },
      { rootMargin: "100px" },
    );
    io.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className={`relative w-full h-[38vh] md:h-[46vh] overflow-hidden ${className}`}
    >
      <div
        ref={imgRef}
        className="absolute inset-x-0 will-change-transform"
        style={{
          top: -PARALLAX_BLEED_Y,
          bottom: -PARALLAX_BLEED_Y,
          transform: `translate3d(0, ${PARALLAX_INITIAL_Y}px, 0) scale(${PARALLAX_SCALE})`,
        }}
        aria-hidden="true"
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
