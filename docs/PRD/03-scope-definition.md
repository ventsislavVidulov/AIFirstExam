# Scope Definition

[← Back: Success Definition](02-success-definition.md) | [Index](index.md) | [Next: Project Requirements →](04-project-requirements.md)

---

## Scoping Philosophy

SmartBudget follows a disciplined **MVP-first approach**. The goal is to find the sweet spot between:
- **Too Little:** Won't prove the concept or deliver value
- **Just Right:** Core value delivered, feedback enables iteration
- **Too Much:** Delays launch, wastes effort on unvalidated features

---

## MVP Scope (Phase 1) ✅ COMPLETED

### What Must Work for This to Be Useful?

The MVP must enable users to **track transactions and visualize spending patterns** with zero friction.

### Core Features

#### 1. Transaction Management
**Status:** ✅ Implemented

**Capabilities:**
- **Add** new income/expense transactions
- **Edit** existing transactions to correct mistakes
- **Delete** unwanted transactions
- **View** all transactions in chronological list

**Transaction Data Model:**
- `id` - Unique identifier
- `amount` - Numeric value (positive)
- `category` - Predefined category selection
- `date` - Transaction date
- `description` - Optional text notes
- `type` - Income or Expense
- `createdAt` - Timestamp for sorting

**Why MVP:** Without reliable transaction CRUD, nothing else matters. This is foundational.

---

#### 2. Transaction Categorization
**Status:** ✅ Implemented

**Income Categories:**
- Salary
- Freelance
- Investment
- Gift
- Other

**Expense Categories:**
- Rent
- Transport
- Food
- Entertainment
- Utilities
- Healthcare
- Shopping
- Other

**Category Rules:**
- Fixed predefined list (no custom categories in MVP)
- Every transaction must have exactly one category
- Categories are type-specific (income vs expense)
- "Other" provides flexibility without complexity

**Why MVP:** Categories enable meaningful analysis. Predefined list keeps complexity low while covering 90%+ of use cases.

---

#### 3. Financial Summaries
**Status:** ✅ Implemented

**Summary Cards:**

1. **Total Income Card**
   - Sum of all income transactions
   - Green color coding (positive)
   - Trending up icon
   - Real-time calculation

2. **Total Expenses Card**
   - Sum of all expense transactions
   - Red color coding (negative)
   - Trending down icon
   - Real-time calculation

3. **Balance Card**
   - Income minus expenses
   - Dynamic color (green if positive, red if negative)
   - Wallet icon
   - Prominent placement

**Update Behavior:**
- Recalculate immediately when transactions added/edited/deleted
- No refresh button needed
- Smooth UI updates (no jarring reloads)

**Why MVP:** These three numbers answer the core question: "Where do I stand financially?" Must be instant and accurate.

---

#### 4. Data Visualization
**Status:** ✅ Implemented

**Charts Provided:**

**Pie Chart: Expense Distribution**
- Shows percentage breakdown by category
- Only displays expense transactions
- Color-coded slices (8 distinct colors)
- Legend identifies each category
- Interactive hover shows exact amounts
- Empty state: "No expense data to display"

**Bar Chart: Income vs Expenses**
- Compares total income to total expenses
- Two bars side-by-side
- Green for income, red for expenses
- Y-axis shows currency amounts
- Highlights net position visually
- Empty state: "No transactions to display"

**Chart Technology:**
- Chart.js 4.x (secure, no CVE-2020-7746)
- react-chartjs-2 wrapper
- Responsive sizing
- Accessible color palette

**Why MVP:** Visual representation creates the "aha moment." Charts make patterns immediately obvious that numbers alone hide.

---

#### 5. Filtering and Analysis
**Status:** ✅ Implemented

**Filter Capabilities:**

1. **Date Range Filter**
   - Start date (inclusive)
   - End date (inclusive)
   - Defaults to "all time"
   - Updates transactions list, summaries, AND charts

2. **Category Filter**
   - Dropdown with all categories
   - "All Categories" default
   - Filters transactions list only
   - Maintains type specificity

3. **Type Filter**
   - Income only
   - Expenses only
   - Both (default)
   - Affects all views

**Filter Behavior:**
- Filters apply immediately (no "apply" button)
- Multiple filters work together (AND logic)
- Clear filters button restores defaults
- Filtered data updates all UI elements consistently

