# AIFirstExam - Epic Breakdown

**Author:** Ventsi
**Date:** 2025-11-09
**Project Level:** Web Application (SPA) - General Domain (Low Complexity)
**Target Scale:** MVP - Personal Finance Tracking for Individual Users

---

## Documentation Formats Available

This epic breakdown is available in **two formats**:

### 📄 Format 1: This File (epics.md) - Complete Monolithic View
- **Size:** ~94KB, 885 lines, all 17 stories in one document
- **Best for:** Overview, planning, comprehensive review
- **Use case:** Evaluators, project managers, complete scope understanding

### 📁 Format 2: [Sharded Structure](./epics/) - Token-Efficient Format
- **Size:** ~4KB per story file (17 separate files)
- **Best for:** AI agent implementation, focused development work
- **Use case:** Dev agents with 200k context windows
- **Benefit:** **95% reduction in context usage per story**
- **[View sharded index →](./epics/index.md)**

**Educational Note:** The sharded structure demonstrates advanced understanding of token-efficient AI-agent workflows and scalable development patterns. Both formats contain identical content.

---

## Overview

This document provides the complete epic and story breakdown for AIFirstExam, decomposing the requirements from the [PRD](./PRD/) into implementable stories.

## Epic Summary

This epic breakdown structures SmartBudget development into 5 sequential phases, each delivering independent value while building toward the complete "instant visual clarity" experience.

### Epic Sequence & Rationale

**Epic 1: Project Foundation & Development Infrastructure** (Foundation)
- **Goal:** Establish development environment, build system, and core application structure
- **Value:** Enables all subsequent development work
- **Scope:** Vite + React setup, MUI integration, project structure, deployment basics
- **Why First:** You can't build features without a working foundation

**Epic 2: Transaction Management System** (Core Engine)
- **Goal:** Enable users to capture and manage financial transactions reliably
- **Value:** Users can start tracking their finances immediately
- **Scope:** CRUD operations, categorization, validation, localStorage persistence
- **Dependencies:** Epic 1 (requires working React app)
- **Why Second:** Transaction data is the fuel for everything else

**Epic 3: Financial Intelligence & Summaries** (Insight Generation)
- **Goal:** Transform raw transaction data into actionable financial insights
- **Value:** Users understand their financial position at a glance
- **Scope:** Real-time calculations, summary cards (income/expenses/balance), formatting
- **Dependencies:** Epic 2 (requires transaction data)
- **Why Third:** Users need to see totals before detailed analysis

**Epic 4: Data Visualization & Analytics** (Magic Moment)
- **Goal:** Create the "aha moment" through visual pattern discovery
- **Value:** Users see spending patterns they never noticed before
- **Scope:** Pie chart (expense breakdown), bar chart (income vs expenses), Chart.js integration
- **Dependencies:** Epic 3 (requires calculated totals)
- **Why Fourth:** This delivers the product's signature "instant visual clarity"

**Epic 5: Filtering & User Experience Polish** (Empowerment)
- **Goal:** Enable focused analysis and ensure universal accessibility
- **Value:** Users can answer specific questions and use app anywhere
- **Scope:** Date/category/type filters, responsive design, mobile optimization
- **Dependencies:** Epic 4 (requires data to filter and visualize)
- **Why Last:** Filters are most valuable when there's rich data and visuals to filter

### Epic Dependency Chain

```
Epic 1 (Foundation)
   ↓
Epic 2 (Transactions) ← Must have working app
   ↓
Epic 3 (Summaries) ← Must have transaction data
   ↓
Epic 4 (Visualizations) ← Must have calculated totals
   ↓
Epic 5 (Filters & UX) ← Must have visuals to enhance
```

### Value Delivery Progression

| After Epic | User Can... | Product Magic Level |
|------------|-------------|---------------------|
| Epic 1 | See the app structure | 0% (no features) |
| Epic 2 | Track all transactions, edit, delete | 30% (functional but raw) |
| Epic 3 | See total income, expenses, balance | 50% (numbers but no visuals) |
| Epic 4 | **Experience visual clarity** | 85% (**Magic delivered!**) |
| Epic 5 | Analyze any time period, any device | 100% (Complete MVP) |

### Why This Grouping Makes Sense

