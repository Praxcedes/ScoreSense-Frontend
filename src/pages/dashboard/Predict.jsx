import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';

const Predict = () => {
  const [wager, setWager] = useState(500);

  return (
    <div className="p-8 bg-background min-h-screen text-white">
      {/* Match Header */}
      <div className="bg-surface rounded-3xl p-8 border border-gray-800 relative overflow-hidden mb-8">
        <div className="absolute top-4 left-4 bg-gray-800/50 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-muted border border-gray-700">
          UFC 294 • Lightweight Title Bout
        </div>
        
        <div className="flex justify-center items-center gap-12 mt-4">
          <div className="text-center">
            <img src="https://ui-avatars.com/api/?name=Islam+Makhachev&background=10b981&color=fff&size=128" className="w-32 h-32 rounded-full border-4 border-primary shadow-lg shadow-primary/20 mx-auto" alt="Makhachev" />
            <h2 className="text-3xl font-bold mt-4">Makhachev</h2>
            <p className="text-muted">24-1-0</p>
          </div>
          <div className="text-center">
            <span className="text-6xl font-black text-gray-700">VS</span>
            <p className="text-primary mt-2 font-mono text-sm">5 Rounds</p>
          </div>
          <div className="text-center">
            <img src="https://ui-avatars.com/api/?name=Volkanovski&background=374151&color=fff&size=128" className="w-32 h-32 rounded-full border-4 border-gray-600 grayscale mx-auto" alt="Volk" />
            <h2 className="text-3xl font-bold mt-4 text-gray-400">Volkanovski</h2>
            <p className="text-muted">26-2-0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stats Column */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold mb-6">Head-to-Head Stats</h3>
                
                {['Striking Accuracy', 'Grappling', 'Stamina'].map(stat => (
                    <div className="mb-6" key={stat}>
                        <div className="flex justify-between text-sm mb-2">
                            <span>58%</span>
                            <span className="text-muted font-bold uppercase">{stat}</span>
                            <span>52%</span>
                        </div>
                        <div className="h-3 bg-gray-800 rounded-full flex overflow-hidden">
                            <div className="w-[58%] bg-primary"></div>
                            <div className="w-[42%] bg-gray-600"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-accent/20 p-6 rounded-2xl border border-primary/20 flex gap-4 items-start">
                <div className="p-3 bg-primary/20 rounded-lg text-primary"><Zap size={24}/></div>
                <div>
                    <h4 className="font-bold text-lg text-primary">Expert Insight</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mt-2">
                        While Volkanovski showed resilience in their first bout, Makhachev's grappling dominance remains the critical factor. The shorter notice is a significant disadvantage for Volkanovski's cardio.
                    </p>
                </div>
            </div>
        </div>

        {/* Prediction Controls */}
        <div className="bg-surface p-6 rounded-3xl border border-gray-800 h-fit sticky top-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Make Prediction</h3>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-muted">x1.5 Multiplier Active</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="bg-primary text-black font-bold py-4 rounded-xl shadow-lg shadow-green-900/50 ring-2 ring-primary">
                    Makhachev
                    <span className="block text-xs font-normal opacity-80 mt-1">to Win</span>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl border border-gray-700">
                    Volkanovski
                    <span className="block text-xs font-normal opacity-50 mt-1">to Win</span>
                </button>
            </div>

            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted">Wager Amount</span>
                    <span className="font-mono font-bold text-primary">{wager} VP</span>
                </div>
                <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    value={wager} 
                    onChange={(e) => setWager(e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted mt-2 font-mono">
                    <span>10 VP</span>
                    <span>1000 VP</span>
                </div>
            </div>

            <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-xl mb-6 border border-gray-800">
                <span className="text-muted text-sm">Potential Return</span>
                <span className="text-2xl font-bold text-primary">{(wager * 1.5).toFixed(0)} VP</span>
            </div>

            <button className="w-full bg-primary hover:bg-green-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
                Submit Prediction <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Predict;