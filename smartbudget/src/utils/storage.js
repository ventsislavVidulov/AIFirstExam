// LocalStorage utility functions for SmartBudget
// Handles persistence of transaction data

import { STORAGE_KEY } from './constants';

/**
 * Load transactions from localStorage
 * @returns {Array} Array of transaction objects
 */
export const loadTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading transactions from localStorage:', error);
    return [];
  }
};

/**
 * Save transactions to localStorage
 * @param {Array} transactions - Array of transaction objects to save
 * @returns {boolean} Success status
 */
export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return true;
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
    return false;
  }
};

/**
 * Clear all transactions from localStorage
 * @returns {boolean} Success status
 */
export const clearTransactions = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing transactions from localStorage:', error);
    return false;
  }
};
