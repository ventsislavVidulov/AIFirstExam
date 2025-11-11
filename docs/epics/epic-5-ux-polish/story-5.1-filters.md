# Story 5.1: Implement Date Range and Type Filters

**Epic:** [Epic 5: Filtering & User Experience Polish](../index.md#epic-5-filtering--user-experience-polish)
**Story ID:** 5.1
**Story Points:** ~5

---

## User Story

As a **user**,
I want **to filter transactions by date range and type**,
So that **I can analyze specific time periods and focus on income or expenses separately**.

---

## Acceptance Criteria

**Given** the application has working transactions, summaries, and charts
**When** I add filter controls to the UI (above transaction list or in a filter bar)
**Then** I see:
  - Start Date picker (optional, defaults to "all time")
  - End Date picker (optional, defaults to "all time")
  - Type filter dropdown (All, Income, Expenses)

**And** when I select a start date, transaction list filters to that date onward
**And** when I select an end date, transaction list filters up to that date
**And** when I select both dates, list shows transactions in that range (inclusive)
**And** when I select "Income" type, only income transactions show
**And** when I select "Expenses" type, only expense transactions show
**And** filters apply immediately on change (no apply button needed)
**And** filtered data updates: transaction list, summary cards, AND charts
**And** filters use AND logic (all conditions must match)

---

## Prerequisites

- [Story 4.4: Integrate Charts into Application Layout](../epic-4-visualizations/story-4.4-charts-integration.md) (requires complete app with charts)

---

## Technical Notes

- **Date picker:** Use MUI TextField with `type="date"` or MUI DatePicker
- **Type filter:** MUI Select with options: "All", "Income", "Expenses"
- **Filter state:** Managed in BudgetContext (updateFilters method already exists from Story 2.2)
- **Filtering logic:** `filterTransactions()` utility (already created in Story 2.1)
- **Apply filters:** To `allTransactions`, store result in `transactions` (filtered)
- **Summary calculations:** Use filtered transactions
- **Chart data:** Use filtered transactions
- **Date range:** Both start and end dates are inclusive
- **Empty filter values:** Mean "no filter" (show all data)

---

## Definition of Done

- [ ] Filter controls added to UI (above transaction list)
- [ ] Start Date picker implemented
- [ ] End Date picker implemented
- [ ] Type filter dropdown implemented
- [ ] Start date filter works (date onward)
- [ ] End date filter works (up to date)
- [ ] Date range filter works (both dates, inclusive)
- [ ] Type filter works (Income/Expenses/All)
- [ ] Filters apply immediately (no apply button)
- [ ] Transaction list updates with filtered data
- [ ] Summary cards update with filtered data
- [ ] Charts update with filtered data
- [ ] Filters use AND logic
- [ ] Empty filter values show all data

---

## Next Story

[Story 5.2: Add Clear Filters Button and Active Filter Indicators](./story-5.2-clear-filters.md)