**Why MVP:** Users need to answer specific questions: "How much did I spend on food last month?" Filtering enables focused analysis.

---

#### 6. Data Persistence
**Status:** ✅ Implemented

**Storage Mechanism:**
- Browser localStorage API
- JSON serialization
- Automatic save on every change
- Automatic load on app start

**Storage Strategy:**
- Single storage key: `smartbudget_transactions`
- Array of transaction objects
- Client-side only (no server)
- Privacy-first (data never leaves device)

**Reliability:**
- Error handling for storage failures
- Console logging for debugging
- Graceful degradation if localStorage unavailable

**Limitations (Acknowledged):**
- Data lost if browser cache cleared
- No cross-device sync
- No backup mechanism
- 5-10 MB storage limit (sufficient for thousands of transactions)

**Why MVP:** Without persistence, app is unusable. localStorage provides immediate solution with zero infrastructure.

---

### MVP Success Checklist

✅ Users can add, edit, delete transactions without errors
✅ Transactions correctly categorized
✅ Summary cards calculate accurately in real-time
✅ Charts display correct data and update live
✅ Filters work predictably and update all views
✅ Data persists across browser sessions
✅ Responsive design works on mobile and desktop
✅ Zero high/critical security vulnerabilities
✅ Clean, documented, maintainable code

**MVP Status:** ✅ **ALL CRITERIA MET**

---

## Growth Features (Phase 2)

### What Makes It Competitive?

Features that elevate SmartBudget from "functional" to "delightful" and "powerful."

**NOT in current implementation, but planned for future:**

#### 1. Budget Goal Setting
**User Value:** Proactive spending management vs reactive tracking

**Capabilities:**
- Set monthly budget limits per category
- Progress bars showing % of budget used
- Color-coded warnings (yellow at 75%, red at 90%)
- Alerts when approaching or exceeding limits
- Historical goal tracking

**Why Growth:** MVP proves core tracking works. Budget goals add proactive control layer.

---

#### 2. Spending Insights & Alerts
**User Value:** Automatic pattern detection and recommendations

**Capabilities:**
- "You spent 40% more on dining this month"
- "Your entertainment spending is trending up"
- Weekly spending summary notifications
- Identify unusual or recurring transactions
- Month-over-month comparisons

**Why Growth:** Moves from passive dashboard to active financial assistant.

---

#### 3. Export Functionality
**User Value:** Data portability and external analysis

**Capabilities:**
- Export to CSV (Excel-compatible)
- Export to PDF (printable summary)
- Date range selection for exports
- Include/exclude categories
- Formatted for accounting software

**Why Growth:** Power users need data mobility. CSV enables backup strategy.

---

#### 4. Dark Mode Theme
**User Value:** Accessibility and preference accommodation

**Capabilities:**
- Toggle between light/dark themes
- System preference detection
- Persistent theme selection
- All components dark-mode compatible
- WCAG contrast compliance

**Why Growth:** Quality-of-life improvement for significant user segment.

---

#### 5. Recurring Transaction Templates
**User Value:** Reduce repetitive entry for fixed expenses

**Capabilities:**
- Save transaction as template
- One-click add from template list
- Edit template without affecting history
- Common templates: Rent, Salary, Subscriptions

**Why Growth:** Reduces friction for predictable transactions (rent, salary, Netflix, etc.).

---

#### 6. Advanced Filtering
**User Value:** Deeper analysis for power users

**Capabilities:**
- Search by description text
- Amount range filters (e.g., "show transactions > $100")
- Multiple category selection
- Saved filter presets
- Filter by day of week or time of month

**Why Growth:** MVP filtering covers 80% of needs. Advanced filtering serves the remaining 20%.

---

## Vision Features (Phase 3)

### What's the Dream Version?

Features that transform SmartBudget into a comprehensive personal finance platform.

**Long-term possibilities, not planned for near-term:**

#### 1. Bank Account Integration
**User Value:** Automatic transaction import eliminates manual entry

**Capabilities:**
- Connect to bank accounts via Plaid API
- Automatic transaction sync
- Smart categorization with ML
- Reconciliation tools
- Multi-account aggregation

