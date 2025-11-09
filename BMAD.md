# BMAD Methodology - SmartBudget Application

## Phase 1: ANALYSIS

### Project Overview
SmartBudget is a personal finance management web application that helps users track income, expenses, and visualize spending patterns.

### User Stories

#### Core Features
1. **As a user**, I want to add income records so that I can track my earnings
2. **As a user**, I want to add expense records so that I can monitor my spending
3. **As a user**, I want to categorize transactions so that I can organize my finances
4. **As a user**, I want to view spending summaries so that I understand my financial situation
5. **As a user**, I want to see visual charts so that I can quickly identify spending patterns
6. **As a user**, I want to filter transactions by date range so that I can analyze specific periods
7. **As a user**, I want to delete or edit transactions so that I can correct mistakes

#### Optional Features
8. **As a user**, I want to receive AI-based budget suggestions so that I can optimize my spending

### Requirements Analysis

#### Functional Requirements
- **Transaction Management**
  - Add income/expense with amount, category, date, and description
  - Edit existing transactions
  - Delete transactions
  - View all transactions in a list

- **Categorization**
  - Predefined categories (Salary, Rent, Transport, Food, Entertainment, Utilities, Healthcare, Other)
  - Ability to specify transaction type (Income/Expense)

- **Data Visualization**
  - Summary cards showing total income, total expenses, and balance
  - Pie chart showing expense distribution by category
  - Line/bar chart showing spending trends over time
  - Monthly comparison view

- **Filtering & Search**
  - Filter by date range
  - Filter by category
  - Filter by transaction type (income/expense)

#### Non-Functional Requirements
- **Usability**: Clean, intuitive interface
- **Performance**: Fast load times, responsive UI
- **Data Persistence**: Local storage or database
- **Responsiveness**: Mobile-friendly design
- **Accessibility**: Basic accessibility standards

#### Technical Constraints
- Web-based application
- Must work in modern browsers
- No server required for basic functionality (can use local storage)

---

## Phase 2: PLANNING

### Technology Stack Decision

#### Frontend
- **Framework**: React.js (modern, component-based, large ecosystem)
- **Styling**: Tailwind CSS (utility-first, rapid development)
- **Charts**: Chart.js with react-chartjs-2 (simple, powerful visualization)
- **State Management**: React Context API (sufficient for this scale)
- **Date Handling**: date-fns (lightweight, modern)

#### Backend Options
- **Option 1**: Local Storage only (simplest, no backend needed)
- **Option 2**: Node.js + Express + SQLite (local database)
- **Choice**: Start with Local Storage, design for easy backend migration

#### Development Tools
- **Build Tool**: Vite (fast, modern)
- **Package Manager**: npm
- **Version Control**: Git
- **AI Assistant**: Claude Code

### Project Structure
```
smartbudget/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── Summary.jsx
│   │   ├── Charts.jsx
│   │   └── FilterBar.jsx
│   ├── context/
│   │   └── BudgetContext.jsx
│   ├── utils/
│   │   ├── storage.js
│   │   ├── calculations.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── README.md
├── summary.md
├── prompts.md
└── BMAD.md
```

### Architecture Design

#### Component Hierarchy
```
App
├── BudgetProvider (Context)
│   ├── Dashboard
│   │   ├── Summary
│   │   ├── Charts
│   │   ├── FilterBar
│   │   ├── TransactionForm
│   │   └── TransactionList
```

#### Data Flow
1. User interacts with TransactionForm
2. Form submits to BudgetContext
3. Context updates state and localStorage
4. All components re-render with new data
5. Charts and summaries recalculate automatically

---

## Phase 3: SOLUTIONING

### Data Model

#### Transaction Schema
```javascript
{
  id: string (UUID),
  type: 'income' | 'expense',
  amount: number,
  category: string,
  description: string,
  date: ISO string,
  createdAt: ISO string
}
```

#### Categories
```javascript
const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Rent', 'Transport', 'Food', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other']
}
```

### State Management Strategy

#### BudgetContext State
```javascript
{
  transactions: [],
  filters: {
    startDate: null,
    endDate: null,
    category: 'all',
    type: 'all'
  },
  addTransaction: (transaction) => {},
  updateTransaction: (id, updates) => {},
  deleteTransaction: (id) => {},
  setFilters: (filters) => {}
}
```

### Key Algorithms

#### Summary Calculations
```javascript
// Calculate totals from filtered transactions
const calculateSummary = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    balance: income - expenses
  };
};
```

#### Category Breakdown
```javascript
// Group expenses by category for pie chart
const getCategoryBreakdown = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  return expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
};
```

### UI/UX Design Decisions

#### Color Scheme
- Primary: Blue (#3B82F6)
- Success/Income: Green (#10B981)
- Danger/Expense: Red (#EF4444)
- Neutral: Gray scale

#### Layout
- Single-page application
- Top: Summary cards (Income, Expenses, Balance)
- Middle: Charts (Pie chart + Trend chart)
- Bottom: Transaction form + Transaction list
- Sidebar: Filters

---

## Phase 4: IMPLEMENTATION

### Development Phases

#### Phase 4.1: Project Setup
- [ ] Initialize Vite React project
- [ ] Install dependencies (Tailwind, Chart.js, date-fns)
- [ ] Configure Tailwind CSS
- [ ] Set up project structure
- [ ] Create initial components

#### Phase 4.2: Core Functionality
- [ ] Implement BudgetContext with localStorage
- [ ] Build TransactionForm component
- [ ] Build TransactionList component
- [ ] Implement CRUD operations
- [ ] Add form validation

#### Phase 4.3: Data Visualization
- [ ] Create Summary component
- [ ] Implement pie chart for category breakdown
- [ ] Implement line/bar chart for trends
- [ ] Add responsive chart sizing

#### Phase 4.4: Filtering & Enhancement
- [ ] Build FilterBar component
- [ ] Implement date range filtering
- [ ] Implement category filtering
- [ ] Add transaction search

#### Phase 4.5: Polish & Testing
- [ ] Responsive design improvements
- [ ] Error handling
- [ ] Loading states
- [ ] Data validation
- [ ] Cross-browser testing

#### Phase 4.6: Optional AI Features
- [ ] Implement budget suggestions algorithm
- [ ] Add spending alerts
- [ ] Create insights dashboard

### Git Commit Strategy
- Commit after each major feature
- Use conventional commits (feat:, fix:, docs:, style:, refactor:)
- Each BMAD phase gets its own commit
- Tag releases (v1.0.0, etc.)

---

## Success Criteria

- ✅ All core features implemented and working
- ✅ Data persists in localStorage
- ✅ Charts display correctly
- ✅ Responsive design works on mobile and desktop
- ✅ Code is clean and well-documented
- ✅ Git history shows clear progression
- ✅ README provides clear setup instructions
- ✅ summary.md documents AI usage
