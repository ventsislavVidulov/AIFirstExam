# Story 1.2: Integrate Material-UI Component Library

**Epic:** [Epic 1: Project Foundation & Development Infrastructure](../index.md#epic-1-project-foundation--development-infrastructure)
**Story ID:** 1.2
**Story Points:** ~3

---

## User Story

As a **developer**,
I want **Material-UI components and theming integrated**,
So that **I can build professional UI without custom styling from scratch**.

---

## Acceptance Criteria

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

---

## Prerequisites

- [Story 1.1: Initialize Vite + React Development Environment](./story-1.1-vite-react.md) (requires working React app)

---

## Technical Notes

- **Styling Engine:** Use @emotion for CSS-in-JS (MUI's default styling engine)
- **ThemeProvider:** Should wrap entire app in App.jsx or main.jsx
- **CssBaseline:** Provides consistent baseline styles across browsers
- **Icons:** Icons package needed for visual elements (AccountBalance, TrendingUp, etc.)
- **Testing:** Test theme by rendering colored Button components
- **Compatibility:** MUI v7.x uses React 19 (verify compatibility)

---

## Implementation

### Install Dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### Create Theme (src/theme.js)

```javascript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',  // Blue
    },
    secondary: {
      main: '#8B5CF6',  // Purple
    },
    success: {
      main: '#10B981',  // Green
    },
    error: {
      main: '#EF4444',  // Red
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
```

### Wrap App with ThemeProvider

```javascript
// In App.jsx or main.jsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

---

## Definition of Done

- [x] MUI packages installed (@mui/material, @emotion/*, @mui/icons-material)
- [x] No peer dependency warnings
- [x] Custom theme created with brand colors
- [x] ThemeProvider wraps entire app
- [x] CssBaseline applied for consistent styles
- [x] Test components render with theme colors (Button, AppBar)
- [x] Roboto font loads correctly
- [x] No console errors or warnings

---

## Next Story

[Story 1.3: Establish Project Structure and Application Shell](./story-1.3-project-structure.md)
