import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FileText, Table } from 'lucide-react';

export const ExportControls = ({ transactions }) => {
    const calculateTotals = () => {
        const amounts = transactions.map(t => t.amount);
        const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
        const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);
        return { total, income, expense };
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const { total, income, expense } = calculateTotals();

        // Title
        doc.setFontSize(20);
        doc.text('Expense Tracker Report', 14, 22);

        // Summary
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total Balance: $${total}`, 14, 40);
        doc.text(`Total Income: $${income}`, 14, 46);
        doc.text(`Total Expense: $${expense}`, 14, 52);

        // Table
        const tableColumn = ["Description", "Amount", "Type"];
        const tableRows = [];

        transactions.forEach(transaction => {
            const transactionData = [
                transaction.text,
                `$${Math.abs(transaction.amount)}`,
                transaction.amount > 0 ? "Income" : "Expense"
            ];
            tableRows.push(transactionData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 60,
        });

        doc.save('expense_report.pdf');
    };

    const exportExcel = () => {
        const { total, income, expense } = calculateTotals();

        // Data Preparation
        const data = transactions.map(t => ({
            Description: t.text,
            Amount: Math.abs(t.amount),
            Type: t.amount > 0 ? 'Income' : 'Expense'
        }));

        // Create Worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Add Summary at bottom (a bit hacky but works for simple exports)
        XLSX.utils.sheet_add_aoa(ws, [
            [],
            ["Summary"],
            ["Total Balance", total],
            ["Total Income", income],
            ["Total Expense", expense]
        ], { origin: -1 });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");

        XLSX.writeFile(wb, "expense_report.xlsx");
    };

    return (
        <div className="flex" style={{ gap: '10px', marginTop: '20px' }}>
            <button onClick={exportPDF} className="btn flex justify-between" style={{ backgroundColor: '#ef4444', justifyContent: 'center', gap: '8px' }}>
                <FileText size={18} /> Export PDF
            </button>
            <button onClick={exportExcel} className="btn flex justify-between" style={{ backgroundColor: '#10b981', justifyContent: 'center', gap: '8px' }}>
                <Table size={18} /> Export Excel
            </button>
        </div>
    );
};
