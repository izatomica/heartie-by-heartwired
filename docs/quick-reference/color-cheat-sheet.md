# Quick Reference: Color Cheat Sheet

> Quick lookup for Heartwired brand colors and usage

## Component → Color Quick Lookup

| Component | Color | Hex Code |
|-----------|-------|----------|
| **Primary buttons** | Burgundy | `#7A2D4D` |
| **Button hover** | Burgundy Dark | `#5E2239` |
| **Active tabs** | Teal Dark | `#1B6B6B` |
| **Progress bar fill** | Teal Dark | `#1B6B6B` |
| **Focus rings** | Teal Dark | `#1B6B6B` |
| **Current indicators** | Dusty Pink | `#D07080` |
| **Hover backgrounds** | Dusty Pink Light | `#F0D5D8` |
| **Main background** | Cream | `#FCF7F1` |
| **Cards/modals** | White | `#FFFFFF` |
| **Borders** | Warm Gray | `#DDD8CC` |
| **Primary text** | Near Black | `#1A1A1A` |
| **Secondary text** | Gray | `#5A5A5A` |

## Primary Brand Colors

```css
/* Burgundy - Primary Actions */
--burgundy: #7A2D4D;           /* Primary buttons, CTAs */
--burgundy-dark: #5E2239;      /* Hover, pressed states */
--burgundy-light: #9A4D6D;     /* Lighter variant */

/* Teal - Active States */
--teal-dark: #1B6B6B;          /* Active tabs, progress, selected, focus */
--teal: #2D8A8A;               /* Secondary teal */
--teal-light: #4BA3A3;         /* Hover on teal elements */

/* Dusty Pink - Highlights */
--dusty-pink: #D07080;         /* Soft highlights, current indicators */
--dusty-pink-light: #F0D5D8;   /* Hover backgrounds, card highlights */

/* Backgrounds */
--cream: #FCF7F1;              /* Main app background */
--cream-dark: #F5F0EB;         /* Secondary backgrounds, hover */
--white: #FFFFFF;              /* Cards, modals, inputs */
```

## Funnel Stage Colors

| Stage | Display Name | Color | Hex Code |
|-------|-------------|-------|----------|
| Awareness | Getting Seen | Sky Blue | `#A8D5E5` |
| Consideration | Building Trust | Sage/Mint | `#9DCDB5` |
| Conversion | Making the Ask | Gold/Mustard | `#E8C86B` |
| Retention | Keeping Connected | Lavender | `#C5C0E8` |

**Use ONLY for:**
- Activity card left borders
- Funnel stage tags/badges
- Funnel health visualizations
- Calendar activity categorization
- **NOT for general UI elements**

## Layer Colors (3-Layer Framework)

| Layer | Name | Color | Hex Code |
|-------|------|-------|----------|
| Layer 1 | Brand Strategy | Burgundy | `#7A2D4D` |
| Layer 2 | Marketing Strategy | Teal | `#1B6B6B` |
| Layer 3 | Marketing Plan | Sage Green | `#5A9A6B` |

## Semantic/Status Colors

```css
--success: #5A9A6B;            /* Success states - Sage green */
--success-light: #E5F0E8;      /* Success backgrounds */
--warning: #D4A84B;            /* Warning states - Gold */
--warning-light: #FDF6E3;      /* Warning backgrounds */
--error: #C06070;              /* Error states - Muted rose */
--error-light: #F8E8EB;        /* Error backgrounds */
--info: #4BA3A3;               /* Info states - Teal */
--info-light: #E5F2F2;         /* Info backgrounds */
```

## Text Colors

```css
--text-primary: #1A1A1A;       /* Main text - warm near-black */
--text-secondary: #5A5A5A;     /* Secondary text, descriptions */
--text-muted: #8A8A8A;         /* Placeholders, hints, disabled */
--text-inverse: #FFFFFF;       /* Text on dark backgrounds */
```

## UI Element Colors

```css
--border: #DDD8CC;             /* Borders, dividers */
--border-focus: #1B6B6B;       /* Focus rings - teal */
--shadow: rgba(26, 26, 26, 0.08);  /* Shadows */
--card-bg: #FFFFFF;            /* Card backgrounds */
--input-bg: #FFFFFF;           /* Input backgrounds */
```

## ⚠️ NEVER USE

| Color | Why Not |
|-------|---------|
| Pure Black (`#000000`) | Use `#1A1A1A` instead |
| Orange | Not in brand palette |
| Pure White backgrounds | Use Cream (`#FCF7F1`) for app bg |
| Generic Amber | Use our Warning Gold (`#D4A84B`) |
| Bright Red | Use our Error Rose (`#C06070`) |

## Common Use Cases

### Buttons
- **Primary Action**: `#7A2D4D` (Burgundy)
- **Primary Hover**: `#5E2239` (Burgundy Dark)
- **Secondary Button**: Transparent bg + `#7A2D4D` border
- **Secondary Hover**: `#F0D5D8` (Dusty Pink Light) bg

### Tabs
- **Active Tab**: `#1B6B6B` (Teal) bg + white text
- **Inactive Tab**: Transparent bg + `#5A5A5A` (Gray) text

### Progress Bars
- **Track**: `#F5F0EB` (Cream Dark)
- **Fill**: `#1B6B6B` (Teal)

### Status Indicators
- **On Track**: `#5A9A6B` (Sage Green)
- **Warning**: `#D4A84B` (Gold)
- **Error**: `#C06070` (Muted Rose)
- **Complete**: `#1B6B6B` (Teal) with checkmark

---

## See Also

- [Complete Color Specifications](../03-design-system/colors.md)
- [Design System Overview](../03-design-system/README.md)
- [Critical Design Rules](../11-rules/critical-design-rules.md)