**Why Vision:** Massive technical complexity (security, compliance, API costs). Requires fintech-level infrastructure.

---

#### 2. Multi-User & Household Budgets
**User Value:** Collaborative financial management

**Capabilities:**
- Shared budgets for couples/families
- Permission levels (view-only, editor, admin)
- Individual and shared transaction views
- Split transaction support
- Activity history and audit logs

**Why Vision:** Requires authentication system, backend, and database. Significant architecture change.

---

#### 3. AI-Powered Financial Advisor
**User Value:** Personalized recommendations and predictions

**Capabilities:**
- Spending pattern analysis with ML
- Budget recommendations based on behavior
- Predictive alerts ("You're on track to overspend this month")
- Savings opportunity detection
- Financial goal planning

**Why Vision:** Requires AI/ML infrastructure, training data, and ongoing model maintenance.

---

#### 4. Receipt Scanning & OCR
**User Value:** Even faster transaction entry from photos

**Capabilities:**
- Mobile camera integration
- OCR text extraction
- Auto-populate amount, date, merchant
- Attached receipt images
- Expense reporting features

**Why Vision:** Requires mobile apps, image processing, OCR services. Complex technical stack.

---

#### 5. Investment Tracking
**User Value:** Complete financial picture including portfolio

**Capabilities:**
- Link brokerage accounts
- Real-time stock/crypto prices
- Portfolio performance charts
- Asset allocation visualization
- Capital gains tracking

**Why Vision:** Completely different domain (investment management). Separate product territory.

---

#### 6. Bill Payment & Reminders
**User Value:** Financial management hub, not just tracking

**Capabilities:**
- Upcoming bill notifications
- Payment scheduling
- Autopay integration
- Bill negotiation suggestions
- Subscription management

**Why Vision:** Requires payment processing, vendor integrations, and fintech compliance.

---

## Scope Discipline

### What We're Saying NO To (For Now)

**Features explicitly deferred:**

❌ **Custom Categories** - Predefined list covers 90%+ of cases, customization adds complexity
❌ **Multi-Currency** - Target users operate in single currency
❌ **Tax Preparation** - Different problem domain, requires accounting expertise
❌ **Shared Budgets** - Requires authentication and backend
❌ **Mobile Apps** - Progressive Web App on mobile browser sufficient for MVP
❌ **Automation/Rules** - "Auto-categorize Starbucks as Coffee" is growth feature
❌ **Bank Sync** - Huge complexity, deferred to vision phase
❌ **Gamification** - Badges/achievements not core value prop
❌ **Social Features** - Sharing budgets/achievements adds complexity without clear value

**Why Say No:**
- Focus limited resources on core value proposition
- Avoid scope creep that delays MVP launch
- Validate core concept before adding layers
- Maintain code simplicity and maintainability

---

## Scope Validation

### Has Scope Creep Occurred?

**Scope Review Questions:**

1. **Is it essential for MVP?** If no → defer
2. **Does it prove the core concept?** If no → defer
3. **Can we launch without it?** If yes → defer
4. **Does it add significant complexity?** If yes → defer
5. **Is it a "nice-to-have"?** If yes → defer

**Current Implementation vs Planned MVP:**

✅ **In scope and delivered:**
- All 6 MVP core features
- Clean code and documentation
- Security best practices
- Responsive design

❌ **Out of scope (correctly deferred):**
- No features beyond MVP implemented
- No scope creep detected
- Disciplined adherence to MVP definition

---

## Roadmap Visualization

```
MVP (Phase 1) ✅ COMPLETED
└── Transaction CRUD
└── Categorization
└── Financial Summaries
└── Charts & Visualization
└── Filtering
└── Data Persistence

    ↓ Validate & Get Feedback

Growth (Phase 2) 🎯 NEXT
└── Budget Goals
└── Spending Insights
└── Export (CSV/PDF)
└── Dark Mode
└── Recurring Templates
└── Advanced Filtering

    ↓ Expand User Base

Vision (Phase 3) 🌟 FUTURE
└── Bank Integration
└── Multi-User Support
└── AI Financial Advisor
└── Receipt Scanning
└── Investment Tracking
└── Bill Payment
```

---

[← Back: Success Definition](02-success-definition.md) | [Index](index.md) | [Next: Project Requirements →](04-project-requirements.md)
