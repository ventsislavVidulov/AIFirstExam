# Story 2.1: Create Transaction Data Model and Utility Functions

**Epic:** [Epic 2: Transaction Management System](../index.md#epic-2-transaction-management-system)
**Story ID:** 2.1
**Story Points:** ~3

---

## User Story

As a **developer**,
I want **a clear transaction data model and reusable utility functions**,
So that **transaction handling is consistent throughout the application**.

---

## Acceptance Criteria

**Given** the project foundation from Epic 1 is complete
**When** I create `src/utils/constants.js` with transaction categories
**Then** the file exports:
  - `INCOME_CATEGORIES`: Array of 5 income categories (Salary, Freelance, Investment, Gift, Other)
  - `EXPENSE_CATEGORIES`: Array of 8 expense categories (Rent, Transport, Food, Entertainment, Utilities, Healthcare, Shopping, Other)

**And** I create `src/utils/storage.js` with localStorage functions:
  - `loadTransactions()`: Reads from localStorage, returns array, handles errors gracefully
  - `saveTransactions(transactions)`: Writes to localStorage, handles quota exceeded

**And** I create `src/utils/calculations.js` with helper functions:
  - `filterTransactions(transactions, filters)`: Applies date/category/type filters
  - `sortTransactionsByDate(transactions)`: Sorts newest first
  - `calculateTotalIncome(transactions)`: Sums income amounts
  - `calculateTotalExpenses(transactions)`: Sums expense amounts
  - `calculateBalance(income, expenses)`: Returns difference

**And** all utility functions are pure (no side effects, testable in isolation)
**And** localStorage key is consistently `smartbudget_transactions`
**And** error handling logs to console but doesn't crash app

---

## Prerequisites

- [Story 1.3: Establish Project Structure and Application Shell](../epic-1-foundation/story-1.3-project-structure.md) (requires project structure with utils/ folder)

---

## Technical Notes

- **Transaction model:** `{ id, amount, category, date, description, type, createdAt }`
- **ID generation:** `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
- **Date format:** ISO string YYYY-MM-DD for consistency
- **localStorage limit:** 5-10MB (sufficient for thousands of transactions)
- **Graceful degradation:** If localStorage unavailable, app continues functioning (data not persisted)
- **Categories:** Hardcoded (no custom categories in MVP)
- **Calculations:** Use standard JavaScript Number (no BigDecimal needed for typical amounts)

---

## Definition of Done

- [ ] src/utils/constants.js created with INCOME_CATEGORIES and EXPENSE_CATEGORIES
- [ ] src/utils/storage.js created with loadTransactions() and saveTransactions()
- [ ] src/utils/calculations.js created with 5 calculation functions
- [ ] All utility functions are pure (no side effects)
- [ ] localStorage key is "smartbudget_transactions"
- [ ] Error handling implemented (logs to console, doesn't crash)
- [ ] All functions tested manually with sample data
- [ ] Code follows consistent naming conventions

---

## Next Story

[Story 2.2: Implement BudgetContext for Global State Management](./story-2.2-budget-context.md)
