type Props = {
  tone?: "sand" | "baobab" | "teal";
  flip?: boolean;
};

/**
 * Signature element: a thin rising-arc line, evoking a horizon at first
 * light. Used at every major section transition instead of a plain
 * hairline rule — it ties back to "Nouveau Départ" (new start) and the
 * idea of moving from fear toward a clearer, safer day.
 */
export default function HorizonDivider({ tone = "baobab", flip = false }: Props) {
  const strokeMap: Record<string, string> = {
    sand: "var(--sand-deep)",
    baobab: "var(--baobab)",
    teal: "var(--teal)",
  };
  const stroke = strokeMap[tone];

  return (
    <div className="horizon-divider" aria-hidden="true">
      <svg
        viewBox="0 0 1100 48"
        preserveAspectRatio="none"
        style={flip ? { transform: "translateX(-50%) scaleY(-1)" } : undefined}
      >
        <path
          d="M0 40 C 220 40, 320 6, 550 6 C 780 6, 880 40, 1100 40"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="550" cy="6" r="4" fill="var(--marigold)" />
      </svg>
    </div>
  );
}
