# Story 3.1: Create Summary Component with Real-Time Calculations

**Epic:** [Epic 3: Financial Intelligence & Summaries](../index.md#epic-3-financial-intelligence--summaries)
**Story ID:** 3.1
**Story Points:** ~5

---

## User Story

As a **user**,
I want **to see my total income, expenses, and balance at the top of the app**,
So that **I understand my financial position immediately**.

---

## Acceptance Criteria

**Given** transactions exist in BudgetContext from Epic 2
**When** I create `src/components/Summary.jsx`
**Then** the component renders three MUI Cards side-by-side (or stacked on mobile):
  1. Total Income card (green background)
  2. Total Expenses card (red background)
  3. Balance card (blue or dynamic: green if positive, red if negative)

**And** each card displays:
  - Icon at top (TrendingUp for income, TrendingDown for expenses, AccountBalanceWallet for balance)
  - Large formatted currency amount (e.g., "$12,450.00")
  - Label below amount ("Total Income", "Total Expenses", "Balance")

**And** calculations use utility functions from Story 2.1:
  - Total Income = sum of all income transaction amounts
  - Total Expenses = sum of all expense transaction amounts
  - Balance = Total Income - Total Expenses

**And** when transactions change, all three cards update instantly
**And** negative balance displays in red with negative sign
**And** amounts are formatted with currency symbol, commas, and 2 decimals
**And** cards are responsive: 3 columns on desktop, 1 column on mobile

---

## Prerequisites

- [Story 2.5: Integrate Transaction Form and List into App](../epic-2-transactions/story-2.5-integration.md) (requires working transaction system)

---

## Technical Notes

- **MUI components:** Card, CardContent, Typography, Box
- **Icons:** TrendingUpIcon, TrendingDownIcon, AccountBalanceWalletIcon from @mui/icons-material
- **useBudget() hook:** Access transactions from context
- **Calculations:** Use `calculateTotalIncome()`, `calculateTotalExpenses()`, `calculateBalance()` from utils
- **Color gradients:** Use MUI theme colors with `sx={{ bgcolor: 'success.light' }}` pattern
- **Typography:** Use variant="h4" for amounts, variant="body2" for labels
- **Currency formatting:** Same as TransactionList (Intl.NumberFormat)
- **Responsive grid:** `display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2`
- **Cards elevation:** elevation={2} for subtle shadow
- **Placement:** Summary component at top of App.jsx, above TransactionForm and List

---

## Definition of Done

- [ ] src/components/Summary.jsx created
- [ ] Three MUI Cards for income, expenses, and balance
- [ ] Icons at top of each card
- [ ] Large formatted currency amounts
- [ ] Labels below amounts
- [ ] Real-time updates when transactions change
- [ ] Negative balance displays in red
- [ ] Currency formatting with symbol, commas, 2 decimals
- [ ] Responsive layout: 3 columns desktop, 1 column mobile
- [ ] Uses calculation utilities from Story 2.1
- [ ] Component uses useBudget() hook
- [ ] Cards have proper elevation and spacing

---

## Next Story

[Story 3.2: Integrate Summary Cards into Main Application Layout](./story-3.2-summary-integration.md)
