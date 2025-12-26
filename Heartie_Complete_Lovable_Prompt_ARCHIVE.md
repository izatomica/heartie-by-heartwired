# HEARTIE - MARKETING PLANNER BY HEARTWIRED
## Complete Vibe Coding Specification for Lovable

> **⚠️ ARCHIVE NOTICE:** This file has been superseded by the organized documentation in the `docs/` directory.
> Please refer to `docs/README.md` for the current, well-structured documentation.
> This archive is kept for historical reference only.

---

# SECTION 1: PROJECT OVERVIEW

## What I'm Building

**App Name:** Heartie - marketing planner by Heartwired

A web-based **marketing planning SaaS platform** for female solopreneurs. The platform helps users:

1. Build strategic marketing foundations through guided questionnaires (7 categories)
2. Plan quarterly marketing using a drag-and-drop calendar
3. Track activities across a 4-stage marketing funnel
4. Generate AI content that matches their unique voice
5. Access a template library organized by funnel stage
6. Get guidance from an AI assistant called "Heartie"

**Target User:** Female solopreneurs and small business owners, ages 25-45, doing their own marketing. They feel overwhelmed and want clarity.

**Design Personality:** Warm, organic, calm, human-first, slightly whimsical but professional. Think: a supportive friend who happens to be a marketing expert.

**Tech Stack:** React + TypeScript, Tailwind CSS, Supabase for backend

---

# SECTION 2: THE 3-LAYER FRAMEWORK (Core Philosophy)

## The Foundational Concept

Heartwired is built on a **3-layer marketing framework** that separates strategy from tactics. This is the intellectual foundation of the entire platform and Iza's signature approach.

Most solopreneurs jump straight to tactics (posting, emailing, creating content) without the strategic foundation. They're busy but not effective. Heartwired fixes this by guiding users to build from the bottom up.

**The Key Insight:** You can't write effective content (Layer 3) without knowing your voice and channels (Layer 2). You can't choose channels without knowing who you're talking to (Layer 1). Most marketing fails because people skip layers.

## The 3 Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   LAYER 3: MARKETING PLAN                                       │
│   ─────────────────────────                                     │
│   WHAT you do & WHEN you do it                                  │
│                                                                 │
│   • Calendar activities                                         │
│   • Weekly content                                              │
│   • Campaigns and launches                                      │
│   • Day-to-day execution                                        │
│                                                                 │
│   This is what most people start with (mistake!)                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   LAYER 2: MARKETING STRATEGY                                   │
│   ───────────────────────────                                   │
│   WHERE you show up & HOW you sound                             │
│                                                                 │
│   • Which platforms/channels                                    │
│   • Your voice and tone                                         │
│   • Your content pillars                                        │
│   • Your realistic constraints                                  │
│                                                                 │
│   This shapes your approach                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   LAYER 1: BRAND STRATEGY (Foundation)                          │
│   ─────────────────────────────────────                         │
│   WHO you serve & WHY you matter                                │
│                                                                 │
│   • Your ideal customer                                         │
│   • Your unique position                                        │
│   • Your core messaging                                         │
│                                                                 │
│   This is where everything starts                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## How the 7 Strategic Categories Map to Layers

```
LAYER 1: BRAND STRATEGY (Foundation)
├── 🎯 Your Customer      - Who you're really talking to
├── 📍 Your Position      - What makes you different
└── 💬 Your Messaging     - The words that connect

LAYER 2: MARKETING STRATEGY (Approach)
├── ✍️  Your Voice        - How you sound (tone, style, personality)
├── 🌍 Your Reality       - Your actual constraints (time, budget, energy)
└── 🗺️  Your Landscape    - Where your audience hangs out, competitors

LAYER 3: MARKETING PLAN (Execution)
├── 🚀 Your Big Plans     - Quarterly goals, launches, campaigns
├── 📅 Calendar           - Scheduled activities
└── ✅ Activities         - Individual content pieces
```

## Layer Colors (for visual distinction)

```css
--layer-1: #7A2D4D;        /* Brand Strategy - #7A2D4D (foundation, most important) */
--layer-2: #7EB6D9;        /* Marketing Strategy - Soft blue (bridge) */
--layer-3: #7CB87C;        /* Marketing Plan - Soft green (execution) */
```

## Framework Visualization Options

### Option A: Stacked Layers (Recommended for Strategy Page)

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: MARKETING PLAN                                    │
│  What & When                                                │
│  🚀 Your Big Plans  📅 Calendar  ✅ Activities              │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │ informs
                         │
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: MARKETING STRATEGY                                │
│  Where & How                                                │
│  ✍️ Your Voice  🌍 Your Reality  🗺️ Your Landscape          │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │ informs
                         │
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: BRAND STRATEGY (Foundation)                       │
│  Who & Why                                                  │
│  🎯 Your Customer  📍 Your Position  💬 Your Messaging      │
└─────────────────────────────────────────────────────────────┘
```

### Option B: Horizontal Flow (Good for onboarding)

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   BRAND      │      │  MARKETING   │      │  MARKETING   │
│  STRATEGY    │ ───► │  STRATEGY    │ ───► │    PLAN      │
│              │      │              │      │              │
│  Who & Why   │      │ Where & How  │      │ What & When  │
│              │      │              │      │              │
│  🎯 Customer │      │  ✍️ Voice    │      │  🚀 Goals    │
│  📍 Position │      │  🌍 Reality  │      │  📅 Calendar │
│  💬 Messaging│      │  🗺️ Landscape│      │  ✅ Content  │
└──────────────┘      └──────────────┘      └──────────────┘
     START                                       END
```

## Framework Integration Points

The 3-layer framework should appear in:

1. **Onboarding** - Explain the concept early, organize categories by layer
2. **Strategy Page** - Visual diagram showing layers and completion
3. **Dashboard** - "Framework Health" card showing layer progress
4. **AI Generation** - Show which layers inform content quality
5. **Heartie Messages** - Reference layers when guiding users
6. **Empty States** - Remind users to build foundation first

## The "Aha Moment"

Design for this realization:

**Before Heartwired:**
"I'm posting every day but nothing's working."

**After understanding the framework:**
"Oh! I was doing Layer 3 without Layer 1. No wonder my content felt random."

---

# SECTION 3: DESIGN SYSTEM

## Fonts

**Headlines:** `'Bricolage Grotesque', sans-serif`
- Use for: H1, H2, H3, card titles, navigation items, button text
- Weights: 600 (semibold) for most headlines, 700 (bold) for hero headlines
- Letter-spacing: -0.02em for large headlines (tighter)

**Body Text:** `'Open Sans', sans-serif`
- Use for: Paragraphs, form labels, helper text, descriptions, UI text
- Weights: 400 (regular) for body, 500 (medium) for emphasis, 600 (semibold) for labels
- Letter-spacing: normal

**Import these fonts from Google Fonts.**

## Color Palette

### ⚠️ CRITICAL - USE HEARTWIRED BRAND COLORS

This is the official Heartwired color palette. Do NOT substitute with generic colors.

### Primary Brand Colors
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

### Soft Accent Colors
```css
/* HIGHLIGHTS - Dusty Pink/Rose */
--dusty-pink: #D07080;         /* Soft highlights, current indicators */
--dusty-pink-light: #F0D5D8;   /* Hover backgrounds, soft card highlights */

/* BACKGROUNDS */
--cream: #FCF7F1;              /* Main app background - warm off-white */
--cream-dark: #F5F0EB;         /* Secondary backgrounds, hover states */
--white: #FFFFFF;              /* Cards, modals, input backgrounds */
```

### Funnel Stage Colors (Used for activity categorization)
```css
--funnel-awareness: #A8D5E5;       /* "Getting Seen" - Sky Blue */
--funnel-consideration: #9DCDB5;   /* "Building Trust" - Sage/Mint */
--funnel-conversion: #E8C86B;      /* "Making the Ask" - Gold/Mustard */
--funnel-retention: #C5C0E8;       /* "Keeping Connected" - Lavender */
```

### Text Colors
```css
--text-primary: #1A1A1A;       /* Main text - warm near-black */
--text-secondary: #5A5A5A;     /* Secondary text, descriptions */
--text-muted: #8A8A8A;         /* Placeholders, hints, disabled text */
--text-inverse: #FFFFFF;       /* Text on dark backgrounds (burgundy, teal) */
```

### Semantic/Status Colors
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

### UI Element Colors
```css
--border: #DDD8CC;             /* Borders, dividers - warm gray */
--border-focus: #1B6B6B;       /* Focus rings - teal */
--shadow: rgba(26, 26, 26, 0.08);  /* Shadows - warm tint */
--card-bg: #FFFFFF;            /* Card backgrounds */
--input-bg: #FFFFFF;           /* Input backgrounds */
```

### Layer Colors (for 3-layer framework visualization)
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

