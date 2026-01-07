const stats = [
  {
    label: "Total Users",
    value: "12,450",
    change: "+4.5%",
  },
  {
    label: "Total Predictions",
    value: "148,320",
    change: "+12.8%",
  },
  {
    label: "Win Rate",
    value: "63.4%",
    badge: "Excellent",
  },
  {
    label: "Coins Earned",
    value: "9.8M",
    change: "+21%",
  },
];

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-green-900/20 border border-green-900/40 rounded-xl p-5"
        >
          <p className="text-sm text-gray-400">{stat.label}</p>

          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-white">
              {stat.value}
            </h3>

            {stat.change && (
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                {stat.change}
              </span>
            )}

            {stat.badge && (
              <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                {stat.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
