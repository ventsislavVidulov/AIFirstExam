// Unit tests for financial calculation utilities
// Tests all calculation functions with various scenarios

import { describe, it, expect } from 'vitest';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateSummary,
  getCategoryBreakdown,
  getIncomeBreakdown,
  filterTransactions,
  sortTransactionsByDate
} from './calculations';
import { TRANSACTION_TYPES } from './constants';

describe('calculateTotalIncome', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotalIncome([])).toBe(0);
  });

  it('should calculate total from single income transaction', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: 1000 }
    ];
    expect(calculateTotalIncome(transactions)).toBe(1000);
  });

  it('should calculate total from multiple income transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: 1000 },
      { type: TRANSACTION_TYPES.INCOME, amount: 500 },
      { type: TRANSACTION_TYPES.INCOME, amount: 250 }
    ];
    expect(calculateTotalIncome(transactions)).toBe(1750);
  });

  it('should ignore expense transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: 1000 },
      { type: TRANSACTION_TYPES.EXPENSE, amount: 300 }
    ];
    expect(calculateTotalIncome(transactions)).toBe(1000);
  });

  it('should handle string amounts', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: '1000' },
      { type: TRANSACTION_TYPES.INCOME, amount: '500.50' }
    ];
    expect(calculateTotalIncome(transactions)).toBe(1500.50);
  });

  it('should handle decimal amounts', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: 1000.99 },
      { type: TRANSACTION_TYPES.INCOME, amount: 500.01 }
    ];
    expect(calculateTotalIncome(transactions)).toBe(1501);
  });
});

describe('calculateTotalExpenses', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotalExpenses([])).toBe(0);
  });

  it('should calculate total from single expense transaction', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, amount: 300 }
    ];
    expect(calculateTotalExpenses(transactions)).toBe(300);
  });

  it('should calculate total from multiple expense transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, amount: 300 },
      { type: TRANSACTION_TYPES.EXPENSE, amount: 150 },
      { type: TRANSACTION_TYPES.EXPENSE, amount: 50 }
    ];
    expect(calculateTotalExpenses(transactions)).toBe(500);
  });

  it('should ignore income transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, amount: 300 },
      { type: TRANSACTION_TYPES.INCOME, amount: 1000 }
    ];
    expect(calculateTotalExpenses(transactions)).toBe(300);
  });

  it('should handle string amounts', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, amount: '300' },
      { type: TRANSACTION_TYPES.EXPENSE, amount: '150.75' }
    ];
    expect(calculateTotalExpenses(transactions)).toBe(450.75);
  });
});

describe('calculateBalance', () => {
  it('should return positive balance when income > expenses', () => {
    expect(calculateBalance(1000, 300)).toBe(700);
  });

  it('should return negative balance when expenses > income', () => {
    expect(calculateBalance(300, 1000)).toBe(-700);
  });

  it('should return zero when income equals expenses', () => {
    expect(calculateBalance(500, 500)).toBe(0);
  });

  it('should handle decimal values', () => {
    expect(calculateBalance(1000.50, 300.25)).toBe(700.25);
  });

  it('should handle zero income', () => {
    expect(calculateBalance(0, 300)).toBe(-300);
  });

  it('should handle zero expenses', () => {
    expect(calculateBalance(1000, 0)).toBe(1000);
  });
});

describe('calculateSummary', () => {
  it('should return zero summary for empty transactions', () => {
    const summary = calculateSummary([]);
    expect(summary).toEqual({
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    });
  });

  it('should calculate complete summary with mixed transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: 1000 },
      { type: TRANSACTION_TYPES.INCOME, amount: 500 },
      { type: TRANSACTION_TYPES.EXPENSE, amount: 300 },
      { type: TRANSACTION_TYPES.EXPENSE, amount: 150 }
    ];
    const summary = calculateSummary(transactions);
    expect(summary).toEqual({
      totalIncome: 1500,
      totalExpenses: 450,
      balance: 1050
    });
  });

  it('should handle only income transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, amount: 1000 },
      { type: TRANSACTION_TYPES.INCOME, amount: 500 }
    ];
    const summary = calculateSummary(transactions);
    expect(summary).toEqual({
      totalIncome: 1500,
      totalExpenses: 0,
      balance: 1500
    });
  });

  it('should handle only expense transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, amount: 300 },
      { type: TRANSACTION_TYPES.EXPENSE, amount: 150 }
    ];
    const summary = calculateSummary(transactions);
    expect(summary).toEqual({
      totalIncome: 0,
      totalExpenses: 450,
      balance: -450
    });
  });
});

describe('getCategoryBreakdown', () => {
  it('should return empty object for empty transactions', () => {
    expect(getCategoryBreakdown([])).toEqual({});
  });

  it('should group expenses by category', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Food', amount: 100 },
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Rent', amount: 1000 },
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Food', amount: 50 }
    ];
    const breakdown = getCategoryBreakdown(transactions);
    expect(breakdown).toEqual({
      Food: 150,
      Rent: 1000
    });
  });

  it('should ignore income transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Food', amount: 100 },
      { type: TRANSACTION_TYPES.INCOME, category: 'Salary', amount: 1000 }
    ];
    const breakdown = getCategoryBreakdown(transactions);
    expect(breakdown).toEqual({
      Food: 100
    });
  });

  it('should handle string amounts', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Food', amount: '100.50' },
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Food', amount: '50.25' }
    ];
    const breakdown = getCategoryBreakdown(transactions);
    expect(breakdown).toEqual({
      Food: 150.75
    });
  });
});

