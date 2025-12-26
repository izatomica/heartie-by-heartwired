# Cards and Containers

## Base Card

```css
Background: white
Border-radius: var(--radius-lg)
Shadow: var(--shadow-sm)
Padding: 24px
Hover (if clickable): shadow-md, translateY(-2px)
Transition: all 200ms ease
```

## Modals

### Modal Overlay

```css
Background: rgba(26, 26, 26, 0.5)
Backdrop blur: 4px
```

### Modal Content

```css
Background: white
Border-radius: var(--radius-xl)
Shadow: var(--shadow-xl)
Max-width: 480px (forms), 640px (content), 800px (large)
Padding: 24px
Animation: fade in + scale up (200ms)
```

## Progress Bars

```css
Track: var(--cream-dark)
Fill: #7A2D4D or funnel stage color
Height: 8px
Border-radius: var(--radius-full)
Animation: width transition 300ms ease
```

## Tooltips

```css
Background: var(--text-primary)
Text: white, Open Sans 400, 14px
Padding: 8px 12px
Border-radius: var(--radius-sm)
Arrow: pointing to trigger element
Max-width: 240px
Animation: fade in (150ms)
```
