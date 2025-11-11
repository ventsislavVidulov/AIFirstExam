# Story 1.3: Establish Project Structure and Application Shell

**Epic:** [Epic 1: Project Foundation & Development Infrastructure](../index.md#epic-1-project-foundation--development-infrastructure)
**Story ID:** 1.3
**Story Points:** ~2

---

## User Story

As a **developer**,
I want **a clear folder structure and basic app shell**,
So that **code is organized and I can navigate the codebase efficiently**.

---

## Acceptance Criteria

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

---

## Prerequisites

- [Story 1.2: Integrate Material-UI Component Library](./story-1.2-mui-integration.md) (requires MUI integration)

---

## Technical Notes

- **Container:** Use MUI's `<Container maxWidth="lg">` for content area
- **AppBar:** Should be position="static" (no sticky behavior in MVP)
- **Folder Structure:** Follows React best practices (components, context, utils)
- **Routing:** No routing library yet (single page app for MVP)
- **Code Size:** App.jsx should be < 100 lines (just structure, no business logic)
- **Icons:** Use MUI icons: `<AccountBalanceIcon />` for branding
- **Breakpoints:** xs (mobile), md (tablet), lg (desktop)

---

## Implementation

### Create Folder Structure

```bash
cd src
mkdir components context utils assets
```

### App.jsx Structure

```javascript
import { Container, Typography, Box, AppBar, Toolbar, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SmartBudget
          </Typography>
          <Typography variant="body2">
            Personal Finance Manager
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">
          Welcome to SmartBudget
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Track your finances with instant visual clarity.
        </Typography>
      </Container>

      {/* Footer */}
      <Paper elevation={0} sx={{ p: 2, mt: 4, textAlign: 'center', bgcolor: 'grey.100' }}>
        <Typography variant="body2" color="text.secondary">
          Built with BMAD Methodology | AI-First Development Demo
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
```

---

## Definition of Done

- [x] Folder structure created (components/, context/, utils/, assets/)
- [x] All folders are empty and ready for feature code
- [x] App.jsx contains complete app shell structure
- [x] AppBar displays with "SmartBudget" branding
- [x] Container wraps main content area
- [x] Footer mentions BMAD Methodology
- [x] Responsive layout works on mobile, tablet, desktop
- [x] No Lorem Ipsum text (real placeholder content used)
- [x] App.jsx is clean and < 100 lines
- [x] Application loads without errors

---

## Epic 1 Complete

All foundation stories complete. Ready to proceed to [Epic 2: Transaction Management System](../index.md#epic-2-transaction-management-system).
