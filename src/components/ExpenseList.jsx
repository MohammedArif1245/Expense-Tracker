import React from 'react';
import { TransactionItem } from './TransactionItem';

export const ExpenseList = ({ transactions, deleteTransaction }) => {
    return (
        <div style={{ flex: 1 }}>
            <h3>Transaction History</h3>
            {transactions.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '20px' }}>No transactions yet.</p>
            ) : (
                <ul className="transaction-list">
                    {transactions.map(transaction => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            deleteTransaction={deleteTransaction}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};
