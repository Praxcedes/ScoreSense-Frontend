import { usePoints } from "../../context/PointsContext";

export default function Points() {
  const { points, earnPoints, spendPoints } = usePoints();

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Points Management
      </h1>

      <p className="mb-4">
        User Balance: <span className="text-green-400">{points}</span>
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => earnPoints(100)}
          className="bg-green-500 text-black px-4 py-2 rounded"
        >
          Add 100 Points
        </button>

        <button
          onClick={() => spendPoints(50)}
          className="bg-red-500 text-black px-4 py-2 rounded"
        >
          Deduct 50 Points
        </button>
      </div>
    </div>
  );
}
