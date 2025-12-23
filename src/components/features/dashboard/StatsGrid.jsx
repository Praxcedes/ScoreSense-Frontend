const stats = [
  { label: "TOTAL POINTS", value: "12,500 VP" },
  { label: "WIN RATE", value: "64%", extra: "+2.5%" },
  { label: "GLOBAL RANK", value: "#102", extra: "↑ 5" },
  { label: "EARNED TODAY", value: "+450 VP" },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-surfaceSoft rounded-2xl p-6"
        >
          <p className="text-muted text-sm">{s.label}</p>
          <h3 className="text-2xl font-bold text-primary">
            {s.value}
          </h3>
          {s.extra && (
            <p className="text-primarySoft text-sm">{s.extra}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
