
import React from 'react';
import type { Transaction } from '../types';
import { CoffeeBeanIcon } from './icons/CoffeeBeanIcon';

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-brand-brown mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {transactions.map((transaction, index) => {
          const isCredit = transaction.pointsChange > 0;
          return (
            <div
              key={transaction.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                index % 2 === 0 ? 'bg-brand-cream/50' : 'bg-transparent'
              }`}
            >
              <div>
                <p className="font-medium text-brand-dark">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="flex items-center space-x-1">
                <span
                  className={`font-semibold ${
                    isCredit ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isCredit ? '+' : ''}
                  {transaction.pointsChange.toLocaleString()}
                </span>
                <CoffeeBeanIcon className="h-4 w-4 text-brand-gold" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
