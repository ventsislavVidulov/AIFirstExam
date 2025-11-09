# Functional Requirements

[← Back: UX Principles](05-ux-principles.md) | [Index](index.md) | [Next: Non-Functional Requirements →](07-non-functional-requirements.md)

---

## Overview

This document provides a comprehensive specification of SmartBudget's functional requirements, organized by capability rather than technology. Each requirement includes:

- **User Value** - Why this matters
- **Acceptance Criteria** - How to verify completion
- **Domain Constraints** - Any limitations or rules
- **Priority** - Must-Have (MVP), Should-Have (Growth), Could-Have (Vision)

---

## FR-1: Transaction Management

### FR-1.1: Create Transaction

**User Value:** Users can record financial events as they occur

**Functional Specification:**

**Inputs:**
- `type` - "income" or "expense" (required)
- `amount` - Positive decimal number (required)
- `category` - Selected from predefined list (required)
- `date` - Date value, defaults to today (required)
- `description` - Free text, max 200 characters (optional)

**Process:**
1. User selects transaction type (income/expense)
2. User enters amount (numeric validation)
3. User selects category from type-appropriate list
4. User selects date (defaults to today)
5. User optionally adds description
6. User submits form
7. System generates unique ID and timestamp
8. System adds transaction to collection
9. System saves to localStorage
10. System updates UI (summary cards, charts, list)
11. System resets form for next entry

**Outputs:**
- New transaction object added to state
- Transaction appears in transaction list
- Summary cards recalculate
- Charts update with new data
- Form cleared and ready for next transaction

**Acceptance Criteria:**
- ✅ Transaction saved with all provided fields
- ✅ Unique ID generated (format: `{timestamp}-{random}`)
- ✅ CreatedAt timestamp added automatically
- ✅ Transaction appears in list immediately
- ✅ Summary totals update correctly
- ✅ Charts reflect new data
- ✅ Form validates required fields
- ✅ Amount accepts only positive numbers
- ✅ Category list filtered by transaction type
- ✅ Data persists after page reload

**Domain Constraints:**
- Amount must be > 0 (no negative or zero transactions)
- Date cannot be in future (historical tracking only)
- Category must be from predefined list
- Description limited to 200 characters

**Priority:** 🔴 **Must-Have (MVP)** - Core functionality

---

### FR-1.2: View Transactions

**User Value:** Users can see all their financial activity at a glance

**Functional Specification:**

**Display Format:**
- Table layout with columns: Date | Description | Category | Amount | Actions
- Sorted by date (newest first)
- Income shown in green with + prefix
- Expenses shown in red with - prefix
- Amounts right-aligned with currency formatting

**Process:**
1. System loads transactions from localStorage on app start
2. System applies any active filters
3. System sorts by date (descending)
4. System renders table with formatted data
5. System shows empty state if no transactions

**Outputs:**
- Table displaying all transactions (or filtered subset)
- Clear visual distinction between income/expense
- Formatted dates (e.g., "Nov 9, 2025")
- Formatted currency (e.g., "$1,200.00")

**Acceptance Criteria:**
- ✅ All transactions display correctly
- ✅ Sorting is chronological (newest first)
- ✅ Income/expense visually distinguished
- ✅ Currency formatted with $ and 2 decimals
- ✅ Dates formatted human-readably
- ✅ Empty state shown when no transactions
- ✅ Table responsive on mobile (horizontal scroll acceptable in MVP)

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-1.3: Edit Transaction

**User Value:** Users can correct mistakes without deleting and re-entering

**Functional Specification:**

**MVP Status:** ✅ Implemented (edit capability exists in BudgetContext)

**Process:**
1. User clicks edit action on transaction
2. Form populates with existing values
3. User modifies desired fields
4. User saves changes
5. System updates transaction in collection
6. System saves to localStorage
7. System updates all dependent UI

**Acceptance Criteria:**
- ✅ All fields editable
- ✅ Validation same as create
- ✅ Changes reflect immediately
- ✅ Updated timestamp maintained

**Priority:** 🔴 **Must-Have (MVP)** - Function exists, UI in growth phase

---

### FR-1.4: Delete Transaction

**User Value:** Users can remove erroneous or unwanted entries

**Functional Specification:**

**Process:**
1. User clicks delete icon button on transaction row
2. System shows confirmation dialog: "Delete this transaction?"
3. User confirms deletion
4. System removes transaction from collection
5. System saves to localStorage
6. System updates UI (summary, charts, list)

