type Step = { title?: string; text: string };

export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative border-l border-baobab/25 ml-3 space-y-8">
      {steps.map((step, i) => (
        <li key={i} className="pl-8 relative">
          <span
            className="absolute -left-[19px] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-baobab text-sand text-sm font-semibold"
            style={{ fontFamily: "var(--font-data)" }}
          >
            {i + 1}
          </span>
          {step.title && (
            <p className="font-display text-lg font-semibold text-baobab-dark mb-1">{step.title}</p>
          )}
          <p className="text-ink/85 leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
