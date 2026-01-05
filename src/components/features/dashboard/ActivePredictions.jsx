const ActivePredictions = () => {
  return (
    <div className="bg-surface rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Your Active Predictions</h2>

      <table className="w-full text-sm">
        <thead className="text-muted">
          <tr>
            <th className="text-left">Match</th>
            <th>Stake</th>
            <th>Return</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-surfaceSoft">
            <td>Adesanya vs Pereira</td>
            <td>500 VP</td>
            <td className="text-primary">1,200 VP</td>
            <td className="text-yellow-400">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ActivePredictions;
