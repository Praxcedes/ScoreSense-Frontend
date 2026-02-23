import { usePoints } from "../../context/PointsContext";

export default function PointsCard() {
  const { points } = usePoints();

  return (
    <div className="bg-zinc-900 border border-green-500/20 rounded-lg p-6">
      <p className="text-sm text-gray-400">Available Points</p>
      <p className="text-3xl font-bold text-green-400">{points}</p>
    </div>
  );
}
