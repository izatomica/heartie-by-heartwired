# Decorative Elements

Heartie uses subtle decorative elements to add personality and warmth to the interface.

## Flower Motif

**Style**: Simple line-drawn flowers used as decorative accents throughout the application.

### Usage

- List bullets (replace standard bullets with small flower icons)
- Section dividers (small flowers between sections)
- Empty state illustrations
- Celebration moments (flower confetti or blooms)
- Loading states (flower animation)

### Visual Specifications

- **Style**: Minimalist, hand-drawn aesthetic
- **Stroke width**: 2px
- **Color**: Single color from accent palette (context-dependent)
  - Burgundy (#7A2D4D) for CTAs and emphasis
  - Funnel colors for stage-specific content
  - Muted gray (#8A8A8A) for background decorations
  - Dusty pink (#D07080) for Heartie's personality touches

### When to Use

- As a welcoming touch on empty states
- To celebrate completed milestones or goals
- As subtle decorations in Heartie's dialogue
- In onboarding to make it feel warm and inviting

### When NOT to Use

- Don't overuse - should feel special, not overwhelming
- Avoid in data-heavy views (Insights, detailed reports)
- Skip in forms where focus is critical

---

## Organic Shapes

**Style**: Soft, blob-like shapes with smooth curves.

### Characteristics

- All curves, NO sharp angles
- Asymmetric and slightly irregular (hand-drawn feel)
- Subtle opacity (5-10%)
- Used as background elements only

### Usage

- Page backgrounds (very subtle, large blobs)
- Section backgrounds (behind cards)
- Empty state backdrops
- Decorative accents in hero sections

### Visual Specifications

- **Fill**: Solid color at low opacity (5-10%)
- **Colors**: Usually layer colors or accent colors
  - Burgundy at 8% for Brand Strategy sections
  - Teal at 8% for Marketing Strategy sections
  - Dusty pink at 8% for personality touches
- **Size**: Large (200-400px) for backgrounds
- **Position**: Always behind content, never interfering with readability

### Rules

1. **Never overwhelm content** - If it competes with text, reduce opacity or remove
2. **Keep it subtle** - Should be barely noticeable
3. **No harsh geometric shapes** - Only soft, organic blobs
4. **Use sparingly** - 1-2 shapes per view maximum

---

## Hand-Drawn Underlines

**Style**: Wavy, slightly imperfect underlines beneath key phrases.

### Usage

- Emphasize key words in headlines
- Highlight important concepts in onboarding
- Draw attention to CTAs without using bold colors
- Add personality to Heartie's messages

### Visual Specifications

- **Style**: Wavy or gently curved
- **Stroke**: 2-3px
- **Color**: Context-dependent
  - Burgundy for CTAs
  - Teal for active/current states
  - Dusty pink for soft emphasis
- **Imperfection**: Slightly irregular curves (not perfectly symmetrical)
- **Position**: Slightly below text baseline (2-4px gap)

### When to Use

- Hero headlines on landing/onboarding
- Key strategic insights ("Your unfair advantage is...")
- Heartie's encouraging messages
- Call-to-action phrases

### When NOT to Use

- Body text (too distracting)
- Navigation (use standard underlines)
- Data labels (maintain clarity)
- Form labels (confusing for accessibility)

---

## Animation Touches

### Flower Bloom Animation

Used for success states and celebrations:
- Starts as a closed bud
- Blooms open with petals unfurling
- Final state shows full flower
- Duration: 600-800ms

### Gentle Pulse

Used for Heartie's bubble when she has a suggestion:
- Subtle scale animation (1.0 to 1.05)
- Duration: 2s, infinite, ease-in-out
- Very subtle, not distracting

### Wavy Divider

Animated wavy line that gently undulates:
- Used as section dividers
- Slow, calming motion
- 3-4 second loop
- SVG-based for smooth curves

---

## Guidelines for Adding New Decorative Elements

1. **Does it add warmth without distraction?** ✓ Good
2. **Does it compete with content for attention?** ✗ Remove it
3. **Is it organic and soft (no sharp angles)?** ✓ Good
4. **Does it use brand colors thoughtfully?** ✓ Good
5. **Can the interface work without it?** ✓ If yes, it's decorative (good)

---

## See Also

- [Colors](./colors.md) - Colors for decorative elements
- [Spacing and Layout](./spacing-and-layout.md) - Positioning decorative elements
- [Critical Design Rules](../11-rules/critical-design-rules.md) - Design philosophy and constraints
