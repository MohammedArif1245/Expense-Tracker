import React from 'react';
import { Trash2 } from 'lucide-react';

export const TransactionItem = ({ transaction, deleteTransaction }) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const borderClass = transaction.amount < 0 ? 'minus' : 'plus';

    return (
        <li className={`transaction-item ${borderClass}`}>
            <div className="transaction-info">
                <span className="transaction-text">{transaction.text}</span>
            </div>
            <div className="flex">
                <span className="transaction-amount">
                    {sign}${Math.abs(transaction.amount)}
                </span>
                <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="btn-delete"
                    aria-label="Delete transaction"
                    style={{ marginLeft: '12px' }}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </li>
    );
};
