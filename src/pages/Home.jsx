import React from 'react';
import StatsGrid from '../../components/features/dashboard/StatsGrid';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Wallet } from 'lucide-react';

const MatchCard = ({ teamA, teamB, time, status }) => (
  <Card className="hover:border-gray-600 transition-all cursor-pointer group">
    <div className="flex justify-between items-center mb-4">
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${status === 'LIVE' ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/20' : 'bg-gray-800 text-muted border border-gray-700'}`}>
        {status === 'LIVE' ? "● LIVE 23'" : time}
        </span>
      <span className="text-primary text-xs font-bold">2.5x Multiplier</span>
    </div>
    <div className="flex justify-between items-center text-center py-2">
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl border border-gray-700 group-hover:border-primary transition-colors">🛡️</div>
        <p className="font-bold text-white text-sm">{teamA}</p>
      </div>
      <div className="text-2xl font-black text-gray-700 px-4">VS</div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl border border-gray-700 group-hover:border-primary transition-colors">🦁</div>
        <p className="font-bold text-white text-sm">{teamB}</p>
      </div>
      