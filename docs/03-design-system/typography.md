# Typography

## Fonts

### Headlines

**Font Family:** `'Bricolage Grotesque', sans-serif`

**Use for:**
- H1, H2, H3
- Card titles
- Navigation items
- Button text

**Weights:**
- **600 (semibold)** - Most headlines, card titles, navigation
- **700 (bold)** - Hero headlines, major emphasis

**Letter-spacing:**
- `-0.02em` for large headlines (tighter)
- `normal` for smaller headlines and buttons

### Body Text

**Font Family:** `'Open Sans', sans-serif`

**Use for:**
- Paragraphs
- Form labels
- Helper text
- Descriptions
- UI text

**Weights:**
- **400 (regular)** - Body text, paragraphs
- **500 (medium)** - Emphasis within body text
- **600 (semibold)** - Form labels, strong emphasis

**Letter-spacing:**
- `normal` for all body text

## Font Import

Import these fonts from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Or via CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Open+Sans:wght@400;500;600&display=swap');
```

## Typography Scale

Recommended font sizes for different contexts:

```css
/* Headlines */
--text-6xl: 60px;    /* Hero headlines */
--text-5xl: 48px;    /* H1 */
--text-4xl: 36px;    /* H2 */
--text-3xl: 30px;    /* H3 */
--text-2xl: 24px;    /* Card titles */
--text-xl: 20px;     /* Large UI text */

/* Body */
--text-lg: 18px;     /* Large body, emphasized */
--text-base: 16px;   /* Default body text */
--text-sm: 14px;     /* Small labels, helper text */
--text-xs: 12px;     /* Tiny labels, metadata */
```

## Line Height

```css
/* Headlines */
--leading-tight: 1.2;    /* Large headlines */
--leading-snug: 1.375;   /* Smaller headlines, card titles */

/* Body */
--leading-normal: 1.5;   /* UI text, labels */
--leading-relaxed: 1.6;  /* Body paragraphs (preferred) */
--leading-loose: 1.75;   /* Long-form content */
```

## Usage Examples

### Page Title
```css
font-family: 'Bricolage Grotesque', sans-serif;
font-size: 36px;
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.02em;
```

### Card Title
```css
font-family: 'Bricolage Grotesque', sans-serif;
font-size: 20px;
font-weight: 600;
line-height: 1.375;
```

### Body Paragraph
```css
font-family: 'Open Sans', sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 1.6;
```

### Form Label
```css
font-family: 'Open Sans', sans-serif;
font-size: 14px;
font-weight: 600;
line-height: 1.5;
```

### Button Text
```css
font-family: 'Bricolage Grotesque', sans-serif;
font-size: 16px;
font-weight: 600;
line-height: 1;
```

## Typography Rules

1. **Never use more than 2 font weights** on the same element
2. **Minimum body text**: 16px for readability
3. **Line height for body**: 1.6 (relaxed, easy to read)
4. **Headlines**: Always use Bricolage Grotesque
5. **Everything else**: Always use Open Sans

## See Also

- [Colors](./colors.md) - Text color specifications
- [Spacing and Layout](./spacing-and-layout.md) - Spacing between text elements
- [Component Checklist](../quick-reference/component-checklist.md) - Typography in components
