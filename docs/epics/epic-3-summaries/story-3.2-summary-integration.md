# Story 3.2: Integrate Summary Cards into Main Application Layout

**Epic:** [Epic 3: Financial Intelligence & Summaries](../index.md#epic-3-financial-intelligence--summaries)
**Story ID:** 3.2
**Story Points:** ~3

---

## User Story

As a **user**,
I want **summary cards prominently displayed at the top of the application**,
So that **I see my financial overview before anything else**.

---

## Acceptance Criteria

**Given** Summary component from Story 3.1 exists
**When** I add `<Summary />` to App.jsx layout
**Then** summary cards appear at the very top of the content area, above transaction form and list

**And** the layout hierarchy is:
  1. AppBar (header)
  2. Summary cards (full width section)
  3. TransactionForm + TransactionList (two-column section)
  4. Footer

**And** summary section has margin/padding for visual breathing room
**And** on desktop, all three cards fit side-by-side
**And** on mobile, cards stack vertically
**And** when I add/delete transactions, summary cards update immediately
**And** the visual prominence of summary cards makes them the first thing users see

---

## Prerequisites

- [Story 3.1: Create Summary Component with Real-Time Calculations](./story-3.1-summary-component.md) (requires Summary component)

---

## Technical Notes

- **MUI components:** Container and Box for layout structure
- **Summary section:** `<Box sx={{ mb: 4 }}>` for margin below
- **Cards width:** Should span full width of container (maxWidth="lg")
- **Test responsive:** Test behavior at 768px breakpoint
- **Verify real-time updates:** Add transaction → Summary updates within 100ms
- **Visual hierarchy:** Summary should be most prominent (larger cards, more elevation)
- **Spacing:** Ensure sufficient spacing between summary and form/list sections

---

## Definition of Done

- [ ] Summary component integrated into App.jsx
- [ ] Summary appears at top of content area
- [ ] Layout hierarchy correct (AppBar → Summary → Form/List → Footer)
- [ ] Summary section has proper margin/padding
- [ ] Three cards side-by-side on desktop
- [ ] Cards stack vertically on mobile
- [ ] Real-time updates verified (< 100ms)
- [ ] Visual prominence achieved
- [ ] Responsive behavior tested at 768px breakpoint
- [ ] Spacing between sections appropriate

---

## Epic 3 Complete

All financial intelligence and summary stories complete. Ready to proceed to [Epic 4: Data Visualization & Analytics](../index.md#epic-4-data-visualization--analytics).
