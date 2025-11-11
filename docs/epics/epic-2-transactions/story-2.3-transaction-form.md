# Story 2.3: Build Transaction Form Component

**Epic:** [Epic 2: Transaction Management System](../index.md#epic-2-transaction-management-system)
**Story ID:** 2.3
**Story Points:** ~5

---

## User Story

As a **user**,
I want **a simple form to add income and expense transactions**,
So that **I can quickly record financial events as they occur**.

---

## Acceptance Criteria

**Given** BudgetContext from Story 2.2 is integrated
**When** I create `src/components/TransactionForm.jsx`
**Then** the component renders an MUI Card with form containing:
  - Toggle button group: "Income" / "Expense" (visual type selection)
  - Amount input: Number field, required, positive only
  - Category dropdown: Filtered by selected type, required
  - Date picker: Defaults to today, required
  - Description textarea: Optional, max 200 characters
  - Submit button: "Add Income" or "Add Expense" (dynamic label)

**And** when I select "Income", category dropdown shows only income categories
**And** when I select "Expense", category dropdown shows only expense categories
**And** when I fill all required fields and submit, transaction is added via `addTransaction()`
**And** after submission, form clears and resets to defaults (ready for next entry)
**And** amount field validates: must be > 0, numeric only
**And** date field validates: no future dates allowed
**And** form shows inline validation errors (red border + error text)
**And** submit button is disabled if form is invalid

---

## Prerequisites

- [Story 2.2: Implement BudgetContext for Global State Management](./story-2.2-budget-context.md) (requires BudgetContext)

---

## Technical Notes

- **MUI components:** TextField, Select, MenuItem, Button, ToggleButtonGroup, Card, CardContent
- **Controlled components:** All form state managed with useState hooks
- **Date picker:** Use MUI date picker or HTML5 `<input type="date">` for MVP
- **Amount input:** `<TextField type="number" inputProps={{ min: 0, step: 0.01 }}>`
- **Default date:** `new Date().toISOString().split('T')[0]` (YYYY-MM-DD format)
- **Transaction object:** `{ amount, category, date, description, type }`
- **ID generation:** BudgetContext generates ID and createdAt timestamp automatically
- **Form validation:** HTML5 required attribute + custom validation logic
- **Responsive:** Full width on mobile, fixed width (400px) on desktop

---

## Definition of Done

- [ ] src/components/TransactionForm.jsx created
- [ ] MUI Card with all required form fields
- [ ] Toggle button group for Income/Expense selection
- [ ] Category dropdown filters by transaction type
- [ ] Date picker defaults to today
- [ ] Amount validation (positive numbers only)
- [ ] Date validation (no future dates)
- [ ] Inline validation errors display
- [ ] Submit button disabled when form invalid
- [ ] Form clears after successful submission
- [ ] Transaction added via useBudget() context
- [ ] Responsive layout works on mobile and desktop

---

## Next Story

[Story 2.4: Build Transaction List Component](./story-2.4-transaction-list.md)
