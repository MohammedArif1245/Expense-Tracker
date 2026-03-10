import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { ExportControls } from './components/ExportControls';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <div className="grid-2">
        <div>
          <Dashboard transactions={transactions} />
          <ExportControls transactions={transactions} />
          <ExpenseForm addTransaction={addTransaction} />
        </div>
        <ExpenseList transactions={transactions} deleteTransaction={deleteTransaction} />
      </div>
    </div>
  );
}

export default App;
