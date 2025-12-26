# Animations

## Transitions

```css
--transition-fast: 150ms ease-out;
--transition-normal: 250ms ease-out;
--transition-slow: 350ms ease-out;
```

## Key Animations

**Page transitions:** Fade in (200ms)

**Modal open:** Overlay fade + content scale from 0.95 to 1

**Side panel slide:** translateX from 100% to 0

**Button hover:** background-color transition, subtle scale (1.02)

**Card hover:** shadow increase, translateY (-2px)

**Progress bar fill:** width transition (300ms)

**Drag and drop:**
- Pick up: scale(1.02), shadow-lg, opacity(0.9)
- Drop target: background color change, dashed border
- Drop: scale back to 1, smooth position transition

**Loading states:**
- Skeleton screens with shimmer animation
- Spinner with Heartwired flower motif

**Success celebration:**
- Confetti burst or sparkle animation (for completing activities, hitting milestones)
