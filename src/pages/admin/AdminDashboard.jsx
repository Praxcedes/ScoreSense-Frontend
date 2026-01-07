export default function AdminDashboard() {
  const stats = [
    { label: "Total Predictions", value: 128 },
    { label: "Win Rate", value: "63%" },
    { label: "Coins Earned", value: "24,500" },
    { label: "Active Users", value: 312 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900 border border-green-500/30 rounded-xl p-5"
          >
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-green-400">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