**Value-Based Organization:**
- Each epic delivers user-facing value (not just "backend" or "frontend")
- Users can theoretically use the app after Epic 2 (basic tracking)
- Epic 4 delivers the differentiating "magic" experience

**Cohesive Scope:**
- Each epic contains 3-6 related stories
- Stories within an epic work together naturally
- No artificial splitting (e.g., all transaction CRUD in one epic)

**Sequential Dependencies:**
- Clear prerequisite chain (no circular dependencies)
- Each epic enables the next
- Parallel work not possible (educational constraint: single developer)

**Sized for Success:**
- Each epic deliverable in focused phase
- Not too large (no "build everything" epic)
- Not too small (no "add one button" epic)

---

## Epic 1: Project Foundation & Development Infrastructure

**Epic Goal:** Establish a production-ready development environment with Vite, React, and Material-UI that enables rapid feature development. This foundation must support hot module reloading, component-based architecture, and professional UI components from day one.

**Business Value:** Without a solid foundation, all subsequent development is impossible. This epic delivers the "canvas" on which SmartBudget will be painted.

**Acceptance Criteria for Epic Completion:**
- ✅ Development server runs locally with HMR
- ✅ MUI components render correctly with custom theme
- ✅ Project structure supports separation of concerns
- ✅ Git repository initialized with clean .gitignore
- ✅ README documents setup process
- ✅ Zero build errors or warnings

### Story 1.1: Initialize Vite + React Development Environment

As a **developer**,
I want **a modern React development environment with Vite**,
So that **I can build features with fast hot module reloading and modern tooling**.

**Acceptance Criteria:**

**Given** a clean development machine with Node.js 18+ installed
**When** I run `npm create vite@latest smartbudget -- --template react`
**Then** a new React project is created with Vite configuration

**And** running `npm install` installs all dependencies successfully
**And** running `npm run dev` starts development server on localhost:5173
**And** the default Vite + React starter page loads in browser
**And** hot module reloading works (editing App.jsx updates browser instantly)
**And** Git repository is initialized with proper .gitignore (node_modules, dist excluded)

**Prerequisites:** None (first story in project)

**Technical Notes:**
- Use Vite 7.x (latest stable) for fastest build times
- React 19.x with modern JSX transform
- Includes ESLint configuration automatically
- .gitignore must exclude: node_modules/, dist/, .env, .DS_Store
- Verify HMR works before proceeding (critical for dev experience)
- Document Node.js version requirement in README

---

### Story 1.2: Integrate Material-UI Component Library

As a **developer**,
I want **Material-UI components and theming integrated**,
So that **I can build professional UI without custom styling from scratch**.

**Acceptance Criteria:**

**Given** the Vite + React project from Story 1.1 is working
**When** I install MUI packages: `@mui/material @emotion/react @emotion/styled @mui/icons-material`
**Then** all MUI dependencies install without conflicts

**And** I create a custom theme with brand colors:
  - Primary: #3B82F6 (blue)
  - Secondary: #8B5CF6 (purple)
  - Success: #10B981 (green)
  - Error: #EF4444 (red)

**And** I wrap the app in `<ThemeProvider>` with `<CssBaseline>`
**And** MUI components render correctly (test with Button, AppBar, Container)
**And** theme colors apply to all MUI components
**And** typography uses Roboto font (MUI default)
**And** no console warnings about missing peer dependencies

**Prerequisites:** Story 1.1 (requires working React app)

