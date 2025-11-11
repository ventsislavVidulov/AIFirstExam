# Story 2.5: Integrate Transaction Form and List into App

**Epic:** [Epic 2: Transaction Management System](../index.md#epic-2-transaction-management-system)
**Story ID:** 2.5
**Story Points:** ~3

---

## User Story

As a **user**,
I want **the transaction form and list displayed together in the main app**,
So that **I can immediately see new transactions appear after adding them**.

---

## Acceptance Criteria

**Given** TransactionForm and TransactionList components from previous stories
**When** I integrate both components into `src/App.jsx`
**Then** the app layout shows:
  - TransactionForm on the left (or top on mobile)
  - TransactionList on the right (or bottom on mobile)
  - Responsive two-column layout on desktop, stacked on mobile

**And** when I add a transaction via the form, it immediately appears in the list
**And** when I delete a transaction from the list, it immediately disappears
**And** data persists after browser reload (localStorage working)
**And** the layout uses MUI Box with flexbox for responsive arrangement
**And** both components have proper spacing and visual separation
**And** the entire flow works end-to-end: add → view → delete → persist

---

## Prerequisites

- [Story 2.3: Build Transaction Form Component](./story-2.3-transaction-form.md)
- [Story 2.4: Build Transaction List Component](./story-2.4-transaction-list.md)

---

## Technical Notes

- **MUI Box:** Use with `display: 'flex'` and `flexDirection: { xs: 'column', md: 'row' }`
- **Desktop layout:** Form fixed width (400px), List flex: 1
- **Mobile layout:** Form full width, List full width, stacked vertically
- **Gap between components:** `gap: 3` (24px in MUI spacing)
- **Visual elevation:** Form and List should both be in Paper or Card components
- **Test scrolling:** Add multiple transactions to ensure scrolling works
- **Verify persistence:** Add transaction → Reload page → Transaction still there

---

## Definition of Done

- [ ] TransactionForm and TransactionList integrated in App.jsx
- [ ] Two-column layout on desktop (form left, list right)
- [ ] Stacked layout on mobile (form top, list bottom)
- [ ] Real-time updates: add transaction → appears in list immediately
- [ ] Real-time updates: delete transaction → disappears immediately
- [ ] Data persists after browser reload
- [ ] Proper spacing and visual separation
- [ ] Both components have visual elevation (Paper/Card)
- [ ] Responsive behavior tested at 768px breakpoint
- [ ] End-to-end flow tested: add, view, delete, persist

---

## Epic 2 Complete

All transaction management stories complete. Ready to proceed to [Epic 3: Financial Intelligence & Summaries](../index.md#epic-3-financial-intelligence--summaries).
