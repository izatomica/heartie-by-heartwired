# Quick Reference: Component Checklist

> Use this checklist when building any new component to ensure consistency with the Heartwired design system

## Essential Design Elements

### ✅ Typography
- [ ] Headlines use **Bricolage Grotesque** (600-700 weight)
- [ ] Body text uses **Open Sans** (400-600 weight)
- [ ] Minimum 16px font size for body text
- [ ] Line-height of 1.6 for readability
- [ ] Letter-spacing: -0.02em for large headlines

### ✅ Colors
- [ ] Primary actions use **Burgundy** (`#7A2D4D`)
- [ ] Active/selected states use **Teal** (`#1B6B6B`)
- [ ] Main background is **Cream** (`#FCF7F1`), NOT white
- [ ] Cards/modals use white backgrounds
- [ ] Text uses warm near-black (`#1A1A1A`), NOT pure black
- [ ] Funnel colors ONLY for activity categorization (not general UI)
- [ ] Check [color cheat sheet](./color-cheat-sheet.md) for specific usage

### ✅ Spacing
Use the 8px-based spacing scale:
- [ ] `4px` (space-1) - Tiny gaps
- [ ] `8px` (space-2) - Small gaps
- [ ] `12px` (space-3) - Medium-small
- [ ] `16px` (space-4) - Medium
- [ ] `24px` (space-6) - Standard padding
- [ ] `32px` (space-8) - Large gaps
- [ ] Generous spacing between elements (don't crowd)

### ✅ Border Radius
- [ ] `6px` (sm) - Tags, badges
- [ ] `10px` (md) - Buttons, inputs
- [ ] `16px` (lg) - Cards
- [ ] `24px` (xl) - Large cards, modals
- [ ] `9999px` (full) - Pills, avatars
- [ ] **NO sharp angles** - all corners rounded

### ✅ Shadows
- [ ] `shadow-sm` - Standard cards
- [ ] `shadow-md` - Hover states
- [ ] `shadow-lg` - Tooltips, toasts
- [ ] `shadow-xl` - Modals
- [ ] Use warm tint: `rgba(26, 26, 26, 0.XX)`

## Component-Specific Requirements

### Buttons
- [ ] Primary: Burgundy bg, white text, 12px/24px padding
- [ ] Hover: Burgundy dark (`#5E2239`)
- [ ] Active: Scale to 0.98
- [ ] Border-radius: `10px` (md)
- [ ] Font: Open Sans 600, 16px
- [ ] Transition: all 200ms ease

### Form Inputs
- [ ] White background
- [ ] Border: `1px solid #DDD8CC`
- [ ] Padding: 12px/16px
- [ ] Font: Open Sans 400, 16px
- [ ] Focus: Teal border + dusty pink light shadow
- [ ] Placeholder: Text muted color (`#8A8A8A`)
- [ ] Border-radius: `10px` (md)

### Cards
- [ ] White background
- [ ] Border-radius: `16px` (lg)
- [ ] Shadow: `shadow-sm`
- [ ] Padding: `24px`
- [ ] Hover (if clickable): `shadow-md` + translateY(-2px)
- [ ] Transition: all 200ms ease

### Progress Bars
- [ ] Track: Cream dark (`#F5F0EB`)
- [ ] Fill: Teal (`#1B6B6B`) or funnel color
- [ ] Height: `8px`
- [ ] Border-radius: `9999px` (full)
- [ ] Animation: width transition 300ms ease

### Tabs
- [ ] Active: Teal bg, white text, 20px border-radius
- [ ] Inactive: Transparent bg, gray text (`#5A5A5A`)
- [ ] Smooth transition between states

## Accessibility Requirements

### Focus States
- [ ] Visible focus indicator on all interactive elements
- [ ] Focus ring color: Teal (`#1B6B6B`)
- [ ] Focus ring: `0 0 0 3px rgba(27, 107, 107, 0.15)`
- [ ] Never remove outline without replacement

### Touch Targets (Mobile)
- [ ] Minimum 44px height for all clickable elements
- [ ] Adequate spacing between touch targets (min 8px)
- [ ] Full-width inputs on mobile

### Color Contrast
- [ ] Text on burgundy bg: White (`#FFFFFF`)
- [ ] Text on teal bg: White (`#FFFFFF`)
- [ ] Text on cream bg: Near black (`#1A1A1A`)
- [ ] Ensure WCAG AA compliance (4.5:1 for normal text)

## Interaction States

### Hover
- [ ] Defined hover state for all interactive elements
- [ ] Smooth transition (200-300ms)
- [ ] Visual feedback (color, shadow, or transform)

### Active/Pressed
- [ ] Defined active state (scale or color change)
- [ ] Immediate feedback (no delay)

### Disabled
- [ ] Reduced opacity or muted color
- [ ] Cursor: not-allowed
- [ ] No hover effects

### Loading
- [ ] Loading indicator when action takes >300ms
- [ ] Disable interaction during loading
- [ ] Clear visual feedback

## Responsive Considerations

### Breakpoints
- [ ] Mobile: < 768px
- [ ] Tablet: 768px - 1023px
- [ ] Desktop: ≥ 1024px

### Mobile Adaptations
- [ ] Single column layout on mobile
- [ ] Bottom sheets instead of side panels
- [ ] Full-width cards and inputs
- [ ] Larger touch targets (44px minimum)
- [ ] Adequate spacing for fat fingers

## Design Philosophy Checklist

### Warm & Organic
- [ ] Soft curves, no sharp angles
- [ ] Warm colors (cream, burgundy, dusty pink)
- [ ] Generous spacing, not cramped
- [ ] Decorative elements appropriate to context

### Human-First
- [ ] Friendly, supportive tone in copy
- [ ] Clear, helpful error messages
- [ ] Encouraging feedback messages
- [ ] No jargon or technical language

### Consistency
- [ ] Matches existing component patterns
- [ ] Uses design system tokens (not hard-coded values)
- [ ] Follows established interaction patterns
- [ ] Aligns with 3-layer framework philosophy

## Before Shipping

- [ ] Tested on mobile, tablet, and desktop
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (if applicable)
- [ ] All states (hover, focus, active, disabled) styled
- [ ] Animations smooth (no jank)
- [ ] Loading states defined
- [ ] Error states handled
- [ ] Cross-browser tested (Chrome, Safari, Firefox)

---

## See Also

- [Color Cheat Sheet](./color-cheat-sheet.md) - Quick color lookup
- [Framework Guide](./framework-guide.md) - 3-layer framework summary
- [Complete Component Specs](../07-components/) - Detailed specifications
- [Design System](../03-design-system/) - Full design system documentation
- [Critical Design Rules](../11-rules/critical-design-rules.md) - Non-negotiable rules
