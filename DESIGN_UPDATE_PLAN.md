# Heartie Design Update Plan

## Executive Summary

This document outlines a comprehensive plan to update the Heartie application design to align with the complete design specification in `Heartie_Complete_Lovable_Prompt.md`. The current implementation has a strong foundation with correct colors, fonts, and basic structure. This plan focuses on enhancing visual consistency, implementing the 3-layer framework visualization, and adding missing UI components.

**Overall Assessment:**
- ✅ **Strong Foundation:** Core design system (colors, fonts, spacing) is implemented correctly
- ✅ **Architecture:** App structure and routing are solid
- 🔄 **Enhancement Needed:** Visual refinements, 3-layer framework emphasis, and UI polish
- ➕ **Missing:** Heartie AI chat bubble, some interactive components

---

## Priority Levels

- **P0 (Critical):** Core visual identity and framework visualization
- **P1 (High):** User-facing features that improve understanding
- **P2 (Medium):** Polish and enhancement features
- **P3 (Low):** Nice-to-have improvements

---

## 1. Global Design System Updates

### 1.1 Color System - ✅ COMPLETE
**Status:** Fully implemented correctly in `tailwind.config.js` and `src/index.css`

All Heartwired brand colors are present:
- Primary: Burgundy (#7A2D4D), Teal (#1B6B6B)
- Accents: Dusty Pink (#D07080), Cream (#FCF7F1)
- Funnel colors, semantic colors, text colors all correct

**Action:** No changes needed

---

### 1.2 Typography - ✅ COMPLETE
**Status:** Fonts correctly loaded and configured

- Bricolage Grotesque for headlines ✅
- Open Sans for body text ✅
- Correct weights defined ✅

**Action:** No changes needed

---

### 1.3 Component Styles - 🔄 ENHANCE
**Status:** Core components exist, need visual refinement

**Priority:** P1

**Current State:**
- Button variants exist (.btn-primary, .btn-secondary, .btn-ghost)
- Card components with hover states
- Input/textarea styles defined
- Progress bars with animations

**Updates Needed:**
1. **Enhance button ripple effect** - Currently implemented but could be more subtle
2. **Add ghost button variants** - Ensure all button styles match spec exactly
3. **Refine card shadows** - Verify shadow values match design spec exactly
4. **Add decorative elements class** - Hand-drawn underlines, flower motifs

**Files to Update:**
- `src/index.css` - Add decorative element utilities
- Component files - Verify button usage consistency

---

## 2. The 3-Layer Framework Visualization

### 2.1 Framework Diagram Component - ➕ NEW
**Priority:** P0 (Critical)

**Status:** Not yet implemented as a reusable component

**Requirement:** Create a visual 3-layer framework diagram that appears in multiple locations:
1. Strategy page (main visualization)
2. Dashboard (Framework Health card - EXISTS but needs enhancement)
3. Onboarding (explain concept)

**Design Specs:**
- Stacked layers (Layer 3 top, Layer 2 middle, Layer 1 bottom)
- Each layer with distinct color (Layer 1: burgundy, Layer 2: teal, Layer 3: sage green)
- Show categories within each layer with icons
- Progress bars for each category
- Visual arrows showing "informs" relationship
- Responsive layout (horizontal on mobile)

**Implementation:**
```
New Component: src/components/framework/FrameworkDiagram.tsx
Props:
- variant: 'full' | 'compact' | 'horizontal'
- showProgress: boolean
- interactive: boolean (click to navigate to categories)
```

**Files to Create:**
- `src/components/framework/FrameworkDiagram.tsx`
- `src/components/framework/LayerCard.tsx`

**Files to Update:**
- `src/pages/Strategy.tsx` - Add framework diagram at top
- `src/pages/Dashboard.tsx` - Enhance Framework Health card with diagram

---

### 2.2 Layer Color Indicators - 🔄 ENHANCE
**Priority:** P1

**Status:** Colors defined but not consistently used for layer identification

**Current:** Strategy categories have icons but no layer color indicators

**Updates Needed:**
1. Add left border or background tint to category cards based on layer
2. Add layer labels to category groups
3. Show layer hierarchy visually

**Files to Update:**
- `src/pages/Strategy.tsx` - Add layer section headers with colors
- `src/index.css` - Add layer background tint utilities

---

## 3. Layout & Navigation

### 3.1 Header Component - 🔄 ENHANCE
**Priority:** P1

**Current State:**
- Header exists at `src/components/layout/Header.tsx`
- Logo shows "🌸 Heartwired" with emoji
- Navigation items present
- User menu with avatar

**Updates Needed:**
1. **Logo enhancement** - Spec calls for "text with small flower icon" - current emoji is acceptable but could use actual icon/SVG
2. **Active state refinement** - Ensure burgundy (#7A2D4D) underline is consistent
3. **Mobile menu styling** - Verify matches design spec

**Files to Update:**
- `src/components/layout/Header.tsx`

---

### 3.2 Heartie AI Bubble - ➕ NEW
**Priority:** P0 (Critical)

**Status:** Heartie exists as cards in various pages but NOT as floating chat bubble

**Requirement from Spec:**
- Fixed position, bottom-right corner (24px from edges)
- **Collapsed state:** Pill-shaped (220px × 56px), white bg, shows avatar + preview text
- **Expanded state:** Chat panel (360px × 480px), message history, input field
- Pulse animation when has suggestion
- Appears on ALL pages

**Current "Heartie's Corner" Implementation:**
- Dashboard has static card with Heartie message ✅
- Insights has recommendations card ✅
- NOT a floating bubble ❌

**Implementation:**
```
New Component: src/components/heartie/HeartieBubble.tsx
Features:
- Floating bubble (position: fixed)
- Collapse/expand animation
- Chat message history
- Text input for questions
- Avatar with personality
- Context-aware suggestions based on page
```

**Files to Create:**
- `src/components/heartie/HeartieBubble.tsx`
- `src/components/heartie/ChatMessage.tsx`
- `src/contexts/HeartieContext.tsx` (manage chat state)

**Files to Update:**
- `src/components/layout/Layout.tsx` - Add HeartieBubble to global layout

**Note:** Keep existing "Heartie's Corner" cards on Dashboard/Insights as complementary feature

---

## 4. Dashboard Enhancements

### 4.1 Dashboard Layout - 🔄 ENHANCE
**Priority:** P1

**Current State:** Dashboard has most required cards implemented at `src/pages/Dashboard.tsx`

**Existing Cards:**
- ✅ This Week summary
- ✅ Funnel Health bars
- ✅ Today's Focus activities
- ✅ Weekly Goals
- ✅ Framework Health
- ✅ Heartie's Corner

**Updates Needed:**
1. **Reorder cards** to match spec exactly:
   - Row 1: This Week + Funnel Health ✅ (correct)
   - Row 2: Today's Focus ✅ (correct)
   - Row 3: Quick Stats + Heartie's Corner (MISSING Quick Stats)
   - Row 4: Week Preview (MISSING)
   - Row 5: Framework Health + Weekly Goals ✅ (correct)

2. **Add missing cards:**
   - **Quick Stats card** - Monthly metrics (LinkedIn followers, email subscribers, discovery calls)
   - **Week Preview strip** - Horizontal calendar showing Mon-Sun with activity indicators

**Files to Update:**
- `src/pages/Dashboard.tsx` - Add QuickStats and WeekPreview components
- Create `src/components/dashboard/QuickStats.tsx`
- Create `src/components/dashboard/WeekPreview.tsx`

---

### 4.2 Framework Health Card - 🔄 ENHANCE
**Priority:** P1

**Current:** Shows 3 layers with progress, uses icons for completion status

**Enhancement Needed:**
1. Add visual layer diagram (stacked boxes with colors)
2. Show category icons within each layer (✓ = complete, ⋯ = in progress, ○ = not started)
3. Add conditional message: "Complete Layer 1 to unlock better AI content"
4. Link to Strategy page

**Files to Update:**
- `src/pages/Dashboard.tsx` - Enhance Framework Health card section

---

### 4.3 Today's Focus Activities - ✅ MOSTLY COMPLETE
**Priority:** P2

**Current:** Activities display with funnel colors, status badges, action buttons

**Minor Enhancement:**
- Verify action buttons match spec (Open, Complete, Reschedule)
- Ensure left border is exactly 4px solid [funnel color]

**Files to Update:**
- `src/pages/Dashboard.tsx` - Minor styling adjustments

---

## 5. Calendar View Enhancements

### 5.1 Calendar Grid - ✅ MOSTLY COMPLETE
**Priority:** P2

**Current State:** Weekly view with drag-and-drop implemented well

**Excellent Implementation:**
- ✅ Drag-and-drop with @dnd-kit
- ✅ Activity cards with funnel colors
- ✅ Status badges
- ✅ Filter by funnel stage
- ✅ Week navigation

**Minor Enhancements:**
1. **Today highlighting** - Ensure current day has subtle background (#F0D5D8)
2. **[+] Add button** - Verify styling in each day column matches spec
3. **Drop target visual** - Ensure dashed border + dusty pink background on drag-over

**Files to Update:**
- `src/pages/Calendar.tsx` - Minor visual refinements

---

### 5.2 Activity Card Styling - ✅ COMPLETE
**Priority:** P3

**Current:** Well-implemented at `src/components/calendar/ActivityCard.tsx`

- Left border with funnel color ✅
- Platform icons ✅
- Status badges ✅
- Hover effects ✅

**Action:** Verify matches spec exactly, minor tweaks if needed

---

### 5.3 Activity Detail Panel - ✅ COMPLETE
**Priority:** P3

**Current:** Slide-in panel from right implemented at `src/components/calendar/ActivityDetailPanel.tsx`

**Excellent features:**
- Funnel stage selector grid ✅
- Platform dropdown ✅
- Content pillar ✅
- Rich text area ✅
- Status selector ✅
- AI generation button (placeholder) ✅

**Action:** No major changes needed, maybe add template integration

---

## 6. Strategy View Updates

### 6.1 3-Layer Framework Visualization - ➕ NEW
**Priority:** P0 (Critical)

**Current:** Category cards grouped by layer, but no visual framework diagram

**Requirement:** Add large framework diagram at top of page showing:
- Visual representation of 3 stacked layers
- Categories within each layer with progress
- "Informs" arrows between layers
- Overall foundation status summary

**Implementation:** Use FrameworkDiagram component (from section 2.1)

**Files to Update:**
- `src/pages/Strategy.tsx` - Add framework diagram before category cards

---

### 6.2 Category Cards - 🔄 ENHANCE
**Priority:** P1

**Current:** Good implementation with progress bars and action buttons

**Enhancements:**
1. **Recommended next step indicator** - Add star (★) icon to first incomplete category
2. **Layer color coding** - Add subtle left border or background tint
3. **Progress states** - Verify color changes (0%: gray, 1-99%: burgundy, 100%: green)

**Files to Update:**
- `src/pages/Strategy.tsx` - Add star indicator logic, layer colors

---

### 6.3 Category Detail/Questionnaire - ➕ NEW
**Priority:** P1

**Status:** Modal placeholder exists, but questionnaire flow not implemented

**Requirement:** Multi-step questionnaire for each category with:
- Version toggle (Quick 10min / Deep 25min)
- Section-based navigation (Section 1 of 3)
- Various question types (text, select, radio)
- Progress bar showing question completion
- Save functionality to Supabase

**This is a significant feature** requiring:
- Question data models
- Multi-step form component
- Progress tracking
- Data persistence

**Files to Create:**
- `src/components/strategy/QuestionnaireModal.tsx`
- `src/components/strategy/QuestionSection.tsx`
- `src/components/strategy/QuestionTypes.tsx` (text, radio, select components)
- `src/data/questionnaireData.ts` (question definitions for all 7 categories)

**Files to Update:**
- `src/pages/Strategy.tsx` - Replace modal placeholder with full questionnaire
- `src/types/index.ts` - Add questionnaire types

---

## 7. Templates View

### 7.1 Template Library - ✅ MOSTLY COMPLETE
**Priority:** P2

**Current State:** Good implementation at `src/pages/Templates.tsx`

**Existing Features:**
- ✅ Filter by funnel stage
- ✅ Filter by platform
- ✅ Search functionality
- ✅ Template cards with preview
- ✅ Template detail modal

**Minor Enhancements:**
1. **Card styling** - Verify top border is 3px solid [funnel color]
2. **Modal content** - Ensure shows structure, example, customization prompts per spec
3. **Action buttons** - Add "Add to Calendar" integration (not just placeholder)

**Files to Update:**
- `src/pages/Templates.tsx` - Minor refinements

---

## 8. Goals View Updates

### 8.1 Tab Navigation - ✅ COMPLETE
**Priority:** P3

**Current:** Three tabs (Annual, Quarterly, Weekly) implemented correctly

**Action:** Verify teal (#1B6B6B) active state is correct

---

### 8.2 Annual Goals View - ✅ COMPLETE
**Priority:** P3

**Current:** Excellent implementation with goal cards, progress bars, projections

**Action:** Verify all colors match spec (teal for progress, sage for on-track)

---

### 8.3 Quarterly Goals View - ✅ COMPLETE
**Priority:** P3

**Current:** Theme card and initiatives implemented

**Action:** Verify quarter card styling (current: dusty pink, completed: sage border, upcoming: gray)

---

### 8.4 Weekly Goals View - ✅ COMPLETE
**Priority:** P3

**Current:** Checklist-style goals with categories

**Action:** Minor verification

---

## 9. Insights View

### 9.1 Metrics & Analytics - ✅ MOSTLY COMPLETE
**Priority:** P2

**Current State:** Well-implemented at `src/pages/Insights.tsx`

**Existing:**
- Time period selector ✅
- Key metrics cards ✅
- Platform performance ✅
- Funnel distribution ✅
- Top content table ✅
- Heartie recommendations ✅

**Action:** Verify styling consistency with design spec

---

## 10. Onboarding Flow

### 10.1 Onboarding Screens - 🔄 ENHANCE
**Priority:** P1

**Current:** Basic onboarding exists at `src/components/Onboarding.tsx`

**Requirements from Spec:**
- Multi-screen welcome flow
- Explain 3-layer framework
- Collect initial user info
- Set first goals
- Guide to first activity

**Enhancements Needed:**
1. **Add framework explanation screen** with visual diagram
2. **Improve visual polish** - illustrations, animations
3. **Multi-step progress indicator**

**Files to Update:**
- `src/components/Onboarding.tsx` - Enhance with framework explanation

---

## 11. New UI Components

### 11.1 Decorative Elements - ➕ NEW
**Priority:** P2

**Requirements:**
- Flower motif SVG for decoration
- Organic background shapes
- Hand-drawn underline SVG
- Wavy dividers

**Files to Create:**
- `src/components/decorative/FlowerIcon.tsx`
- `src/components/decorative/WavyUnderline.tsx`
- `src/components/decorative/OrganicShape.tsx`

**Files to Update:**
- `src/index.css` - Add decorative utilities

---

## 12. Responsive Design

### 12.1 Mobile Optimization - 🔄 ENHANCE
**Priority:** P1

**Current:** Basic responsive classes exist

**Requirements:**
- Verify all cards stack properly on mobile
- Calendar switches to single column
- Framework diagram switches to horizontal flow
- Header hamburger menu works smoothly

**Action:** Comprehensive mobile testing and refinement

**Files to Review:**
- All page components for responsive classes
- `src/components/layout/Header.tsx` - Mobile menu

---

## 13. Animations & Micro-interactions

### 13.1 Animation Library - ✅ MOSTLY COMPLETE
**Priority:** P2

**Current:** Extensive animations defined in `src/index.css`

**Existing:**
- fadeIn, scaleIn, slideIn variants ✅
- Bounce, pulse, shimmer ✅
- Button ripple effects ✅
- Smooth transitions ✅
- Reduced motion support ✅

**Enhancement:**
- Add Heartie bubble pulse animation
- Add framework diagram "reveal" animation

**Files to Update:**
- `src/index.css` - Add new animations as needed

---

## 14. Data & State Management

### 14.1 Supabase Integration - ✅ COMPLETE
**Priority:** P3

**Current:**
- Supabase client configured ✅
- Health indicator showing connection status ✅
- Mock data layer exists ✅

**Action:** Continue migrating from mock data to Supabase as needed

---

## 15. Accessibility

### 15.1 A11y Compliance - 🔄 ENHANCE
**Priority:** P1

**Requirements:**
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Screen reader friendly
- Reduced motion support ✅ (already implemented)

**Action:** Comprehensive accessibility audit

**Files to Review:**
- All interactive components
- Form inputs
- Modals and panels

---

## Implementation Phases

### Phase 1: Critical Framework & UI (Week 1)
**P0 Items - Must Have**

1. ✅ Verify design system is correct (colors, fonts) - DONE
2. ➕ Create FrameworkDiagram component
3. ➕ Implement Heartie AI chat bubble (floating)
4. ➕ Add framework visualization to Strategy page
5. 🔄 Enhance Framework Health card on Dashboard

**Deliverables:**
- 3-layer framework visible across app
- Heartie chat bubble functional
- Visual identity matches spec

---

### Phase 2: Missing Features & Enhancements (Week 2)
**P1 Items - High Priority**

1. ➕ Build Category Questionnaire flow (Strategy)
2. ➕ Add Quick Stats card (Dashboard)
3. ➕ Add Week Preview strip (Dashboard)
4. 🔄 Add layer color indicators (Strategy)
5. 🔄 Add recommended next step star (Strategy)
6. 🔄 Enhance Onboarding with framework explanation
7. 🔄 Mobile responsiveness review

**Deliverables:**
- Users can complete strategic questionnaires
- Dashboard has all specified cards
- Mobile experience is smooth

---

### Phase 3: Polish & Refinement (Week 3)
**P2 Items - Medium Priority**

1. ➕ Create decorative element components (flowers, wavy lines)
2. 🔄 Refine Calendar view details (today highlight, etc.)
3. 🔄 Enhance Templates integration ("Add to Calendar")
4. 🔄 Animation enhancements
5. 🔄 Minor styling adjustments across all pages
6. Accessibility audit

**Deliverables:**
- Visual polish and personality
- Seamless user experience
- Accessible interface

---

### Phase 4: Nice-to-Haves (Week 4)
**P3 Items - Low Priority**

1. Advanced Heartie AI features
2. Additional decorative touches
3. Performance optimizations
4. Advanced animations
5. User preference settings

**Deliverables:**
- Delightful details
- Optimized performance

---

## Success Metrics

### Visual Consistency
- [ ] All pages use correct brand colors
- [ ] Typography hierarchy is consistent
- [ ] Spacing follows 8px grid
- [ ] Shadows and borders match spec

### Framework Visibility
- [ ] 3-layer framework explained in onboarding
- [ ] Framework diagram visible on Strategy page
- [ ] Framework Health shows on Dashboard
- [ ] Layer colors used consistently

### User Experience
- [ ] Heartie bubble accessible from all pages
- [ ] Strategic questionnaires are easy to complete
- [ ] Calendar drag-and-drop works smoothly
- [ ] Mobile experience is seamless

### Completeness
- [ ] All specified cards present on Dashboard
- [ ] All navigation items functional
- [ ] All modals and panels working
- [ ] Templates integrate with Calendar

---

## Files Summary

### Files to Create (New Components)
```
src/components/framework/
  ├── FrameworkDiagram.tsx
  └── LayerCard.tsx

src/components/heartie/
  ├── HeartieBubble.tsx
  └── ChatMessage.tsx

src/components/dashboard/
  ├── QuickStats.tsx
  └── WeekPreview.tsx

src/components/strategy/
  ├── QuestionnaireModal.tsx
  ├── QuestionSection.tsx
  └── QuestionTypes.tsx

src/components/decorative/
  ├── FlowerIcon.tsx
  ├── WavyUnderline.tsx
  └── OrganicShape.tsx

src/contexts/
  └── HeartieContext.tsx

src/data/
  └── questionnaireData.ts
```

### Files to Update (Enhancements)
```
src/pages/
  ├── Dashboard.tsx         - Add QuickStats, WeekPreview, enhance Framework Health
  ├── Strategy.tsx          - Add FrameworkDiagram, enhance categories, build questionnaire
  ├── Calendar.tsx          - Minor refinements (today highlight, drop targets)
  ├── Templates.tsx         - Minor enhancements
  ├── Goals.tsx             - Verify colors
  └── Insights.tsx          - Verify styling

src/components/layout/
  ├── Layout.tsx            - Add HeartieBubble
  └── Header.tsx            - Minor logo/nav refinements

src/components/
  └── Onboarding.tsx        - Add framework explanation

src/index.css               - Add decorative utilities, new animations
```

---

## Risk Assessment

### Low Risk ✅
- Design system updates (colors already correct)
- Component styling refinements
- Adding missing cards to Dashboard

### Medium Risk ⚠️
- Heartie AI chat bubble (new floating component, needs state management)
- Framework diagram component (complex visualization)
- Mobile responsiveness testing

### High Risk 🔴
- Strategic questionnaire implementation (significant new feature, multi-step forms, data model)
- AI content generation integration (backend requirements)

**Mitigation:** Implement in phases, test thoroughly, use TypeScript for type safety

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Prioritize features** based on business needs
3. **Begin Phase 1** implementation (Framework & Heartie bubble)
4. **Set up project tracking** for each component
5. **Schedule regular design reviews** during implementation

---

## Conclusion

The Heartie application has an excellent foundation with correct design system implementation. The primary work involves:

1. **Making the 3-layer framework more visible** through diagrams and visual hierarchy
2. **Adding the Heartie AI chat bubble** as a persistent helper
3. **Implementing strategic questionnaires** for Layer 1 & 2 categories
4. **Filling in missing Dashboard components** (Quick Stats, Week Preview)
5. **Visual polish and refinement** across all pages

The implementation is estimated at **3-4 weeks** for full completion across all phases, with the most critical framework visualization and Heartie bubble achievable in Week 1.
