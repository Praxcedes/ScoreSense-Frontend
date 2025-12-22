const LiveMatches = () => {
  return (
    <div className="bg-surface rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Live & Upcoming</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surfaceSoft rounded-xl p-4">
          <p className="text-sm text-muted">LIVE 23'</p>
          <h3 className="font-bold">Gor Mahia 1 : 0 AFC Leopards</h3>
          <button className="mt-3 bg-primary text-black w-full py-2 rounded-lg">
            Predict Live
          </button>
        </div>

        <div className="bg-surfaceSoft rounded-xl p-4">
          <p className="text-sm text-muted">Today 19:45 · 2.5x</p>
          <h3 className="font-bold">Arsenal vs Liverpool</h3>
          <button className="mt-3 bg-primary/20 text-primary w-full py-2 rounded-lg">
            Make Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;
