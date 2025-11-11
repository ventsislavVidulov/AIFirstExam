# Story 2.2: Implement BudgetContext for Global State Management

**Epic:** [Epic 2: Transaction Management System](../index.md#epic-2-transaction-management-system)
**Story ID:** 2.2
**Story Points:** ~5

---

## User Story

As a **developer**,
I want **React Context to manage transaction state globally**,
So that **all components can access and modify transactions without prop drilling**.

---

## Acceptance Criteria

**Given** utility functions from Story 2.1 exist
**When** I create `src/context/BudgetContext.jsx`
**Then** the file exports:
  - `BudgetProvider` component that wraps the app
  - `useBudget()` custom hook for consuming context

**And** BudgetProvider manages state for:
  - `transactions`: Array of all transaction objects
  - `filters`: Object with startDate, endDate, category, type

**And** BudgetProvider provides methods:
  - `addTransaction(transaction)`: Adds new transaction with generated ID
  - `updateTransaction(id, updates)`: Updates existing transaction
  - `deleteTransaction(id)`: Removes transaction
  - `updateFilters(newFilters)`: Updates filter state
  - `clearFilters()`: Resets filters to defaults

**And** transactions automatically load from localStorage on mount (useEffect)
**And** transactions automatically save to localStorage on every change (useEffect)
**And** context provides both `transactions` (filtered) and `allTransactions` (unfiltered)
**And** `useBudget()` throws error if used outside BudgetProvider (dev experience)

---

## Prerequisites

- [Story 2.1: Create Transaction Data Model and Utility Functions](./story-2.1-data-model.md) (requires storage and calculation utilities)

---

## Technical Notes

- **React 19 Context API:** Built-in, no external state library
- **Two useEffect hooks:** One for loading, one for saving
- **Filter logic:** Uses `filterTransactions()` and `sortTransactionsByDate()` from utils
- **Context value:** Should be memoized to prevent unnecessary re-renders (if performance issues arise)
- **Wrap app:** BudgetProvider at App.jsx or main.jsx level
- **useBudget() error:** "useBudget must be used within a BudgetProvider"
- **Filters default:** `{ startDate: null, endDate: null, category: 'all', type: 'all' }`

---

## Definition of Done

- [ ] src/context/BudgetContext.jsx created with BudgetProvider
- [ ] useBudget() custom hook implemented
- [ ] State management includes transactions and filters
- [ ] All methods implemented (add, update, delete, updateFilters, clearFilters)
- [ ] Transactions load from localStorage on mount
- [ ] Transactions save to localStorage on every change
- [ ] Filtered and unfiltered transactions both available
- [ ] useBudget() throws error outside provider
- [ ] BudgetProvider wrapped around app
- [ ] No console errors or warnings

---

## Next Story

[Story 2.3: Build Transaction Form Component](./story-2.3-transaction-form.md)
