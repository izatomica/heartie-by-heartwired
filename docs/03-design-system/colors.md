# Color Palette

## ⚠️ CRITICAL - USE HEARTWIRED BRAND COLORS

This is the official Heartwired color palette. Do NOT substitute with generic colors.

## Primary Brand Colors

```css
/* PRIMARY ACTION - Burgundy/Wine */
--burgundy: #7A2D4D;           /* Primary buttons, CTAs, important actions */
--burgundy-dark: #5E2239;      /* Button hover, pressed states */
--burgundy-light: #9A4D6D;     /* Lighter variant */

/* ACTIVE STATES - Dark Teal */
--teal-dark: #1B6B6B;          /* Active tabs, progress bars, selected items, focus rings */
--teal: #2D8A8A;               /* Secondary teal */
--teal-light: #4BA3A3;         /* Hover states on teal elements */
```

## Soft Accent Colors

```css
/* HIGHLIGHTS - Dusty Pink/Rose */
--dusty-pink: #D07080;         /* Soft highlights, current indicators */
--dusty-pink-light: #F0D5D8;   /* Hover backgrounds, soft card highlights */

/* BACKGROUNDS */
--cream: #FCF7F1;              /* Main app background - warm off-white */
--cream-dark: #F5F0EB;         /* Secondary backgrounds, hover states */
--white: #FFFFFF;              /* Cards, modals, input backgrounds */
```

## Funnel Stage Colors (Used for activity categorization)

```css
--funnel-awareness: #A8D5E5;       /* "Getting Seen" - Sky Blue */
--funnel-consideration: #9DCDB5;   /* "Building Trust" - Sage/Mint */
--funnel-conversion: #E8C86B;      /* "Making the Ask" - Gold/Mustard */
--funnel-retention: #C5C0E8;       /* "Keeping Connected" - Lavender */
```

## Text Colors

```css
--text-primary: #1A1A1A;       /* Main text - warm near-black */
--text-secondary: #5A5A5A;     /* Secondary text, descriptions */
--text-muted: #8A8A8A;         /* Placeholders, hints, disabled text */
--text-inverse: #FFFFFF;       /* Text on dark backgrounds (burgundy, teal) */
```

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

## UI Element Colors

```css
--border: #DDD8CC;             /* Borders, dividers - warm gray */
--border-focus: #1B6B6B;       /* Focus rings - teal */
--shadow: rgba(26, 26, 26, 0.08);  /* Shadows - warm tint */
--card-bg: #FFFFFF;            /* Card backgrounds */
--input-bg: #FFFFFF;           /* Input backgrounds */
```

## Layer Colors (for 3-layer framework visualization)

```css
--layer-1-brand: #7A2D4D;      /* Brand Strategy - Burgundy (foundation) */
--layer-1-bg: rgba(122, 45, 77, 0.08);
--layer-2-marketing: #1B6B6B;  /* Marketing Strategy - Teal */
--layer-2-bg: rgba(27, 107, 107, 0.08);
--layer-3-plan: #5A9A6B;       /* Marketing Plan - Sage green */
--layer-3-bg: rgba(90, 154, 107, 0.08);
```

---

## Color Usage Guide

### Where to Use BURGUNDY (#7A2D4D):
- Primary buttons ("Start", "Save", "Create")
- Important CTAs
- Primary action links
- Key emphasis elements
- Layer 1 (Brand Strategy) indicators

### Where to Use DARK TEAL (#1B6B6B):
- Active/selected tabs
- Progress bar fills
- Focus rings on inputs
- Selected items in lists
- Checkmarks and completion indicators
- Layer 2 (Marketing Strategy) indicators

### Where to Use DUSTY PINK (#D07080 / #F0D5D8):
- Hover state backgrounds
- "Current" quarter/week indicators
- Soft card highlights
- Secondary emphasis
- Heartie's personality touches

### Where to Use CREAM (#FCF7F1):
- Main app background (NOT white)
- Progress bar tracks
- Subtle section dividers

### FUNNEL COLORS - Only for:
- Activity card left borders
- Funnel stage tags/badges
- Funnel health visualizations
- Calendar activity categorization
- **NOT for general UI elements**

---

## Specific Component Colors

### Tabs (Annual/Quarterly/Weekly)

```css
/* Active tab */
.tab-active {
  background: #1B6B6B;         /* Teal */
  color: #FFFFFF;
  border-radius: 20px;
}

/* Inactive tab */
.tab-inactive {
  background: transparent;
  color: #5A5A5A;
}
```

### Buttons

```css
/* Primary button */
.btn-primary {
  background: #7A2D4D;         /* Burgundy */
  color: #FFFFFF;
}
.btn-primary:hover {
  background: #5E2239;         /* Burgundy dark */
}

/* Secondary button */
.btn-secondary {
  background: transparent;
  border: 2px solid #7A2D4D;
  color: #7A2D4D;
}
.btn-secondary:hover {
  background: #F0D5D8;         /* Dusty pink light */
}
```

### Progress Bars

```css
/* Track (background) */
.progress-track {
  background: #F5F0EB;         /* Cream dark */
  height: 8px;
  border-radius: 4px;
}

/* Fill */
.progress-fill {
  background: #1B6B6B;         /* Teal */
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #DDD8CC;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(26, 26, 26, 0.06);
}
```

### Status Indicators

```css
/* On track */
.status-on-track {
  color: #5A9A6B;              /* Sage green */
}

/* Warning/Behind */
.status-warning {
  color: #D4A84B;              /* Gold */
}

/* Error */
.status-error {
  color: #C06070;              /* Muted rose */
}
```

### Quarterly Roadmap Cards

```css
/* Current/In-progress quarter */
.quarter-current {
  background: #F0D5D8;         /* Dusty pink light */
  border: 2px solid #D07080;   /* Dusty pink */
}

/* Completed quarter */
.quarter-completed {
  background: #FFFFFF;
  border: 1px solid #5A9A6B;   /* Sage green */
}

/* Upcoming quarter */
.quarter-upcoming {
  background: #FFFFFF;
  border: 1px solid #DDD8CC;
  color: #8A8A8A;
}
```

### Focus States

```css
input:focus, select:focus, textarea:focus {
  border-color: #1B6B6B;       /* Teal */
  box-shadow: 0 0 0 3px rgba(27, 107, 107, 0.15);
}
```

## See Also

- [Typography](./typography.md) - Font specifications
- [Spacing and Layout](./spacing-and-layout.md) - Spacing, borders, and shadows
- [Critical Design Rules](../11-rules/critical-design-rules.md) - Non-negotiable color rules
- [Component Checklist](../quick-reference/component-checklist.md) - Quick reference for building components