**Technical Notes:**
- Use @emotion for CSS-in-JS (MUI's default styling engine)
- ThemeProvider should wrap entire app in App.jsx or main.jsx
- CssBaseline provides consistent baseline styles across browsers
- Icons package needed for visual elements (AccountBalance, TrendingUp, etc.)
- Test theme by rendering colored Button components
- MUI v7.x uses React 19 (verify compatibility)

---

### Story 1.3: Establish Project Structure and Application Shell

As a **developer**,
I want **a clear folder structure and basic app shell**,
So that **code is organized and I can navigate the codebase efficiently**.

**Acceptance Criteria:**

**Given** Vite + React + MUI are integrated from previous stories
**When** I create the following folder structure:
```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── utils/          # Helper functions and constants
├── assets/         # Images, fonts (if needed)
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```
**Then** all folders exist and are empty (ready for feature code)

**And** App.jsx contains:
  - ThemeProvider wrapping
  - CssBaseline for reset
  - AppBar with SmartBudget branding
  - Container for main content area
  - Basic responsive layout structure

**And** the application displays a branded header with "SmartBudget" title
**And** the layout is responsive (works on mobile, tablet, desktop)
**And** no Lorem Ipsum text (use real placeholder content)
**And** footer mentions "Built with BMAD Methodology"

**Prerequisites:** Story 1.2 (requires MUI integration)

**Technical Notes:**
- Use MUI's `<Container maxWidth="lg">` for content area
- AppBar should be position="static" (no sticky behavior in MVP)
- Folder structure follows React best practices (components, context, utils)
- No routing library yet (single page app for MVP)
- App.jsx should be < 100 lines (just structure, no business logic)
- Use MUI icons: `<AccountBalanceIcon />` for branding
- Responsive breakpoints: xs (mobile), md (tablet), lg (desktop)

<!-- End story repeat -->

---

## Epic 2: Transaction Management System

**Epic Goal:** Enable users to capture, view, edit, and delete financial transactions with proper categorization and persistent storage. Every transaction must be validated, stored reliably in localStorage, and immediately available for display.

**Business Value:** This is the heart of SmartBudget. Without reliable transaction management, nothing else matters. Users must trust that their financial data is captured accurately and never lost.

**Acceptance Criteria for Epic Completion:**
- ✅ Users can add income and expense transactions with amount, category, date, description
- ✅ Transactions display in chronological list (newest first)
- ✅ Users can delete transactions with confirmation
- ✅ All data persists in localStorage across browser sessions
- ✅ Form validation prevents invalid data entry
- ✅ Categories are predefined and type-specific (5 income, 8 expense)
- ✅ Transaction CRUD operations feel instant (< 100ms perceived latency)

### Story 2.1: Create Transaction Data Model and Utility Functions

As a **developer**,
I want **a clear transaction data model and reusable utility functions**,
So that **transaction handling is consistent throughout the application**.

**Acceptance Criteria:**

**Given** the project foundation from Epic 1 is complete
**When** I create `src/utils/constants.js` with transaction categories
**Then** the file exports:
  - `INCOME_CATEGORIES`: Array of 5 income categories (Salary, Freelance, Investment, Gift, Other)
  - `EXPENSE_CATEGORIES`: Array of 8 expense categories (Rent, Transport, Food, Entertainment, Utilities, Healthcare, Shopping, Other)

**And** I create `src/utils/storage.js` with localStorage functions:
  - `loadTransactions()`: Reads from localStorage, returns array, handles errors gracefully
  - `saveTransactions(transactions)`: Writes to localStorage, handles quota exceeded

**And** I create `src/utils/calculations.js` with helper functions:
  - `filterTransactions(transactions, filters)`: Applies date/category/type filters
  - `sortTransactionsByDate(transactions)`: Sorts newest first
  - `calculateTotalIncome(transactions)`: Sums income amounts
  - `calculateTotalExpenses(transactions)`: Sums expense amounts
  - `calculateBalance(income, expenses)`: Returns difference

**And** all utility functions are pure (no side effects, testable in isolation)
**And** localStorage key is consistently `smartbudget_transactions`
**And** error handling logs to console but doesn't crash app

**Prerequisites:** Story 1.3 (requires project structure with utils/ folder)

**Technical Notes:**
- Transaction model: `{ id, amount, category, date, description, type, createdAt }`
- ID generation: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
- Date format: ISO string YYYY-MM-DD for consistency
- localStorage limit: 5-10MB (sufficient for thousands of transactions)
- Graceful degradation: If localStorage unavailable, app continues functioning (data not persisted)
- Categories are hardcoded (no custom categories in MVP)
- All calculations use standard JavaScript Number (no BigDecimal needed for typical amounts)

---

### Story 2.2: Implement BudgetContext for Global State Management

As a **developer**,
I want **React Context to manage transaction state globally**,
So that **all components can access and modify transactions without prop drilling**.

**Acceptance Criteria:**

**Given** utility functions from Story 2.1 exist
**When** I create `src/context/BudgetContext.jsx`
**Then** the file exports:
  - `BudgetProvider` component that wraps the app
  - `useBudget()` custom hook for consuming context

**And** BudgetProvider manages state for:
  - `transactions`: Array of all transaction objects
  - `filters`: Object with startDate, endDate, category, type

**And** BudgetProvider provides methods:
  - `addTransaction(transaction)`: Adds new transaction with generated ID
  - `updateTransaction(id, updates)`: Updates existing transaction
  - `deleteTransaction(id)`: Removes transaction
  - `updateFilters(newFilters)`: Updates filter state
  - `clearFilters()`: Resets filters to defaults

**And** transactions automatically load from localStorage on mount (useEffect)
**And** transactions automatically save to localStorage on every change (useEffect)
**And** context provides both `transactions` (filtered) and `allTransactions` (unfiltered)
**And** `useBudget()` throws error if used outside BudgetProvider (dev experience)

**Prerequisites:** Story 2.1 (requires storage and calculation utilities)

**Technical Notes:**
- Use React 19 Context API (built-in, no external state library)
- Two useEffect hooks: one for loading, one for saving
- Filter logic uses `filterTransactions()` and `sortTransactionsByDate()` from utils
- Context value should be memoized to prevent unnecessary re-renders (if performance issues arise)
- Wrap app in BudgetProvider at App.jsx or main.jsx level
- useBudget() error message: "useBudget must be used within a BudgetProvider"
- Filters default: `{ startDate: null, endDate: null, category: 'all', type: 'all' }`

---

### Story 2.3: Build Transaction Form Component

As a **user**,
I want **a simple form to add income and expense transactions**,
So that **I can quickly record financial events as they occur**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 2.2 (requires BudgetContext)

**Technical Notes:**
- Use MUI components: TextField, Select, MenuItem, Button, ToggleButtonGroup, Card, CardContent
- Controlled components: All form state managed with useState hooks
- Use MUI date picker or HTML5 `<input type="date">` for MVP
- Amount input: `<TextField type="number" inputProps={{ min: 0, step: 0.01 }}>`
- Default date: `new Date().toISOString().split('T')[0]` (YYYY-MM-DD format)
- Transaction object created on submit: `{ amount, category, date, description, type }`
- BudgetContext generates ID and createdAt timestamp automatically
- Form validation: HTML5 required attribute + custom validation logic
- Responsive: Full width on mobile, fixed width (400px) on desktop

---

### Story 2.4: Build Transaction List Component

As a **user**,
I want **to view all my transactions in a chronological list**,
So that **I can see my complete financial history at a glance**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 2.3 (requires transactions to exist for testing)

**Technical Notes:**
- Use MUI components: Table, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog
- Date formatting: `new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })`
- Currency formatting: `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)`
- Color coding: Use MUI theme colors (success.main for income, error.main for expenses)
- Delete icon: Use `<DeleteIcon />` from @mui/icons-material
- Confirmation dialog: MUI Dialog with "Cancel" and "Delete" buttons
- Empty state: Typography component with gray text, centered
- Responsive: Horizontal scroll on mobile if table too wide (acceptable for MVP)
- Each row needs unique key prop: Use transaction.id

---

### Story 2.5: Integrate Transaction Form and List into App

As a **user**,
I want **the transaction form and list displayed together in the main app**,
So that **I can immediately see new transactions appear after adding them**.

**Acceptance Criteria:**

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

**Prerequisites:** Stories 2.3 and 2.4 (requires both components)

**Technical Notes:**
- Use MUI Box component with `display: 'flex'` and `flexDirection: { xs: 'column', md: 'row' }`
- Desktop layout: Form fixed width (400px), List flex: 1
- Mobile layout: Form full width, List full width, stacked vertically
- Gap between components: `gap: 3` (24px in MUI spacing)
- Form should be in a Paper or Card for visual elevation
- List should be in a Paper or Card for visual elevation
- Test with multiple transactions to ensure scrolling works
- Verify localStorage persistence: Add transaction → Reload page → Transaction still there

---

## Epic 3: Financial Intelligence & Summaries

**Epic Goal:** Transform raw transaction data into actionable insights by calculating total income, total expenses, and balance, displaying them in prominent summary cards with real-time updates and clear visual indicators.

**Business Value:** Users need to understand their financial position at a glance. Summary cards provide the "headline numbers" that answer: "How much money do I have?"

**Acceptance Criteria for Epic Completion:**
- ✅ Three summary cards display: Total Income, Total Expenses, Balance
- ✅ All calculations are accurate to 2 decimal places
- ✅ Cards update in real-time when transactions change (< 100ms)
- ✅ Income card is green, expenses card is red, balance dynamically colored
- ✅ Large, bold numbers are easy to read
- ✅ Icons reinforce meaning (trending up/down, wallet)
- ✅ Responsive layout works on all screen sizes

### Story 3.1: Create Summary Component with Real-Time Calculations

As a **user**,
I want **to see my total income, expenses, and balance at the top of the app**,
So that **I understand my financial position immediately**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 2.5 (requires working transaction system)

**Technical Notes:**
- Use MUI Card, CardContent, Typography, Box components
- Icons: TrendingUpIcon, TrendingDownIcon, AccountBalanceWalletIcon from @mui/icons-material
- Use `useBudget()` hook to access transactions
- Calculate totals using `calculateTotalIncome()`, `calculateTotalExpenses()`, `calculateBalance()` from utils
- Color gradients: Use MUI theme colors with `sx={{ bgcolor: 'success.light' }}` pattern
- Typography: Use variant="h4" for amounts, variant="body2" for labels
- Currency formatting: Same as TransactionList (Intl.NumberFormat)
- Responsive grid: `display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2`
- Cards should have elevation={2} for subtle shadow
- Place Summary component at top of App.jsx, above TransactionForm and List

---

### Story 3.2: Integrate Summary Cards into Main Application Layout

As a **user**,
I want **summary cards prominently displayed at the top of the application**,
So that **I see my financial overview before anything else**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 3.1 (requires Summary component)

**Technical Notes:**
- Use MUI Container and Box for layout structure
- Summary section: `<Box sx={{ mb: 4 }}>` for margin below
- Cards should span full width of container (maxWidth="lg")
- Test responsive behavior at 768px breakpoint
- Verify real-time updates: Add transaction → Summary updates within 100ms
- Visual hierarchy: Summary should be most prominent (larger cards, more elevation)
- Ensure sufficient spacing between summary and form/list sections

---

## Epic 4: Data Visualization & Analytics

**Epic Goal:** Create the "aha moment" by visualizing spending patterns through interactive charts. Users should see their expense breakdown by category (pie chart) and compare total income vs expenses (bar chart) with smooth, responsive rendering.

**Business Value:** This epic delivers SmartBudget's signature "instant visual clarity" - the product magic that transforms numbers into insights. Charts reveal patterns users never noticed in raw data.

**Acceptance Criteria for Epic Completion:**
- ✅ Pie chart shows expense distribution by category
- ✅ Bar chart compares total income vs total expenses
- ✅ Charts update smoothly when transactions change (< 200ms)
- ✅ Charts are responsive and work on all screen sizes
- ✅ Hover interactions show detailed data
- ✅ Empty states display when no data exists
- ✅ Chart.js 4.x integrated (secure, no CVEs)
- ✅ Color palette is accessible and distinct

### Story 4.1: Integrate Chart.js and Create Charts Component Structure

As a **developer**,
I want **Chart.js integrated with react-chartjs-2 wrapper**,
So that **I can build interactive data visualizations efficiently**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 3.2 (requires working app with transactions and summaries)

**Technical Notes:**
- Chart.js 4.5.1 patched CVE-2020-7746 (safe to use)
- react-chartjs-2 v5.3.1 is the latest compatible wrapper
- Must register Chart.js components before using (tree-shaking optimization)
- Use canvas rendering (default, hardware accelerated)
- Responsive: true (charts auto-resize on container changes)
- MUI Paper for chart containers: `<Paper elevation={2} sx={{ p: 2 }}>`
- Chart sections: flexbox layout, 50/50 split on desktop, stacked on mobile
- Typography variant="h6" for chart titles
- No actual chart data yet (placeholder divs acceptable for this story)

---

### Story 4.2: Implement Expense Breakdown Pie Chart

As a **user**,
I want **a pie chart showing my expense distribution by category**,
So that **I can visually identify where my money goes**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 4.1 (requires Chart.js integration)

**Technical Notes:**
- Data transformation: Group expenses by category, sum amounts per category
- Use `transactions.filter(t => t.type === 'expense').reduce()` pattern
- Color palette (8 colors): ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6']
- Chart options: `responsive: true, plugins: { legend: { position: 'bottom' } }`
- Tooltip format: Custom callback for currency formatting
- Empty state: Conditional rendering - if no expenses, show Typography with message
- Animation: Chart.js default animation (smooth, ~500ms)
- Only show categories that have transactions (filter zero-amount categories)

---

### Story 4.3: Implement Income vs Expenses Bar Chart

As a **user**,
I want **a bar chart comparing my total income to total expenses**,
So that **I can see my financial balance visually**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 4.2 (requires Charts component structure)

**Technical Notes:**
- Data: `[{ label: 'Income', value: totalIncome }, { label: 'Expenses', value: totalExpenses }]`
- Use `calculateTotalIncome()` and `calculateTotalExpenses()` from utils
- Bar colors: `backgroundColor: ['#10B981', '#EF4444']` (green, red)
- Y-axis: Format as currency using Chart.js ticks callback
- Chart options: `responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: (value) => '$' + value } } }`
- Tooltip format: Custom callback for currency with 2 decimals
- Empty state: Same pattern as pie chart
- Consider showing balance as third bar in future (growth feature)

---

### Story 4.4: Integrate Charts into Application Layout

As a **user**,
I want **charts displayed prominently below the summary cards**,
So that **I experience the visual clarity that makes SmartBudget special**.

**Acceptance Criteria:**

**Given** Charts component with both pie and bar charts from previous stories
**When** I add `<Charts />` to App.jsx layout
**Then** charts section appears below Summary cards, above Footer

**And** the full layout hierarchy is:
  1. AppBar (header)
  2. Summary cards (3 cards side-by-side)
  3. TransactionForm + TransactionList (two-column layout)
  4. **Charts** (two charts side-by-side, NEW)
  5. Footer

**And** charts section has proper spacing from other sections
**And** on desktop, pie and bar charts are side-by-side (50/50 split)
**And** on mobile, charts stack vertically
**And** when I add/edit/delete transactions:
  - Summary cards update instantly
  - Transaction list updates instantly
  - Charts update smoothly with animation (< 200ms)

**And** the entire user flow delivers "instant visual clarity":
  1. User adds transaction
  2. Form clears
  3. List updates
  4. Summary cards update
  5. Charts animate to new data
  6. User sees their financial picture transform

**Prerequisites:** Story 4.3 (requires complete Charts component)

**Technical Notes:**
- Charts section: `<Box sx={{ mb: 4 }}>` wrapper for spacing
- Place Charts after TransactionForm + TransactionList section
- Test end-to-end: Add expense → Pie chart updates, Bar chart updates
- Verify responsive behavior at 768px breakpoint
- Performance: Charts should render smoothly, no janking or blocking
- This story delivers the product's core "magic moment"

---

## Epic 5: Filtering & User Experience Polish

**Epic Goal:** Empower users to analyze specific time periods and categories through intuitive filters, and ensure the application works flawlessly on all devices with responsive design and mobile optimization.

**Business Value:** Filters transform SmartBudget from a passive viewer to an active analysis tool. Users can answer questions like "How much did I spend on food last month?" Responsive design ensures universal accessibility.

**Acceptance Criteria for Epic Completion:**
- ✅ Date range filter (start date, end date)
- ✅ Category filter (dropdown with all categories)
- ✅ Type filter (Income, Expenses, All)
- ✅ All filters apply immediately (no "apply" button)
- ✅ Clear filters button resets all filters
- ✅ Filtered data updates: list, summaries, AND charts
- ✅ Active filters clearly indicated
- ✅ Responsive design tested on mobile, tablet, desktop
- ✅ Touch targets ≥ 44px on mobile

### Story 5.1: Implement Date Range and Type Filters

As a **user**,
I want **to filter transactions by date range and type**,
So that **I can analyze specific time periods and focus on income or expenses separately**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 4.4 (requires complete app with charts)

**Technical Notes:**
- Use MUI TextField with `type="date"` or MUI DatePicker
- Type filter: MUI Select with options: "All", "Income", "Expenses"
- Filter state managed in BudgetContext (updateFilters method already exists from Story 2.2)
- Filtering logic in `filterTransactions()` utility (already created in Story 2.1)
- Apply filters to `allTransactions`, store result in `transactions` (filtered)
- Summary calculations use filtered transactions
- Chart data uses filtered transactions
- Date range: Both start and end dates are inclusive
- Empty filter values mean "no filter" (show all data)

---

### Story 5.2: Add Clear Filters Button and Active Filter Indicators

As a **user**,
I want **a clear button to remove all filters at once**,
So that **I can quickly return to viewing all my data**.

**Acceptance Criteria:**

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

**Prerequisites:** Story 5.1 (requires filter implementation)

**Technical Notes:**
- "Clear Filters" button: MUI Button with onClick calling `clearFilters()` from BudgetContext
- Show button conditionally: `if (filters.startDate || filters.endDate || filters.category !== 'all' || filters.type !== 'all')`
- Active filter indicators: Use MUI Chip components showing active filter values
- Example chips: "Date: Jan 1 - Jan 31", "Type: Expenses", "Category: Food"
- Chips should have delete icon that removes individual filter
- Clear all button: "Clear All Filters" with secondary variant
- Place filter controls in a dedicated filter bar (MUI Paper or Box component)

---

### Story 5.3: Responsive Design Testing and Mobile Optimization

As a **user**,
I want **SmartBudget to work perfectly on my phone, tablet, and computer**,
So that **I can track finances on any device, anywhere**.

**Acceptance Criteria:**

**Given** all features from previous epics are implemented
**When** I test the application on different screen sizes
**Then** on **mobile (< 768px)**:
  - Summary cards stack vertically
  - TransactionForm takes full width
  - TransactionList takes full width (below form)
  - Charts stack vertically
  - All touch targets are ≥ 44x44px (buttons, icons, inputs)
  - Text is readable (minimum 16px font size)
  - No horizontal scrolling (except table if necessary)

**And** on **tablet (768px - 1024px)**:
  - Summary cards: 2 on top row, 1 on bottom row (or all 3 in row)
  - TransactionForm and List side-by-side
  - Charts side-by-side

**And** on **desktop (> 1024px)**:
  - All components use full layout potential
  - Maximum content width: 1280px (Container maxWidth="lg")
  - Optimal reading line length maintained

**And** all interactions work on touch devices (no hover-only functionality)
**And** date pickers work on mobile (native date picker acceptable)
**And** dropdown menus are touch-friendly
**And** delete confirmation dialog works on mobile
**And** charts are readable and interactive on all screen sizes

**Prerequisites:** Story 5.2 (requires complete feature set)

**Technical Notes:**
- Test breakpoints: 375px (iPhone SE), 768px (iPad portrait), 1024px (iPad landscape), 1440px (laptop)
- Use Chrome DevTools Device Mode for testing
- MUI breakpoints: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
- Responsive patterns: `sx={{ flexDirection: { xs: 'column', md: 'row' } }}`
- Touch targets: MUI components already optimized, but verify with buttons/icons
- Test on actual mobile device if possible (iOS and Android)
- Verify localStorage works on mobile browsers
- Test in both portrait and landscape orientations
- Ensure keyboard doesn't break layout on mobile when focusing inputs

---

## Epic Breakdown Summary

| Epic | Stories | Total Story Points | Dependencies | Delivers |
|------|---------|-------------------|--------------|----------|
| Epic 1: Foundation | 3 stories | ~8 points | None | Development environment |
| Epic 2: Transactions | 5 stories | ~20 points | Epic 1 | Core CRUD functionality (30% value) |
| Epic 3: Summaries | 2 stories | ~8 points | Epic 2 | Financial overview (50% value) |
| Epic 4: Visualizations | 4 stories | ~15 points | Epic 3 | **Product magic** (85% value) |
| Epic 5: Filters & UX | 3 stories | ~12 points | Epic 4 | Complete MVP (100% value) |
| **TOTAL** | **17 stories** | **~63 points** | Sequential | **Complete SmartBudget MVP** |

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._
