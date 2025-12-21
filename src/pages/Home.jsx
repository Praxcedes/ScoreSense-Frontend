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
    