type Step = { title?: string; text: string };

export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-6">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 items-start">
          <span
            className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded text-white text-sm font-bold"
            style={{ background: "#08B4D0", fontFamily: "var(--font-data)" }}
          >
            {i + 1}
          </span>
          <div className="pt-1">
            {step.title && (
              <p className="font-display text-lg font-bold mb-1" style={{ color: "#1E2430" }}>{step.title}</p>
            )}
            <p className="leading-relaxed text-sm sm:text-base" style={{ color: "#555C68" }}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
