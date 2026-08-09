type Stat = { value: string; label: string };

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-3 gap-px bg-baobab/15 rounded-2xl overflow-hidden border border-baobab/15">
      {stats.map((s, i) => (
        <div key={i} className="bg-sand p-6 sm:p-7">
          <dt className="sr-only">{s.label}</dt>
          <dd
            className="text-3xl sm:text-4xl font-semibold text-baobab"
            style={{ fontFamily: "var(--font-data)" }}
          >
            {s.value}
          </dd>
          <p className="mt-2 text-sm text-ink/75 leading-snug">{s.label}</p>
        </div>
      ))}
    </dl>
  );
}
