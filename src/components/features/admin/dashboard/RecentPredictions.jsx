const predictions = [
  {
    id: "#PR-7821",
    user: "Kevin Mwangi",
    match: "Makhachev vs Volkanovski",
    result: "Win",
    coins: "+450",
    time: "5 mins ago",
  },
  {
    id: "#PR-7822",
    user: "Sarah Ochieng",
    match: "Man City vs Arsenal",
    result: "Loss",
    coins: "-200",
    time: "20 mins ago",
  },
  {
    id: "#PR-7823",
    user: "John Doe",
    match: "UFC 300 Main Card",
    result: "Pending",
    coins: "—",
    time: "1 hr ago",
  },
];

const resultStyles = {
  Win: "text-green-400 bg-green-400/10",
  Loss: "text-red-400 bg-red-400/10",
  Pending: "text-yellow-400 bg-yellow-400/10",
};

export default function RecentPredictions() {
  return (
    <div className="mt-6 bg-green-900/20 border border-green-900/40 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-green-900/40">
        <h3 className="text-white font-semibold">
          Recent Predictions
        </h3>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-green-900/30 text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">USER</th>
            <th className="px-4 py-3">MATCH</th>
            <th className="px-4 py-3">RESULT</th>
            <th className="px-4 py-3">COINS</th>
            <th className="px-4 py-3">TIME</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((p) => (
            <tr
              key={p.id}
              className="border-t border-green-900/30 hover:bg-green-900/10"
            >
              <td className="px-4 py-3 text-green-400">{p.id}</td>
              <td className="px-4 py-3 text-white">{p.user}</td>
              <td className="px-4 py-3 text-center">{p.match}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${resultStyles[p.result]}`}
                >
                  {p.result}
                </span>
              </td>
              <td className="px-4 py-3 text-center">{p.coins}</td>
              <td className="px-4 py-3 text-center text-gray-400">
                {p.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
