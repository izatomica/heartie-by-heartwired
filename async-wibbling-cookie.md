# Plan: Organize Heartie Specification Documentation

## Overview
Split the monolithic 2516-line `Heartie_Complete_Lovable_Prompt.md` file into a well-structured documentation directory with logical organization for easier navigation and maintenance.

## User Preferences
- ✅ Keep original file as archive (rename to indicate it's superseded)
- ✅ Add full checklist to CLAUDE.md with detailed guidance by change type
- ✅ Create quick-reference files for: colors, components, framework
- ✅ Keep ASCII/text diagrams (no Mermaid conversion)

## Analysis Summary

The document contains 17 main sections covering:
- Core philosophy (3-layer framework)
- Complete design system (colors, typography, spacing)
- All 6 feature views (Dashboard, Calendar, Strategy, Templates, Goals, Insights)
- Onboarding flow (6 steps)
- Component specifications
- Data models and build phases
- Critical design rules

## Proposed Directory Structure

```
docs/
├── README.md                           # Overview + navigation guide
├── quick-reference/
│   ├── color-cheat-sheet.md            # Quick color usage lookup
│   ├── component-checklist.md          # Checklist for building components
│   └── framework-guide.md              # One-page 3-layer framework summary
├── 01-overview/
│   ├── README.md                       # Project overview + target audience
│   └── tech-stack.md                   # Technology choices
├── 02-core-philosophy/
│   ├── 3-layer-framework.md            # Complete framework explanation
│   └── strategic-categories.md         # 7 categories mapped to layers
├── 03-design-system/
│   ├── README.md                       # Design system intro
│   ├── colors.md                       # Color palette + usage rules
│   ├── typography.md                   # Fonts + sizing
│   ├── spacing-and-layout.md           # Spacing scale, border radius, shadows
│   └── decorative-elements.md          # Flowers, organic shapes
├── 04-global-layout/
│   ├── application-shell.md            # App structure
│   ├── header-navigation.md            # Header component
│   └── heartie-assistant.md            # AI bubble interface
├── 05-features/
│   ├── dashboard.md                    # Dashboard view specs
│   ├── calendar.md                     # Calendar view specs
│   ├── strategy.md                     # Strategy view specs
│   ├── templates.md                    # Templates view specs
│   ├── goals.md                        # Goals view specs
│   └── insights.md                     # Insights view specs
├── 06-onboarding/
│   └── onboarding-flow.md              # 6-step onboarding process
├── 07-components/
│   ├── buttons.md                      # Button specs
│   ├── forms.md                        # Form inputs specs
│   ├── cards-and-containers.md         # Cards, modals
│   └── feedback-elements.md            # Notifications, progress, tooltips
├── 08-interactions/
│   ├── responsive-design.md            # Responsive behavior
│   └── animations.md                   # Animation specs
├── 09-data-models/
│   └── database-schema.md              # TypeScript interfaces
├── 10-implementation/
│   └── build-phases.md                 # Development roadmap
└── 11-rules/
    └── critical-design-rules.md        # Non-negotiable rules
```

## Implementation Steps

### Step 1: Archive Original File
- Rename `Heartie_Complete_Lovable_Prompt.md` to `Heartie_Complete_Lovable_Prompt_ARCHIVE.md`
- Add note at top indicating it's been superseded by docs/ directory

### Step 2: Create Directory Structure
- Create `docs/` directory and all subdirectories
- Create `quick-reference/` subdirectory for cheat sheets

### Step 3: Create Quick Reference Files
Create three focused quick-reference documents:

**color-cheat-sheet.md:**
- Table format for quick lookup
- Component → Color mapping
- Funnel stage colors
- Layer colors
- Critical "never use" list

**component-checklist.md:**
- Checklist for building any new component
- Required design elements (fonts, colors, spacing, borders, shadows)
- Accessibility requirements (focus states, touch targets)
- Responsive considerations

**framework-guide.md:**
- One-page summary of 3-layer framework
- Visual diagram (ASCII)
- 7 categories with emojis mapped to layers
- Key insight and "aha moment"

### Step 4: Create Main Documentation README
Create `docs/README.md` with:
- Overview of documentation organization
- Navigation by topic
- Quick links to most-used files
- Cross-reference to quick-reference files

### Step 5: Extract and Split Content
For each section:
- Extract content from monolithic file preserving all details
- Split long sections into logical sub-files
- Maintain all ASCII diagrams, code blocks, and specifications
- Add "See also" cross-references
- Include links back to related sections

Key content extraction:
- Section 1 → `01-overview/`
- Section 2 → `02-core-philosophy/`
- Section 3 → `03-design-system/` (split into 4 files)
- Section 4 → `04-global-layout/` (split into 3 files)
- Sections 5-10 → `05-features/` (1 file each)
- Section 11 → `06-onboarding/`
- Section 12 → `07-components/` (split into 4 files)
- Section 13 → `08-interactions/responsive-design.md`
- Section 14 → `08-interactions/animations.md`
- Section 15 → `09-data-models/database-schema.md`
- Section 16 → `10-implementation/build-phases.md`
- Section 17 → `11-rules/critical-design-rules.md`

### Step 6: Update CLAUDE.md with Full Checklist
Add comprehensive section to CLAUDE.md with guidance organized by change type:

**For UI Component Changes:**
- Read: `docs/03-design-system/` (all files)
- Read: `docs/07-components/` (relevant component file)
- Read: `docs/quick-reference/component-checklist.md`
- Read: `docs/11-rules/critical-design-rules.md`

**For Feature/View Changes:**
- Read: `docs/02-core-philosophy/3-layer-framework.md`
- Read: `docs/05-features/{specific-feature}.md`
- Read: `docs/quick-reference/framework-guide.md`

**For Design System Changes:**
- Read: `docs/11-rules/critical-design-rules.md` FIRST
- Read: `docs/quick-reference/color-cheat-sheet.md`
- Read: All files in `docs/03-design-system/`

**For Data Model Changes:**
- Read: `docs/09-data-models/database-schema.md`
- Read: `docs/02-core-philosophy/` (understand data relationships)

**For Onboarding Changes:**
- Read: `docs/06-onboarding/onboarding-flow.md`
- Read: `docs/02-core-philosophy/3-layer-framework.md`

**For New Features:**
- Read: `docs/02-core-philosophy/` (entire directory)
- Read: `docs/quick-reference/` (all files)
- Read: `docs/10-implementation/build-phases.md`
- Read: `docs/11-rules/critical-design-rules.md`

### Step 7: Add Cross-References
Throughout all docs files:
- Add "See also" sections linking related topics
- Add "Related files" sections at bottom
- Link to quick-reference files where relevant
- Create bidirectional links (e.g., colors.md ↔ buttons.md)

### Step 8: Create Navigation Index
Add to main `docs/README.md`:
- Topic-based index (find by what you're working on)
- Alphabetical index
- Most-referenced files section

## Files to Create/Modify

### New Files (30+ files):
- `docs/README.md`
- `docs/quick-reference/` (3 files)
- `docs/01-overview/` (2 files)
- `docs/02-core-philosophy/` (2 files)
- `docs/03-design-system/` (5 files)
- `docs/04-global-layout/` (3 files)
- `docs/05-features/` (6 files)
- `docs/06-onboarding/` (1 file)
- `docs/07-components/` (4 files)
- `docs/08-interactions/` (2 files)
- `docs/09-data-models/` (1 file)
- `docs/10-implementation/` (1 file)
- `docs/11-rules/` (1 file)

### Modified Files:
- `Heartie_Complete_Lovable_Prompt.md` → renamed to `Heartie_Complete_Lovable_Prompt_ARCHIVE.md` with note at top
- `CLAUDE.md` → add comprehensive documentation checklist section

## Success Criteria
- ✅ All content from original file preserved in new structure
- ✅ Easy to find specific information (< 3 clicks from docs/README.md)
- ✅ Quick-reference files provide instant answers for common questions
- ✅ CLAUDE.md provides clear guidance for future Claude instances
- ✅ Cross-references make related topics discoverable
- ✅ Original file archived for reference

## Critical Considerations
- Preserve ALL ASCII diagrams exactly as-is
- Maintain all color codes and specifications
- Keep all component measurements and spacing values
- Preserve the 3-layer framework explanation in full detail
- Don't lose any design rules or "never use" warnings
