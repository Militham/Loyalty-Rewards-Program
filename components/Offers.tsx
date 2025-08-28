
import React from 'react';
import type { Offer } from '../types';
import { StarIcon } from './icons/StarIcon';

interface OffersProps {
  offers: Offer[];
}

const Offers: React.FC<OffersProps> = ({ offers }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-brand-brown mb-4">Just For You</h2>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border-l-4 border-brand-gold pl-4">
            <div className="flex items-center space-x-2">
                <StarIcon className="h-5 w-5 text-brand-gold"/>
                <h3 className="font-semibold text-brand-dark">{offer.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
