import React, { useState, useEffect, useCallback } from 'react';
import type { User, Reward, Transaction, Offer, BasicOffer } from './types';
import { generateOfferDescriptions } from './services/geminiService';
import Header from './components/Header';
import PointsSummary from './components/PointsSummary';
import RewardsList from './components/RewardsList';
import Transactions from './components/Transactions';
import Offers from './components/Offers';
import LoadingSpinner from './components/LoadingSpinner';

// Data is now expected to be on the window object, injected by WordPress.
// We provide a fallback object to prevent errors if the data isn't available.
const initialData = (window as any).brewRewardsData || {
  user: { name: 'Guest', points: 0, tier: 'Bronze', avatarUrl: '' },
  rewards: [],
  transactions: [],
  basicOffers: [],
};


const App: React.FC = () => {
  const [user] = useState<User>(initialData.user);
  const [rewards] = useState<Reward[]>(initialData.rewards);
  const [transactions] = useState<Transaction[]>(initialData.transactions);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnhancedOffers = useCallback(async () => {
    const basicOffers: BasicOffer[] = initialData.basicOffers;
    if (!basicOffers || basicOffers.length === 0) {
        setIsLoading(false);
        return;
    }
    
    try {
      setError(null);
      setIsLoading(true);
      const enhancedOffers = await generateOfferDescriptions(basicOffers);
      setOffers(enhancedOffers);
    } catch (err) {
      console.error("Failed to fetch enhanced offers:", err);
      setError('Could not load special offers. Please try again later.');
      // Fallback to basic offers
      setOffers(basicOffers.map(o => ({...o, description: 'Check in store for more details!'})));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnhancedOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-sans">
      <Header user={user} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <PointsSummary points={user.points} tier={user.tier} />
            <RewardsList rewards={rewards} userPoints={user.points} />
            <Transactions transactions={transactions} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8">
             {isLoading ? (
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center h-64">
                    <LoadingSpinner />
                    <p className="text-brand-brown mt-4 font-medium">Brewing up fresh offers...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl" role="alert">
                    <strong className="font-bold">Oops! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            ) : (
                <Offers offers={offers} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;