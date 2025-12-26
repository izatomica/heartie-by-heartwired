# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Heartie is a marketing planning SaaS platform for female solopreneurs. Built with React 19, TypeScript, Vite 7, and Tailwind CSS v4. Uses Supabase for database/auth and deploys to Railway.

The app is built around a **3-layer strategic framework**:
- **Layer 1: Brand Strategy** (Your Customer, Your Position, Your Messaging)
- **Layer 2: Marketing Strategy** (Your Voice, Your Reality, Your Landscape)
- **Layer 3: Marketing Plan** (Your Big Plans, Calendar, Activities)

Activities are organized by a **4-stage marketing funnel**: Getting Seen (awareness), Building Trust (consideration), Making the Ask (conversion), Keeping Connected (retention).

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173

# Production build
npm run build        # TypeScript compile + Vite build
npm start            # Start production server at http://localhost:3000
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## Database & Backend

### Current State: Mock Data Transitioning to Supabase

The app **currently uses mock data** from [src/lib/mockData.ts](src/lib/mockData.ts). Supabase infrastructure is set up but **not yet integrated** into the frontend components.

### Database Architecture

- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS)
- **Schema**: See [database/schema.sql](database/schema.sql)
- **Setup Guide**: See [database/SUPABASE_SETUP.md](database/SUPABASE_SETUP.md)
- **Client Library**: [src/lib/supabase.ts](src/lib/supabase.ts) with auth and database helpers

**Tables:**
- `profiles` - User profile data (auto-created on signup)
- `activities` - Marketing activities with funnel stage, platform, status
- `annual_goals` - Yearly targets (revenue, followers, launches)
- `quarterly_goals` - Quarterly themes and initiatives (JSONB)
- `weekly_goals` - Weekly goals by category
- `strategy_categories` - 3-layer framework progress (JSONB)
- `metric_logs` - Performance metrics over time

**All tables enforce RLS** - users can only access their own data via `auth.uid() = user_id` policies.

### Environment Variables

Required for Supabase connection:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon/public key

Set in `.env` locally and in Railway's environment variables for production.

## Code Architecture

### Type System

**Two parallel type systems exist:**

1. **Frontend types** ([src/types/index.ts](src/types/index.ts)) - camelCase, Date objects
   - Used by React components and mock data
   - Example: `Activity.funnelStage`, `Activity.userId`, `Activity.createdAt`

2. **Database types** ([src/lib/supabase.ts](src/lib/supabase.ts)) - snake_case, ISO strings
   - Maps to PostgreSQL schema
   - Example: `Activity.funnel_stage`, `Activity.user_id`, `Activity.created_at`

**When integrating Supabase**, you'll need to transform between these formats or consolidate to one system.

### Key Type Definitions

```typescript
// Funnel stages (4 stages)
type FunnelStage = 'awareness' | 'consideration' | 'conversion' | 'retention'

// Activity statuses (5 stages)
type ActivityStatus = 'idea' | 'draft' | 'ready' | 'scheduled' | 'complete'

// Platforms (7 options)
type Platform = 'linkedin' | 'email' | 'instagram' | 'facebook' | 'tiktok' | 'blog' | 'other'

// Strategic categories (7 categories across 3 layers)
type CategoryType = 'customer' | 'position' | 'messaging' | 'voice' | 'reality' | 'landscape' | 'plans'

// Weekly goal categories (4 types)
type WeeklyGoalCategory = 'content' | 'engagement' | 'email' | 'business'
```

### Component Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives (Button, Input, Card, Modal)
│   ├── calendar/        # Calendar-specific components (ActivityCard, AddActivityModal, ActivityDetailPanel)
│   ├── layout/          # Layout components (Header, Layout)
│   └── Onboarding.tsx   # 6-step onboarding flow
├── pages/               # Route-level page components
│   ├── Dashboard.tsx    # Weekly summary + funnel health
│   ├── Calendar.tsx     # Drag-and-drop weekly calendar
│   ├── Goals.tsx        # Annual/Quarterly/Weekly goals (3 tabs)
│   ├── Strategy.tsx     # 7 strategic categories in 3 layers
│   ├── Templates.tsx    # Template library with filtering
│   └── Insights.tsx     # Analytics and metrics
├── lib/
│   ├── mockData.ts      # Mock data (CURRENT DATA SOURCE)
│   └── supabase.ts      # Supabase client + helpers (NOT YET USED)
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

### Key Component Patterns

**Calendar.tsx** - Uses `@dnd-kit` for drag-and-drop:
- Activities are draggable between days
- Week navigation with Monday-Sunday view
- Integrates with AddActivityModal and ActivityDetailPanel

**Dashboard.tsx** - Shows:
- Weekly activity summary
- Funnel health (distribution across 4 stages)
- Weekly goals by category
- Requires activities and weekly goals data

