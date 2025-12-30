import { useEffect, useState } from "react";
import { getTournaments } from "../../api/tournaments";

export default function TournamentLobby() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    getTournaments().then(setTournaments);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Tournament Lobby
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-900 border border-green-500/20 rounded-lg p-6"
          >
            <h2 className="font-semibold text-lg mb-2">{t.name}</h2>

            <p className="text-sm text-gray-400 mb-2">
              Entry Fee: {t.entryFee} coins
            </p>

            <p className="text-sm mb-4">
              Prize Pool: <span className="text-green-400">{t.prizePool}</span>
            </p>

            <button className="w-full bg-green-500 text-black py-2 rounded font-semibold">
              Join Tournament
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
