
import React from 'react';
import type { Reward } from '../types';
import { GiftIcon } from './icons/GiftIcon';
import { CoffeeBeanIcon } from './icons/CoffeeBeanIcon';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints }) => {
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <GiftIcon className="h-6 w-6 text-brand-brown" />
          <h3 className="font-semibold text-brand-dark">{reward.title}</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <CoffeeBeanIcon className="h-4 w-4 text-brand-gold" />
          <span>{reward.pointsCost.toLocaleString()} Points</span>
        </div>
      </div>
      <button
        disabled={!canAfford}
        className={`
          mt-4 w-full px-4 py-2 rounded-md font-semibold text-sm transition-colors
          ${canAfford
            ? 'bg-brand-brown text-white hover:bg-brand-dark'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {canAfford ? 'Redeem' : 'Not Enough Points'}
      </button>
    </div>
  );
};

export default RewardCard;
