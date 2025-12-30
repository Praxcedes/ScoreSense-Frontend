import Leaderboard from "../../components/features/tournaments/Leaderboard";

export default function TournamentLobby() {
  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Champions Coin Clash
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT: TOURNAMENT INFO */}
        <div className="md:col-span-2 bg-zinc-900 border border-green-500/20 rounded-lg p-6">
          <p className="mb-4">
            Entry Fee: <span className="text-green-400">50 coins</span>
          </p>
          <p className="mb-4">
            Prize Pool: <span className="text-green-400">500 coins</span>
          </p>

          <button className="bg-green-500 text-black px-6 py-2 rounded font-semibold">
            Join Tournament
          </button>
        </div>

        {/* RIGHT: LEADERBOARD */}
        <Leaderboard tournamentId={1} />
      </div>
    </div>
  );
}
