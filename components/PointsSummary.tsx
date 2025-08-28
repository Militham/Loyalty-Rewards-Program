
import React from 'react';
import { CoffeeBeanIcon } from './icons/CoffeeBeanIcon';

interface PointsSummaryProps {
  points: number;
  tier: string;
}

const PointsSummary: React.FC<PointsSummaryProps> = ({ points, tier }) => {
  const nextTierPoints = 2000;
  const progressPercentage = Math.min((points / nextTierPoints) * 100, 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-brand-brown">Your Balance</h2>
          <p className="text-sm text-gray-500">Part of the {tier} Tier</p>
        </div>
        <div className="flex items-center space-x-2 bg-brand-cream px-4 py-2 rounded-full">
          <CoffeeBeanIcon className="h-6 w-6 text-brand-gold" />
          <span className="text-2xl font-bold text-brand-dark">{points.toLocaleString()}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm font-medium text-brand-brown mb-1">
          <span>Progress to next tier</span>
          <span>{points} / {nextTierPoints}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-brand-gold h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PointsSummary;