## Spacing Scale (8px base)
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

## Border Radius
```css
--radius-sm: 6px;              /* Small elements, tags, badges */
--radius-md: 10px;             /* Buttons, inputs */
--radius-lg: 16px;             /* Cards */
--radius-xl: 24px;             /* Large cards, modals */
--radius-full: 9999px;         /* Pills, avatars, circular elements */
```

## Shadows
```css
--shadow-xs: 0 1px 2px rgba(26, 26, 26, 0.04);
--shadow-sm: 0 2px 4px rgba(26, 26, 26, 0.06);
--shadow-md: 0 4px 8px rgba(26, 26, 26, 0.08);
--shadow-lg: 0 8px 16px rgba(26, 26, 26, 0.10);
--shadow-xl: 0 16px 32px rgba(26, 26, 26, 0.12);
```

## Decorative Elements

**Flower Motif:**
- Simple line-drawn flowers used as decorative accents throughout
- Use as list bullets, section dividers, empty state illustrations, celebration moments
- Style: Minimalist, 2px stroke, single color from accent palette
- Colors: Match context (burgundy for CTAs, funnel colors for stages, muted for backgrounds)

**Organic Shapes:**
- Blob-like background shapes, wavy lines, curved elements
- All soft curves, NO sharp angles or harsh geometric shapes
- Use subtly in backgrounds, never overwhelming content

**Hand-Drawn Underlines:**
- Wavy/curved underlines beneath key phrases
- Slightly imperfect curves (human touch)
- Used sparingly for emphasis on headlines

---

# SECTION 4: GLOBAL LAYOUT

## Application Shell Structure

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

## Header Component

**Left:** Heartwired logo (text "Heartwired" in Bricolage Grotesque with small flower icon)
**Center:** Main navigation tabs - Dashboard, Calendar, Goals, Strategy, Templates, Insights
**Right:** Notification bell icon (with red badge dot when notifications) + User avatar (circular, 36px) with dropdown

**Styling:**
- Background: white
- Height: 64px
- Border-bottom: 1px solid var(--border)
- Box-shadow: var(--shadow-xs)
- Position: fixed top
- Active nav item: #7A2D4D text color with #7A2D4D underline

## Heartie Bubble (AI Assistant)

**Position:** Fixed, bottom-right corner, 24px from edges

**Collapsed State:**
- Width: ~220px, Height: ~56px
- White background, border-radius: 28px (pill shape)
- Shadow: var(--shadow-lg)
- Contains: Heartie avatar (illustrated friendly female face, 40px circle) + preview text + expand arrow
- Shows greeting or latest message preview
- Subtle pulse animation when Heartie has a suggestion

**Expanded State:**
- Width: 360px, Height: 480px
- White background, border-radius: var(--radius-xl)
- Header: "Heartie" title + close X button
- Body: Chat message history (scrollable)
- Footer: Text input + send button
- Messages styled as chat bubbles (Heartie's on left with avatar, user's on right)

**Heartie's Personality in UI:**
- Friendly, warm, encouraging tone
- Uses casual language ("Hey!", "You've got this!", "Ohhh look who's back!")
- Female persona (she/her)
- Never pushy or critical

---

# SECTION 5: DASHBOARD VIEW

**Route:** `/dashboard`

**Purpose:** At-a-glance overview of marketing status and quick access to key actions

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  Good morning, [Name]! 👋                          December 25, 2025│
│  Here's your marketing snapshot.                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ROW 1: Two cards side by side                                      │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  📅 THIS WEEK               │  │  📊 FUNNEL HEALTH           │   │
│  │                             │  │                             │   │
│  │  📝 3 posts planned         │  │  🟦 Getting Seen    ████░80%│   │
│  │  📧 1 newsletter            │  │  🟩 Building Trust  ███░ 60%│   │
│  │  ✅ 2 completed             │  │  🟨 Making the Ask  █░░░ 20%│   │
│  │  ⏳ 2 remaining             │  │  🟪 Keeping Connect ░░░░  0%│   │
│  │                             │  │                             │   │
│  │  [View Calendar →]          │  │  ⚠️ Add conversion content  │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                     │
│  ROW 2: Full width card                                             │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🎯 TODAY'S FOCUS                                             │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ 🟦│ LinkedIn Post                              [Open]   │  │  │
│  │  │   │ Topic: Behind-the-scenes               [Complete]   │  │  │
│  │  │   │ Status: Draft                          [Reschedule] │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ 🟩│ Engage: Comment on 5 posts             [Complete]   │  │  │
│  │  │   │ Platform: LinkedIn                                  │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ROW 3: Two cards side by side                                      │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  📈 QUICK STATS             │  │  💬 HEARTIE'S CORNER        │   │
│  │                             │  │                             │   │
│  │  This month:                │  │  [Heartie avatar]           │   │
│  │  +127 LinkedIn followers    │  │                             │   │
│  │  +34 Email subscribers      │  │  "You've been consistent    │   │
│  │  3 Discovery calls          │  │   for 2 weeks! 🌸"          │   │
│  │                             │  │                             │   │
│  │  [View Insights →]          │  │  [Thanks, Heartie!]         │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                     │
│  ROW 4: Full width - week preview                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📆 UPCOMING THIS WEEK                                        │  │
│  │                                                               │  │
│  │  Mon 23  │  Tue 24  │  Wed 25  │  Thu 26  │  Fri 27  │ ...   │  │
│  │  ────────┼──────────┼──────────┼──────────┼──────────┼─────  │  │
│  │  🟦 Post │  🟩 News │  🟦 Post │  🟨 DM   │  🟦 Post │       │  │
│  │          │  letter  │          │  Followup│          │       │  │
│  │                                                               │  │
│  │  [Open Full Calendar →]                                       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ROW 5: Two cards side by side                                      │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  🏗️ FRAMEWORK HEALTH        │  │  🎯 WEEKLY GOALS            │   │
│  │                             │  │                             │   │
│  │  Layer 1: Brand Strategy   │  │  6/9 goals complete         │   │
│  │  ████████████░░░░ 73%      │  │  ████████████████░░░░ 67%   │   │
│  │  🎯✓ 📍✓ 💬⋯                │  │                             │   │
│  │                             │  │  📝 Content: 3/3 ✓          │   │
│  │  Layer 2: Marketing Strat  │  │  🤝 Engagement: 2/3         │   │
│  │  ██████████░░░░░░ 53%      │  │  📧 Email: 0/1              │   │
│  │  ✍️✓ 🌍✓ 🗺️○                │  │  🎯 Business: 1/2           │   │
│  │                             │  │                             │   │
│  │  Layer 3: Marketing Plan   │  │  [View Goals →]             │   │
│  │  ████████████████ Active   │  │                             │   │
│  │                             │  │                             │   │
│  │  [Continue Building →]      │  │                             │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Dashboard Card Components

**Card Base Styling:**
- Background: white
- Border-radius: var(--radius-lg) (16px)
- Padding: 24px
- Shadow: var(--shadow-sm)
- Border: none (shadow provides definition)

**Card Header:**
- Icon + Title in Bricolage Grotesque, 18px, font-weight 600
- Margin-bottom: 16px

**Funnel Health Bars:**
- Each bar shows funnel stage color as fill
- Track: var(--cream-dark)
- Height: 8px, border-radius: full
- Label on left, percentage on right
- Info icon (ℹ️) next to each stage name - on hover shows tooltip explaining what that stage means

**Today's Focus Activity Items:**
- Left border: 4px solid [funnel stage color]
- Background: white
- Border-radius: var(--radius-md)
- Padding: 16px
- Contains: Activity title, topic/description, status badge
- Action buttons on right: Open, Complete, Reschedule (ghost buttons)

**Week Preview Strip:**
- Horizontal scroll if needed
- Each day is a column
- Day name + date at top
- Activity indicators below (small colored squares representing funnel stages)
- Today highlighted with subtle background

**Framework Health Card:**
- Shows all 3 layers with progress bars
- Layer icons: ✓ = complete, ⋯ = in progress, ○ = not started
- Links to Strategy page
- Conditional message: "Complete Layer 1 to unlock better AI content"

**Weekly Goals Card:**
- Summary of current week's goal progress
- Shows count by category (Content, Engagement, Email, Business)
- Links to Goals page

---

# SECTION 6: CALENDAR VIEW

**Route:** `/calendar`

**Purpose:** Weekly/monthly planning with drag-and-drop activity management

## Calendar Header Section

