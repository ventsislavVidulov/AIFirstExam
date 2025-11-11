# Story 1.1: Initialize Vite + React Development Environment

**Epic:** [Epic 1: Project Foundation & Development Infrastructure](../index.md#epic-1-project-foundation--development-infrastructure)
**Story ID:** 1.1
**Story Points:** ~3

---

## User Story

As a **developer**,
I want **a modern React development environment with Vite**,
So that **I can build features with fast hot module reloading and modern tooling**.

---

## Acceptance Criteria

**Given** a clean development machine with Node.js 18+ installed
**When** I run `npm create vite@latest smartbudget -- --template react`
**Then** a new React project is created with Vite configuration

**And** running `npm install` installs all dependencies successfully
**And** running `npm run dev` starts development server on localhost:5173
**And** the default Vite + React starter page loads in browser
**And** hot module reloading works (editing App.jsx updates browser instantly)
**And** Git repository is initialized with proper .gitignore (node_modules, dist excluded)

---

## Prerequisites

**None** - This is the first story in the project

---

## Technical Notes

- **Vite Version:** Use Vite 7.x (latest stable) for fastest build times
- **React Version:** React 19.x with modern JSX transform
- **ESLint:** Includes ESLint configuration automatically
- **.gitignore:** Must exclude: `node_modules/`, `dist/`, `.env`, `.DS_Store`
- **HMR Verification:** Verify hot module reloading works before proceeding (critical for dev experience)
- **Documentation:** Document Node.js version requirement in README

---

## Implementation Commands

```bash
# Create Vite + React project
npm create vite@latest smartbudget -- --template react

# Navigate to project
cd smartbudget

# Install dependencies
npm install

# Start development server
npm run dev

# Initialize Git (if not done automatically)
git init
git add .
git commit -m "feat: initialize Vite + React project

- Vite 7.x with React 19.x
- ESLint configuration included
- Hot module reloading verified
- .gitignore configured"
```

---

## Definition of Done

- [x] Vite + React project created with template
- [x] All npm dependencies installed without errors
- [x] Development server runs on localhost:5173
- [x] Default Vite page loads in browser
- [x] HMR works (instant browser updates on file save)
- [x] Git repository initialized
- [x] .gitignore excludes build artifacts and dependencies
- [x] README updated with Node.js version requirement

---

## Next Story

[Story 1.2: Integrate Material-UI Component Library](./story-1.2-mui-integration.md)
