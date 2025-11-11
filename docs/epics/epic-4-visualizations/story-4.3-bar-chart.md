# Story 4.3: Implement Income vs Expenses Bar Chart

**Epic:** [Epic 4: Data Visualization & Analytics](../index.md#epic-4-data-visualization--analytics)
**Story ID:** 4.3
**Story Points:** ~4

---

## User Story

As a **user**,
I want **a bar chart comparing my total income to total expenses**,
So that **I can see my financial balance visually**.

---

## Acceptance Criteria

**Given** Charts component has pie chart from Story 4.2
**When** I implement the bar chart in Charts.jsx
**Then** the chart displays two vertical bars:
  1. Income bar (green)
  2. Expenses bar (red)

**And** Y-axis shows currency amounts with auto-scaling
**And** X-axis labels: "Income" and "Expenses"
**And** when I hover over a bar, tooltip shows exact amount ($X,XXX.XX)
**And** green bar (income) and red bar (expenses) are clearly distinguishable
**And** if no transactions exist, empty state displays: "No transactions to display"
**And** chart updates smoothly when transactions change
**And** chart is responsive and maintains readability on mobile

---

## Prerequisites

- [Story 4.2: Implement Expense Breakdown Pie Chart](./story-4.2-pie-chart.md) (requires Charts component structure)

---

## Technical Notes

- **Data structure:** `[{ label: 'Income', value: totalIncome }, { label: 'Expenses', value: totalExpenses }]`
- **Calculations:** Use `calculateTotalIncome()` and `calculateTotalExpenses()` from utils
- **Bar colors:** `backgroundColor: ['#10B981', '#EF4444']` (green, red)
- **Y-axis:** Format as currency using Chart.js ticks callback
- **Chart options:** `responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: (value) => '$' + value } } }`
- **Tooltip format:** Custom callback for currency with 2 decimals
- **Empty state:** Same pattern as pie chart
- **Future growth:** Consider showing balance as third bar in future

---

## Definition of Done

- [ ] Bar chart implemented in Charts.jsx
- [ ] Two vertical bars: Income (green) and Expenses (red)
- [ ] Y-axis shows currency amounts with auto-scaling
- [ ] X-axis labels: "Income" and "Expenses"
- [ ] Tooltip shows exact amount on hover
- [ ] Green and red bars clearly distinguishable
- [ ] Empty state for no transactions
- [ ] Chart updates smoothly when transactions change
- [ ] Responsive and readable on mobile
- [ ] Uses calculation utilities from Story 2.1

---

## Next Story

[Story 4.4: Integrate Charts into Application Layout](./story-4.4-charts-integration.md)
