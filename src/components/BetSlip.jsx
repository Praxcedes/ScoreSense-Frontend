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
          