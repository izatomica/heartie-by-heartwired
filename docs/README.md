# Heartie Documentation

> Comprehensive specification for the Heartie marketing planner platform

## 🚀 Quick Start

**New to Heartie?** Start here:
1. [Project Overview](./01-overview/README.md) - What Heartie is and who it's for
2. [3-Layer Framework Guide](./quick-reference/framework-guide.md) - Core philosophy (1-page summary)
3. [Color Cheat Sheet](./quick-reference/color-cheat-sheet.md) - Quick color reference

**Building a component?**
- [Component Checklist](./quick-reference/component-checklist.md) - Everything you need to check

**Making changes?**
- See the [Documentation Guide by Change Type](#documentation-guide-by-change-type) below

---

## 📚 Documentation Structure

### Quick Reference (Start Here!)
Essential information in digestible formats:
- **[Color Cheat Sheet](./quick-reference/color-cheat-sheet.md)** - Component → Color quick lookup
- **[Component Checklist](./quick-reference/component-checklist.md)** - Building components the Heartie way
- **[Framework Guide](./quick-reference/framework-guide.md)** - 3-layer framework summary

### Core Documentation

#### 01. Overview
- [Project Overview](./01-overview/README.md) - Mission, target user, key features
- [Tech Stack](./01-overview/tech-stack.md) - Technology choices and rationale

#### 02. Core Philosophy
- [The 3-Layer Framework](./02-core-philosophy/3-layer-framework.md) - Complete explanation
- [Strategic Categories](./02-core-philosophy/strategic-categories.md) - 7 categories mapped to layers

#### 03. Design System
- [Design System Overview](./03-design-system/README.md) - Introduction
- [Colors](./03-design-system/colors.md) - Complete color palette and usage
- [Typography](./03-design-system/typography.md) - Fonts, sizes, weights
- [Spacing & Layout](./03-design-system/spacing-and-layout.md) - Spacing scale, borders, shadows
- [Decorative Elements](./03-design-system/decorative-elements.md) - Flowers, organic shapes

#### 04. Global Layout
- [Application Shell](./04-global-layout/application-shell.md) - Overall app structure
- [Header & Navigation](./04-global-layout/header-navigation.md) - Header component specs
- [Heartie Assistant](./04-global-layout/heartie-assistant.md) - AI bubble interface

#### 05. Features
- [Dashboard](./05-features/dashboard.md) - Dashboard view specifications
- [Calendar](./05-features/calendar.md) - Drag-and-drop calendar view
- [Strategy](./05-features/strategy.md) - 7 strategic categories interface
- [Templates](./05-features/templates.md) - Content template library
- [Goals](./05-features/goals.md) - Annual/Quarterly/Weekly goals
- [Insights](./05-features/insights.md) - Analytics and metrics

#### 06. Onboarding
- [Onboarding Flow](./06-onboarding/onboarding-flow.md) - 6-step onboarding process

#### 07. Components
- [Buttons](./07-components/buttons.md) - Button specifications
- [Forms](./07-components/forms.md) - All form input types
- [Cards & Containers](./07-components/cards-and-containers.md) - Cards, modals
- [Feedback Elements](./07-components/feedback-elements.md) - Toasts, progress, tooltips

#### 08. Interactions
- [Responsive Design](./08-interactions/responsive-design.md) - Breakpoints and mobile behavior
- [Animations](./08-interactions/animations.md) - Motion and transitions

#### 09. Data Models
- [Database Schema](./09-data-models/database-schema.md) - TypeScript interfaces and relationships

#### 10. Implementation
- [Build Phases](./10-implementation/build-phases.md) - Development roadmap

#### 11. Rules
- [Critical Design Rules](./11-rules/critical-design-rules.md) - Non-negotiable design and interaction rules

---

## 🔍 Documentation Guide by Change Type

### For UI Component Changes
**Read these files:**
1. [Component Checklist](./quick-reference/component-checklist.md) - Quick checklist
2. [Design System](./03-design-system/) - All files in this directory
3. Specific component file in [Components](./07-components/)
4. [Critical Design Rules](./11-rules/critical-design-rules.md)

### For Feature/View Changes
**Read these files:**
1. [3-Layer Framework](./02-core-philosophy/3-layer-framework.md) - Understand the philosophy
2. [Framework Guide](./quick-reference/framework-guide.md) - Quick reference
3. Specific feature file in [Features](./05-features/)
4. [Database Schema](./09-data-models/database-schema.md) - If touching data

### For Design System Changes
**⚠️ Read these files IN THIS ORDER:**
1. [Critical Design Rules](./11-rules/critical-design-rules.md) - **READ FIRST**
2. [Color Cheat Sheet](./quick-reference/color-cheat-sheet.md)
3. All files in [Design System](./03-design-system/)
4. Review impact on [Components](./07-components/)

### For Data Model Changes
**Read these files:**
1. [Database Schema](./09-data-models/database-schema.md) - Current schema
2. [Core Philosophy](./02-core-philosophy/) - Understand data relationships
3. Related feature files in [Features](./05-features/)

### For Onboarding Changes
**Read these files:**
1. [Onboarding Flow](./06-onboarding/onboarding-flow.md)
2. [3-Layer Framework](./02-core-philosophy/3-layer-framework.md) - Framework is core to onboarding
3. [Strategic Categories](./02-core-philosophy/strategic-categories.md)

### For New Features
**Read these files (in order):**
1. [3-Layer Framework](./02-core-philosophy/3-layer-framework.md) - Core philosophy
2. [Framework Guide](./quick-reference/framework-guide.md) - Quick summary
3. All files in [Quick Reference](./quick-reference/)
4. [Build Phases](./10-implementation/build-phases.md) - Where it fits
5. [Critical Design Rules](./11-rules/critical-design-rules.md)

---

## 🎯 Most Referenced Files

These files are referenced most frequently across the codebase:

1. **[Color Cheat Sheet](./quick-reference/color-cheat-sheet.md)** - For any visual work
2. **[3-Layer Framework](./02-core-philosophy/3-layer-framework.md)** - Core intellectual property
3. **[Component Checklist](./quick-reference/component-checklist.md)** - Building any component
4. **[Critical Design Rules](./11-rules/critical-design-rules.md)** - Non-negotiable rules
5. **[Database Schema](./09-data-models/database-schema.md)** - Data structure

---

## 🗂️ Topic Index

### By Topic

**Colors & Visual Design:**
- [Color Cheat Sheet](./quick-reference/color-cheat-sheet.md)
- [Colors (Complete)](./03-design-system/colors.md)
- [Critical Design Rules](./11-rules/critical-design-rules.md)

**Typography:**
- [Typography](./03-design-system/typography.md)
- [Component Checklist](./quick-reference/component-checklist.md)

**Layout & Spacing:**
- [Spacing & Layout](./03-design-system/spacing-and-layout.md)
- [Application Shell](./04-global-layout/application-shell.md)
- [Responsive Design](./08-interactions/responsive-design.md)

**Components:**
- [Component Checklist](./quick-reference/component-checklist.md)
- [Buttons](./07-components/buttons.md)
- [Forms](./07-components/forms.md)
- [Cards & Containers](./07-components/cards-and-containers.md)
- [Feedback Elements](./07-components/feedback-elements.md)

**Interactions:**
- [Animations](./08-interactions/animations.md)
- [Responsive Design](./08-interactions/responsive-design.md)

**Philosophy & Strategy:**
- [3-Layer Framework](./02-core-philosophy/3-layer-framework.md)
- [Framework Guide](./quick-reference/framework-guide.md)
- [Strategic Categories](./02-core-philosophy/strategic-categories.md)

**Features:**
- [Dashboard](./05-features/dashboard.md)
- [Calendar](./05-features/calendar.md)
- [Strategy](./05-features/strategy.md)
- [Templates](./05-features/templates.md)
- [Goals](./05-features/goals.md)
- [Insights](./05-features/insights.md)

**Data & Implementation:**
- [Database Schema](./09-data-models/database-schema.md)
- [Build Phases](./10-implementation/build-phases.md)

---

## 📝 Alphabetical Index

- [Animations](./08-interactions/animations.md)
- [Application Shell](./04-global-layout/application-shell.md)
- [Build Phases](./10-implementation/build-phases.md)
- [Buttons](./07-components/buttons.md)
- [Calendar](./05-features/calendar.md)
- [Cards & Containers](./07-components/cards-and-containers.md)
- [Color Cheat Sheet](./quick-reference/color-cheat-sheet.md)
- [Colors](./03-design-system/colors.md)
- [Component Checklist](./quick-reference/component-checklist.md)
- [Critical Design Rules](./11-rules/critical-design-rules.md)
- [Dashboard](./05-features/dashboard.md)
- [Database Schema](./09-data-models/database-schema.md)
- [Decorative Elements](./03-design-system/decorative-elements.md)
- [Design System Overview](./03-design-system/README.md)
- [Feedback Elements](./07-components/feedback-elements.md)
- [Forms](./07-components/forms.md)
- [Framework Guide](./quick-reference/framework-guide.md)
- [Goals](./05-features/goals.md)
- [Header & Navigation](./04-global-layout/header-navigation.md)
- [Heartie Assistant](./04-global-layout/heartie-assistant.md)
- [Insights](./05-features/insights.md)
- [Onboarding Flow](./06-onboarding/onboarding-flow.md)
- [Project Overview](./01-overview/README.md)
- [Responsive Design](./08-interactions/responsive-design.md)
- [Spacing & Layout](./03-design-system/spacing-and-layout.md)
- [Strategic Categories](./02-core-philosophy/strategic-categories.md)
- [Strategy](./05-features/strategy.md)
- [Tech Stack](./01-overview/tech-stack.md)
- [Templates](./05-features/templates.md)
- [The 3-Layer Framework](./02-core-philosophy/3-layer-framework.md)
- [Typography](./03-design-system/typography.md)

---

## 📌 Notes

- **Original spec**: The complete original specification is archived at `Heartie_Complete_Lovable_Prompt_ARCHIVE.md`
- **Maintained by**: This documentation is the source of truth for Heartie development
- **Last updated**: Created from complete specification, December 2025

---

**Questions?** Start with the [Quick Reference](./quick-reference/) section or consult the [topic index](#topic-index) above.
