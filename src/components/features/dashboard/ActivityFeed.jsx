const ActivityFeed = () => {
  return (
    <div className="bg-surface rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Activity Feed</h2>

      <ul className="space-y-3 text-sm">
        <li className="text-primary">✔ Won prediction on PSG vs Lyon +200 VP</li>
        <li className="text-muted">🏆 Joined Weekly Leaderboard</li>
        <li className="text-red-400">✖ Lost prediction on Inter vs Milan</li>
      </ul>
    </div>
  );
};

export default ActivityFeed;
