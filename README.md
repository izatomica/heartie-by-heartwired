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
- **Backend**: Supabase (planned)

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

# Preview production build
npm run preview
```

### Development Server

The app will be available at `http://localhost:5173`

## Features (In Development)

### Phase 1: Foundation ✅
- [x] Project setup with React + TypeScript + Tailwind
- [x] Design system configuration
- [x] Base UI components
- [x] App shell with routing
- [x] Dashboard view (basic)

### Phase 2: Core Features
- [ ] Full Dashboard implementation
- [ ] Calendar view with drag-and-drop
- [ ] Activity management

### Phase 3: Goals & Strategy
- [ ] Goals view (Annual/Quarterly/Weekly)
- [ ] Strategy view (7 categories)
- [ ] 3-layer framework visualization

### Phase 4: Templates & AI
- [ ] Template library
- [ ] AI content generation
- [ ] Heartie AI assistant

### Phase 5: Polish
- [ ] Insights view
- [ ] Onboarding flow
- [ ] Responsive mobile design
- [ ] Animations and micro-interactions

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

## Contributing

This is a private project. For questions or suggestions, please contact the development team.

## License

Proprietary - All rights reserved
