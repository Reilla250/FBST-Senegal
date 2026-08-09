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

  return (
    <section className="relative overflow-hidden bg-baobab-dark text-sand">
      {heroImages.length > 0 && <BackgroundSlideshow images={heroImages} autoplay={autoplay && Boolean(heroImages.length)} />}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,26,0.72),rgba(10,18,26,0.9))]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-14 sm:pt-20 sm:pb-16">
        {eyebrow && (
          <p className="text-sm font-semibold tracking-widest uppercase text-baobab mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-sand max-w-3xl leading-[1.1]">
          {heading}
        </h1>
        {heroText && (
          <div className="mt-6 max-w-2xl text-sand/85 text-base sm:text-lg leading-relaxed">
            {heroText}
          </div>
        )}
        {heroCtaLabel && heroCtaHref && (
          <div className="mt-8">
            <a
              href={heroCtaHref}
              className="inline-flex items-center rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-ink hover:bg-baobab-dark transition-colors"
            >
              {heroCtaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
