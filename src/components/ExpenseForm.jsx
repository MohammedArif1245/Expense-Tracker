import React, { useState } from 'react';

export const ExpenseForm = ({ addTransaction }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');

    const onSubmit = e => {
        e.preventDefault();

        if (!text || !amount) return;

        const finalAmount = type === 'income' ? Math.abs(+amount) : -Math.abs(+amount);

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: finalAmount
        };

        addTransaction(newTransaction);
        setText('');
        setAmount('');
    };

    return (
        <div className="card">
            <h3>Add Transaction</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="text">Description</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="e.g. Salary, Rent, Groceries..."
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
                <button className="btn">Add Transaction</button>
            </form>
        </div>
    );
};
