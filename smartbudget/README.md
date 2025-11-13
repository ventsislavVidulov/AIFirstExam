# SmartBudget - Personal Finance Manager

**AI-First Development Demo Project**

A modern, responsive personal finance tracking application built with React 19 and Material-UI, demonstrating the BMAD (BMad AI-First Development) methodology.

[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/MUI-7.3.5-007FFF)](https://mui.com/)
[![Tests](https://img.shields.io/badge/Tests-85_passing-success)](package.json)
[![Security](https://img.shields.io/badge/Vulnerabilities-0-success)](package.json)

---

## 📋 Overview

SmartBudget is a client-side personal finance manager that provides instant visual clarity of your financial status. Built entirely in the browser with no backend required, your data stays private and secure in your browser's localStorage.

**Key Features:**
- ✅ Real-time transaction tracking (income & expenses)
- ✅ Visual analytics with charts (Pie & Bar)
- ✅ Category-based organization
- ✅ Date range filtering
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/light mode support
- ✅ 100% client-side (no backend needed)
- ✅ Privacy-first (localStorage only)
- ✅ Comprehensive test suite (85 tests)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd AIFirstExam/smartbudget

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173/**

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint

# Testing
npm test             # Run tests in watch mode
npm run test:ui      # Launch Vitest UI dashboard
npm run test:coverage # Generate coverage report
```

---

## 🧪 Testing

SmartBudget includes a comprehensive test suite with **85 passing tests** covering critical functionality:

### Test Coverage

- **utils/calculations.test.js** (41 tests)
  - Financial calculations (income, expenses, balance)
  - Category breakdown and grouping
  - Transaction filtering and sorting
  - Edge cases (empty arrays, decimals, string amounts)

- **context/BudgetContext.test.jsx** (16 tests)
  - CRUD operations (add, update, delete)
  - Filter management (update, clear)
  - localStorage integration (mocked)
  - Context provider behavior

- **components/TransactionForm.test.jsx** (28 tests)
  - Form rendering and validation
  - User interactions (typing, clicking, toggling)
  - Accessibility (ARIA attributes, labels)
  - MUI component integration

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Results:**
```
Test Files  3 passed (3)
Tests      85 passed (85)
Duration   ~7-10 seconds
```

---

## 🏗️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI framework with hooks |
| **Vite** | 7.1.7 | Build tool and dev server |
| **Material-UI** | 7.3.5 | Component library and design system |
| **Chart.js** | 4.5.1 | Data visualization |
| **date-fns** | 4.1.0 | Date manipulation |
| **@uidotdev/usehooks** | 2.4.1 | localStorage hook (eliminates race conditions) |

### Testing Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vitest** | 4.0.8 | Test runner (Vite-native) |
| **@testing-library/react** | 16.3.0 | Component testing |
| **@testing-library/jest-dom** | 6.9.1 | Extended matchers |
| **@testing-library/user-event** | 14.6.1 | User interaction simulation |
| **jsdom** | 27.2.0 | DOM environment for tests |

### Development Tools

- ESLint 9.36.0 - Code linting
- @vitejs/plugin-react 5.0.4 - React fast refresh
- Hot Module Replacement (HMR) - Instant updates

---

## 📁 Project Structure

```
smartbudget/
├── src/
│   ├── components/          # React UI components
│   │   ├── Charts.jsx       # Pie & Bar charts
│   │   ├── FilterControls.jsx # Date/type/category filters
│   │   ├── Summary.jsx      # Financial summary cards
│   │   ├── TransactionForm.jsx # Add transaction form
│   │   ├── TransactionList.jsx # Transaction table
│   │   └── *.test.jsx       # Component tests
│   ├── context/             # React Context for state
│   │   ├── BudgetContext.jsx # Global state management
│   │   └── *.test.jsx       # Context tests
│   ├── utils/               # Pure utility functions
│   │   ├── calculations.js  # Financial calculations
│   │   ├── constants.js     # App constants
│   │   └── *.test.js        # Utility tests
│   ├── test/                # Test configuration
│   │   └── setup.js         # Vitest setup
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React DOM entry point
│   ├── App.css              # Global styles (minimal)
│   └── index.css            # CSS reset and base styles
├── public/                  # Static assets
├── docs/                    # Project documentation (in parent dir)
├── vite.config.js           # Vite configuration + test config
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

---

## 🎨 Features in Detail

### 1. Transaction Management
- Add income and expense transactions
- Edit existing transactions
- Delete transactions with confirmation
- Categorization (pre-defined categories)
- Description field (optional, max 200 chars)
- Date selection (no future dates)

### 2. Financial Summary
Real-time calculation and display of:
- **Total Income** (green card with trending up icon)
- **Total Expenses** (red card with trending down icon)
- **Balance** (blue card, color changes based on positive/negative)

### 3. Data Visualization
- **Pie Chart:** Expense breakdown by category
- **Bar Chart:** Income vs. Expenses comparison
- Responsive charts that update in real-time
- Color-coded for easy interpretation

### 4. Filtering & Search
- Date range filter (start date, end date)
- Transaction type filter (income, expense, all)
- Category filter (specific category or all)
- Clear all filters button
- Active filter indicators

### 5. Responsive Design
- **Mobile (< 600px):** Single column, modal transaction form
- **Tablet (600px - 960px):** Two column layout
- **Desktop (> 960px):** Full three column layout
- Touch-friendly buttons and inputs
- Optimized table with horizontal scroll on mobile

### 6. Data Persistence
- Automatic save to localStorage
- Instant load on page refresh
- No backend required
- Privacy-first (data never leaves your browser)

---

## 🏛️ Architecture

SmartBudget follows a clean, maintainable architecture:

### State Management
- **React Context API** for global state
- **useLocalStorage hook** from @uidotdev/usehooks
- Eliminates useState + useEffect race conditions
- Automatic localStorage synchronization

### Component Hierarchy
```
App (ThemeProvider + BudgetProvider)
├── AppBar (Logo + Title)
├── Container (Centered, responsive)
│   ├── Summary (3 financial cards)
│   ├── FilterControls (Date/type/category)
│   ├── TransactionForm (Add/edit transactions)
│   ├── TransactionList (Table with actions)
│   ├── Charts (Pie + Bar)
│   └── Footer (Credits)
```

### Data Flow
```
User Input → TransactionForm → BudgetContext (add/update/delete)
                                      ↓
                              localStorage (automatic sync)
                                      ↓
                          BudgetContext → Filtered Transactions
                                      ↓
                        ├─> Summary (calculations)
                        ├─> TransactionList (display)
                        ├─> Charts (visualization)
                        └─> FilterControls (active filters)
```

For complete architecture details, see [../docs/architecture.md](../docs/architecture.md)

---

## 🔒 Security

- **0 vulnerabilities** in dependencies (verified with `npm audit`)
- No XSS risks (React's built-in protection)
- No SQL injection (no database)
- localStorage is domain-scoped
- Input validation on all forms
- No external API calls
- Client-side only (no server-side code)

**Security Audit:**
```bash
npm audit
# Result: 0 vulnerabilities
```

---

## 📖 BMAD Methodology

This project was developed using the **BMAD (BMad AI-First Development) Methodology**, which emphasizes:

1. **Product Brief** → Define vision and goals
2. **PRD (Product Requirements Document)** → Detailed requirements
3. **Architecture** → Technical design and decisions
4. **Epic Breakdown** → User stories organized in epics
5. **Implementation** → Code development with AI assistance
6. **Testing** → Comprehensive test coverage
7. **Documentation** → Complete project documentation

### Documentation

All BMAD documentation is located in `../docs/`:
- [Product Brief](../docs/product-brief-smartbudget-20251109-004158.md)
- [PRD](../docs/PRD/) - 9 sharded files
- [Architecture](../docs/architecture.md)
- [Epic Breakdown](../docs/epics/) - 5 epics with 17 stories
- [Code Review](../docs/code-review-2025-11-12.md)

---

## 🎯 Development Journey

### Git History

```
e887b52 - test: Add comprehensive test suite (85 tests)
82be872 - docs: Code review and cleanup
d0f866b - fix: Center main content (CSS fixes)
e1c5931 - fix: localStorage persistence with useLocalStorage hook
7693437 - docs: Add React best practices
a6cae62 - docs: Final session documentation
06b28b7 - feat: Responsive design complete
5a53639 - fix: Priority 2 UX improvements
e6336fa - fix: Priority 1 violations
b84e6fa - docs: Update README with epic breakdown
f0cbf7f - docs: Complete epic breakdown
```

### Key Milestones

1. **Project Setup** - Vite + React + MUI initialization
2. **Transaction Management** - CRUD operations with Context API
3. **Financial Summaries** - Real-time calculations
4. **Data Visualization** - Chart.js integration
5. **Filtering & UX Polish** - Date range, category filters
6. **Bug Fixes** - localStorage race condition, centering issues
7. **Testing** - Comprehensive test suite (85 tests)
8. **Code Review** - Senior developer review
9. **Documentation** - Complete BMAD docs

---

## 🐛 Known Limitations

- localStorage has ~5-10MB limit (sufficient for personal use)
- No data export/import functionality (future enhancement)
- No multi-currency support (single currency only)
- No recurring transactions (all manual)
- No budgeting/goals feature (tracking only)

---

## 🔮 Future Enhancements

Potential future improvements (not in current scope):

- [ ] Data export (CSV, JSON)
- [ ] Data import from bank statements
- [ ] Recurring transactions
- [ ] Budget goals and alerts
- [ ] Multi-currency support
- [ ] PWA support (offline mode)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Receipt photo upload
- [ ] Advanced analytics (trends, forecasts)
- [ ] E2E tests with Playwright

---

## 📜 License

This is an educational project developed for an AI-First Development exam. All rights reserved.

---

## 👤 Author

**Ventsi**
- Project: AI-First Development Exam (AIFirstExam)
- Methodology: BMAD (BMad AI-First Development)
- Date: November 2025

---

## 🙏 Acknowledgments

- **Claude Code** - AI-assisted development
- **BMAD Framework** - Structured development methodology
- **React Team** - Excellent framework and documentation
- **Material-UI** - Beautiful component library
- **Vite** - Fast and modern build tool

---

## 📞 Support

For questions or issues:
1. Review the [Architecture Documentation](../docs/architecture.md)
2. Check the [Epic Breakdown](../docs/epics/)
3. Review [Code Review Notes](../docs/code-review-2025-11-12.md)

---

**Built with ❤️ using AI-First Development | BMAD Methodology**