**Outputs:**
- Transaction removed from list
- Summary totals recalculate
- Charts update
- Confirmation message (optional in MVP)

**Acceptance Criteria:**
- ✅ Delete confirmation dialog appears
- ✅ Transaction removed only after confirmation
- ✅ Cancel option available
- ✅ All UI elements update correctly
- ✅ Change persists after reload
- ✅ No undo available (acknowledged limitation)

**Domain Constraints:**
- Deletion is permanent (no trash/recovery in MVP)
- No batch delete (one at a time)

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-2: Transaction Categorization

### FR-2.1: Predefined Categories

**User Value:** Consistent categorization enables meaningful analysis

**Functional Specification:**

**Income Categories:**
1. Salary
2. Freelance
3. Investment
4. Gift
5. Other

**Expense Categories:**
1. Rent
2. Transport
3. Food
4. Entertainment
5. Utilities
6. Healthcare
7. Shopping
8. Other

**Rules:**
- Categories are hardcoded (no user customization in MVP)
- Every transaction must have exactly one category
- Categories filtered by transaction type
- "Other" provides flexibility

**Acceptance Criteria:**
- ✅ All categories available in appropriate contexts
- ✅ Category dropdown shows only type-relevant options
- ✅ Categories stored as strings
- ✅ Case-sensitive matching

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-2.2: Category-Based Filtering

**User Value:** Users can analyze spending in specific areas

**Functional Specification:**

**Process:**
1. User selects category from filter dropdown
2. System filters transactions to selected category
3. System updates transaction list
4. System updates summary cards (totals for filtered data)
5. System updates charts

**Acceptance Criteria:**
- ✅ Dropdown shows all categories + "All Categories"
- ✅ Selection filters transaction list
- ✅ Summary cards reflect filtered data
- ✅ Charts reflect filtered data
- ✅ Clear indication of active filter

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-3: Financial Summaries

### FR-3.1: Total Income Calculation

**User Value:** Users see total money coming in

**Functional Specification:**

**Calculation:**
```
Total Income = SUM(amount WHERE type = 'income')
```

**Display:**
- Card with green gradient background
- Large bold number: "$X,XXX.XX"
- Label: "Total Income"
- Trending up icon

**Process:**
1. System filters all income transactions
2. System sums amount field
3. System formats as currency
4. System displays in summary card

**Acceptance Criteria:**
- ✅ Accurate sum of all income
- ✅ Updates in real-time on transaction changes
- ✅ Respects active filters
- ✅ Shows $0.00 when no income
- ✅ Currency formatted correctly

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-3.2: Total Expenses Calculation

**User Value:** Users see total money going out

**Functional Specification:**

**Calculation:**
```
Total Expenses = SUM(amount WHERE type = 'expense')
```

**Display:**
- Card with red gradient background
- Large bold number: "$X,XXX.XX"
- Label: "Total Expenses"
- Trending down icon

**Process:**
- Same as FR-3.1, filtered for expenses

**Acceptance Criteria:**
- ✅ Accurate sum of all expenses
- ✅ Real-time updates
- ✅ Filter-aware
- ✅ Shows $0.00 initially

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-3.3: Balance Calculation

**User Value:** Users see net financial position

**Functional Specification:**

**Calculation:**
```
Balance = Total Income - Total Expenses
```

**Display:**
- Card with blue gradient (or dynamic: green if positive, red if negative)
- Large bold number: "$X,XXX.XX"
- Label: "Balance"
- Wallet icon

**Process:**
1. System calculates total income
2. System calculates total expenses
3. System subtracts expenses from income
4. System displays result

**Acceptance Criteria:**
- ✅ Correct calculation (income - expenses)
- ✅ Positive shown in green, negative in red
- ✅ Real-time updates
- ✅ Filter-aware
- ✅ Shows $0.00 initially

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-4: Data Visualization

### FR-4.1: Expense Breakdown Pie Chart

**User Value:** Users see spending distribution visually

**Functional Specification:**

**Data Source:**
- All expense transactions
- Grouped by category
- Summed by amount

**Chart Configuration:**
- Type: Pie chart
- Labels: Category names
- Data: Sum of amounts per category
- Colors: Predefined palette (8 distinct colors)
- Legend: Category names with colors

**Interactions:**
- Hover: Show category name + amount + percentage
- Click: No action in MVP (future: filter by category)

**Empty State:**
- Message: "No expense data to display"
- Shown when no expenses exist

