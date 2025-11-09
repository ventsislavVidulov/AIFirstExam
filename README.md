# SmartBudget - Personal Finance Manager

A web-based personal finance management application built using the BMAD (Breakthrough Method for Agile Development) methodology with AI-assisted development.

## Project Overview

SmartBudget helps users track income and expenses, categorize transactions, and visualize spending patterns through interactive charts. This project demonstrates the application of structured agile development methodologies combined with AI-powered coding assistance.

## Features

✅ **Transaction Management**
- Add income and expense records with amount, category, date, and description
- Delete transactions with confirmation
- View all transactions in an organized list

✅ **Categorization**
- Predefined categories for income (Salary, Freelance, Investment, Gift, Other)
- Predefined categories for expenses (Rent, Transport, Food, Entertainment, Utilities, Healthcare, Shopping, Other)

✅ **Financial Summary**
- Real-time calculation of total income, total expenses, and balance
- Visual cards with color-coded indicators

✅ **Data Visualization**
- Pie chart showing expense distribution by category
- Bar chart comparing income vs expenses
- Responsive charts that adapt to screen size

✅ **Data Persistence**
- Automatic saving to browser localStorage
- Data persists across sessions

✅ **Responsive Design**
- Mobile-friendly interface
- Adapts to different screen sizes

## Technology Stack

### Frontend
- **React 18+** - Component-based UI framework
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Professional React component library
- **Chart.js** - Data visualization library
- **react-chartjs-2** - React wrapper for Chart.js
- **date-fns** - Modern date manipulation library

### State Management
- **React Context API** - Global state management
- **LocalStorage API** - Client-side data persistence

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **Claude Code** - AI-assisted development
- **BMAD v6.0.0-alpha** - Methodology framework

## Project Structure

```
AIFirstExam/
├── bmad/                      # BMAD methodology files
├── docs/                      # Project documentation
│   ├── PRD/                   # Product Requirements Document (9 files)
│   └── product-brief-*.md     # Product Brief document
├── smartbudget/               # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Charts.jsx
│   │   │   ├── Summary.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── context/           # React Context
│   │   │   └── BudgetContext.jsx
│   │   ├── utils/             # Utility functions
│   │   │   ├── calculations.js
│   │   │   ├── constants.js
│   │   │   └── storage.js
│   │   ├── App.jsx            # Main application component
│   │   └── main.jsx           # Application entry point
│   └── package.json           # Dependencies
├── BMAD.md                    # BMAD methodology documentation
├── customSettings.md          # AI security guidelines
├── prompts.md                 # Complete AI interaction history
├── summary.md                 # Project summary and AI usage
└── README.md                  # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AIFirstExam
   ```

2. **Navigate to the application directory**
   ```bash
   cd smartbudget
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The application should load automatically

### Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### Running the Production Build

```bash
npm run preview
```

## Usage Guide

### Adding a Transaction

1. Select transaction type (Income or Expense) using the toggle button
2. Enter the amount (must be greater than 0)
3. Select a category from the dropdown
4. Choose the transaction date
5. Optionally add a description
6. Click "Add Income" or "Add Expense" button

### Viewing Transactions

- All transactions are displayed in the table on the right
- Transactions show: Date, Description, Category, Amount, Type
- Most recent transactions appear first

### Deleting a Transaction

- Click the delete (trash) icon next to any transaction
- Confirm the deletion in the popup dialog

### Understanding Your Finances

- **Summary Cards** at the top show:
  - Total Income (green)
  - Total Expenses (red)
  - Balance (green if positive, red if negative)

- **Charts** section displays:
  - Pie chart: Breakdown of expenses by category
  - Bar chart: Comparison of total income vs total expenses

## BMAD Methodology Application

This project follows the four phases of BMAD:

### Phase 1: Analysis
- Defined user stories and requirements
- Identified functional and non-functional requirements
- Analyzed technical constraints

### Phase 2: Planning
- Selected technology stack (React, MUI, Chart.js)
- Designed component architecture
- Planned project structure

### Phase 3: Solutioning
- Designed data models (Transaction schema)
- Defined algorithms (calculations, filtering)
- Created UI/UX design decisions

### Phase 4: Implementation
- Built core utilities and state management
- Developed UI components with MUI
- Integrated Chart.js visualizations
- Tested and refined the application

Complete methodology documentation available in [BMAD.md](BMAD.md)

## Security Considerations

This project implements security best practices:

✅ All dependencies checked for vulnerabilities before installation
✅ npm audit shows 0 vulnerabilities
✅ Security guidelines documented in [customSettings.md](customSettings.md)
✅ Chart.js 4.x used (safe from CVE-2020-7746)
✅ No external API calls or data transmission
✅ Data stored locally on user's device only

## Documentation

- **[BMAD.md](BMAD.md)** - Complete BMAD methodology documentation covering all 4 phases
- **[docs/PRD/](docs/PRD/)** - **Comprehensive Product Requirements Document (PRD)**
  - 9 organized documents (~16,700 words)
  - Vision alignment, success criteria, scope definition
  - 20 functional requirements + 18 non-functional requirements
  - UX principles, project specifications, and executive summary
  - Created retrospectively using BMAD PRD workflow for educational purposes
- **[prompts.md](prompts.md)** - Chronological record of all AI interactions (29 prompts)
- **[summary.md](summary.md)** - Project summary and AI usage analysis
- **[customSettings.md](customSettings.md)** - AI security guidelines and rules
- **[docs/product-brief-*.md](docs/)** - Initial product requirements and vision

## Git Workflow

Clear commit history showing progression through BMAD phases:
- Conventional commit messages (feat:, docs:, fix:)
- Each phase documented with commits
- Clean Git history for evaluation

View commit history:
```bash
git log --oneline
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## Known Limitations

- Data stored only in browser localStorage (not synced across devices)
- No user authentication or multi-user support
- No data export functionality
- No recurring transaction automation
- No budget goals or alerts

These are intentional limitations for the MVP scope. See Product Brief for future enhancements.

## Project Team

- **Developer**: Ventsi
- **AI Assistant**: Claude Code (Anthropic)
- **Methodology**: BMAD v6.0.0-alpha (BMM module)

## Academic Context

This project was developed as part of an AI-First Development examination to demonstrate:
1. Application of BMAD methodology
2. Effective use of AI-assisted development tools
3. Professional software development practices
4. Clean code and comprehensive documentation

## License

Educational project - Created for academic evaluation purposes.

## Acknowledgments

- BMAD methodology by BMad framework
- Material-UI for the excellent component library
- Chart.js for powerful visualization capabilities
- Claude Code for AI-assisted development

---

**Built with ❤️ using BMAD Methodology and AI-First Development**
