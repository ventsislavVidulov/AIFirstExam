// SmartBudget Application Constants
// Defines transaction types, categories, and other application-wide constants

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
};

/**
 * Income category definitions
 */
export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

/**
 * Expense category definitions
 */
export const EXPENSE_CATEGORIES = ['Rent', 'Transport', 'Food', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other'];

/**
 * Category definitions by transaction type
 * @deprecated Use INCOME_CATEGORIES and EXPENSE_CATEGORIES instead
 */
export const CATEGORIES = {
  income: INCOME_CATEGORIES,
  expense: EXPENSE_CATEGORIES
};

/**
 * Color scheme for charts and UI
 */
export const COLORS = {
  income: '#10B981', // Green
  expense: '#EF4444', // Red
  primary: '#3B82F6', // Blue
  // Chart colors for different categories
  chartColors: [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Green
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#6366F1'  // Indigo
  ]
};

/**
 * LocalStorage key for persisting transactions
 */
export const STORAGE_KEY = 'smartbudget_transactions';

/**
 * Date format constants
 */
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_DATE_FORMAT = 'MMM dd, yyyy';
