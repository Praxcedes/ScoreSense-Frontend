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
      </div>
    <Button variant={status === 'LIVE' ? 'primary' : 'ghost'} className="w-full mt-6 text-sm">
      {status === 'LIVE' ? 'Predict Live' : 'Make Prediction'}
    </Button>
  </Card>
);

const Home = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Welcome back, Juma</h1>
          <p className="text-muted mt-2">Your analytics overview for today.</p>
        </div>
        <div className="bg-primary/10 text-primary px-5 py-2.5 rounded-full font-bold flex items-center gap-3 border border-primary/20">
          <Wallet className="w-4 h-4" /> 12,500 VP 
          <div className="w-6 h-6 bg-primary rounded-full text-black flex items-center justify-center text-sm cursor-pointer hover:bg-white">+</div>
        </div>
      </div>

      <StatsGrid />
      