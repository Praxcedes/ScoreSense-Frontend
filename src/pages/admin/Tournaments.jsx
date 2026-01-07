import { useEffect, useState } from "react";
import { getTournaments, createTournament } from "../../api/tournaments";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [name, setName] = useState("");
  const [entryFee, setEntryFee] = useState("");

  useEffect(() => {
    getTournaments().then(setTournaments);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await createTournament({ name, entryFee });

    setTournaments([
      ...tournaments,
      {
        id: Date.now(),
        name,
        entryFee,
        prizePool: entryFee * 10,
        status: "Open",
        players: 0,
      },
    ]);

    setName("");
    setEntryFee("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Tournaments
      </h1>

      {/* CREATE TOURNAMENT */}
      <form
        onSubmit={handleCreate}
        className="bg-zinc-900 border border-green-500/20 rounded-lg p-4 mb-8"
      >
        <h2 className="font-semibold mb-4">Create Tournament</h2>

        <div className="flex gap-4">
          <input
            className="bg-black border border-green-500/30 rounded px-3 py-2 w-full"
            placeholder="Tournament Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            className="bg-black border border-green-500/30 rounded px-3 py-2 w-40"
            placeholder="Entry Fee"
            value={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
            required
          />
        </div>

        <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded font-semibold">
          Create
        </button>
      </form>

      {/* TOURNAMENT LIST */}
      <div className="space-y-4">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-900 border border-green-500/20 rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-400">
                Entry: {t.entryFee} coins • Prize: {t.prizePool}
              </p>
            </div>

            <span className="text-green-400">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
