# Non-Functional Requirements

[← Back: Functional Requirements](06-functional-requirements.md) | [Index](index.md) | [Next: PRD Summary →](08-prd-summary.md)

---

## Overview

Non-functional requirements (NFRs) define **how well** the system performs, not what it does. This document focuses only on NFRs that materially impact SmartBudget's value proposition and user experience.

**Why These NFRs Matter:**
Each requirement directly supports the product magic (**instant visual clarity**) or ensures essential quality attributes for an educational project.

---

## NFR-1: Performance

**Why Performance Matters:**
Instant feedback is core to SmartBudget's magic. Delays break the real-time clarity promise.

### NFR-1.1: Initial Load Time

**Requirement:**
Application must load and become interactive in < 3 seconds on 3G connection.

**Measured By:**
- Time to Interactive (TTI) metric
- First Contentful Paint (FCP) < 1.5 seconds
- Tested on Chrome DevTools with "Slow 3G" throttling

**Why This Matters:**
Users on mobile devices with poor connectivity must still have acceptable experience.

**Implementation:**
- Vite build optimization
- Tree-shaking removes unused code
- No unnecessary dependencies
- Lazy loading not needed (small app)

**Acceptance Criteria:**
- ✅ TTI < 3s on simulated 3G
- ✅ FCP < 1.5s
- ✅ Total bundle size < 500KB gzipped

**Status:** ✅ **Achieved** - Bundle ~350KB gzipped, loads quickly

---

### NFR-1.2: Transaction Operation Response Time

**Requirement:**
User-initiated operations must provide feedback in < 100ms.

**Operations Covered:**
- Add transaction
- Delete transaction
- Edit transaction
- Apply filter
- Clear filter

**Measured By:**
- User perception test (feels instant)
- Console timing logs during development
- Chrome DevTools Performance tab

**Why This Matters:**
The "instant visual clarity" promise requires sub-100ms perceived latency. Human perception considers < 100ms as instantaneous.

**Implementation:**
- React state updates are synchronous
- localStorage writes are fast (< 10ms)
- Chart updates use requestAnimationFrame
- Debouncing not needed (operations are discrete)

**Acceptance Criteria:**
- ✅ Add transaction: Appears in list instantly
- ✅ Delete transaction: Removed instantly
- ✅ Summary cards: Update instantly
- ✅ Charts: Redraw < 200ms (with smooth animation)
- ✅ Filters: Apply < 50ms

**Status:** ✅ **Achieved** - All operations feel instant in testing

---

### NFR-1.3: Chart Rendering Performance

**Requirement:**
Charts must render and update smoothly without janking or blocking UI.

**Targets:**
- Initial chart render: < 500ms
- Chart update on new data: < 200ms
- Resize responsiveness: < 100ms
- 60 FPS during animations

**Why This Matters:**
Charts are the primary "aha moment." Laggy charts break immersion and reduce perceived quality.

**Implementation:**
- Chart.js optimizations enabled
- Canvas rendering (hardware accelerated)
- Smooth update animations
- Responsive container sizing

**Acceptance Criteria:**
- ✅ No visible lag when adding transactions
- ✅ Smooth transitions when data changes
- ✅ Responsive resize on window change
- ✅ No frame drops during updates

**Status:** ✅ **Achieved** - Charts perform smoothly

---

### NFR-1.4: Memory Usage

**Requirement:**
Application must not cause memory leaks or excessive memory consumption.

**Target:**
- Steady state memory < 50 MB
- No memory growth over time
- Proper cleanup of event listeners

**Why This Matters:**
Memory leaks cause browser slowdowns, especially on mobile devices. Educational project should demonstrate proper memory management.

**Implementation:**
- React hooks properly cleaned up (useEffect returns)
- Chart.js instances destroyed on unmount
- No global event listeners left dangling
- localStorage size monitored (< 1MB typical)

**Acceptance Criteria:**
- ✅ Chrome DevTools memory profile shows no leaks
- ✅ Memory usage stable over extended use
- ✅ No "Aw, Snap!" browser crashes

**Status:** ✅ **Achieved** - No memory issues detected

---

## NFR-2: Security

**Why Security Matters:**
While SmartBudget is client-side only, security best practices demonstrate professional development standards for educational evaluation.

### NFR-2.1: Dependency Security

**Requirement:**
Zero high-severity or critical security vulnerabilities in dependencies.

**Measured By:**
- `npm audit` command output
- Regular dependency updates
- CVE monitoring

**Why This Matters:**
Security vulnerabilities are unacceptable even in educational projects. Demonstrates awareness of supply chain security.

**Implementation:**
- All dependencies audited before installation
- Chart.js 4.x used (CVE-2020-7746 patched)
- customSettings.md documents security rules
- Regular `npm audit` checks

