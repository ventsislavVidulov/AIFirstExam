// BudgetContext - Global state management for SmartBudget application
// Provides transaction data and CRUD operations to all components

import { createContext, useContext, useState, useEffect } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';
import { filterTransactions, sortTransactionsByDate } from '../utils/calculations';

/**
 * Simple ID generator using timestamp and random number
 * @returns {string} Unique ID
 */
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create context
const BudgetContext = createContext();

/**
 * Custom hook to use Budget Context
 */
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

/**
 * Budget Provider Component
 * Wraps the application and provides budget state and methods
 */
export const BudgetProvider = ({ children }) => {
  // State
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    category: 'all',
    type: 'all'
  });

  // Load transactions from localStorage on mount
  useEffect(() => {
    const loadedTransactions = loadTransactions();
    setTransactions(loadedTransactions);
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length >= 0) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  /**
   * Add a new transaction
   * @param {Object} transaction - Transaction object without ID
   */
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  /**
   * Update an existing transaction
   * @param {string} id - Transaction ID
   * @param {Object} updates - Fields to update
   */
  const updateTransaction = (id, updates) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };

  /**
   * Delete a transaction
   * @param {string} id - Transaction ID
   */
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  /**
   * Update filter settings
   * @param {Object} newFilters - Filter settings to update
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      category: 'all',
      type: 'all'
    });
  };

  // Get filtered and sorted transactions
  const filteredTransactions = sortTransactionsByDate(
    filterTransactions(transactions, filters)
  );

  // Context value
  const value = {
    // Data
    transactions: filteredTransactions,
    allTransactions: transactions,
    filters,

    // Methods
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    clearFilters
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
