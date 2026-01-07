import { useEffect, useState } from "react";
import { getTournamentLeaderboard } from "../../../api/leaderboard";

export default function Leaderboard({ tournamentId }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getTournamentLeaderboard(tournamentId).then(setPlayers);
  }, [tournamentId]);

  return (
    <div className="bg-zinc-900 border border-green-500/20 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-green-400 mb-4">
        Leaderboard
      </h3>

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left py-2">#</th>
            <th className="text-left">Player</th>
            <th>Wins</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p, index) => (
            <tr
              key={p.id}
              className="border-t border-green-500/10"
            >
              <td className="py-2">{index + 1}</td>
              <td>{p.username}</td>
              <td className="text-center">{p.wins}</td>
              <td className="text-center text-green-400">
                {p.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
