import { usePoints } from "../../context/PointsContext";
import Leaderboard from "../../components/features/tournaments/Leaderboard";

export default function TournamentLobby() {
  const { spendPoints } = usePoints();

  const joinTournament = () => {
    spendPoints(50);
    alert("You joined the tournament!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Champions Coin Clash
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-zinc-900 border border-green-500/20 rounded-lg p-6">
          <p>Entry Fee: <span className="text-green-400">50 coins</span></p>

          <button
            onClick={joinTournament}
            className="mt-4 bg-green-500 text-black px-6 py-2 rounded font-semibold"
          >
            Join Tournament
          </button>
        </div>

        <Leaderboard tournamentId={1} />
      </div>
    </div>
  );
}
