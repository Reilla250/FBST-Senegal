type Stat = { value: string; label: string };

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="card-hover rounded border p-6 sm:p-7 text-center"
          style={{
            background: "#FFFFFF",
            borderColor: "#E0E3E8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd
            className="text-3xl sm:text-4xl font-extrabold mb-2"
            style={{ color: "#08B4D0", fontFamily: "var(--font-data)" }}
          >
            {s.value}
          </dd>
          <p className="text-sm font-medium leading-snug" style={{ color: "#555C68" }}>{s.label}</p>
        </div>
      ))}
    </dl>
  );
}
