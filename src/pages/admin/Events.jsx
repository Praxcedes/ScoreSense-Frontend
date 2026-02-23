import { useEffect, useState } from "react";
import { getFootballEvents, getUFCEvents } from "../../api/sports";

export default function Events() {
  const [football, setFootball] = useState([]);
  const [ufc, setUfc] = useState([]);

  useEffect(() => {
    getFootballEvents().then(setFootball);
    getUFCEvents().then(setUfc);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Sports Events
      </h1>

      {/* FOOTBALL */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Football Matches</h2>

        <div className="space-y-4">
          {football.map((match) => (
            <div
              key={match.id}
              className="bg-zinc-900 border border-green-500/20 rounded-lg p-4"
            >
              <p className="font-semibold">
                {match.home} vs {match.away}
              </p>
              <p className="text-sm text-gray-400">
                {match.league} • {match.time}
              </p>
              <p className="text-sm mt-2">
                Odds — Home: {match.odds.home} | Draw: {match.odds.draw} | Away:{" "}
                {match.odds.away}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* UFC */}
      <section>
        <h2 className="text-lg font-semibold mb-4">UFC Fights</h2>

        <div className="space-y-4">
          {ufc.map((fight) => (
            <div
              key={fight.id}
              className="bg-zinc-900 border border-green-500/20 rounded-lg p-4"
            >
              <p className="font-semibold">{fight.fight}</p>
              <p className="text-sm text-gray-400">
                {fight.category} • {fight.date}
              </p>
              <p className="text-sm mt-2">
                Odds — Fighter A: {fight.odds.fighter1} | Fighter B:{" "}
                {fight.odds.fighter2}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
