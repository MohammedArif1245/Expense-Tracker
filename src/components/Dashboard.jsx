import React from 'react';

export const Dashboard = ({ transactions }) => {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) *
        -1
    ).toFixed(2);

    return (
        <div className="card">
            <h4 className="text-center">Total Balance</h4>
            <h1 className="text-center balance-display">${total}</h1>

            <div className="inc-exp-container">
                <div className="inc-exp-card">
                    <h4>Income</h4>
                    <p className="money plus">+${income}</p>
                </div>
                <div className="inc-exp-card">
                    <h4>Expense</h4>
                    <p className="money minus">-${expense}</p>
                </div>
            </div>
        </div>
    );
};
