// Financial calculation utilities for SmartBudget
// Handles transaction summaries, category breakdowns, and analytics

import { TRANSACTION_TYPES } from './constants';

/**
 * Calculate total income from transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total income amount
 */
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === TRANSACTION_TYPES.INCOME)
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate total expenses from transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total expense amount
 */
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate balance from income and expenses
 * @param {number} income - Total income amount
 * @param {number} expenses - Total expense amount
 * @returns {number} Balance (income - expenses)
 */
export const calculateBalance = (income, expenses) => {
  return income - expenses;
};

/**
 * Calculate financial summary from transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Summary with totalIncome, totalExpenses, balance
 * @deprecated Use calculateTotalIncome, calculateTotalExpenses, and calculateBalance instead
 */
export const calculateSummary = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    balance: calculateBalance(income, expenses)
  };
};

/**
 * Get expense breakdown by category
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Category breakdown { categoryName: amount }
 */
export const getCategoryBreakdown = (transactions) => {
  const expenses = transactions.filter(t => t.type === TRANSACTION_TYPES.EXPENSE);

  return expenses.reduce((acc, t) => {
    const category = t.category;
    acc[category] = (acc[category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});
};

/**
 * Get income breakdown by category
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Category breakdown { categoryName: amount }
 */
export const getIncomeBreakdown = (transactions) => {
  const income = transactions.filter(t => t.type === TRANSACTION_TYPES.INCOME);

  return income.reduce((acc, t) => {
    const category = t.category;
    acc[category] = (acc[category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});
};

/**
 * Filter transactions based on criteria
 * @param {Array} transactions - Array of transaction objects
 * @param {Object} filters - Filter criteria { startDate, endDate, category, type }
 * @returns {Array} Filtered transactions
 */
export const filterTransactions = (transactions, filters) => {
  return transactions.filter(transaction => {
    // Filter by date range
    if (filters.startDate && new Date(transaction.date) < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && new Date(transaction.date) > new Date(filters.endDate)) {
      return false;
    }

    // Filter by category
    if (filters.category && filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }

    // Filter by type
    if (filters.type && filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }

    return true;
  });
};

/**
 * Sort transactions by date (newest first)
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Sorted transactions
 */
export const sortTransactionsByDate = (transactions) => {
  return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
};