```
┌─────────────────────────────────────────────────────────────────────┐
│  Calendar                                                           │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [← Prev]  December 23-29, 2025  [Next →]    [Today]          │  │
│  │                                                               │  │
│  │  [Week View •]  [Month View]                 [+ Add Activity] │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  FILTER BY FUNNEL STAGE:                                      │  │
│  │  [🟦 Getting Seen ✓] [🟩 Building Trust ✓]                    │  │
│  │  [🟨 Making the Ask ✓] [🟪 Keeping Connected ✓]               │  │
│  │                                                               │  │
│  │  FILTER BY PLATFORM: [All Platforms ▼]                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Filter Pills:**
- Each funnel stage as a toggle pill
- Active: Filled with funnel color, white text
- Inactive: White background, gray border, gray text
- Clicking toggles visibility of that stage's activities

## Weekly Calendar Grid

```
┌─────────────────────────────────────────────────────────────────────┐
│  MON 23     │  TUE 24     │  WED 25     │  THU 26     │  FRI 27    │
│  ───────────┼─────────────┼─────────────┼─────────────┼────────────│
│             │             │   (TODAY)   │             │            │
│  ┌────────┐ │  ┌────────┐ │  ┌────────┐ │  ┌────────┐ │ ┌────────┐ │
│  │🟦      │ │  │🟩      │ │  │🟦      │ │  │🟨      │ │ │🟦      │ │
│  │LinkedIn│ │  │News-   │ │  │LinkedIn│ │  │DM      │ │ │LinkedIn│ │
│  │Post    │ │  │letter  │ │  │Post    │ │  │Followup│ │ │Post    │ │
│  │        │ │  │        │ │  │        │ │  │        │ │ │        │ │
│  │Draft ● │ │  │Ready ● │ │  │Idea  ● │ │  │Todo  ● │ │ │Idea  ● │ │
│  └────────┘ │  └────────┘ │  └────────┘ │  └────────┘ │ └────────┘ │
│             │             │             │             │            │
│  ┌────────┐ │             │  ┌────────┐ │             │            │
│  │🟩      │ │             │  │🟩      │ │             │            │
│  │Engage  │ │             │  │Engage  │ │             │            │
│  │5 posts │ │             │  │5 posts │ │             │            │
│  │        │ │             │  │        │ │             │            │
│  │Done ✓  │ │             │  │Todo  ● │ │             │            │
│  └────────┘ │             │  └────────┘ │             │            │
│             │             │             │             │            │
│    [+]      │    [+]      │    [+]      │    [+]      │   [+]      │
│             │             │             │             │            │
└─────────────┴─────────────┴─────────────┴─────────────┴────────────┘
```

## Activity Card (Calendar Item)

**Styling:**
- Width: Fill column (with 8px margin on sides)
- Min-height: 80px
- Background: white
- Border-radius: var(--radius-md) (10px)
- Left border: 4px solid [funnel stage color]
- Padding: 12px
- Shadow: var(--shadow-xs)
- Cursor: grab (draggable)

**Content:**
- Top: Platform icon (LinkedIn, envelope, Instagram camera) + Activity type
- Middle: Topic/title (truncate if long)
- Bottom: Status badge

**Status Badges:**
```
Idea:      Background #F5F5F5, Text #9B9B9B, Dot: gray
Draft:     Background #FFF8E1, Text #F57F17, Dot: amber
Ready:     Background #E8F5E9, Text #2E7D32, Dot: green
Scheduled: Background #E3F2FD, Text #1565C0, Dot: blue
Complete:  Background #E8F5E9, Text #2E7D32, Checkmark ✓
```

**Hover State:**
- Shadow increases to var(--shadow-md)
- Subtle lift (translateY: -2px)
- Show quick action icons (edit, delete, duplicate)

**Drag State:**
- Shadow: var(--shadow-lg)
- Opacity: 0.9
- Scale: 1.02
- Cursor: grabbing

**Drop Target:**
- Day column highlights with dashed border when dragging over
- Background: var(--dusty-pink-light)

## Add Activity Button

**In each day column:**
- [+] icon button at bottom
- Background: transparent
- On hover: Background var(--cream-dark)
- On click: Opens Add Activity modal with that date pre-selected

## Activity Detail Slide Panel

When clicking on an activity card, slide-in panel from right:

```
┌────────────────────────────────────────────────────────────┐
│  ✕  Edit Activity                                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  DATE                                                      │
│  [December 25, 2025          ▼]                           │
│                                                            │
│  FUNNEL STAGE                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐             │
│  │🟦      │ │🟩      │ │🟨      │ │🟪      │             │
│  │Getting │ │Building│ │Making  │ │Keeping │             │
│  │Seen •  │ │Trust   │ │the Ask │ │Connect │             │
│  └────────┘ └────────┘ └────────┘ └────────┘             │
│                                                            │
│  PLATFORM                                                  │
│  [LinkedIn                    ▼]                          │
│                                                            │
│  CONTENT PILLAR                                           │
│  [Behind-the-Scenes           ▼]                          │
│                                                            │
│  ──────────────────────────────────────────────────────   │
│                                                            │
│  TOPIC / TITLE                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ What I'm working on this week                        │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  CONTENT                                                  │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │ [Rich text editor area]                              │ │
│  │                                                      │ │
│  │                                                      │ │
│  │                                                      │ │
│  │                                                      │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  [✨ Generate with AI]  [📄 Use Template]                 │
│                                                            │
│  ──────────────────────────────────────────────────────   │
│                                                            │
│  STATUS                                                   │
│  [○ Idea] [● Draft] [○ Ready] [○ Complete]               │
│                                                            │
│  ──────────────────────────────────────────────────────   │
│                                                            │
│  [Save Changes]              [🗑️ Delete]                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Panel Styling:**
- Width: 420px
- Background: white
- Shadow: var(--shadow-xl) on left side
- Slides in from right with animation (300ms ease-out)
- Overlay: Semi-transparent dark behind panel

**Funnel Stage Selector:**
- Four boxes in a row, each with funnel color at top
- Selected state: Full background of funnel color, darker text
- Unselected: White background, colored top border only

---

# SECTION 7: STRATEGY VIEW

**Route:** `/strategy`

**Purpose:** Manage the 7 strategic categories that inform AI content generation, organized by the 3-layer framework

## Strategy Overview Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  Your Marketing Strategy                                            │
│  Built on the 3-layer framework.                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │            THE 3-LAYER FRAMEWORK                              │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  LAYER 3: MARKETING PLAN                    [green]     │  │  │
│  │  │  What & When                                            │  │  │
│  │  │                                                         │  │  │
│  │  │  🚀 Your Big Plans  ████████░░ 80%                     │  │  │
│  │  │  📅 Calendar        12 activities this week            │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                         ▲                                     │  │
│  │                         │ informs                             │  │
│  │                         │                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  LAYER 2: MARKETING STRATEGY                [blue]      │  │  │
│  │  │  Where & How                                            │  │  │
│  │  │                                                         │  │  │
│  │  │  ✍️ Your Voice      ██████░░░░ 60%                      │  │  │
│  │  │  🌍 Your Reality    ██████████ 100% ✓                  │  │  │
│  │  │  🗺️ Your Landscape  ░░░░░░░░░░ Not started             │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                         ▲                                     │  │
│  │                         │ informs                             │  │
│  │                         │                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  LAYER 1: BRAND STRATEGY (Foundation)       [burgundy]     │  │  │
│  │  │  Who & Why                                              │  │  │
│  │  │                                                         │  │  │
│  │  │  🎯 Your Customer   ████████░░ 80%                     │  │  │
│  │  │  📍 Your Position   ████░░░░░░ 40%                     │  │  │
│  │  │  💬 Your Messaging  ░░░░░░░░░░ Not started             │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  │  💡 Start with Layer 1. Everything else builds on it.       │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Click any category above to edit, or use the detailed view below: │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Alternative: Expanded Category View (Below the Framework Diagram)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  LAYER 1: BRAND STRATEGY (Foundation)                              │
│  Who you serve and why you matter                                  │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│  │ 🎯                │ │ 📍                │ │ 💬                │ │
│  │ Your Customer     │ │ Your Position     │ │ Your Messaging    │ │
│  │                   │ │                   │ │                   │ │
│  │ Define who you're │ │ What makes you    │ │ The words that    │ │
│  │ really talking to │ │ different         │ │ connect           │ │
│  │                   │ │                   │ │                   │ │
│  │ ████████░░ 80%   │ │ ████░░░░░░ 40%   │ │ ░░░░░░░░░░ 0%    │ │
│  │                   │ │                   │ │                   │ │
│  │ [Continue]        │ │ [Continue]        │ │ [Start ★]         │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘ │
│                                                                     │
│  ★ Recommended next step                                           │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  LAYER 2: MARKETING STRATEGY                                       │
│  Where you show up and how you sound                               │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│  │ ✍️                 │ │ 🌍                │ │ 🗺️                 │ │
│  │ Your Voice        │ │ Your Reality      │ │ Your Landscape    │ │
│  │                   │ │                   │ │                   │ │
│  │ How you sound     │ │ Your constraints  │ │ Where to show up  │ │
│  │ (tone, style)     │ │ (time, budget)    │ │ (channels, comps) │ │
│  │                   │ │                   │ │                   │ │
│  │ ██████░░░░ 60%   │ │ ██████████ 100%  │ │ ░░░░░░░░░░ 0%    │ │
│  │                   │ │                   │ │                   │ │
│  │ [Continue]        │ │ [Review ✓]        │ │ [Start]           │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘ │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  LAYER 3: MARKETING PLAN                                           │
│  What you do and when you do it                                    │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  ┌───────────────────┐ ┌───────────────────────────────────────────┐│
│  │ 🚀                │ │                                           ││
│  │ Your Big Plans    │ │  📅 Your Calendar & ✅ Activities         ││
│  │                   │ │                                           ││
│  │ Goals, launches,  │ │  These are managed in the Calendar and   ││
│  │ campaigns         │ │  Goals sections of the app.              ││
│  │                   │ │                                           ││
│  │ ████████░░ 80%   │ │  [Go to Calendar →]  [Go to Goals →]     ││
│  │                   │ │                                           ││
│  │ [Continue]        │ │                                           ││
│  └───────────────────┘ └───────────────────────────────────────────┘│
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  💬 Heartie says: "Your Customer is looking good! Consider         │
│     completing Your Messaging next - it'll make your content       │
│     way more targeted."                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Layer Visual Styling