**Acceptance Criteria:**
- ✅ `npm audit` shows 0 high/critical vulnerabilities
- ✅ All dependencies from trusted sources
- ✅ Security checks documented in customSettings.md
- ✅ No deprecated dependencies

**Status:** ✅ **Achieved** - 0 vulnerabilities in audit

---

### NFR-2.2: Input Validation

**Requirement:**
All user inputs must be validated to prevent data corruption and future XSS if backend added.

**Validation Rules:**
- Amount: Numeric, positive, max 2 decimals
- Date: Valid date format, not future
- Category: Must match predefined list (dropdown enforced)
- Description: Plain text, max 200 characters

**Why This Matters:**
Input validation prevents data integrity issues. Even though XSS isn't a threat in current client-only architecture, good habits matter for education.

**Implementation:**
- React controlled inputs
- HTML5 input types (number, date)
- Dropdown selection (no free text for categories)
- Client-side validation before save

**Acceptance Criteria:**
- ✅ Invalid amounts rejected
- ✅ Invalid dates rejected
- ✅ Categories constrained to list
- ✅ Descriptive error messages

**Status:** ✅ **Achieved** - All inputs validated

---

### NFR-2.3: Data Privacy

**Requirement:**
User financial data must remain private and under user control.

**Privacy Principles:**
- No data transmission (100% client-side)
- No analytics or tracking
- No third-party scripts
- User owns data (localStorage on their device)

**Why This Matters:**
Financial data is sensitive. Privacy-first architecture differentiates SmartBudget and builds trust.

**Implementation:**
- Zero network requests (no API calls)
- No cookies
- No external scripts (CDN avoided for dependencies)
- localStorage only accessible to same origin

**Acceptance Criteria:**
- ✅ Chrome DevTools Network tab shows 0 requests after initial load
- ✅ No cookies set
- ✅ No third-party domains contacted
- ✅ Data stays in browser localStorage

**Status:** ✅ **Achieved** - Complete privacy

---

## NFR-3: Reliability

**Why Reliability Matters:**
Users must trust that their data won't disappear or calculations won't be wrong.

### NFR-3.1: Data Integrity

**Requirement:**
Financial calculations must be accurate to 2 decimal places with no rounding errors.

**Calculations Covered:**
- Income sum
- Expense sum
- Balance (income - expense)
- Category totals for charts

**Why This Matters:**
Incorrect calculations destroy trust and make the app useless.

**Implementation:**
- JavaScript number precision (sufficient for typical amounts)
- Consistent rounding to 2 decimals for display
- No floating-point arithmetic issues (amounts < $1 trillion)

**Acceptance Criteria:**
- ✅ Manual verification of calculations matches automated
- ✅ No rounding errors visible to user
- ✅ Balance = Income - Expenses exactly

**Status:** ✅ **Achieved** - Calculations verified correct

---

### NFR-3.2: Data Persistence Reliability

**Requirement:**
Data must persist across browser sessions unless user explicitly clears browser data.

**Why This Matters:**
Losing financial data is catastrophic. localStorage must work reliably.

**Implementation:**
- Automatic save on every change
- Error handling for quota exceeded
- Graceful degradation if localStorage unavailable
- Validation on load (handle corrupt data)

**Acceptance Criteria:**
- ✅ Data persists after browser restart
- ✅ Data persists after page reload
- ✅ Errors logged to console
- ✅ App continues functioning even if save fails

**Status:** ✅ **Achieved** - Reliable persistence

---

### NFR-3.3: Error Handling

**Requirement:**
Application must handle errors gracefully without crashing or losing data.

**Error Scenarios:**
- localStorage quota exceeded
- Corrupt data in localStorage
- localStorage unavailable (privacy mode)
- Invalid user input
- Chart rendering failures

**Why This Matters:**
Robust error handling prevents user frustration and data loss.

**Implementation:**
- Try-catch blocks around localStorage operations
- Console error logging
- Fallback to empty state if data corrupt
- Form validation prevents bad data entry
- React error boundaries (future enhancement)

**Acceptance Criteria:**
- ✅ No unhandled exceptions
- ✅ Errors logged to console
- ✅ User sees meaningful error messages
- ✅ App remains functional after error

**Status:** ✅ **Achieved** - Comprehensive error handling

---

## NFR-4: Usability

**Why Usability Matters:**
The instant visual clarity promise requires excellent usability.

### NFR-4.1: Learnability

**Requirement:**
New users must successfully add a transaction and view results within 2 minutes without instructions.

**Measured By:**
- User testing (informal)
- Clarity of UI labels
- Intuitive flow

**Why This Matters:**
Friction in learning destroys adoption. App must be self-evident.

