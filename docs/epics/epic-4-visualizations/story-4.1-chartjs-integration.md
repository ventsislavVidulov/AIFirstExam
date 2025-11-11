# Story 4.1: Integrate Chart.js and Create Charts Component Structure

**Epic:** [Epic 4: Data Visualization & Analytics](../index.md#epic-4-data-visualization--analytics)
**Story ID:** 4.1
**Story Points:** ~3

---

## User Story

As a **developer**,
I want **Chart.js integrated with react-chartjs-2 wrapper**,
So that **I can build interactive data visualizations efficiently**.

---

## Acceptance Criteria

**Given** the application has transaction and summary features from previous epics
**When** I install Chart.js dependencies: `chart.js react-chartjs-2`
**Then** Chart.js 4.5.1 (or latest 4.x) is installed with zero vulnerabilities

**And** react-chartjs-2 version is compatible with Chart.js 4.x
**And** I create `src/components/Charts.jsx` with skeleton structure
**And** the component registers Chart.js components:
  ```javascript
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
  ```

**And** the component imports Pie and Bar from react-chartjs-2
**And** the component uses `useBudget()` to access transaction data
**And** the layout has two sections: Pie chart on left, Bar chart on right (stacked on mobile)
**And** both chart sections are wrapped in MUI Paper components with titles

---

## Prerequisites

- [Story 3.2: Integrate Summary Cards into Main Application Layout](../epic-3-summaries/story-3.2-summary-integration.md) (requires working app with transactions and summaries)

---

## Technical Notes

- **Chart.js 4.5.1:** Patched CVE-2020-7746 (safe to use)
- **react-chartjs-2 v5.3.1:** Latest compatible wrapper
- **Register components:** Must register Chart.js components before using (tree-shaking optimization)
- **Canvas rendering:** Default, hardware accelerated
- **Responsive:** true (charts auto-resize on container changes)
- **MUI Paper:** `<Paper elevation={2} sx={{ p: 2 }}>` for chart containers
- **Chart sections:** Flexbox layout, 50/50 split on desktop, stacked on mobile
- **Typography variant="h6":** For chart titles
- **No actual chart data yet:** Placeholder divs acceptable for this story

---

## Definition of Done

- [ ] Chart.js and react-chartjs-2 installed
- [ ] Zero npm vulnerabilities
- [ ] src/components/Charts.jsx created
- [ ] Chart.js components registered (ArcElement, Tooltip, Legend, etc.)
- [ ] Pie and Bar imported from react-chartjs-2
- [ ] Component uses useBudget() hook
- [ ] Layout structure: two sections side-by-side on desktop
- [ ] Both sections wrapped in MUI Paper with titles
- [ ] Responsive layout: stacked on mobile
- [ ] No console errors or warnings

---

## Next Story

[Story 4.2: Implement Expense Breakdown Pie Chart](./story-4.2-pie-chart.md)
