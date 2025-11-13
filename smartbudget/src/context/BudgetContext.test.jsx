// Unit tests for BudgetContext CRUD operations
// Tests add, update, delete, and filter functionality

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BudgetProvider, useBudget } from './BudgetContext';
import { TRANSACTION_TYPES } from '../utils/constants';

// Mock useLocalStorage hook
vi.mock('@uidotdev/usehooks', () => ({
  useLocalStorage: (key, initialValue) => {
    const [state, setState] = React.useState(initialValue);
    return [state, setState];
  }
}));

// Import React after mock setup
import React from 'react';

describe('BudgetContext', () => {
  const wrapper = ({ children }) => <BudgetProvider>{children}</BudgetProvider>;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('useBudget hook', () => {
    it('should throw error when used outside BudgetProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useBudget());
      }).toThrow('useBudget must be used within a BudgetProvider');

      console.error = originalError;
    });

    it('should provide initial empty state', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      expect(result.current.transactions).toEqual([]);
      expect(result.current.allTransactions).toEqual([]);
      expect(result.current.filters).toEqual({
        startDate: null,
        endDate: null,
        category: 'all',
        type: 'all'
      });
    });
  });

  describe('addTransaction', () => {
    it('should add a new transaction', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      const newTransaction = {
        amount: 1000,
        category: 'Salary',
        date: '2025-11-10',
        description: 'Monthly salary',
        type: TRANSACTION_TYPES.INCOME
      };

      act(() => {
        result.current.addTransaction(newTransaction);
      });

      expect(result.current.allTransactions).toHaveLength(1);
      expect(result.current.allTransactions[0]).toMatchObject(newTransaction);
      expect(result.current.allTransactions[0].id).toBeDefined();
      expect(result.current.allTransactions[0].createdAt).toBeDefined();
    });

    it('should generate unique IDs for multiple transactions', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Transaction 1',
          type: TRANSACTION_TYPES.INCOME
        });
        result.current.addTransaction({
          amount: 500,
          category: 'Freelance',
          date: '2025-11-11',
          description: 'Transaction 2',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      expect(result.current.allTransactions).toHaveLength(2);
      expect(result.current.allTransactions[0].id).not.toBe(result.current.allTransactions[1].id);
    });

    it('should add createdAt timestamp', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      const beforeAdd = new Date().toISOString();

      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Test',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      const afterAdd = new Date().toISOString();
      const createdAt = result.current.allTransactions[0].createdAt;

      expect(createdAt).toBeDefined();
      expect(createdAt >= beforeAdd).toBe(true);
      expect(createdAt <= afterAdd).toBe(true);
    });
  });

  describe('updateTransaction', () => {
    it('should update an existing transaction', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Add a transaction
      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Original',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      const transactionId = result.current.allTransactions[0].id;

      // Update the transaction
      act(() => {
        result.current.updateTransaction(transactionId, {
          amount: 1200,
          description: 'Updated'
        });
      });

      expect(result.current.allTransactions).toHaveLength(1);
      expect(result.current.allTransactions[0].amount).toBe(1200);
      expect(result.current.allTransactions[0].description).toBe('Updated');
      expect(result.current.allTransactions[0].category).toBe('Salary'); // Unchanged
    });

    it('should not affect other transactions', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Add multiple transactions
      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Transaction 1',
          type: TRANSACTION_TYPES.INCOME
        });
        result.current.addTransaction({
          amount: 500,
          category: 'Freelance',
          date: '2025-11-11',
          description: 'Transaction 2',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      const firstId = result.current.allTransactions[0].id;

      // Update first transaction
      act(() => {
        result.current.updateTransaction(firstId, { amount: 1200 });
      });

      expect(result.current.allTransactions).toHaveLength(2);
      expect(result.current.allTransactions[0].amount).toBe(1200);
      expect(result.current.allTransactions[1].amount).toBe(500); // Unchanged
    });

    it('should do nothing when updating non-existent transaction', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Test',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      const originalLength = result.current.allTransactions.length;

      act(() => {
        result.current.updateTransaction('non-existent-id', { amount: 9999 });
      });

      expect(result.current.allTransactions).toHaveLength(originalLength);
      expect(result.current.allTransactions[0].amount).toBe(1000); // Unchanged
    });
  });

  describe('deleteTransaction', () => {
    it('should delete a transaction', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Add a transaction
      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Test',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      const transactionId = result.current.allTransactions[0].id;

      // Delete the transaction
      act(() => {
        result.current.deleteTransaction(transactionId);
      });

      expect(result.current.allTransactions).toHaveLength(0);
    });

    it('should only delete the specified transaction', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Add multiple transactions
      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Transaction 1',
          type: TRANSACTION_TYPES.INCOME
        });
        result.current.addTransaction({
          amount: 500,
          category: 'Freelance',
          date: '2025-11-11',
          description: 'Transaction 2',
          type: TRANSACTION_TYPES.INCOME
        });
        result.current.addTransaction({
          amount: 300,
          category: 'Food',
          date: '2025-11-12',
          description: 'Transaction 3',
          type: TRANSACTION_TYPES.EXPENSE
        });
      });

      const secondId = result.current.allTransactions[1].id;

      // Delete second transaction
      act(() => {
        result.current.deleteTransaction(secondId);
      });

      expect(result.current.allTransactions).toHaveLength(2);
      expect(result.current.allTransactions.find(t => t.id === secondId)).toBeUndefined();
      expect(result.current.allTransactions[0].amount).toBe(1000);
      expect(result.current.allTransactions[1].amount).toBe(300);
    });

    it('should do nothing when deleting non-existent transaction', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Test',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      act(() => {
        result.current.deleteTransaction('non-existent-id');
      });

      expect(result.current.allTransactions).toHaveLength(1);
    });
  });

  describe('updateFilters', () => {
    it('should update filter values', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      act(() => {
        result.current.updateFilters({
          type: TRANSACTION_TYPES.INCOME,
          category: 'Salary'
        });
      });

      expect(result.current.filters.type).toBe(TRANSACTION_TYPES.INCOME);
      expect(result.current.filters.category).toBe('Salary');
      expect(result.current.filters.startDate).toBe(null); // Unchanged
    });

    it('should merge with existing filters', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      act(() => {
        result.current.updateFilters({ type: TRANSACTION_TYPES.INCOME });
      });

      act(() => {
        result.current.updateFilters({ category: 'Salary' });
      });

      expect(result.current.filters.type).toBe(TRANSACTION_TYPES.INCOME);
      expect(result.current.filters.category).toBe('Salary');
    });
  });

  describe('clearFilters', () => {
    it('should reset all filters to default', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Set some filters
      act(() => {
        result.current.updateFilters({
          startDate: '2025-11-01',
          endDate: '2025-11-30',
          type: TRANSACTION_TYPES.INCOME,
          category: 'Salary'
        });
      });

      // Clear filters
      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filters).toEqual({
        startDate: null,
        endDate: null,
        category: 'all',
        type: 'all'
      });
    });
  });

  describe('filtered transactions', () => {
    beforeEach(() => {
      // This will be set up in each test
    });

    it('should return filtered and sorted transactions', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Add transactions with different dates
      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-15',
          description: 'Income 1',
          type: TRANSACTION_TYPES.INCOME
        });
        result.current.addTransaction({
          amount: 300,
          category: 'Food',
          date: '2025-11-10',
          description: 'Expense 1',
          type: TRANSACTION_TYPES.EXPENSE
        });
        result.current.addTransaction({
          amount: 500,
          category: 'Freelance',
          date: '2025-11-20',
          description: 'Income 2',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      // Filter by type
      act(() => {
        result.current.updateFilters({ type: TRANSACTION_TYPES.INCOME });
      });

      // Should only show income transactions, sorted by date (newest first)
      expect(result.current.transactions).toHaveLength(2);
      expect(result.current.transactions[0].date).toBe('2025-11-20');
      expect(result.current.transactions[1].date).toBe('2025-11-15');
    });

    it('should update when transactions are added', () => {
      const { result } = renderHook(() => useBudget(), { wrapper });

      // Set filter first
      act(() => {
        result.current.updateFilters({ type: TRANSACTION_TYPES.INCOME });
      });

      expect(result.current.transactions).toHaveLength(0);

      // Add matching transaction
      act(() => {
        result.current.addTransaction({
          amount: 1000,
          category: 'Salary',
          date: '2025-11-10',
          description: 'Test',
          type: TRANSACTION_TYPES.INCOME
        });
      });

      expect(result.current.transactions).toHaveLength(1);

      // Add non-matching transaction
      act(() => {
        result.current.addTransaction({
          amount: 300,
          category: 'Food',
          date: '2025-11-10',
          description: 'Test',
          type: TRANSACTION_TYPES.EXPENSE
        });
      });

      // Should still be 1 (expense filtered out)
      expect(result.current.transactions).toHaveLength(1);
    });
  });
});