Each layer section should have a subtle left border or background tint matching its color:

```css
Layer 1 (Brand Strategy):    left-border: 4px solid #7A2D4D or background: rgba(255, 155, 127, 0.05)
Layer 2 (Marketing Strategy): left-border: 4px solid var(--info) or background: rgba(126, 182, 217, 0.05)
Layer 3 (Marketing Plan):    left-border: 4px solid var(--success) or background: rgba(124, 184, 124, 0.05)
```

## Strategy Category Card

**Styling:**
- Background: white
- Border-radius: var(--radius-lg)
- Padding: 20px
- Shadow: var(--shadow-sm)
- Hover: Shadow increases, subtle lift

**Content:**
- Top: Emoji icon (large, 32px)
- Category name in Bricolage Grotesque, 16px, semibold
- Short description in muted text
- Progress bar (8px height, #1B6B6B fill on cream track)
- Percentage text or "Not started"
- Action button: "Start" (primary), "Continue" (secondary), "Review ✓" (if complete)

**Progress States:**
- 0%: Gray progress bar, "Not started" text
- 1-99%: #7A2D4D fill, percentage shown
- 100%: Green fill with checkmark, "Review ✓" button

**Recommended Next Step:**
- Show star (★) icon next to the category that should be completed next
- Logic: First incomplete category in Layer 1, then Layer 2, then Layer 3

## Framework Completion Summary

Add a summary bar at top of Strategy page:

```
┌─────────────────────────────────────────────────────────────────────┐
│  FOUNDATION STATUS                                                  │
│                                                                     │
│  Layer 1: ████████░░ 73%   Layer 2: ██████░░░░ 53%   Layer 3: Active│
│                                                                     │
│  Overall: Your foundation is 63% complete.                         │
│  Complete Layer 1 to unlock better AI content generation.          │
└─────────────────────────────────────────────────────────────────────┘
```

## Category Detail View

When clicking into a category:

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back to Strategy                                                 │
│                                                                     │
│  🎯 Your Customer                                                   │
│  Define who you're really talking to.                               │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  VERSION:  [Quick (10 min) •]  [Deep (25 min)]                │  │
│  │                                                               │  │
│  │  Quick = essential questions only                             │  │
│  │  Deep = comprehensive foundation (recommended)                │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Section 1 of 3: Who They Are                                 │  │
│  │                                                               │  │
│  │  1. Who is your ideal customer? (one sentence)                │  │
│  │     ┌─────────────────────────────────────────────────────┐   │  │
│  │     │ Female coaches in their first 3 years of business  │   │  │
│  │     └─────────────────────────────────────────────────────┘   │  │
│  │                                                               │  │
│  │  2. What industry or niche are they in?                      │  │
│  │     ┌─────────────────────────────────────────────────────┐   │  │
│  │     │ Coaching                                     [▼]    │   │  │
│  │     └─────────────────────────────────────────────────────┘   │  │
│  │                                                               │  │
│  │  3. What's their role?                                        │  │
│  │     ○ Founder/Owner (doing everything themselves)            │  │
│  │     ● Solopreneur/Freelancer                                 │  │
│  │     ○ Small team lead (1-5 people)                           │  │
│  │     ○ Marketing manager                                       │  │
│  │     ○ Other: __________                                       │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Progress: ████████░░░░░░░░░░░░ 40%  (Question 3 of 8)             │
│                                                                     │
│  [← Previous Section]                    [Save & Continue →]        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Version Toggle:**
- Two options: Quick and Deep
- Styled as segmented control (pills)
- Active: #7A2D4D background, white text
- Inactive: White background, gray border

**Question Styling:**
- Question number + text in Open Sans, 16px, medium weight
- Helper text in smaller size, muted color if present
- Input fields have 16px padding, --radius-md corners
- Radio buttons custom styled: Circle, teal when selected

**Progress Bar:**
- Full width at bottom of form area
- Shows question progress (e.g., 3 of 8)
- #7A2D4D fill

---

# SECTION 8: TEMPLATES VIEW

**Route:** `/templates`

**Purpose:** Browse and use content templates organized by funnel stage

## Templates Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  Template Library                                                   │
│  Ready-to-use templates for every stage of your funnel.            │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  FILTER BY FUNNEL STAGE:                                      │  │
│  │  [All •] [🟦 Getting Seen] [🟩 Building Trust]                │  │
│  │  [🟨 Making the Ask] [🟪 Keeping Connected] [🔧 Foundational] │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  FILTER BY FORMAT:                                            │  │
│  │  [All •] [LinkedIn] [Email] [Instagram] [Blog] [Other]        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  🟦 GETTING SEEN                                                    │
│  ─────────────────                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │ 📝           │ │ 📝           │ │ 📝           │ │ 📝         │ │
│  │ Story-Led    │ │ Myth-Busting │ │ Behind-the-  │ │ Framework  │ │
│  │ Post         │ │ Post         │ │ Scenes Post  │ │ Post       │ │
│  │              │ │              │ │              │ │            │ │
│  │ LinkedIn     │ │ LinkedIn     │ │ LinkedIn     │ │ LinkedIn   │ │
│  │              │ │              │ │              │ │            │ │
│  │ [Use →]      │ │ [Use →]      │ │ [Use →]      │ │ [Use →]    │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│                                                                     │
│  🟩 BUILDING TRUST                                                  │
│  ──────────────────                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │ 📧           │ │ 📧           │ │ 📄           │ │ 📄         │ │
│  │ Weekly       │ │ Welcome      │ │ Checklist    │ │ Template   │ │
│  │ Newsletter   │ │ Sequence     │ │ Lead Magnet  │ │ Lead Mag   │ │
│  │              │ │ (5 emails)   │ │              │ │            │ │
│  │ Email        │ │ Email        │ │ PDF          │ │ PDF        │ │
│  │              │ │              │ │              │ │            │ │
│  │ [Use →]      │ │ [Use →]      │ │ [Use →]      │ │ [Use →]    │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│                                                                     │
│  [Show More...]                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Template Card

**Styling:**
- Background: white
- Border-radius: var(--radius-lg)
- Padding: 16px
- Shadow: var(--shadow-sm)
- Top border: 3px solid [funnel stage color]
- Hover: Shadow increases, slight lift

**Content:**
- Format icon (📝📧📄📱) - large, 24px
- Template name in Bricolage Grotesque, 14px, semibold
- Platform tag (small pill badge)
- "Use →" button (ghost style)

## Template Detail Modal

When clicking "Use" on a template:

```
┌─────────────────────────────────────────────────────────────────────┐
│  📝 Story-Led Post                                        ✕ Close  │
│  ─────────────────                                                  │
│  🟦 Getting Seen  •  LinkedIn  •  Best for: Building connection    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  TEMPLATE STRUCTURE:                                                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [Opening hook - the moment]                                  │  │
│  │                                                               │  │
│  │  [What was happening - 2-3 sentences of context]              │  │
│  │                                                               │  │
│  │  [The breaking point or realization]                          │  │
│  │                                                               │  │
│  │  [What shifted - the lesson or change]                        │  │
│  │                                                               │  │
│  │  [Where you are now - honest, not perfect]                    │  │
│  │                                                               │  │
│  │  [Question for engagement]                                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  EXAMPLE:                                                           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  I almost quit in month three.                                │  │
│  │                                                               │  │
│  │  I was posting every day, showing up on stories,             │  │
│  │  commenting on everything. Doing all the "right" things.     │  │
│  │                                                               │  │
│  │  And feeling completely invisible...                          │  │
│  │                                                               │  │
│  │  [Show full example]                                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  PROMPTS TO HELP YOU CUSTOMIZE:                                     │
│  • What's a moment that changed how you work?                      │
│  • When did you realize something wasn't working?                   │
│  • What lesson do you keep relearning?                             │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  [✨ Generate from Template]  [📅 Add to Calendar]  [📋 Copy]       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 9: GOALS VIEW

**Route:** `/goals`

**Purpose:** Set and track goals across three levels - Annual, Quarterly, and Weekly

## Goals Philosophy

Goals in Heartwired follow a 3-layer hierarchy:
1. **Annual Goals** - Big picture targets for the year (revenue, audience, launches)
2. **Quarterly Focus** - Themes and key initiatives for the quarter
3. **Weekly Goals** - Activity-level goals that connect to the calendar

Activities on the calendar should ladder up to quarterly focus, which ladders up to annual goals. This creates alignment and purpose behind every piece of content.

## Goals Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  Goals                                                              │
│  What you're working toward.                                        │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [Annual •] [Q1 2026] [This Week]                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  2026 ANNUAL GOALS                                         [Edit]  │
│  ─────────────────                                                  │
│                                                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  💰 REVENUE                 │  │  📈 LINKEDIN                │   │
│  │                             │  │                             │   │
│  │  Target: $150,000           │  │  Target: 5,000 followers    │   │
│  │  Current: $8,200            │  │  Current: 2,847             │   │
│  │                             │  │                             │   │
│  │  ████░░░░░░░░░░░░ 5%       │  │  ██████████░░░░░░ 57%       │   │
│  │                             │  │                             │   │
│  │  On track for: $98,400/yr   │  │  On track for: 5,200 ✓     │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  📧 EMAIL LIST              │  │  🚀 LAUNCHES                │   │
│  │                             │  │                             │   │
│  │  Target: 2,000 subscribers  │  │  Target: 3 offers           │   │
│  │  Current: 412               │  │  Current: 0                 │   │
│  │                             │  │                             │   │
│  │  ████░░░░░░░░░░░░ 21%      │  │  ░░░░░░░░░░░░░░░░ 0%        │   │
│  │                             │  │                             │   │
│  │  On track for: 1,648        │  │  Q2: Course launch planned  │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🎯 #1 PRIORITY THIS YEAR                                     │  │
│  │                                                               │  │
│  │  "Build consistent visibility on LinkedIn to drive           │  │
│  │   discovery calls for 1:1 coaching"                          │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📅 QUARTERLY OVERVIEW                                        │  │
│  │                                                               │  │
│  │  Q1: Foundation     Q2: Launch       Q3: Scale      Q4: Optimize│
│  │  Build audience     Course launch    Ads + growth   Review     │
│  │  ████████████░░░░   ░░░░░░░░░░░░░   ░░░░░░░░░░░░   ░░░░░░░░░░ │  │
│  │  In progress        Upcoming         Upcoming       Upcoming   │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Goals Color Specifications (HEARTWIRED BRAND COLORS)

### Tab Styling - USE TEAL FOR ACTIVE
```css
/* Active tab (e.g., "Annual" when selected) */
.tab-active {
  background: #1B6B6B;          /* Dark Teal */
  color: #FFFFFF;
  border-radius: 20px;
  padding: 8px 20px;
}

/* Inactive tabs */
.tab-inactive {
  background: transparent;
  color: #5A5A5A;
  padding: 8px 20px;
}
```

### Progress Bars - USE TEAL
```css
/* Progress bar track */
.progress-track {
  background: #F5F0EB;          /* Cream dark */
  height: 8px;
  border-radius: 4px;
}

/* Progress bar fill - TEAL */
.progress-fill {
  background: #1B6B6B;          /* Dark Teal */
}
```

### Goal Metric Cards
```css
.goal-card {
  background: #FFFFFF;
  border: 1px solid #DDD8CC;
  border-radius: 16px;
  padding: 20px;
}
```

### Status Indicators
```css
/* On track (sage green) */
.status-on-track {
  color: #5A9A6B;
}
.status-on-track::before {
  content: "✓";
}

/* Behind/Warning (gold) */
.status-behind {
  color: #D4A84B;
}
.status-behind::before {
  content: "⚠";
}

/* Planned/Completed */
.status-complete {
  color: #5A9A6B;
}
```

### Quarterly Roadmap Cards
```css
/* Current/In-progress quarter - DUSTY PINK */
.quarter-current {
  background: #F0D5D8;          /* Dusty pink light */
  border: 2px solid #D07080;    /* Dusty pink */
}
.quarter-current .status {
  color: #D07080;
}

/* Completed quarter */
.quarter-completed {
  background: #FFFFFF;
  border: 1px solid #5A9A6B;    /* Sage green */
}
.quarter-completed .status {
  color: #5A9A6B;
}

/* Upcoming quarter */
.quarter-upcoming {
  background: #FFFFFF;
  border: 1px solid #DDD8CC;
}
.quarter-upcoming .status {
  color: #8A8A8A;
}
```

### Buttons (Edit, Save, Prioritize)
```css
/* Primary - BURGUNDY */
.btn-primary {
  background: #7A2D4D;
  color: #FFFFFF;
}

/* Secondary */
.btn-secondary {
  border: 2px solid #7A2D4D;
  color: #7A2D4D;
}
```

## Quarterly Focus View

When clicking on a quarter tab or quarterly card:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Goals                                                              │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [Annual] [Q1 2026 •] [This Week]                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Q1 2026: FOUNDATION                                       [Edit]  │
│  January - March                                                    │
│  ─────────────────────                                              │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🎯 QUARTERLY THEME                                           │  │
│  │                                                               │  │
│  │  "Build consistent visibility and grow email list to         │  │
│  │   prepare for Q2 course launch"                              │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  KEY INITIATIVES                                                    │
│  ───────────────                                                    │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ☑️  Post 3x/week on LinkedIn consistently                    │  │
│  │      Progress: 8/12 weeks  ████████████████░░░░ 67%          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ☐  Create lead magnet and welcome sequence                  │  │
│  │      Progress: Not started  ░░░░░░░░░░░░░░░░░░░░ 0%          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ☐  Grow email list to 1,000 subscribers                     │  │
│  │      Progress: 412/1000  ████████░░░░░░░░░░░░░░ 41%          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ☐  Book 10 discovery calls                                   │  │
│  │      Progress: 3/10  ██████░░░░░░░░░░░░░░░░░░░░ 30%          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  QUARTERLY METRICS TARGET                                           │
│  ────────────────────────                                           │
│                                                                     │
│  │  Revenue: $12,500          Current: $8,200   ████████████░░  │   │
│  │  LinkedIn: +500 followers  Current: +247     ██████████░░░░  │   │
│  │  Email: +200 subscribers   Current: +89      █████████░░░░░  │   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Weekly Goals View

```
┌─────────────────────────────────────────────────────────────────────┐
│  Goals                                                              │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [Annual] [Q1 2026] [This Week •]                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  THIS WEEK: Dec 23-29                                      [Edit]  │
│  ─────────────────────                                              │
│                                                                     │
│  HOW THIS WEEK SUPPORTS Q1 GOALS:                                   │
│  "Post 3x/week on LinkedIn consistently"                            │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📝 CONTENT GOALS                              3/3 Complete   │  │
│  │                                                               │  │
│  │  ☑️  LinkedIn post #1 (Monday)                    ✓ Done     │  │
│  │  ☑️  LinkedIn post #2 (Wednesday)                 ✓ Done     │  │
│  │  ☑️  LinkedIn post #3 (Friday)                    ✓ Done     │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🤝 ENGAGEMENT GOALS                           2/3 Complete   │  │
│  │                                                               │  │
│  │  ☑️  Comment on 25 posts this week               ✓ 28 done   │  │
│  │  ☑️  Reply to all DMs within 24 hours            ✓ Done      │  │
│  │  ☐  Connect with 5 new ideal clients             3/5         │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📧 EMAIL GOALS                                0/1 Complete   │  │
│  │                                                               │  │
│  │  ☐  Send weekly newsletter (Tuesday)             Scheduled   │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🎯 BUSINESS GOALS                             1/2 Complete   │  │
│  │                                                               │  │
│  │  ☑️  Book 2 discovery calls                      ✓ 2 booked  │  │
│  │  ☐  Follow up with 3 warm leads                  1/3         │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  WEEK SCORE: 6/9 goals complete (67%)                               │
│  ████████████████████░░░░░░░░░░                                    │
│                                                                     │
│  💡 Heartie: "Great progress! You're building momentum.            │
│     Don't forget that newsletter - it's your trust-builder."       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Impact/Effort Matrix

**Access:** Button in Goals or Calendar view - "Prioritize Activities"

```
┌─────────────────────────────────────────────────────────────────────┐
│  Impact/Effort Matrix                                       ✕      │
│  Drag activities to prioritize them.                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        HIGH IMPACT                                  │
│                            ▲                                        │
│  ┌─────────────────────────┼─────────────────────────┐             │
│  │                         │                         │             │
│  │  ⭐ QUICK WINS          │  🎯 BIG BETS            │             │
│  │  Do these first!        │  Schedule dedicated time │             │
│  │                         │                         │             │
│  │  • Weekly newsletter    │  • Course outline       │             │
│  │  • LinkedIn posts       │  • Lead magnet creation │             │
│  │                         │  • Sales page           │             │
│  │                         │                         │             │
│  ├─────────────────────────┼─────────────────────────┤             │
│  │                         │                         │             │
│  │  🤔 FILLERS             │  ⚠️ TIME SINKS          │             │
│  │  Do if you have time    │  Reconsider or delegate │             │
│  │                         │                         │             │
│  │  • Story updates        │  • Reels editing        │             │
│  │  • Comment engagement   │  • Complex graphics     │             │
│  │                         │                         │             │
│  │                         │                         │             │
│  └─────────────────────────┼─────────────────────────┘             │
│                            ▼                                        │
│  LOW EFFORT ◄──────────────────────────────► HIGH EFFORT           │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  UNPRIORITIZED ACTIVITIES                                           │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ Blog   │ │ Podcast│ │ Collab │ │ Webinar│ │ TikTok │           │
│  │ post   │ │ pitch  │ │ post   │ │ prep   │ │ test   │           │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘           │
│                                                                     │
│  Drag activities into quadrants above to prioritize                │
│                                                                     │
│  [Save Priorities]                              [Cancel]            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Matrix Quadrant Styling:**
- Quick Wins (top-left): Light green background, star icon
- Big Bets (top-right): Light #7A2D4D background, target icon
- Fillers (bottom-left): Light gray background
- Time Sinks (bottom-right): Light amber/warning background

**Interaction:**
- Drag and drop activities between quadrants
- Activities in "Unprioritized" tray at bottom
- Dropped activities snap to quadrant
- Save updates the activity's priority field

## Goal Setting Modal

When clicking "Edit" on annual or quarterly goals:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Set Your 2026 Goals                                        ✕      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  REVENUE GOAL                                                       │
│  What's your revenue target for 2026?                              │
│  $ [150,000        ]                                               │
│                                                                     │
│  AUDIENCE GOALS                                                     │
│                                                                     │
│  LinkedIn followers target:    [5,000    ]                         │
│  Email subscribers target:     [2,000    ]                         │
│  Instagram followers target:   [1,000    ] (optional)              │
│                                                                     │
│  LAUNCHES PLANNED                                                   │
│  How many offers do you plan to launch?                            │
│  [3  ▼]                                                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Launch 1: [Course: Marketing Foundations    ]  Q [2 ▼]    │   │
│  │  Launch 2: [Template Pack                    ]  Q [3 ▼]    │   │
│  │  Launch 3: [Group Program                    ]  Q [4 ▼]    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  #1 PRIORITY                                                        │
│  What's the ONE thing that matters most this year?                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Build consistent visibility on LinkedIn to drive discovery │   │
│  │ calls for 1:1 coaching                                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [Cancel]                                         [Save Goals]      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Goals ↔ Calendar Connection

**How it works:**
1. When creating an activity in Calendar, user can optionally link it to a weekly goal
2. Completing an activity auto-updates the linked weekly goal progress
3. Weekly goals roll up to quarterly initiatives
4. Dashboard shows "This activity supports: [Goal Name]"

**In Activity Detail Panel, add:**
```
LINKED GOAL (optional)
[Post 3x/week on LinkedIn consistently    ▼]
└── This activity counts toward your weekly goal
```

## Navigation Update

Add "Goals" to the main navigation:
```
Dashboard | Calendar | Goals | Strategy | Templates | Insights
```

---

# SECTION 10: INSIGHTS VIEW

**Route:** `/insights`

**Purpose:** Track metrics, view progress, and understand patterns

## Insights Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  Insights                                                           │
│  Track your progress and see what's working.                        │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [This Week] [This Month •] [This Quarter] [Custom]           │  │
│  └───────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ROW 1: Two stats cards                                             │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  📊 CONTENT PUBLISHED       │  │  🎯 GOALS PROGRESS          │   │
│  │                             │  │                             │   │
│  │  📝 12 LinkedIn posts       │  │  Revenue                    │   │
│  │  📧 4 Newsletters           │  │  $8,200/$12,500 ████████░░ │   │
│  │  📱 8 Instagram Stories     │  │                             │   │
│  │                             │  │  LinkedIn                   │   │
│  │  ⭐ Top: "Almost quit"      │  │  +247/+300 █████████░░░    │   │
│  │  67 saves, 19 comments      │  │                             │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                     │
│  ROW 2: Funnel balance - full width                                 │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📈 FUNNEL BALANCE                                            │  │
│  │                                                               │  │
│  │  🟦 Getting Seen        12   ████████████████████░░░░░░░░░░  │  │
│  │  🟩 Building Trust       6   ██████████░░░░░░░░░░░░░░░░░░░░  │  │
│  │  🟨 Making the Ask       2   ████░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │  🟪 Keeping Connected    0   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │                                                               │  │
│  │  💡 Recommendation: You're visible! Now add some conversion  │  │
│  │     content to turn that attention into action.              │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ROW 3: Patterns - full width                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🔮 PATTERNS & INSIGHTS                                       │  │
│  │                                                               │  │
│  │  ┌───────────────────────────────────────────────────────┐    │  │
│  │  │ 📈 Personal stories get 2x more saves than how-tos   │    │  │
│  │  └───────────────────────────────────────────────────────┘    │  │
│  │  ┌───────────────────────────────────────────────────────┐    │  │
│  │  │ 📅 Tuesday newsletters: 47% open rate (best day)     │    │  │
│  │  └───────────────────────────────────────────────────────┘    │  │
│  │  ┌───────────────────────────────────────────────────────┐    │  │
│  │  │ 🔗 LinkedIn → discovery calls is your proven path    │    │  │
│  │  └───────────────────────────────────────────────────────┘    │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ROW 4: Log metrics                                                 │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📝 LOG METRICS                              [+ Add Log]      │  │
│  │                                                               │  │
│  │  Week of Dec 16-22:                                          │  │
│  │  LinkedIn: 2,847 (+47) • Email: 412 (+12) • Calls: 3         │  │
│  │                                                               │  │
│  │  Week of Dec 9-15:                                           │  │
│  │  LinkedIn: 2,800 (+52) • Email: 400 (+18) • Calls: 2         │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Metric Log Modal

When clicking "+ Add Log":

```
┌─────────────────────────────────────────────────────────────────────┐
│  Log This Week's Metrics                                    ✕      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Week of: [December 23-29, 2025        ▼]                          │
│                                                                     │
│  AUDIENCE METRICS                                                   │
│  ──────────────────                                                 │
│                                                                     │
│  LinkedIn followers        [_________]                              │
│  Email subscribers         [_________]                              │
│  Instagram followers       [_________] (optional)                   │
│                                                                     │
│  BUSINESS METRICS                                                   │
│  ──────────────────                                                 │
│                                                                     │
│  Discovery calls booked    [___]                                    │
│  Sales made                [___]                                    │
│  Revenue this week        $[_________]                              │
│                                                                     │
│  REFLECTION                                                         │
│  ──────────────                                                     │
│                                                                     │
│  What worked this week?                                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  What would you do differently?                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [Cancel]                                         [Save Log]        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 11: ONBOARDING FLOW

**Route:** `/onboarding` (shown to new users)

## Step 1: Welcome

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                  [Heartwired Logo + Flower]                         │
│                                                                     │
│                  Hey! I'm so glad you're here. 🌸                   │
│                                                                     │
│                  Before we build your marketing plan,               │
│                  I need to learn a little about you                 │
│                  and your business.                                 │
│                                                                     │
│                  Don't worry - this isn't a test.                   │
│                  There are no wrong answers.                        │
│                                                                     │
│                  Ready? Let's do this.                              │
│                                                                     │
│                         [Let's go →]                                │
│                                                                     │
│              [Decorative flowers and organic shapes]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Styling:**
- Centered layout
- Large logo at top
- Warm, inviting copy
- Decorative elements (flowers, soft blobs) in background
- Primary CTA button

## Step 2: Basic Info

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Step 1 of 5                    ████░░░░░░░░░░░░░░░░ 20%           │
│                                                                     │
│  THE BASICS                                                         │
│  ──────────                                                         │
│                                                                     │
│  What's your name?                                                  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  What's your business called?                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  What do you do in one sentence?                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Example: "I help busy moms build sustainable habits"        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                                               [Continue →]          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Step 3: Business Type & Stage

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Step 2 of 5                    ████████░░░░░░░░░░░░ 40%           │
│                                                                     │
│  ABOUT YOUR BUSINESS                                                │
│  ───────────────────                                                │
│                                                                     │
│  What type of business do you run?                                 │
│                                                                     │
│  ○ Service-based (coaching, consulting, freelancing)               │
│  ○ Product-based (physical or digital products)                    │
│  ○ Digital products (courses, templates, memberships)              │
│  ○ Mix of the above                                                │
│                                                                     │
│  What stage are you at?                                            │
│                                                                     │
│  ○ Just starting (pre-revenue or <$10K/year)                       │
│  ○ Growing ($10K-$100K/year)                                       │
│  ○ Established ($100K+/year)                                       │
│                                                                     │
│  [← Back]                                     [Continue →]          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Step 4: The Framework Explanation (IMPORTANT!)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Step 3 of 5                    ████████████░░░░░░░░ 60%           │
│                                                                     │
│  HERE'S HOW HEARTWIRED WORKS DIFFERENTLY                           │
│  ───────────────────────────────────────                           │
│                                                                     │
│  Most marketing tools start with tactics:                          │
│  "Schedule this post. Write that email."                           │
│                                                                     │
│  But tactics without strategy is just noise.                       │
│                                                                     │
│  Heartwired uses a 3-layer approach:                               │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │   ┌───────────────────────────────────────────────────┐    │   │
│  │   │  3. MARKETING PLAN                                │    │   │
│  │   │     What you do & when you do it                  │    │   │
│  │   │     Calendar • Activities • Campaigns             │    │   │
│  │   └───────────────────────────────────────────────────┘    │   │
│  │                        ▲                                    │   │
│  │   ┌───────────────────────────────────────────────────┐    │   │
│  │   │  2. MARKETING STRATEGY                            │    │   │
│  │   │     Where you show up & how you sound             │    │   │
│  │   │     Voice • Reality • Landscape                   │    │   │
│  │   └───────────────────────────────────────────────────┘    │   │
│  │                        ▲                                    │   │
│  │   ┌───────────────────────────────────────────────────┐    │   │
│  │   │  1. BRAND STRATEGY (Start here)                   │    │   │
│  │   │     Who you serve & why you matter                │    │   │
│  │   │     Customer • Position • Messaging               │    │   │
│  │   └───────────────────────────────────────────────────┘    │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  We'll help you build from the foundation up.                      │
│  It takes a bit longer, but everything works better.               │
│                                                                     │
│  [← Back]                                   [Got it, let's go →]   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Styling:**
- Diagram should be visually distinct (layered cards or stacked boxes)
- Layer 1 (bottom) highlighted with burgundy accent
- Arrows between layers to show flow
- Keep it simple and scannable

## Step 5: Strategic Menu (Organized by Layer)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Step 4 of 5                    ████████████████░░░░ 80%           │
│                                                                     │
│  BUILD YOUR FOUNDATION                                              │
│  ─────────────────────                                              │
│                                                                     │
│  Let's start building your marketing foundation.                   │
│  Begin with Layer 1 - everything else builds on it.                │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  LAYER 1: BRAND STRATEGY (Start here) 🌸                           │
│  Who you serve and why you matter                                  │
│                                                                     │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│  │ 🎯 Your Customer  │ │ 📍 Your Position  │ │ 💬 Your Messaging │ │
│  │ 10 min            │ │ 10 min            │ │ 10 min            │ │
│  │ [Start ★]         │ │ [Start]           │ │ [Start]           │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘ │
│                                                                     │
│  ★ Recommended starting point                                      │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  LAYER 2: MARKETING STRATEGY                                       │
│  Where you show up and how you sound                               │
│                                                                     │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│  │ ✍️ Your Voice      │ │ 🌍 Your Reality   │ │ 🗺️ Your Landscape │ │
│  │ 5 min             │ │ 10 min            │ │ 10 min            │ │
│  │ [Start]           │ │ [Start]           │ │ [Start]           │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘ │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  LAYER 3: MARKETING PLAN                                           │
│  What you do and when you do it                                    │
│                                                                     │
│  ┌───────────────────┐ ┌───────────────────────────────────────────┐│
│  │ 🚀 Your Big Plans │ │  Your Calendar and Goals will be set up  ││
│  │ 10 min            │ │  once you enter the app.                 ││
│  │ [Start]           │ │                                           ││
│  └───────────────────┘ └───────────────────────────────────────────┘│
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  💡 Tip: You can complete these later, but the more you fill in,  │
│     the smarter your AI-generated content will be.                 │
│                                                                     │
│         [Skip for now - take me to my dashboard →]                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Layer Section Styling:**
- Each layer has a subtle left border or header accent matching layer color
- Layer 1: #7A2D4D accent (most important)
- Layer 2: Blue accent
- Layer 3: Green accent
- Categories within each layer as cards in a row
- ★ star next to recommended first step

## Step 6: Completion / Welcome to Dashboard

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                  [Celebration animation - confetti/sparkles]        │
│                                                                     │
│                  You're all set, [Name]! 🎉                        │
│                                                                     │
│                  Your Heartwired dashboard is ready.               │
│                                                                     │
│                  ┌─────────────────────────────────────────────┐   │
│                  │  💡 Quick tip from Heartie:                 │   │
│                  │                                             │   │
│                  │  "Start with Your Customer in the Strategy │   │
│                  │   section. It takes 10 minutes and makes   │   │
│                  │   everything else click into place!"       │   │
│                  │                                             │   │
│                  │  [Heartie avatar]                           │   │
│                  └─────────────────────────────────────────────┘   │
│                                                                     │
│                         [Go to Dashboard →]                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Progress indicator:** Horizontal bar at top showing step progress

---

# SECTION 12: UI COMPONENTS SPECS

## Buttons

**Primary Button:**
```
Background: #7A2D4D
Text: white, Open Sans 600, 16px
Padding: 12px 24px
Border-radius: var(--radius-md)
Hover: var(--#5E2239)
Active: transform scale(0.98)
Transition: all 200ms ease
```

**Secondary Button:**
```
Background: transparent
Border: 2px solid #7A2D4D
Text: #7A2D4D, Open Sans 600, 16px
Padding: 10px 22px
Border-radius: var(--radius-md)
Hover: Background var(--dusty-pink-light)
```

**Ghost Button:**
```
Background: transparent
Text: var(--text-primary), Open Sans 500, 14px
Padding: 8px 16px
Hover: Background var(--cream-dark)
```

## Form Inputs

**Text Input:**
```
Background: white
Border: 1px solid var(--border)
Border-radius: var(--radius-md)
Padding: 12px 16px
Font: Open Sans 400, 16px
Focus: Border #7A2D4D, box-shadow 0 0 0 3px var(--dusty-pink-light)
Placeholder: var(--text-muted)
```

**Select Dropdown:**
```
Same as text input
Dropdown arrow icon on right
Options panel: white background, shadow-md
Option hover: var(--cream-dark)
```

**Textarea:**
```
Same as text input
Min-height: 120px
Resize: vertical
```

**Checkbox (custom):**
```
Size: 20px × 20px
Border: 2px solid var(--border)
Border-radius: 4px
Checked: Background #7A2D4D, white checkmark icon
Focus: #7A2D4D ring
```

**Radio Button (custom):**
```
Size: 20px × 20px
Border: 2px solid var(--border)
Border-radius: 50%
Selected: Border #7A2D4D, inner dot #7A2D4D
```

## Cards

**Base Card:**
```
Background: white
Border-radius: var(--radius-lg)
Shadow: var(--shadow-sm)
Padding: 24px
Hover (if clickable): shadow-md, translateY(-2px)
Transition: all 200ms ease
```

## Modals

**Modal Overlay:**
```
Background: rgba(26, 26, 26, 0.5)
Backdrop blur: 4px
```

**Modal Content:**
```
Background: white
Border-radius: var(--radius-xl)
Shadow: var(--shadow-xl)
Max-width: 480px (forms), 640px (content), 800px (large)
Padding: 24px
Animation: fade in + scale up (200ms)
```

## Toast Notifications

**Position:** Top-right, 24px from edges

**Toast:**
```
Background: white
Border-radius: var(--radius-md)
Shadow: var(--shadow-lg)
Padding: 16px
Border-left: 4px solid [status color]
Max-width: 360px
Auto-dismiss: 5 seconds
```

**Status colors:**
- Success: var(--success)
- Warning: var(--warning)
- Error: var(--error)
- Info: var(--info)

## Progress Bars

```
Track: var(--cream-dark)
Fill: #7A2D4D or funnel stage color
Height: 8px
Border-radius: var(--radius-full)
Animation: width transition 300ms ease
```

## Tooltips

```
Background: var(--text-primary)
Text: white, Open Sans 400, 14px
Padding: 8px 12px
Border-radius: var(--radius-sm)
Arrow: pointing to trigger element
Max-width: 240px
Animation: fade in (150ms)
```

---

# SECTION 13: RESPONSIVE BEHAVIOR

## Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: ≥ 1024px
Large Desktop: ≥ 1280px
```

## Mobile Adaptations

**Navigation:**
- Hamburger menu icon replaces nav tabs
- Slide-out menu from left
- Full-screen overlay

**Dashboard:**
- Single column layout
- Cards stack vertically
- Week preview: Horizontal scroll

**Calendar:**
- Default to day view (single column)
- Swipe left/right to change days
- Activity cards full width
- Bottom sheet for activity detail (instead of side panel)

**Heartie:**
- Smaller collapsed bubble (icon only)
- Expands to near full-screen modal

**Forms:**
- Full width inputs
- Larger touch targets (min 44px)
- Bottom-fixed action buttons

---

# SECTION 14: ANIMATIONS

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

---

# SECTION 15: DATA MODELS

## User
```typescript
{
  id: string
  email: string
  name: string
  businessName: string
  businessType: 'service' | 'product' | 'digital' | 'mixed'
  businessStage: 'starting' | 'growing' | 'established'
  tier: 'starter' | 'growth' | 'partner'
  createdAt: Date
  onboardingComplete: boolean
}
```

## StrategicCategory
```typescript
{
  id: string
  userId: string
  categoryType: 'customer' | 'position' | 'messaging' | 'voice' | 'reality' | 'landscape' | 'plans'
  version: 'quick' | 'deep'
  data: Record<string, any>
  completionPercentage: number
  updatedAt: Date
}
```

## Activity
```typescript
{
  id: string
  userId: string
  date: Date
  title: string
  content: string
  funnelStage: 'awareness' | 'consideration' | 'conversion' | 'retention'
  platform: 'linkedin' | 'email' | 'instagram' | 'facebook' | 'tiktok' | 'blog' | 'other'
  contentPillar: string
  status: 'idea' | 'draft' | 'ready' | 'scheduled' | 'complete'
  linkedWeeklyGoalId?: string  // Optional link to weekly goal
  priorityQuadrant?: 'quick-wins' | 'big-bets' | 'fillers' | 'time-sinks'
  createdAt: Date
  updatedAt: Date
}
```

## MetricLog
```typescript
{
  id: string
  userId: string
  weekStartDate: Date
  linkedinFollowers: number
  emailSubscribers: number
  instagramFollowers?: number
  discoveryCalls: number
  sales: number
  revenue: number
  whatWorked: string
  whatToDifferently: string
  createdAt: Date
}
```

## AnnualGoal
```typescript
{
  id: string
  userId: string
  year: number
  revenueTarget: number
  linkedinTarget: number
  emailTarget: number
  instagramTarget?: number
  launchesTarget: number
  topPriority: string
  createdAt: Date
  updatedAt: Date
}
```

## QuarterlyGoal
```typescript
{
  id: string
  userId: string
  year: number
  quarter: 1 | 2 | 3 | 4
  theme: string
  description: string
  initiatives: QuarterlyInitiative[]
  revenueTarget: number
  linkedinTarget: number
  emailTarget: number
  createdAt: Date
  updatedAt: Date
}
```

## QuarterlyInitiative
```typescript
{
  id: string
  quarterlyGoalId: string
  title: string
  isComplete: boolean
  progressPercentage: number
  order: number
}
```

## WeeklyGoal
```typescript
{
  id: string
  userId: string
  weekStartDate: Date
  category: 'content' | 'engagement' | 'email' | 'business'
  title: string
  targetCount?: number
  currentCount: number
  isComplete: boolean
  linkedQuarterlyInitiativeId?: string
  createdAt: Date
}
```

## ActivityPriority
```typescript
{
  id: string
  activityId: string
  quadrant: 'quick-wins' | 'big-bets' | 'fillers' | 'time-sinks' | 'unprioritized'
  updatedAt: Date
}
```

---

# SECTION 16: BUILD ORDER

## Phase 1: Foundation (Build First)
1. Set up project with React + TypeScript + Tailwind
2. Configure design tokens (colors, fonts, spacing)
3. Create base components (Button, Input, Card, Modal)
4. Build app shell (Header, main layout, routing)
5. Build authentication (sign up, log in, log out)

## Phase 2: Core Features
6. Onboarding flow (4 basic steps)
7. Dashboard view (basic version)
8. Calendar view (weekly, add/edit activities)
9. Activity detail panel

## Phase 3: Goals & Strategy
10. Goals view (Annual, Quarterly, Weekly tabs)
11. Goal setting modals
12. Impact/Effort Matrix
13. Strategy view (7 category cards)
14. Category detail view (questionnaire forms - quick version first)
15. Generated summaries from questionnaire answers

## Phase 4: Templates & AI
16. Templates view (template cards, filtering)
17. Template detail modal
18. AI content generation (integrate OpenAI)
19. Heartie bubble (basic chat interface)

## Phase 5: Insights & Polish
20. Insights view with charts
21. Metric logging modal
22. Goals ↔ Calendar connection (link activities to goals)
23. Deep versions of strategic categories
24. Voice training feature
25. Responsive mobile design
26. Animations and micro-interactions

---

# SECTION 17: IMPORTANT NOTES

## ⚠️ COLOR RULES - USE HEARTWIRED BRAND COLORS

### Primary Colors:
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary buttons, CTAs | Burgundy | #7A2D4D |
| Active tabs, progress bars | Dark Teal | #1B6B6B |
| Soft highlights, current states | Dusty Pink | #D07080 / #F0D5D8 |
| Main background | Cream | #FCF7F1 |

### NEVER USE:
- ❌ Orange (#FF8C00, #FFA500, #F97316)
- ❌ #7A2D4D (#7A2D4D)
- ❌ Generic amber/yellow-orange
- ❌ Pure black (#000000) - use #1A1A1A
- ❌ Pure white for main backgrounds - use cream #FCF7F1

### Quick Reference:
| Component | Background | Text/Border |
|-----------|------------|-------------|
| Primary Button | #7A2D4D (burgundy) | #FFFFFF |
| Active Tab | #1B6B6B (teal) | #FFFFFF |
| Progress Bar Fill | #1B6B6B (teal) | - |
| Progress Bar Track | #F5F0EB (cream-dark) | - |
| Current Quarter | #F0D5D8 (dusty pink light) | border: #D07080 |
| Success/On track | - | #5A9A6B (sage) |
| Warning/Behind | - | #D4A84B (gold) |
| Card | #FFFFFF | border: #DDD8CC |
| Main Background | #FCF7F1 (cream) | - |

## Design Rules - Always Follow

1. **Never use pure black (#000000)** - Always use #1A1A1A
2. **Never use pure white for main backgrounds** - Use #FCF7F1 (cream)
3. **Primary buttons = Burgundy (#7A2D4D)**
4. **Active states = Teal (#1B6B6B)**
5. **All corners are rounded** - No sharp rectangular shapes
6. **Generous spacing** - When in doubt, add more white space
7. **Warm tones everywhere** - Colors should feel warm, not cold
8. **Funnel colors are for categories only** - Not for general UI

## Typography Rules

1. **Headlines:** Bricolage Grotesque (600-700 weight)
2. **Everything else:** Open Sans (400-600 weight)
3. **Never use more than 2 font weights** on the same element
4. **Minimum body text:** 16px
5. **Line height for body:** 1.6

## Interaction Rules

1. **All clickable elements need hover states**
2. **All forms need focus states** (teal border + teal shadow)
3. **Loading states for all async actions**
4. **Success feedback for completed actions**
5. **Error messages should be helpful, not scary**

## Copy/Tone Rules

1. **Friendly and warm** - Like talking to a supportive friend
2. **Use "you" and "your"** - Direct address
3. **Avoid corporate jargon** - Simple, human language
4. **Encourage, don't pressure** - "You've got this" not "Don't miss out"
5. **Heartie's voice:** Casual, warm, slightly playful, uses emoji sparingly (🌸 💜 ✨)

---

# END OF SPECIFICATION

**App Name:** Heartie - marketing planner by Heartwired

This document contains everything needed to build Heartie. Start with Phase 1 and work through each phase sequentially. Reference this document for all design decisions, component specifications, and feature requirements.

**Remember:** 
- Primary buttons = **Burgundy (#7A2D4D)**
- Active tabs & progress = **Teal (#1B6B6B)**
- Soft highlights = **Dusty Pink (#D07080)**
- Backgrounds = **Cream (#FCF7F1)**
- The goal is warm, human-first, calming - NOT generic SaaS vibes
