
import React from 'react';
import type { User } from '../types';
import { CoffeeBeanIcon } from './icons/CoffeeBeanIcon';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-brand-dark shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <CoffeeBeanIcon className="h-8 w-8 text-brand-gold" />
          <h1 className="text-2xl font-bold text-white">BrewRewards</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-sm text-brand-gold">{user.tier} Member</p>
          </div>
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="h-12 w-12 rounded-full border-2 border-brand-gold object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
