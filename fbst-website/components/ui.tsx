import Link from "next/link";
import { ReactNode } from "react";

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-baobab" aria-hidden="true" />
          <span className="text-ink/85 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({
  title,
  children,
  tone = "sand",
}: {
  title: string;
  children: ReactNode;
  tone?: "sand" | "deep";
}) {
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 ${
        tone === "deep" ? "bg-sand-deep border-baobab/15" : "bg-white/60 border-baobab/10"
      }`}
    >
      <h3 className="font-display text-lg font-semibold text-baobab-dark mb-2">{title}</h3>
      <div className="text-sm text-ink/80 leading-relaxed">{children}</div>
    </div>
  );
}

export function CTA({
  heading,
  text,
  primary,
  secondary,
}: {
  heading: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="rounded-3xl bg-baobab text-sand px-6 py-10 sm:px-12 sm:py-14 text-center">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{heading}</h2>
      {text && <p className="text-sand/85 max-w-xl mx-auto mb-7 leading-relaxed">{text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={primary.href}
          className="inline-flex items-center rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-ink hover:bg-baobab-dark transition-colors"
        >
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="inline-flex items-center rounded-full border border-sand/40 px-6 py-3 text-sm font-semibold text-sand hover:bg-sand/10 transition-colors"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export function ButtonRow({
  buttons,
  onDark = false,
}: {
  buttons: { label: string; href: string; variant?: "primary" | "outline" }[];
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((b, i) => {
        if (b.variant !== "outline") {
          return (
            <Link
              key={i}
              href={b.href}
              className="inline-flex items-center rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-ink hover:bg-baobab-dark transition-colors"
            >
              {b.label}
            </Link>
          );
        }
        return (
          <Link
            key={i}
            href={b.href}
            className={
              onDark
                ? "inline-flex items-center rounded-full border border-sand/50 px-6 py-3 text-sm font-semibold text-sand hover:bg-sand/10 transition-colors"
                : "inline-flex items-center rounded-full border border-baobab/35 px-6 py-3 text-sm font-semibold text-baobab-dark hover:bg-baobab/10 transition-colors"
            }
          >
            {b.label}
          </Link>
        );
      })}
    </div>
  );
}