**Goals.tsx** - Three tabs:
- Annual: Revenue, follower targets, launches
- Quarterly: Theme + initiatives (array of objects)
- Weekly: Category-based goals with checkboxes

**Strategy.tsx** - 7 categories organized into 3 layers:
- Each category has version ('quick' or 'deep')
- Completion percentage tracked
- Progress visualization

## Design System

### Brand Colors (Tailwind Config)

- **Primary**: `burgundy` (#7A2D4D) - Buttons, CTAs
- **Teal**: `teal-dark` (#1B6B6B) - Active states, tabs
- **Accent**: `dusty-pink` (#D07080) - Highlights
- **Background**: `cream` (#FCF7F1) - Main background (NOT white)

### Funnel Stage Colors

- **Awareness**: `funnel-awareness` (#A8D5E5) - Sky blue
- **Consideration**: `funnel-consideration` (#9DCDB5) - Sage
- **Conversion**: `funnel-conversion` (#E8C86B) - Gold
- **Retention**: `funnel-retention` (#C5C0E8) - Lavender

### Typography

- **Headlines**: `font-headline` (Bricolage Grotesque, 600-700 weight)
- **Body**: `font-body` (Open Sans, 400-600 weight)

### Design Principles

- **Warm and organic** - All corners rounded (no sharp angles)
- **Generous spacing** - Use `space-6`, `space-8` liberally
- **Soft shadows** - Use `shadow-sm`, `shadow-md` (not harsh)
- **Supportive tone** - Friendly, encouraging copy

## Complete Documentation Reference

Heartie has comprehensive specification documentation organized in the [docs/](docs/) directory. **Always consult the relevant documentation before making changes** to ensure consistency with the design system and strategic framework.

### Documentation Structure

- [docs/README.md](docs/README.md) - Documentation overview and navigation guide
- [docs/quick-reference/](docs/quick-reference/) - Quick lookup guides for colors, components, and framework
- [docs/01-overview/](docs/01-overview/) - Project overview and tech stack
- [docs/02-core-philosophy/](docs/02-core-philosophy/) - 3-layer framework and strategic categories
- [docs/03-design-system/](docs/03-design-system/) - Complete design system (colors, typography, spacing, decorative elements)
- [docs/04-global-layout/](docs/04-global-layout/) - Application shell, header, and Heartie assistant
- [docs/05-features/](docs/05-features/) - All 6 feature views (Dashboard, Calendar, Goals, Strategy, Templates, Insights)
- [docs/06-onboarding/](docs/06-onboarding/) - 6-step onboarding flow
- [docs/07-components/](docs/07-components/) - Component library specifications
- [docs/08-interactions/](docs/08-interactions/) - Responsive design and animations
- [docs/09-data-models/](docs/09-data-models/) - TypeScript interfaces and database schema
- [docs/10-implementation/](docs/10-implementation/) - Build phases and development roadmap
- [docs/11-rules/](docs/11-rules/) - Critical design rules (non-negotiable)

### Documentation Checklist by Change Type

**Before making ANY changes**, read the appropriate documentation:

#### For UI Component Changes:
1. **READ FIRST**: [docs/11-rules/critical-design-rules.md](docs/11-rules/critical-design-rules.md) - Non-negotiable design rules
2. **READ**: [docs/03-design-system/colors.md](docs/03-design-system/colors.md) - Exact color specifications
3. **READ**: [docs/03-design-system/typography.md](docs/03-design-system/typography.md) - Font specifications
4. **READ**: [docs/03-design-system/spacing-and-layout.md](docs/03-design-system/spacing-and-layout.md) - Spacing scale and layout
5. **READ**: [docs/07-components/](docs/07-components/) - Relevant component file (buttons, forms, cards, feedback)
6. **REFERENCE**: [docs/quick-reference/component-checklist.md](docs/quick-reference/component-checklist.md) - Quick checklist

**Key Rules:**
- Primary buttons = Burgundy (#7A2D4D)
- Active states = Teal (#1B6B6B)
- Main background = Cream (#FCF7F1), NOT white
- All corners must be rounded (no sharp angles)
- Funnel colors ONLY for activities (not general UI)

#### For Feature/View Changes:
1. **READ**: [docs/02-core-philosophy/3-layer-framework.md](docs/02-core-philosophy/3-layer-framework.md) - Understand the strategic framework
2. **READ**: [docs/05-features/{specific-feature}.md](docs/05-features/) - The feature you're modifying
3. **READ**: [docs/11-rules/critical-design-rules.md](docs/11-rules/critical-design-rules.md) - Design constraints
4. **REFERENCE**: [docs/quick-reference/framework-guide.md](docs/quick-reference/framework-guide.md) - Framework quick reference

**Available feature docs:**
- [dashboard.md](docs/05-features/dashboard.md) - Weekly summary and funnel health
- [calendar.md](docs/05-features/calendar.md) - Drag-and-drop weekly calendar
- [goals.md](docs/05-features/goals.md) - Annual/Quarterly/Weekly goals
- [strategy.md](docs/05-features/strategy.md) - 7 strategic categories
- [templates.md](docs/05-features/templates.md) - Template library
- [insights.md](docs/05-features/insights.md) - Analytics and metrics

#### For Design System Changes:
1. **READ FIRST**: [docs/11-rules/critical-design-rules.md](docs/11-rules/critical-design-rules.md) - Understand constraints
2. **READ**: [docs/quick-reference/color-cheat-sheet.md](docs/quick-reference/color-cheat-sheet.md) - Color quick reference
3. **READ**: All files in [docs/03-design-system/](docs/03-design-system/) - Complete design system

**Critical:** Never substitute brand colors (burgundy, teal, dusty pink) with generic alternatives.

#### For Data Model Changes:
1. **READ**: [docs/09-data-models/database-schema.md](docs/09-data-models/database-schema.md) - All data models and relationships
2. **READ**: [docs/02-core-philosophy/](docs/02-core-philosophy/) - Understand how data relates to framework
3. **VERIFY**: Changes align with [database/schema.sql](database/schema.sql)

#### For Onboarding Changes:
1. **READ**: [docs/06-onboarding/onboarding-flow.md](docs/06-onboarding/onboarding-flow.md) - Complete 6-step flow
2. **READ**: [docs/02-core-philosophy/3-layer-framework.md](docs/02-core-philosophy/3-layer-framework.md) - Framework explanation shown in onboarding

#### For New Features:
1. **READ**: [docs/02-core-philosophy/](docs/02-core-philosophy/) - Entire directory
2. **READ**: [docs/quick-reference/](docs/quick-reference/) - All quick-reference files
3. **READ**: [docs/10-implementation/build-phases.md](docs/10-implementation/build-phases.md) - Implementation approach
4. **READ**: [docs/11-rules/critical-design-rules.md](docs/11-rules/critical-design-rules.md) - Design constraints

### Quick Access by Topic

**Colors:**
- Quick reference: [docs/quick-reference/color-cheat-sheet.md](docs/quick-reference/color-cheat-sheet.md)
- Complete palette: [docs/03-design-system/colors.md](docs/03-design-system/colors.md)
- Rules: [docs/11-rules/critical-design-rules.md](docs/11-rules/critical-design-rules.md)

**3-Layer Framework:**
- Quick guide: [docs/quick-reference/framework-guide.md](docs/quick-reference/framework-guide.md)
- Complete explanation: [docs/02-core-philosophy/3-layer-framework.md](docs/02-core-philosophy/3-layer-framework.md)
- Strategic categories: [docs/02-core-philosophy/strategic-categories.md](docs/02-core-philosophy/strategic-categories.md)

**Components:**
- Checklist: [docs/quick-reference/component-checklist.md](docs/quick-reference/component-checklist.md)
- Specifications: [docs/07-components/](docs/07-components/)

**Layout:**
- Application shell: [docs/04-global-layout/application-shell.md](docs/04-global-layout/application-shell.md)
- Header: [docs/04-global-layout/header-navigation.md](docs/04-global-layout/header-navigation.md)
- Heartie assistant: [docs/04-global-layout/heartie-assistant.md](docs/04-global-layout/heartie-assistant.md)

## Deployment

### Railway Production

- **Build**: `npm run build` (runs TypeScript + Vite)
- **Start**: `npm start` (runs Express server from [server.js](server.js))
- **Config**: [nixpacks.toml](nixpacks.toml) specifies Node 20
- **Server**: Serves static files from `dist/` with SPA routing fallback
- **Port**: Auto-detects `process.env.PORT` or defaults to 3000

See [DEPLOYMENT.md](DEPLOYMENT.md) for full deployment instructions.

### Local Production Testing

```bash
npm run build && npm start  # Build and test production server locally
```

## Critical Implementation Notes

### When Integrating Supabase Authentication

1. Create auth context/provider for session management
2. Protect routes - redirect unauthenticated users
3. Update [src/lib/supabase.ts](src/lib/supabase.ts) auth helpers already exist (signUp, signIn, signOut, getCurrentUser)
4. Replace onboarding localStorage with actual profile creation
5. Add login/signup UI (modals or pages)

### When Replacing Mock Data

Components that need database integration:
- [src/pages/Dashboard.tsx](src/pages/Dashboard.tsx) - activities, weekly goals
- [src/pages/Calendar.tsx](src/pages/Calendar.tsx) - activities (CRUD operations)
- [src/pages/Goals.tsx](src/pages/Goals.tsx) - annual/quarterly/weekly goals
- [src/pages/Strategy.tsx](src/pages/Strategy.tsx) - strategy categories
- [src/pages/Insights.tsx](src/pages/Insights.tsx) - metric logs

Database helpers in [src/lib/supabase.ts](src/lib/supabase.ts) provide:
- `db.activities.getAll()`, `create()`, `update()`, `delete()`
- `db.weeklyGoals.getAll()`, `create()`, `update()`
- `db.annualGoals.getAll()`, `upsert()`
- `db.quarterlyGoals.getAll()`, `upsert()`

### Type Transformation Strategy

When connecting frontend to Supabase, choose one approach:

**Option A**: Update database schema to use camelCase (requires schema migration)
**Option B**: Create transformation utilities to convert snake_case ↔ camelCase
**Option C**: Consolidate to one type system (update all frontend types to snake_case)

Currently, no transformation layer exists - this must be implemented.

### Onboarding Flow

Currently stores completion in localStorage (`heartie_onboarding_completed`). When auth is added:
1. Save onboarding data to `profiles` table
2. Check `profiles.onboarding_complete` instead of localStorage
3. Dev helper: `window.resetOnboarding()` resets localStorage

### Date Handling

- Frontend uses `Date` objects
- Database uses ISO date strings (`YYYY-MM-DD` for dates, timestamps for datetimes)
- Use `date-fns` library (already installed) for date manipulation
- Week navigation uses Monday as week start (see [src/lib/mockData.ts](src/lib/mockData.ts) `getDateInCurrentWeek()` helper)

## Common Patterns

### Adding a New Activity

```typescript
// Frontend type (current)
const activity: Activity = {
  id: crypto.randomUUID(),
  userId: currentUser.id,
  date: new Date(),
  title: 'Post title',
  funnelStage: 'awareness',
  platform: 'linkedin',
  status: 'idea',
  // ... other fields
}

// Database helper (when integrated)
await db.activities.create({
  date: '2025-12-26',
  title: 'Post title',
  funnel_stage: 'awareness',
  platform: 'linkedin',
  status: 'idea'
  // user_id auto-set by RLS
})
```

### Filtering Activities by Week

```typescript
// Current mock data approach
const weekActivities = mockActivities.filter(a =>
  isSameWeek(a.date, currentWeek, { weekStartsOn: 1 })
)

// Database approach (when integrated)
const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 })
const endDate = endOfWeek(currentWeek, { weekStartsOn: 1 })
// Add date range filter to Supabase query
```

### Quarterly Goals Structure

```typescript
// Quarterly initiatives stored as JSONB in database
const initiatives = [
  { title: 'Launch email course', isComplete: false, progressPercentage: 60, order: 1 },
  { title: 'Reach 1000 LinkedIn followers', isComplete: true, progressPercentage: 100, order: 2 },
]
```

## Testing in Development

### Reset Onboarding

In browser console:
```javascript
window.resetOnboarding()  // Clears localStorage and restarts onboarding
```

### Mock Data Location

All mock data is centralized in [src/lib/mockData.ts](src/lib/mockData.ts):
- `mockUser` - Sample user
- `mockActivities` - Pre-populated activities for current week
- `mockWeeklyGoals` - Sample weekly goals
- Add mock data here for rapid prototyping before DB integration

## Future Features (Not Yet Implemented)

- AI content generation (Templates page placeholder exists)
- Heartie AI assistant chatbot
- Real-time collaboration (Supabase supports real-time subscriptions)
- Image/file uploads (Supabase Storage)
- Email notifications
- OAuth providers (Google, GitHub via Supabase Auth)

## Important Files Reference

### Documentation
- **[docs/README.md](docs/README.md)** - Complete documentation overview and navigation
- **[docs/quick-reference/](docs/quick-reference/)** - Quick-reference guides (colors, components, framework)
- **[docs/11-rules/critical-design-rules.md](docs/11-rules/critical-design-rules.md)** - Non-negotiable design rules

### Project Files
- [README.md](README.md) - Project overview and features
- [DATABASE_INTEGRATION.md](DATABASE_INTEGRATION.md) - Database integration status and next steps
- [DEPLOYMENT.md](DEPLOYMENT.md) - Railway deployment guide

### Database
- [database/SUPABASE_SETUP.md](database/SUPABASE_SETUP.md) - Supabase setup walkthrough
- [database/schema.sql](database/schema.sql) - Complete database schema
- [docs/09-data-models/database-schema.md](docs/09-data-models/database-schema.md) - TypeScript data model specifications

### Code
- [src/types/index.ts](src/types/index.ts) - All TypeScript types and constants
- [src/lib/supabase.ts](src/lib/supabase.ts) - Supabase client and database helpers
- [src/lib/mockData.ts](src/lib/mockData.ts) - Current mock data source
- [tailwind.config.js](tailwind.config.js) - Complete design system configuration
