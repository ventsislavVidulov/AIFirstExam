# Story 5.2: Add Clear Filters Button and Active Filter Indicators

**Epic:** [Epic 5: Filtering & User Experience Polish](../index.md#epic-5-filtering--user-experience-polish)
**Story ID:** 5.2
**Story Points:** ~3

---

## User Story

As a **user**,
I want **a clear button to remove all filters at once**,
So that **I can quickly return to viewing all my data**.

---

## Acceptance Criteria

**Given** filters from Story 5.1 are implemented
**When** I apply any filter (date range, category, or type)
**Then** a "Clear Filters" button appears

**And** when I click "Clear Filters", all filters reset to defaults:
  - Start date: null (no filter)
  - End date: null (no filter)
  - Category: "all"
  - Type: "all"

**And** after clearing, all data is visible again (unfiltered view)
**And** the "Clear Filters" button hides when no filters are active
**And** active filters are visually indicated (e.g., colored border or chip display)
**And** user knows which filters are currently applied

---

## Prerequisites

- [Story 5.1: Implement Date Range and Type Filters](./story-5.1-filters.md) (requires filter implementation)

---

## Technical Notes

- **Clear button:** MUI Button with onClick calling `clearFilters()` from BudgetContext
- **Show button conditionally:** `if (filters.startDate || filters.endDate || filters.category !== 'all' || filters.type !== 'all')`
- **Active filter indicators:** Use MUI Chip components showing active filter values
- **Example chips:** "Date: Jan 1 - Jan 31", "Type: Expenses", "Category: Food"
- **Chips with delete icon:** Chips should have delete icon that removes individual filter
- **Clear all button:** "Clear All Filters" with secondary variant
- **Filter bar:** Place filter controls in a dedicated filter bar (MUI Paper or Box component)

---

## Definition of Done

- [ ] "Clear Filters" button implemented
- [ ] Button appears when any filter is active
- [ ] Button clears all filters to defaults
- [ ] After clearing, unfiltered view displays
- [ ] Button hides when no filters active
- [ ] Active filter indicators implemented (Chips)
- [ ] Chips show which filters are applied
- [ ] Chips have delete icons for individual removal
- [ ] Filter bar has proper visual design
- [ ] User knows which filters are currently applied

---

## Next Story

[Story 5.3: Responsive Design Testing and Mobile Optimization](./story-5.3-responsive-design.md)
