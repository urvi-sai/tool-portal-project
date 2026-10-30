# CLAUDE.md

## Tech Stack
- Plain HTML, CSS, and JavaScript only.
- No frameworks, no build step.

## Project Structure
- `README.md`: basic project readme.
- The project is nearly empty for now. Pages and assets will be added later, and this section should be updated as they are.

## Key Requirements
1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Feature Plan

### Portal structure
- **Homepage (`index.html`):** short intro for beginners and a list of tool cards. Each card has a name, a one-line description, and a link.
- **Opening a tool:** the visitor clicks a tool card and lands on that tool's own page.
- **Getting back:** every tool page has a "Back to all tools" link and the site title in the header, both leading to the homepage.
- **Adding a new tool later:** create one new page for the tool, then add one new card for it on the homepage. Nothing else needs to change.

### Phases
1. **Phase 1:** the portal plus its first tool, the battery life estimator (enter battery size and device power use, get expected battery life).
2. **Phase 2:** more IIoT tools, added one at a time.
3. **Phase 3:** polish, such as search or grouping once there are enough tools.

## Rules for Claude
- Explain technical terms in plain language.
- Ask before big changes, and ask rather than guess.
