const QuickPredict = () => {
  return (
    <div className="bg-surface rounded-2xl p-6">
      <h2 className="font-semibold mb-4">⚡ Quick Predict</h2>

      <p className="text-muted text-sm mb-2">MATCH OF THE DAY</p>
      <h3 className="font-bold mb-4">Man City vs Spurs</h3>

      <div className="space-y-2">
        <button className="w-full bg-primary/20 text-primary py-2 rounded-lg">
          Home 1.45
        </button>
        <button className="w-full bg-surfaceSoft py-2 rounded-lg">
          Draw 3.20
        </button>
        <button className="w-full bg-surfaceSoft py-2 rounded-lg">
          Away 5.10
        </button>
      </div>
    </div>
  );
};

export default QuickPredict;
