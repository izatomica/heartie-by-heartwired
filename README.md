# Heartie - Marketing Planner by Heartwired

A web-based marketing planning SaaS platform for female solopreneurs. Built with React, TypeScript, and Tailwind CSS.

## Overview

Heartie helps solopreneurs:
- Build strategic marketing foundations through guided questionnaires (7 categories)
- Plan quarterly marketing using a drag-and-drop calendar
- Track activities across a 4-stage marketing funnel
- Generate AI content that matches their unique voice
- Access a template library organized by funnel stage
- Get guidance from an AI assistant called "Heartie"

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Build Tool**: Vite 7
- **Hosting**: Railway
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Design System

### Brand Colors

```css
--color-burgundy: #7A2D4D        /* Primary buttons, CTAs */
--color-teal-dark: #1B6B6B       /* Active tabs, progress bars */
--color-dusty-pink: #D07080      /* Soft highlights */
--color-cream: #FCF7F1           /* Main background */
```

### Typography

- **Headlines**: Bricolage Grotesque (600-700 weight)
- **Body**: Open Sans (400-600 weight)

### Funnel Stage Colors

- **Getting Seen**: #A8D5E5 (Sky Blue)
- **Building Trust**: #9DCDB5 (Sage/Mint)
- **Making the Ask**: #E8C86B (Gold/Mustard)
- **Keeping Connected**: #C5C0E8 (Lavender)

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Layout
│   └── ui/           # Button, Input, Card, Modal
├── pages/            # Dashboard, Calendar, Goals, Strategy, Templates, Insights
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
└── hooks/            # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Preview production build
npm run preview
```

### Development Server

The app will be available at `http://localhost:5173`

### Production Server

After building, start the production server:
```bash
npm run build
npm start
```
The app will be available at `http://localhost:3000`

## Features

### Phase 1: Foundation ✅
- [x] Project setup with React + TypeScript + Tailwind
- [x] Design system configuration
- [x] Base UI components (Button, Input, Card, Modal)
- [x] App shell with routing
- [x] Dashboard view with weekly summary

### Phase 2: Core Features ✅
- [x] Full Dashboard implementation with funnel health
- [x] Calendar view with drag-and-drop functionality
- [x] Activity management (Create, Edit, Delete)
- [x] Activity detail panel and add modal
- [x] Weekly navigation and filtering

### Phase 3: Goals & Strategy ✅
- [x] Goals view (Annual/Quarterly/Weekly tabs)
- [x] Strategy view (7 categories across 3 layers)
- [x] 3-layer framework visualization
- [x] Progress tracking and completion states

### Phase 4: Templates ✅
- [x] Template library with 12 professional templates
- [x] Filtering by funnel stage and platform
- [x] Template preview and search
- [ ] AI content generation (future)
- [ ] Heartie AI assistant (future)

### Phase 5: Polish ✅
- [x] Insights view with comprehensive analytics
- [x] Onboarding flow (6 steps)
- [x] Responsive mobile design
- [x] Enhanced animations and micro-interactions
- [x] Custom scrollbar and accessibility features

### Deployment Ready ✅
- [x] Production server with Express
- [x] Railway configuration
- [x] Build optimization
- [x] Deployment documentation

### Backend & Database ✅
- [x] Supabase PostgreSQL database
- [x] Row Level Security (RLS) policies
- [x] Supabase Auth integration
- [x] Database schema with types
- [x] User data isolation via RLS
- [x] Supabase client library configured
- [ ] Frontend integration with Supabase (in progress)

## The 3-Layer Framework

Heartie is built on a strategic framework that separates strategy from tactics:

1. **Layer 1: Brand Strategy** - Who you serve & why you matter
   - Your Customer
   - Your Position
   - Your Messaging

2. **Layer 2: Marketing Strategy** - Where you show up & how you sound
   - Your Voice
   - Your Reality
   - Your Landscape

3. **Layer 3: Marketing Plan** - What you do & when you do it
   - Your Big Plans
   - Calendar
   - Activities

## Design Philosophy

- **Warm, organic, calm**: Human-first design with soft curves
- **No sharp angles**: All UI elements use rounded corners
- **Generous spacing**: Ample white space for clarity
- **Supportive tone**: Friendly and encouraging, never pushy
- **Cream background**: #FCF7F1 instead of pure white

## Deployment

### Deploy to Railway

Heartie is configured for one-click deployment to Railway:

1. Push code to GitHub
2. Connect repository to Railway
3. Railway automatically:
   - Detects Node.js 20
   - Runs `npm ci` to install dependencies
   - Runs `npm run build` to build the app
   - Runs `npm start` to serve the app

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Configuration Files

- `server.js` - Express server for production
- `nixpacks.toml` - Railway build configuration
- `.nvmrc` - Node.js version specification
- `.railwayignore` - Files to exclude from deployment

### Environment Variables

For both local development and Railway deployment:
- `VITE_SUPABASE_URL` - Your Supabase project URL (from Supabase dashboard)
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key (from Supabase dashboard)

**📖 For complete database setup instructions, see [database/SUPABASE_SETUP.md](./database/SUPABASE_SETUP.md)**

## Contributing

This is a private project. For questions or suggestions, please contact the development team.

## License

Proprietary - All rights reserved
