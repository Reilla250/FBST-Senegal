import Link from "next/link";
import { ReactNode } from "react";

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span
            className="mt-1 flex-shrink-0 font-bold text-base"
            style={{ color: "#08B4D0" }}
            aria-hidden="true"
          >
            ✓
          </span>
          <span className="leading-relaxed text-sm sm:text-base" style={{ color: "#555C68" }}>{item}</span>
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
      className="card-hover rounded border p-6 sm:p-7 transition-colors"
      style={{
        background: tone === "deep" ? "#F0F2F5" : "#FFFFFF",
        borderColor: "#E0E3E8",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Cyan top border accent like Porto cards */}
      <div className="w-10 h-0.5 mb-4" style={{ background: "#08B4D0" }} />
      <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#1E2430" }}>{title}</h3>
      <div className="text-sm leading-relaxed" style={{ color: "#555C68" }}>{children}</div>
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
    <div
      className="rounded text-center px-6 py-12 sm:px-12 sm:py-16"
      style={{ background: "#1E2430" }}
    >
      {/* Cyan accent line above heading */}
      <div className="w-12 h-1 mx-auto mb-6" style={{ background: "#08B4D0" }} />
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
        {heading}
      </h2>
      {text && (
        <p className="max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed" style={{ color: "#A8B2BF" }}>
          {text}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        <Link href={primary.href} className="btn-primary">
          {primary.label} →
        </Link>
        {secondary && (
          <Link href={secondary.href} className="btn-outline">
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
      {buttons.map((b, i) =>
        b.variant !== "outline" ? (
          <Link key={i} href={b.href} className="btn-primary">
            {b.label}
          </Link>
        ) : (
          <Link key={i} href={b.href} className="btn-outline">
            {b.label}
          </Link>
        )
      )}
    </div>
  );
}
