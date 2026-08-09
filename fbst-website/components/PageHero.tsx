import { ReactNode } from "react";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import { getPageData } from "@/lib/cms";

type Props = {
  eyebrow?: string;
  heading: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: string[];
  autoplay?: boolean;
  slug?: string;
  children?: ReactNode;
};

export default async function PageHero({
  eyebrow,
  heading,
  text,
  ctaLabel,
  ctaHref,
  images = [],
  autoplay = true,
  slug,
  children,
}: Props) {
  const page = slug ? await getPageData(slug) : null;
  const heroImages = images.length > 0 ? images : page?.images ?? [];
  const heroText = children ?? text ?? page?.heroText;
  const heroCtaLabel = ctaLabel ?? page?.heroCtaLabel;
  const heroCtaHref = ctaHref ?? page?.heroCtaHref;

  const hasImages = heroImages.length > 0;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "480px",
        background: hasImages ? undefined : "#1E2430",
      }}
    >
      {/* Background image */}
      {hasImages && (
        <>
          <BackgroundSlideshow images={heroImages} autoplay={autoplay && Boolean(heroImages.length)} />
          {/* Subtle overlay so background images are clearly visible while text remains high contrast */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.50) 0%, rgba(15,23,42,0.75) 100%)" }} />
        </>
      )}

      {/* No image: add subtle background texture pattern */}
      {!hasImages && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #08B4D0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 flex flex-col items-start justify-center" style={{ minHeight: "480px" }}>

        {eyebrow && (
          <p
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-5 px-3 py-1 rounded"
            style={{ background: "rgba(8,180,208,0.15)", color: "#08B4D0", border: "1px solid rgba(8,180,208,0.3)" }}
          >
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-tight mb-4" style={{ color: "#FFFFFF" }}>
          {heading}
        </h1>

        {heroText && (
          <div className="max-w-2xl text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#C0C8D4" }}>
            {heroText}
          </div>
        )}

        {heroCtaLabel && heroCtaHref && (
          <div className="flex flex-wrap gap-4 items-center">
            <a href={heroCtaHref} className="btn-primary">
              {heroCtaLabel} →
            </a>
            <a
              href="/about"
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-[#08B4D0]"
              style={{ color: "#8C939E" }}
            >
              Learn more →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
