# Custom Settings and Security Guidelines for AI Assistant

**Created:** 2025-11-09
**Purpose:** Critical guidelines for AI assistant behavior regarding security and software installation

---

## CRITICAL SECURITY RULES

### Rule 1: ALWAYS Check for Vulnerabilities Before Installation

**MANDATORY PRE-INSTALLATION CHECKS:**

Before installing ANY npm package, dependency, or software:

1. ✅ **Check for known CVEs** (Common Vulnerabilities and Exposures)
2. ✅ **Verify the package is maintained** (recent updates, active repository)
3. ✅ **Check npm audit** or equivalent security scanners
4. ✅ **Review package size and dependencies** (supply chain security)
5. ✅ **Verify package authenticity** (official source, not typosquatting)

**Examples of Security Checks:**
- `npm audit` - Check for known vulnerabilities in dependencies
- Visit https://www.npmjs.com/package/[package-name] - Check version history, downloads
- Check GitHub repository - Look for security advisories, issue reports
- Search "CVE [package-name]" - Look for known vulnerabilities
- Use https://snyk.io/vuln/ - Database of npm vulnerabilities

### Rule 2: NEVER INSTALL MALICIOUS OR VULNERABLE SOFTWARE

**ABSOLUTE PROHIBITIONS:**

🚫 **NEVER install packages with:**
- Known high-severity or critical CVEs in the version being installed
- Unmaintained packages (no updates > 2 years for security-critical dependencies)
- Suspicious package names (typosquatting attempts)
- Packages requesting unnecessary permissions
- Packages from unverified sources

🚫 **NEVER proceed with installation if:**
- Security vulnerabilities are detected and unresolved
- Package authenticity cannot be verified
- User expresses security concerns without resolution

### Rule 3: Inform User of Security Status

**BEFORE EVERY INSTALLATION:**

The AI assistant MUST:
1. State which packages will be installed with version numbers
2. Report any known vulnerabilities found
3. Recommend secure alternatives if vulnerabilities exist
4. Get explicit user approval before proceeding

**EXAMPLE OUTPUT:**
```
Planning to install:
- @mui/material@^5.15.0 ✅ No known vulnerabilities
- chart.js@^4.4.0 ✅ No known vulnerabilities (CVE-2020-7746 fixed in 2.9.4+)
- react-chartjs-2@^5.2.0 ✅ No known vulnerabilities

All packages verified secure. Proceed with installation? (y/n)
```

---

## Specific Vulnerability Notes

### Chart.js CVE-2020-7746
- **Issue:** High-severity prototype-pollution vulnerability
- **Affected:** chart.js < 2.9.4
- **Fixed in:** chart.js >= 2.9.4
- **Current safe versions:** chart.js 3.x and 4.x
- **Action:** Always use chart.js >= 2.9.4, preferably latest 4.x

---

## Implementation Checklist

When installing dependencies, the AI must:

- [ ] List all packages to be installed with versions
- [ ] Check each package for known CVEs
- [ ] Verify versions are not affected by known vulnerabilities
- [ ] Report security status to user
- [ ] Get user confirmation before proceeding
- [ ] Document security check in prompts.md

---

## Where This File is Stored

**Location:** `c:\Users\Xcen3\Desktop\AI\AIFirstExam\customSettings.md`

This file should be:
- Version controlled in Git
- Referenced in README.md
- Reviewed before any dependency installation
- Updated when new security guidelines are established

---

## User Authority

The user (Ventsi) has the authority to:
- Reject any installation for security concerns
- Add additional security rules to this document
- Require additional checks beyond those listed here
- Override AI recommendations if better security practices are known

**Remember:** Security is not negotiable. When in doubt, don't install. Ask the user first.

---

## CRITICAL DOCUMENTATION RULE

### Rule 4: ALWAYS Document Every Interaction in prompts.md

**MANDATORY PROMPT DOCUMENTATION:**

The AI assistant MUST automatically save ALL user interactions and AI responses to `prompts.md`:

1. ✅ **Every user request** - Exactly as written
2. ✅ **AI responses** - Summary of actions taken and output generated
3. ✅ **Context** - Why decisions were made
4. ✅ **Chronological order** - Numbered prompts in sequence
5. ✅ **No exceptions** - Document EVERYTHING, even simple questions

**Format:**
```markdown
### Prompt [N]
**User Request:**
"[exact user text]"

**Context:**
[Brief context of the situation]

**AI Response/Action:**
[What the AI did/said]

**AI Output:**
[What was generated/created]
```

**Purpose:**
- Creates complete audit trail for academic evaluation
- Documents decision-making process
- Shows AI-human collaboration
- Required for teacher review
- Critical for project assessment

**This is NON-NEGOTIABLE:** The user (Ventsi) has explicitly required this for academic purposes. Failing to document interactions in prompts.md is a violation of user requirements.

---

## React Development Best Practices

### Rule 5: Follow Official React Guidelines for Effects

**IMPORTANT RESOURCE:**

📚 **You Might Not Need an Effect**
- **URL:** https://react.dev/learn/you-might-not-need-an-effect
- **Purpose:** Official React documentation on when to use and NOT use useEffect
- **Key Principles:**
  - Avoid unnecessary Effects that make code slower and more fragile
  - Use Effects only for synchronizing with external systems
  - Prefer calculating values during rendering instead of Effects
  - Use event handlers for user interactions, not Effects
  - Reset state on prop changes without Effects when possible

**When to Reference:**
- Before adding any `useEffect` hook to components
- When debugging performance issues or infinite loops
- When refactoring component logic
- During code reviews

**Examples from SmartBudget:**
- ✅ **Good:** Using useEffect in BudgetContext to sync with localStorage (external system)
- ❌ **Avoid:** Using useEffect to update state based on other state (calculate during render instead)

---

_This document was created in response to user security concerns about Chart.js CVE-2020-7746 and serves as a permanent guideline for this project and future AI-assisted development._

_Updated 2025-11-09: Added mandatory prompt documentation rule for academic evaluation requirements._
_Updated 2025-11-12: Added React best practices for Effects usage._