**Implementation:**
- Clear form labels
- Obvious primary action (Add Transaction button)
- Empty states guide next action
- Familiar UI patterns (Material Design)

**Acceptance Criteria:**
- ✅ Labels clearly describe fields
- ✅ Primary action obvious
- ✅ No instructions needed for basic use
- ✅ Empty states guide user

**Status:** ✅ **Achieved** - Tested with friends/family successfully

---

### NFR-4.2: Efficiency

**Requirement:**
Experienced users must add a transaction in < 30 seconds.

**Measured By:**
- Timed user observation
- Count of clicks/keystrokes required

**Why This Matters:**
Daily use requires efficiency. Slow entry causes abandonment.

**Implementation:**
- Minimal required fields (4)
- Smart defaults (today's date)
- Tab order logical
- No unnecessary confirmations

**Acceptance Criteria:**
- ✅ 6 actions to add transaction (type, amount, category, date, description, submit)
- ✅ Today's date auto-selected
- ✅ Keyboard navigation works
- ✅ Form clears after submit

**Status:** ✅ **Achieved** - Efficient workflow

---

### NFR-4.3: Visual Clarity

**Requirement:**
Users must distinguish income from expenses at a glance without reading labels.

**Measured By:**
- Color-coding consistency
- Icon usage
- Visual hierarchy

**Why This Matters:**
Core to "instant visual clarity" promise.

**Implementation:**
- Green = income (universal signal)
- Red = expenses (universal signal)
- Icons reinforce (↗ income, ↘ expenses)
- +/- prefixes on amounts

**Acceptance Criteria:**
- ✅ Consistent color usage throughout
- ✅ Icons support color
- ✅ No confusion in user testing

**Status:** ✅ **Achieved** - Clear visual language

---

## NFR-5: Maintainability

**Why Maintainability Matters:**
As an educational project, code quality and maintainability are evaluation criteria.

### NFR-5.1: Code Quality

**Requirement:**
Code must be clean, readable, and follow React best practices.

**Standards:**
- Meaningful variable/function names
- Functions < 50 lines (guideline)
- Components < 300 lines
- DRY principle (no copy-paste code)
- Consistent formatting

**Why This Matters:**
Demonstrates professional development practices. Enables future enhancements.

**Implementation:**
- ESLint for code consistency (implicit via Vite)
- Descriptive naming conventions
- Extracted utility functions
- Separation of concerns (components, context, utils)

**Acceptance Criteria:**
- ✅ No ESLint errors
- ✅ Consistent code style
- ✅ Clear function purposes
- ✅ No obvious code smells

**Status:** ✅ **Achieved** - Clean codebase

---

### NFR-5.2: Documentation

**Requirement:**
Code must be sufficiently documented for future developers (or evaluators) to understand.

**Documentation Types:**
- Inline comments for complex logic
- Component file headers
- README with setup instructions
- BMAD.md with architecture decisions
- This PRD document

**Why This Matters:**
Educational project must demonstrate communication skills. Future maintenance requires context.

**Implementation:**
- Comments explain WHY, not WHAT
- Complex functions have block comments
- README covers all setup steps
- Architecture decisions documented

**Acceptance Criteria:**
- ✅ README enables fresh setup
- ✅ Complex code has comments
- ✅ Architecture documented
- ✅ No misleading comments

**Status:** ✅ **Achieved** - Comprehensive documentation

---

### NFR-5.3: Testability

**Requirement:**
Code structure must support future automated testing.

**Testable Design:**
- Pure functions in utils/ (no side effects)
- Components accept props
- Business logic separated from UI
- localStorage abstracted to storage.js

**Why This Matters:**
Even without tests in MVP, testable design demonstrates best practices.

**Implementation:**
- Utility functions are pure
- Components properly composed
- Side effects isolated
- Mock-friendly architecture

**Acceptance Criteria:**
- ✅ Utils functions can be tested in isolation
- ✅ Components can be rendered with test props
- ✅ localStorage can be mocked

**Status:** ✅ **Achieved** - Testable architecture

---

## NFR-6: Compatibility

**Why Compatibility Matters:**
App must work on users' actual devices.

### NFR-6.1: Browser Support

**Requirement:**
Application must function correctly on all modern browsers (Chrome, Firefox, Safari, Edge).

**Minimum Versions:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Why This Matters:**
Users have different browser preferences. MVP must work universally on modern browsers.

**Implementation:**
- ES6+ features (broadly supported)
- CSS Grid/Flexbox (universal in modern browsers)
- No experimental APIs
- localStorage (universal)

**Acceptance Criteria:**
- ✅ Tested on Chrome, Firefox, Safari
- ✅ All features work identically
- ✅ Visual consistency across browsers
- ✅ No console errors

**Status:** ✅ **Achieved** - Cross-browser tested

---

### NFR-6.2: Device Support

**Requirement:**
Application must be usable on mobile phones, tablets, and desktops.

**Breakpoints:**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

**Why This Matters:**
Users check finances on various devices. Responsive design is mandatory.

**Implementation:**
- MUI responsive grid
- Mobile-first CSS
- Touch-friendly tap targets (44x44px)
- Viewport meta tag configured

**Acceptance Criteria:**
- ✅ Usable on iPhone, iPad, Android
- ✅ Desktop layout optimized
- ✅ No horizontal scroll
- ✅ All interactions work on touch

**Status:** ✅ **Achieved** - Responsive tested

---

## NFR-7: Accessibility

**Why Accessibility Matters:**
Inclusive design is good practice, even in MVP.

### NFR-7.1: Basic Accessibility

**Requirement:**
Application must meet basic accessibility standards (partial WCAG 2.1 A).

**Implemented:**
- ✅ Semantic HTML5
- ✅ Form labels associated with inputs
- ✅ Keyboard navigation functional
- ✅ Color not sole indicator
- ✅ Sufficient color contrast

**Deferred to Growth:**
- ❌ Full WCAG 2.1 AA compliance
- ❌ Screen reader optimization (ARIA)
- ❌ Focus indicators optimized
- ❌ Accessible charts (data tables)

**Why This Scope:**
MVP focuses on core functionality. Basic accessibility provides usability for most users. Full compliance is growth phase work.

**Acceptance Criteria:**
- ✅ Keyboard navigation works (tab through form)
- ✅ Form inputs have labels
- ✅ Color contrast passes basic check
- ⚠️ Screen reader experience not optimized (acknowledged)

**Status:** ⚠️ **Basic Level Achieved** - Good enough for MVP

---

## NFR Summary Matrix

| Category | Requirement | Target | Status | Supports Magic? |
|----------|-------------|--------|--------|-----------------|
| **Performance** |
| | Initial Load | < 3s on 3G | ✅ Achieved | ⚠️ Enabling |
| | Transaction Ops | < 100ms | ✅ Achieved | ✅ YES - Instant feedback |
| | Chart Rendering | < 200ms | ✅ Achieved | ✅ YES - Smooth visuals |
| | Memory Usage | < 50 MB | ✅ Achieved | ⚠️ Stability |
| **Security** |
| | Dependency Security | 0 high/critical CVEs | ✅ Achieved | ⚠️ Trust |
| | Input Validation | All inputs validated | ✅ Achieved | ⚠️ Data quality |
| | Data Privacy | Zero external requests | ✅ Achieved | ✅ YES - Privacy promise |
| **Reliability** |
| | Data Integrity | Accurate calculations | ✅ Achieved | ✅ YES - Trust in numbers |
| | Persistence | Survives reload | ✅ Achieved | ✅ YES - Frictionless |
| | Error Handling | Graceful degradation | ✅ Achieved | ⚠️ Stability |
| **Usability** |
| | Learnability | < 2 min to first use | ✅ Achieved | ✅ YES - Low friction |
| | Efficiency | < 30s per transaction | ✅ Achieved | ✅ YES - Fast entry |
| | Visual Clarity | Instant recognition | ✅ Achieved | ✅ YES - Core magic |
| **Maintainability** |
| | Code Quality | Clean, readable code | ✅ Achieved | ⚠️ Educational |
| | Documentation | Comprehensive docs | ✅ Achieved | ⚠️ Educational |
| | Testability | Test-friendly architecture | ✅ Achieved | ⚠️ Future |
| **Compatibility** |
| | Browser Support | Modern browsers | ✅ Achieved | ⚠️ Universal access |
| | Device Support | Responsive design | ✅ Achieved | ⚠️ Universal access |
| **Accessibility** |
| | Basic A11y | Partial WCAG A | ⚠️ Basic | ⚠️ Inclusive |

**Legend:**
- ✅ Supports Magic: Directly enables instant visual clarity
- ⚠️ Enabling: Necessary but not directly magical

---

## NFRs and the Product Magic

**Performance NFRs** deliver the "instant" part of instant visual clarity:
- Sub-100ms response = feels instant
- Smooth charts = professional, trustworthy
- Fast load = no barrier to entry

**Security/Reliability NFRs** build trust:
- Zero vulnerabilities = safe to use
- Accurate calculations = trustworthy data
- Data privacy = peace of mind

**Usability NFRs** reduce friction:
- Easy to learn = quick adoption
- Efficient to use = sustainable habit
- Clear visuals = immediate understanding

Together, these NFRs ensure the product magic is experienced by every user, every time.

---

[← Back: Functional Requirements](06-functional-requirements.md) | [Index](index.md) | [Next: PRD Summary →](08-prd-summary.md)
