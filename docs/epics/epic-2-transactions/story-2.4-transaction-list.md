# Story 2.4: Build Transaction List Component

**Epic:** [Epic 2: Transaction Management System](../index.md#epic-2-transaction-management-system)
**Story ID:** 2.4
**Story Points:** ~4

---

## User Story

As a **user**,
I want **to view all my transactions in a chronological list**,
So that **I can see my complete financial history at a glance**.

---

## Acceptance Criteria

**Given** BudgetContext contains transactions from Story 2.2
**When** I create `src/components/TransactionList.jsx`
**Then** the component renders an MUI TableContainer with table displaying:
  - Column headers: Date | Description | Category | Amount | Actions
  - One row per transaction
  - Sorted by date (newest first, handled by BudgetContext)

**And** each transaction row shows:
  - Date: Formatted human-readable (e.g., "Nov 9, 2025")
  - Description: Truncated if > 30 chars with ellipsis
  - Category: Category name
  - Amount: Formatted as currency with + or - prefix
  - Actions: Delete icon button

**And** income transactions display in green text with "+" prefix
**And** expense transactions display in red text with "-" prefix
**And** amounts are right-aligned and formatted as "$X,XXX.XX"
**And** when I click delete icon, confirmation dialog appears: "Delete this transaction?"
**And** when I confirm deletion, transaction is removed via `deleteTransaction()`
**And** if no transactions exist, empty state displays: "No transactions yet. Add your first transaction above!"

---

## Prerequisites

- [Story 2.3: Build Transaction Form Component](./story-2.3-transaction-form.md) (requires transactions to exist for testing)

---

## Technical Notes

- **MUI components:** Table, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog
- **Date formatting:** `new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })`
- **Currency formatting:** `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)`
- **Color coding:** Use MUI theme colors (success.main for income, error.main for expenses)
- **Delete icon:** Use `<DeleteIcon />` from @mui/icons-material
- **Confirmation dialog:** MUI Dialog with "Cancel" and "Delete" buttons
- **Empty state:** Typography component with gray text, centered
- **Responsive:** Horizontal scroll on mobile if table too wide (acceptable for MVP)
- **Unique key:** Each row needs unique key prop (use transaction.id)

---

## Definition of Done

- [ ] src/components/TransactionList.jsx created
- [ ] MUI Table with correct column headers
- [ ] Transaction rows display all required fields
- [ ] Date formatting human-readable
- [ ] Currency formatting with $ symbol and commas
- [ ] Income transactions green with "+" prefix
- [ ] Expense transactions red with "-" prefix
- [ ] Delete button with confirmation dialog
- [ ] Empty state displays when no transactions
- [ ] Transactions sorted by date (newest first)
- [ ] Component uses useBudget() hook
- [ ] Responsive layout works on mobile

---

## Next Story

[Story 2.5: Integrate Transaction Form and List into App](./story-2.5-integration.md)