**Acceptance Criteria:**
- ✅ Accurate category breakdown
- ✅ All expense categories represented
- ✅ Colors distinguishable
- ✅ Legend matches chart
- ✅ Hover shows details
- ✅ Responsive sizing
- ✅ Empty state when appropriate
- ✅ Updates when transactions change

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-4.2: Income vs Expenses Bar Chart

**User Value:** Users compare total income to total expenses

**Functional Specification:**

**Data Source:**
- Total income (one bar)
- Total expenses (one bar)

**Chart Configuration:**
- Type: Bar chart
- X-axis: Two categories ("Income", "Expenses")
- Y-axis: Currency amounts (auto-scale)
- Colors: Green for income, red for expenses

**Interactions:**
- Hover: Show exact amount

**Empty State:**
- Message: "No transactions to display"
- Shown when no transactions exist

**Acceptance Criteria:**
- ✅ Bars represent correct totals
- ✅ Color-coded appropriately
- ✅ Y-axis scales appropriately
- ✅ Hover shows amounts
- ✅ Responsive sizing
- ✅ Updates with data changes

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-5: Filtering and Analysis

### FR-5.1: Date Range Filtering

**User Value:** Users analyze specific time periods

**Functional Specification:**

**Inputs:**
- Start date (inclusive, optional)
- End date (inclusive, optional)

**Process:**
1. User selects start date from date picker
2. User selects end date from date picker
3. System filters transactions WHERE date >= startDate AND date <= endDate
4. System updates all views (list, summary, charts)

**Behavior:**
- Both empty: Show all transactions (all time)
- Start only: Show from start date onward
- End only: Show up to end date
- Both: Show transactions in range

**Acceptance Criteria:**
- ✅ Date pickers functional
- ✅ Inclusive range (start and end dates included)
- ✅ All views update consistently
- ✅ No transactions: Empty state shown
- ✅ Clear indication of active filter

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-5.2: Type Filtering

**User Value:** Users focus on income or expenses separately

**Functional Specification:**

**Options:**
- All (default)
- Income only
- Expenses only

**Process:**
1. User selects filter option
2. System filters transactions by type
3. System updates all views

**Acceptance Criteria:**
- ✅ Three options available
- ✅ "All" shows everything
- ✅ "Income" shows only income
- ✅ "Expenses" shows only expenses
- ✅ Filter works with other filters (AND logic)
- ✅ Clear indication of selection

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-5.3: Clear All Filters

**User Value:** Users quickly return to full view

**Functional Specification:**

**Process:**
1. User clicks "Clear Filters" button
2. System resets all filters to defaults:
   - Date range: empty (all time)
   - Category: all
   - Type: all
3. System updates all views

**Acceptance Criteria:**
- ✅ Button visible only when filters active
- ✅ One click clears all filters
- ✅ All views return to full data
- ✅ Button hides after clearing

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-6: Data Persistence

### FR-6.1: Automatic Save

**User Value:** Users never lose data

**Functional Specification:**

**Trigger:** Every transaction change (add, edit, delete)

**Process:**
1. Transaction collection changes
2. System serializes to JSON
3. System writes to localStorage key: `smartbudget_transactions`
4. System logs success/failure to console

**Error Handling:**
- Quota exceeded: Log error, show console warning
- localStorage unavailable: Log error, continue functioning (data lost on reload)

**Acceptance Criteria:**
- ✅ Saves automatically (no save button)
- ✅ No perceptible delay
- ✅ Errors logged to console
- ✅ App remains functional on save failure

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-6.2: Automatic Load

**User Value:** Data persists across sessions

**Functional Specification:**

**Trigger:** App initialization

**Process:**
1. App starts
2. System reads from localStorage key
3. System parses JSON
4. System loads into state
5. System renders UI with data

**Error Handling:**
- Key missing: Initialize empty array
- Corrupted JSON: Log error, initialize empty array
- localStorage unavailable: Initialize empty array

**Acceptance Criteria:**
- ✅ Data loads on app start
- ✅ All transactions present
- ✅ No data loss between sessions
- ✅ Graceful handling of missing/corrupt data

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-7: User Interface

### FR-7.1: Responsive Layout

**User Value:** App works on all devices

**Functional Specification:**

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Adaptations:**
- Mobile: Single column, stacked components
- Tablet: Two columns where appropriate
- Desktop: Full multi-column layout

**Acceptance Criteria:**
- ✅ Readable on all screen sizes
- ✅ Touch targets ≥ 44px on mobile
- ✅ No horizontal overflow
- ✅ Charts resize appropriately

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-7.2: Application Header

