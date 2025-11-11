# Story 4.2: Implement Expense Breakdown Pie Chart

**Epic:** [Epic 4: Data Visualization & Analytics](../index.md#epic-4-data-visualization--analytics)
**Story ID:** 4.2
**Story Points:** ~5

---

## User Story

As a **user**,
I want **a pie chart showing my expense distribution by category**,
So that **I can visually identify where my money goes**.

---

## Acceptance Criteria

**Given** Chart.js is integrated from Story 4.1
**When** I implement the pie chart in Charts.jsx
**Then** the chart displays:
  - One slice per expense category
  - Slice size proportional to category total
  - Color-coded slices (8 distinct colors for 8 expense categories)
  - Legend showing category names with colors

**And** when I hover over a slice, tooltip shows:
  - Category name
  - Total amount spent ($X,XXX.XX)
  - Percentage of total expenses (XX%)

**And** only expense transactions are included (income excluded)
**And** if no expenses exist, empty state displays: "No expense data to display"
**And** chart updates smoothly when transactions change (with animation)
**And** chart is responsive and maintains aspect ratio on all screen sizes
**And** colors are accessible (sufficient contrast, colorblind-friendly if possible)

---

## Prerequisites

- [Story 4.1: Integrate Chart.js and Create Charts Component Structure](./story-4.1-chartjs-integration.md) (requires Chart.js integration)

---

## Technical Notes

- **Data transformation:** Group expenses by category, sum amounts per category
- **Pattern:** Use `transactions.filter(t => t.type === 'expense').reduce()` pattern
- **Color palette (8 colors):** ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6']
- **Chart options:** `responsive: true, plugins: { legend: { position: 'bottom' } }`
- **Tooltip format:** Custom callback for currency formatting
- **Empty state:** Conditional rendering - if no expenses, show Typography with message
- **Animation:** Chart.js default animation (smooth, ~500ms)
- **Only show categories with transactions:** Filter zero-amount categories

---

## Definition of Done

- [ ] Pie chart implemented in Charts.jsx
- [ ] One slice per expense category
- [ ] Slice size proportional to category total
- [ ] 8 distinct colors for expense categories
- [ ] Legend with category names and colors
- [ ] Tooltip shows category, amount, percentage
- [ ] Only expense transactions included
- [ ] Empty state for no expenses
- [ ] Chart updates smoothly with animation
- [ ] Responsive and maintains aspect ratio
- [ ] Colors accessible and colorblind-friendly

---

## Next Story

[Story 4.3: Implement Income vs Expenses Bar Chart](./story-4.3-bar-chart.md)
