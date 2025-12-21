import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';

const BetSlip = () => {
  const [wager, setWager] = useState(500);

  