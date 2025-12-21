import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';

const BetSlip = () => {
  const [wager, setWager] = useState(500);

  return (
    <Card className="sticky top-4 border-primary/20 bg-surface/50 backdrop-blur">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold flex items-center gap-2 text-white">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Make Prediction
        </h3>
        <span className="text-xs bg-gray-800 px-2 py-1 rounded text-muted border border-gray-700">x1.5 Multiplier</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-primary text-black font-bold py-4 rounded-xl ring-2 ring-primary relative overflow-hidden transition-transform active:scale-95">
          Makhachev
          <span className="block text-xs font-normal opacity-80 mt-1">to Win</span>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl border border-gray-700 transition-colors">
          Volkanovski
          <span className="block text-xs font-normal opacity-50 mt-1">to Win</span>
        </button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Wager Amount</span>
          <span className="font-mono font-bold text-primary">{wager} VP</span>
        </div>
        <input 
          type="range" min="10" max="1000" value={wager} 
          onChange={(e) => setWager(e.target.value)}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted font-mono">
          <span>10 VP</span>
          <span>1000 VP</span>
        </div>
      </div>
      