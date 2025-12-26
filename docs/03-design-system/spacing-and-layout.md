# Spacing and Layout

## Spacing Scale (8px base)

Heartie uses an 8px-based spacing system for consistent, harmonious layouts.

```css
--space-1: 4px;      /* Tiny gaps, tight spacing */
--space-2: 8px;      /* Base unit, minimal spacing */
--space-3: 12px;     /* Small spacing */
--space-4: 16px;     /* Default spacing for most elements */
--space-5: 20px;     /* Medium spacing */
--space-6: 24px;     /* Standard card/section spacing */
--space-8: 32px;     /* Large spacing, section dividers */
--space-10: 40px;    /* Extra large spacing */
--space-12: 48px;    /* Very large spacing */
--space-16: 64px;    /* Huge spacing, major sections */
--space-20: 80px;    /* Maximum spacing */
```

## Usage Guidelines

### Common Spacing Patterns

- **Between elements in a card**: `space-4` (16px) or `space-6` (24px)
- **Card padding**: `space-6` (24px) or `space-8` (32px)
- **Section spacing**: `space-8` (32px) or `space-12` (48px)
- **Form field gap**: `space-4` (16px)
- **Button padding**: `space-4 space-6` (16px vertical, 24px horizontal)
- **Icon-to-text gap**: `space-2` (8px) or `space-3` (12px)

### Generous Spacing Philosophy

When in doubt, add MORE white space. Heartie should feel airy and calm, not cramped.

---

## Border Radius

All corners in Heartie are rounded for a soft, organic feel.

```css
--radius-sm: 6px;              /* Small elements, tags, badges */
--radius-md: 10px;             /* Buttons, inputs */
--radius-lg: 16px;             /* Cards */
--radius-xl: 24px;             /* Large cards, modals */
--radius-full: 9999px;         /* Pills, avatars, circular elements */
```

### Border Radius Usage

- **Buttons**: `radius-md` (10px)
- **Input fields**: `radius-md` (10px)
- **Cards**: `radius-lg` (16px)
- **Modals**: `radius-xl` (24px)
- **Tags/badges**: `radius-sm` (6px) or `radius-full` for pills
- **Images/avatars**: `radius-full` (circular)
- **Progress bars**: `radius-full` (fully rounded ends)

### Critical Rule

**NO SHARP ANGLES** - Every interactive element and container must have rounded corners.

---

## Shadows

Shadows in Heartie use a warm tint (rgba with warm black) and are soft, never harsh.

```css
--shadow-xs: 0 1px 2px rgba(26, 26, 26, 0.04);      /* Subtle lift */
--shadow-sm: 0 2px 4px rgba(26, 26, 26, 0.06);      /* Cards, default */
--shadow-md: 0 4px 8px rgba(26, 26, 26, 0.08);      /* Elevated cards */
--shadow-lg: 0 8px 16px rgba(26, 26, 26, 0.10);     /* Modals, popovers */
--shadow-xl: 0 16px 32px rgba(26, 26, 26, 0.12);    /* Overlays, major emphasis */
```

### Shadow Usage

- **Cards (default)**: `shadow-sm`
- **Cards (hover)**: `shadow-md`
- **Modals**: `shadow-lg`
- **Dropdowns/popovers**: `shadow-lg`
- **Heartie bubble**: `shadow-lg`
- **Header**: `shadow-xs`

### Shadow Rules

1. **Use warm-tinted shadows** - Always rgba(26, 26, 26, ...), never pure black
2. **Keep shadows soft** - Low opacity (4-12%)
3. **Subtle elevation** - Use shadows sparingly for depth, not decoration

---

## Layout Patterns

### Card Layout

```css
.card {
  padding: var(--space-6);           /* 24px */
  border-radius: var(--radius-lg);   /* 16px */
  box-shadow: var(--shadow-sm);
  gap: var(--space-4);               /* Space between internal elements */
}
```

### Two-Column Grid

```css
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);               /* 24px between columns */
}
```

### Section Spacing

```css
.section {
  margin-bottom: var(--space-12);    /* 48px between major sections */
}

.section-header {
  margin-bottom: var(--space-6);     /* 24px before section content */
}
```

---

## See Also

- [Colors](./colors.md) - Color specifications for borders and backgrounds
- [Typography](./typography.md) - Text sizing and line height
- [Decorative Elements](./decorative-elements.md) - Organic shapes and soft touches
- [Component Checklist](../quick-reference/component-checklist.md) - Applying spacing in components
