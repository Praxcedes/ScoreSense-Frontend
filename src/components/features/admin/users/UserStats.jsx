const stats = [
  { label: "Total Registered Users", value: "12,450", change: "+5.2%" },
  { label: "Active Tournaments", value: "8", badge: "Stable" },
  { label: "Pending Predictions", value: "342", change: "+12%" },
];

export default function UserStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-green-900/20 border border-green-900/40 rounded-xl p-5"
        >
          <p className="text-sm text-gray-400">{stat.label}</p>

          <div className="flex items-center gap-3 mt-2">
            <h3 className="text-2xl font-bold text-white">
              {stat.value}
            </h3>

            {stat.change && (
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                {stat.change}
              </span>
            )}

            {stat.badge && (
              <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                {stat.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
