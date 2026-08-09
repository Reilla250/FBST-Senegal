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
    <section id={id} className={tone === "deep" ? "bg-sand-deep" : "bg-sand"}>
      {divider && <HorizonDivider tone="baobab" />}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest uppercase text-baobab mb-3">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-baobab-dark mb-8 max-w-2xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