**User Value:** Clear branding and navigation

**Functional Specification:**

**Elements:**
- App icon (wallet/money icon)
- App title: "SmartBudget"
- Background: Primary blue color

**Behavior:**
- Fixed at top (no sticky/scroll behavior in MVP)
- Spans full width
- Consistent on all screen sizes

**Acceptance Criteria:**
- ✅ Header always visible
- ✅ Branding clear
- ✅ Responsive width

**Priority:** 🔴 **Must-Have (MVP)**

---

## FR-8: Form Validation

### FR-8.1: Required Field Validation

**User Value:** Prevents incomplete data entry

**Functional Specification:**

**Required Fields:**
- Transaction type (income/expense)
- Amount
- Category
- Date

**Validation Timing:**
- On blur (field loses focus)
- On submit attempt

**Error Display:**
- Red border on invalid field
- Error text below field
- Submit button disabled if invalid

**Error Messages:**
- "Amount is required"
- "Please enter a positive number"
- "Category is required"
- "Date is required"

**Acceptance Criteria:**
- ✅ Cannot submit with missing required fields
- ✅ Clear error messages
- ✅ Errors show at appropriate time
- ✅ Errors clear when fixed

**Priority:** 🔴 **Must-Have (MVP)**

---

### FR-8.2: Amount Validation

**User Value:** Ensures valid numeric data

**Functional Specification:**

**Rules:**
- Must be numeric
- Must be positive (> 0)
- Allows decimals (e.g., 123.45)
- Max 2 decimal places displayed

**Acceptance Criteria:**
- ✅ Rejects non-numeric input
- ✅ Rejects zero or negative
- ✅ Accepts valid decimals
- ✅ Formats to 2 decimal places

**Priority:** 🔴 **Must-Have (MVP)**

---

## Summary Matrix

| Requirement | Priority | Status | Delivers Magic? |
|-------------|----------|--------|----------------|
| FR-1.1: Create Transaction | Must-Have | ✅ Complete | ✅ Yes - Enables instant entry |
| FR-1.2: View Transactions | Must-Have | ✅ Complete | ✅ Yes - Immediate visibility |
| FR-1.3: Edit Transaction | Must-Have | ✅ Backend only | ⚠️ Partial |
| FR-1.4: Delete Transaction | Must-Have | ✅ Complete | ⚠️ Cleanup only |
| FR-2.1: Predefined Categories | Must-Have | ✅ Complete | ✅ Yes - Enables analysis |
| FR-2.2: Category Filtering | Must-Have | ✅ Complete | ✅ Yes - Focused insights |
| FR-3.1: Total Income | Must-Have | ✅ Complete | ✅ Yes - Real-time calculation |
| FR-3.2: Total Expenses | Must-Have | ✅ Complete | ✅ Yes - Real-time calculation |
| FR-3.3: Balance | Must-Have | ✅ Complete | ✅ Yes - Instant net position |
| FR-4.1: Pie Chart | Must-Have | ✅ Complete | ✅ YES - Core "aha moment" |
| FR-4.2: Bar Chart | Must-Have | ✅ Complete | ✅ YES - Core "aha moment" |
| FR-5.1: Date Range Filter | Must-Have | ✅ Complete | ✅ Yes - Time-based analysis |
| FR-5.2: Type Filter | Must-Have | ✅ Complete | ✅ Yes - Focused views |
| FR-5.3: Clear Filters | Must-Have | ✅ Complete | ⚠️ Utility |
| FR-6.1: Auto Save | Must-Have | ✅ Complete | ✅ Yes - Frictionless |
| FR-6.2: Auto Load | Must-Have | ✅ Complete | ✅ Yes - Seamless |
| FR-7.1: Responsive Layout | Must-Have | ✅ Complete | ⚠️ Enabling |
| FR-7.2: App Header | Must-Have | ✅ Complete | ⚠️ Branding |
| FR-8.1: Required Fields | Must-Have | ✅ Complete | ⚠️ Data quality |
| FR-8.2: Amount Validation | Must-Have | ✅ Complete | ⚠️ Data quality |

**Legend:**
- ✅ Delivers Magic: Directly contributes to instant visual clarity
- ⚠️ Enabling/Utility: Supports core experience but not directly magical

---

[← Back: UX Principles](05-ux-principles.md) | [Index](index.md) | [Next: Non-Functional Requirements →](07-non-functional-requirements.md)
