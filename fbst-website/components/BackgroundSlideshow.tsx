"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  images: string[];
  autoplay?: boolean;
};

export default function BackgroundSlideshow({ images, autoplay = true }: Props) {
  const [index, setIndex] = useState(0);
  const visibleImages = useMemo(() => images.filter(Boolean), [images]);

  useEffect(() => {
    if (!autoplay || visibleImages.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % visibleImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [autoplay, visibleImages.length]);

  if (visibleImages.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {visibleImages.map((src, idx) => (
        <div
          key={`${src}-${idx}`}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${idx === index ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.65)), url('${src}')` }}
        />
      ))}
    </div>
  );
}
