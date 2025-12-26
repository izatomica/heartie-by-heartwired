# Application Shell Structure

## Overview

The Heartie application follows a fixed header layout with scrollable main content area and a persistent AI assistant bubble in the bottom-right corner.

## Layout Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER BAR (fixed, 64px height, white background)                  │
│  ┌─────────┐ ┌──────────────────────────────────┐ ┌───────────────┐ │
│  │ Logo    │ │ Dashboard│Calendar│Strategy│     │ │ 🔔 │ Avatar ▼│ │
│  │         │ │ Templates│Insights│               │ │               │ │
│  └─────────┘ └──────────────────────────────────┘ └───────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MAIN CONTENT AREA (scrollable, --cream background)                 │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  [Page content changes based on route]                        │  │
│  │                                                               │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│                                              ┌─────────────────────┐│
│                                              │ HEARTIE BUBBLE      ││
│                                              │ (AI Assistant)      ││
│                                              │ Fixed bottom-right  ││
│                                              └─────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## Layout Components

### Header Bar
- **Position:** Fixed at top
- **Height:** 64px
- **Background:** White
- **Z-index:** High (above content)
- **Contains:** Logo, main navigation, notifications, and user menu

### Main Content Area
- **Background:** `var(--cream)` (#FCF7F1)
- **Padding-top:** 64px (header height)
- **Scrolling:** Vertical scroll enabled
- **Content:** Route-based page content (Dashboard, Calendar, etc.)
- **Max-width:** Optional constraint for very wide screens

### Heartie Bubble
- **Position:** Fixed at bottom-right corner
- **Spacing:** 24px from bottom and right edges
- **Z-index:** Very high (always on top)
- **Purpose:** Always-accessible AI assistant

## Implementation Notes

- The header should remain fixed while content scrolls beneath it
- Main content area should have top padding equal to header height
- Cream background (#FCF7F1) provides warmth - never use pure white for main background
- Heartie bubble should be accessible on all pages except onboarding

## Responsive Behavior

### Mobile (< 768px)
- Header navigation collapses to hamburger menu
- Heartie bubble becomes smaller (icon only in collapsed state)
- Main content uses full width with appropriate padding

### Tablet (768px - 1023px)
- Header may show abbreviated navigation labels
- Content area may have constrained max-width

### Desktop (≥ 1024px)
- Full header with all navigation items visible
- Content area with comfortable margins
- Heartie bubble at standard size

## See Also

- [Header Navigation](./header-navigation.md) - Detailed header component specifications
- [Heartie Assistant](./heartie-assistant.md) - AI bubble interface details
- [Design System Colors](../03-design-system/colors.md) - Background and UI colors
