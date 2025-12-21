
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
);
