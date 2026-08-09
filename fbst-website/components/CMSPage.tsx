import { ReactNode } from "react";
import { getPageData } from "@/lib/cms";
import PageHero from "@/components/PageHero";

type Props = {
  slug: string;
  eyebrow?: string;
  headingFallback?: string;
  textFallback?: string;
  ctaLabelFallback?: string;
  ctaHrefFallback?: string;
  children: ReactNode;
};

export default async function CMSPage({
  slug,
  eyebrow,
  headingFallback,
  textFallback,
  ctaLabelFallback,
  ctaHrefFallback,
  children,
}: Props) {
  const page = await getPageData(slug);

  return (
    <>
      <PageHero
        eyebrow={page.heroSubheading || eyebrow}
        heading={page.heroHeading || headingFallback || page.title}
        text={page.heroText || textFallback}
        ctaLabel={page.heroCtaLabel || ctaLabelFallback}
        ctaHref={page.heroCtaHref || ctaHrefFallback}
        images={page.images}
        autoplay={page.autoplay}
      />
      {children}
    </>
  );
}
