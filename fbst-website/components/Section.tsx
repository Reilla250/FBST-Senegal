import { ReactNode } from "react";
import HorizonDivider from "./HorizonDivider";

type Props = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  tone?: "sand" | "deep";
  divider?: boolean;
  id?: string;
};

export default function Section({ title, eyebrow, children, tone = "sand", divider = false, id }: Props) {
  return (
    <section
      id={id}
      className="transition-colors"
      style={{ background: tone === "deep" ? "#F0F2F5" : "#FFFFFF" }}
    >
      {divider && <HorizonDivider tone="baobab" />}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        {eyebrow && (
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#08B4D0" }}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className="font-display text-2xl sm:text-3xl font-bold mb-8 max-w-2xl leading-tight"
            style={{ color: "#1E2430" }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
