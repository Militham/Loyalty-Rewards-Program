
import React from 'react';
import type { Reward } from '../types';
import RewardCard from './RewardCard';

interface RewardsListProps {
  rewards: Reward[];
  userPoints: number;
}

const RewardsList: React.FC<RewardsListProps> = ({ rewards, userPoints }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-brand-brown mb-4">Available Rewards</h2>
      {rewards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} userPoints={userPoints} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No rewards available at the moment.</p>
      )}
    </div>
  );
};

export default RewardsList;
