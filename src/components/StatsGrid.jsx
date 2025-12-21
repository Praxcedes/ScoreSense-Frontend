
import React from 'react';
import { Wallet, TrendingUp, Globe, DollarSign } from 'lucide-react';
import Card from '../../common/Card';

const StatItem = ({ title, value, subtext, icon: Icon, isPositive }) => (
  <Card className="relative overflow-hidden group hover:border-primary/50 transition-colors">
    <div className="relative z-10">
      <p className="text-muted text-xs font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
      <p className={`text-sm mt-1 font-medium ${isPositive ? 'text-primary' : 'text-primary'}`}>
        {subtext}
        </p>
    </div>
    <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon className="w-16 h-16 text-white" />
    </div>
  </Card>
);const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatItem title="Total Points" value="12,500 VP" subtext="Wallet Balance" icon={Wallet} />
      <StatItem title="Win Rate" value="64%" subtext="+2.5% vs last week" icon={TrendingUp} isPositive={true} />
      <StatItem title="Global Rank" value="#102" subtext="Top 5% of users" icon={Globe} />
      <StatItem title="Earned Today" value="+450 VP" subtext="3 Correct Predictions" icon={DollarSign} isPositive={true} />
    </div>
  );
};



