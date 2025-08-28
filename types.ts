
export interface User {
  name: string;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  avatarUrl: string;
}

export interface Reward {
  id: string;
  title: string;
  pointsCost: number;
}

export interface Transaction {
  id: string;

  date: string;
  description: string;
  pointsChange: number;
}

export interface BasicOffer {
    id: string;
    title: string;
}

export interface Offer extends BasicOffer {
  description: string;
}