describe('getIncomeBreakdown', () => {
  it('should return empty object for empty transactions', () => {
    expect(getIncomeBreakdown([])).toEqual({});
  });

  it('should group income by category', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, category: 'Salary', amount: 1000 },
      { type: TRANSACTION_TYPES.INCOME, category: 'Freelance', amount: 500 },
      { type: TRANSACTION_TYPES.INCOME, category: 'Salary', amount: 200 }
    ];
    const breakdown = getIncomeBreakdown(transactions);
    expect(breakdown).toEqual({
      Salary: 1200,
      Freelance: 500
    });
  });

  it('should ignore expense transactions', () => {
    const transactions = [
      { type: TRANSACTION_TYPES.INCOME, category: 'Salary', amount: 1000 },
      { type: TRANSACTION_TYPES.EXPENSE, category: 'Food', amount: 100 }
    ];
    const breakdown = getIncomeBreakdown(transactions);
    expect(breakdown).toEqual({
      Salary: 1000
    });
  });
});

describe('filterTransactions', () => {
  const transactions = [
    {
      id: '1',
      date: '2025-11-01',
      type: TRANSACTION_TYPES.INCOME,
      category: 'Salary',
      amount: 1000
    },
    {
      id: '2',
      date: '2025-11-05',
      type: TRANSACTION_TYPES.EXPENSE,
      category: 'Food',
      amount: 100
    },
    {
      id: '3',
      date: '2025-11-10',
      type: TRANSACTION_TYPES.EXPENSE,
      category: 'Rent',
      amount: 1000
    },
    {
      id: '4',
      date: '2025-11-15',
      type: TRANSACTION_TYPES.INCOME,
      category: 'Freelance',
      amount: 500
    }
  ];

  it('should return all transactions when no filters applied', () => {
    const filters = {
      startDate: null,
      endDate: null,
      category: 'all',
      type: 'all'
    };
    expect(filterTransactions(transactions, filters)).toEqual(transactions);
  });

  it('should filter by start date', () => {
    const filters = {
      startDate: '2025-11-06',
      endDate: null,
      category: 'all',
      type: 'all'
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(t => t.id)).toEqual(['3', '4']);
  });

  it('should filter by end date', () => {
    const filters = {
      startDate: null,
      endDate: '2025-11-09',
      category: 'all',
      type: 'all'
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(t => t.id)).toEqual(['1', '2']);
  });

  it('should filter by date range', () => {
    const filters = {
      startDate: '2025-11-05',
      endDate: '2025-11-10',
      category: 'all',
      type: 'all'
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(t => t.id)).toEqual(['2', '3']);
  });

  it('should filter by type', () => {
    const filters = {
      startDate: null,
      endDate: null,
      category: 'all',
      type: TRANSACTION_TYPES.INCOME
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(t => t.id)).toEqual(['1', '4']);
  });

  it('should filter by category', () => {
    const filters = {
      startDate: null,
      endDate: null,
      category: 'Food',
      type: 'all'
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('2');
  });

  it('should filter by multiple criteria', () => {
    const filters = {
      startDate: '2025-11-01',
      endDate: '2025-11-10',
      category: 'all',
      type: TRANSACTION_TYPES.EXPENSE
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(t => t.id)).toEqual(['2', '3']);
  });

  it('should return empty array when no transactions match', () => {
    const filters = {
      startDate: null,
      endDate: null,
      category: 'NonExistent',
      type: 'all'
    };
    const filtered = filterTransactions(transactions, filters);
    expect(filtered).toEqual([]);
  });
});

describe('sortTransactionsByDate', () => {
  it('should return empty array for empty input', () => {
    expect(sortTransactionsByDate([])).toEqual([]);
  });

  it('should sort transactions by date (newest first)', () => {
    const transactions = [
      { id: '1', date: '2025-11-01', amount: 100 },
      { id: '2', date: '2025-11-15', amount: 200 },
      { id: '3', date: '2025-11-10', amount: 150 }
    ];
    const sorted = sortTransactionsByDate(transactions);
    expect(sorted.map(t => t.id)).toEqual(['2', '3', '1']);
  });

  it('should not mutate original array', () => {
    const transactions = [
      { id: '1', date: '2025-11-01', amount: 100 },
      { id: '2', date: '2025-11-15', amount: 200 }
    ];
    const original = [...transactions];
    sortTransactionsByDate(transactions);
    expect(transactions).toEqual(original);
  });

  it('should handle same dates', () => {
    const transactions = [
      { id: '1', date: '2025-11-10', amount: 100 },
      { id: '2', date: '2025-11-10', amount: 200 },
      { id: '3', date: '2025-11-10', amount: 150 }
    ];
    const sorted = sortTransactionsByDate(transactions);
    // All dates are the same, order should be stable
    expect(sorted).toHaveLength(3);
    sorted.forEach(t => expect(t.date).toBe('2025-11-10'));
  });

  it('should handle single transaction', () => {
    const transactions = [
      { id: '1', date: '2025-11-10', amount: 100 }
    ];
    const sorted = sortTransactionsByDate(transactions);
    expect(sorted).toEqual(transactions);
  });
});
