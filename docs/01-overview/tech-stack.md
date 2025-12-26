# Tech Stack

## Frontend

**Framework:** React 19
- Component-based architecture
- Hooks for state management
- Fast, modern, well-supported

**Language:** TypeScript
- Type safety
- Better developer experience
- Catches errors at compile time

**Styling:** Tailwind CSS v4
- Utility-first CSS framework
- Rapid UI development
- Consistent design system
- Custom configuration for Heartwired brand

**Build Tool:** Vite 7
- Fast development server
- Optimized production builds
- Modern tooling

**Routing:** React Router v6
- Client-side routing
- Single-page application experience

**Drag-and-Drop:** @dnd-kit
- For calendar activity management
- Accessible, performant

**Date Handling:** date-fns
- Modern date manipulation
- Lightweight alternative to moment.js

## Backend

**Database & Auth:** Supabase
- PostgreSQL database
- Built-in authentication
- Row Level Security (RLS) for data isolation
- Real-time subscriptions (future feature)
- Storage for files/images (future feature)
- Generous free tier

**Why Supabase:**
- All-in-one backend solution
- No need to manage servers
- Built-in auth with multiple providers
- Automatic API generation
- Real-time capabilities
- PostgreSQL (proven, powerful, standards-compliant)

## Deployment

**Hosting:** Railway
- Easy deployment from GitHub
- Automatic builds
- Environment variable management
- Production-ready infrastructure

**Server:** Express (production only)
- Serves static files
- Handles SPA routing fallback
- Simple, reliable

## Development Tools

**Version Control:** Git + GitHub
- Source code management
- Collaboration
- Deployment trigger

**Package Manager:** npm
- JavaScript package management
- Lock file for consistency

**Linting:** ESLint
- Code quality
- Consistent style
- Catch errors early

## AI Integration (Future)

**Planned:**
- OpenAI GPT API for content generation
- Context-aware Heartie assistant
- Voice training from user's existing content
- Template-based generation

## Data Flow

```
User Interface (React + TypeScript)
         ↓
   Supabase Client
         ↓
  Supabase Backend
    ↓         ↓
  Auth    PostgreSQL
  (RLS)   (Database)
```

## Why These Choices?

### React + TypeScript
- Industry standard for modern web apps
- Large ecosystem and community
- Great developer experience
- Easy to find developers who know it

### Tailwind CSS
- Rapid prototyping
- Consistent design system
- No CSS naming conventions needed
- Purges unused CSS for small bundles

### Supabase
- Fastest path to production
- No backend coding required
- Built-in security (RLS)
- Scales automatically
- Free tier for development and early users

### Railway
- Simple deployment
- Good developer experience
- Automatic SSL
- Environment management
- Cost-effective

## Browser Support

**Target Browsers:**
- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)

**Mobile:**
- iOS Safari
- Chrome on Android

**Not Supporting:**
- Internet Explorer
- Opera Mini
- Old browser versions (>2 years old)

## Performance Goals

**Load Time:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s

**Bundle Size:**
- Initial JS bundle: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Total page weight: < 500KB

**Runtime:**
- 60fps animations
- < 100ms response to user interactions
- Smooth drag-and-drop

## Security

**Authentication:**
- Supabase Auth (email/password, OAuth)
- Secure session management
- Password reset flows

**Data Protection:**
- Row Level Security (RLS) policies
- User data isolation
- HTTPS only
- No sensitive data in frontend code

**Future Considerations:**
- Rate limiting
- Input validation
- XSS protection
- CSRF tokens

## See Also

- [Project Overview](./README.md)
- [Database Schema](../09-data-models/database-schema.md)
- [Build Phases](../10-implementation/build-phases.md)
