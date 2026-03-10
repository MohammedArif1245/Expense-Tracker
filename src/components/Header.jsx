import React from 'react';
import { Wallet } from 'lucide-react';

export const Header = () => {
  return (
    <div className="flex justify-center" style={{ marginBottom: '2rem', gap: '10px' }}>
      <Wallet size={32} color="var(--primary-color)" />
      <h1>Expense Tracker</h1>
    </div>
  );
};
