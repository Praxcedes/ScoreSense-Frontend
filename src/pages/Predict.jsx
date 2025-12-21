import React from 'react';
import BetSlip from '../../components/features/predict/BetSlip';
import Card from '../../components/common/Card';
import { Zap } from 'lucide-react';

const Predict = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="mb-8 relative overflow-hidden bg-gradient-to-br from-surface to-black border border-border rounded-3xl p-8">
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-muted border border-gray-700">
          UFC 294 • Lightweight Title Bout
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 py-6">
          <div className="text-center group">
            <div className="w-32 h-32 rounded-full border-4 border-primary shadow-[0_0_30px_rgba(16,185,129,0.3)] mx-auto bg-gray-800 overflow-hidden mb-4 group-hover:scale-105 transition-transform">
               <img src="https://ui-avatars.com/api/?name=Islam+Makhachev&background=10b981&color=fff&size=128" alt="Makhachev" />
            </div>
            <h2 className="text-3xl font-bold text-white">Makhachev</h2>
            <p className="text-muted font-mono mt-1">24-1-0</p>
          </div>

           <div className="text-center flex flex-col items-center">
            <span className="text-6xl font-black text-gray-800 select-none">VS</span>
            <p className="text-primary mt-2 font-mono text-sm bg-primary/10 px-3 py-1 rounded">5 Rounds</p>
          </div>

          <div className="text-center group">
            <div className="w-32 h-32 rounded-full border-4 border-gray-700 grayscale mx-auto bg-gray-800 overflow-hidden mb-4 group-hover:grayscale-0 transition-all">
                <img src="https://ui-avatars.com/api/?name=Volkanovski&background=374151&color=fff&size=128" alt="Volk" />
            </div>
            <h2 className="text-3xl font-bold text-gray-400 group-hover:text-white transition-colors">Volkanovski</h2>
            <p className="text-muted font-mono mt-1">26-2-0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Analysis */}
        <div className="lg:col-span-2 space-y-6"></div>
        <Card>
             <h3 className="font-bold text-white mb-6">Head-to-Head Stats</h3>
             {[
              { label: "Striking Accuracy", left: "58%", right: "52%", w: "58%" },
               { label: "Takedowns Avg", left: "3.24", right: "1.52", w: "70%" },
               { label: "Sig. Strikes / Min", left: "6.2", right: "4.8", w: "60%" }
             ].map((stat, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                 <div className="flex justify-between text-sm mb-2 font-mono">
                   <span>{stat.left}</span>
                   <span className="text-muted font-bold uppercase font-sans text-xs">{stat.label}</span>
                   <span>{stat.right}</span>
                   </div>
                 <div className="h-2 bg-gray-800 rounded-full flex overflow-hidden">
                   <div className="bg-primary h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: stat.w }}></div>
                   <div className="bg-gray-700 h-full flex-1"></div>
                 </div>
                 </div>
             ))}
          </Card>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex gap-4 items-start">
            <div className="p-3 bg-primary/10 rounded-xl text-primary"><Zap size={24}/></div>
            <div>
              <h4 className="font-bold text-lg text-primary">Expert Insight</h4>
              <p className="text-gray-400 text-sm leading-relaxed mt-2">
                While Volkanovski showed resilience in their first bout, Makhachev's grappling dominance remains the critical factor. The shorter notice is a significant disadvantage for Volkanovski's cardio in later rounds.
              </p>
              </div>
          </div>
        </div>

        {/* Right Col: Bet Slip */}
        <div className="lg:col-span-1">
          <BetSlip />
        </div>
        </div>
    </div>
  );
};




      